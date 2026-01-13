import React, { useEffect, useRef } from 'react';

interface ElectricBorderProps {
  children: React.ReactNode;
  className?: string;
}

const ElectricBorder: React.FC<ElectricBorderProps> = ({ children, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Electric arc particles
    interface Particle {
      x: number;
      y: number;
      angle: number;
      speed: number;
      life: number;
      maxLife: number;
      size: number;
    }

    const particles: Particle[] = [];
    const maxParticles = 60;

    // Lightning bolt points
    interface LightningBolt {
      points: { x: number; y: number }[];
      alpha: number;
      decay: number;
      width: number;
    }

    const bolts: LightningBolt[] = [];

    const createBolt = () => {
      const w = canvas.width;
      const h = canvas.height;
      const padding = 8;
      const cornerRadius = 20;
      
      // Pick random position along the border
      const perimeter = 2 * (w + h) - 8 * cornerRadius + 2 * Math.PI * cornerRadius;
      let pos = Math.random() * perimeter;
      
      let startX = 0, startY = 0;
      
      // Calculate position on rounded rect border
      if (pos < w - 2 * cornerRadius) {
        startX = cornerRadius + pos;
        startY = padding;
      } else if (pos < w - 2 * cornerRadius + h - 2 * cornerRadius) {
        pos -= w - 2 * cornerRadius;
        startX = w - padding;
        startY = cornerRadius + pos;
      } else if (pos < 2 * (w - 2 * cornerRadius) + h - 2 * cornerRadius) {
        pos -= w - 2 * cornerRadius + h - 2 * cornerRadius;
        startX = w - cornerRadius - pos;
        startY = h - padding;
      } else {
        pos -= 2 * (w - 2 * cornerRadius) + h - 2 * cornerRadius;
        startX = padding;
        startY = h - cornerRadius - pos;
      }

      const points = [{ x: startX, y: startY }];
      const segments = 4 + Math.floor(Math.random() * 4);
      
      for (let i = 0; i < segments; i++) {
        const lastPoint = points[points.length - 1];
        const angle = Math.random() * Math.PI * 2;
        const length = 15 + Math.random() * 25;
        points.push({
          x: lastPoint.x + Math.cos(angle) * length,
          y: lastPoint.y + Math.sin(angle) * length
        });
      }

      bolts.push({
        points,
        alpha: 0.8 + Math.random() * 0.2,
        decay: 0.02 + Math.random() * 0.03,
        width: 1 + Math.random() * 2
      });
    };

    const createParticle = () => {
      const w = canvas.width;
      const h = canvas.height;
      const padding = 8;
      
      // Random position on border
      const side = Math.floor(Math.random() * 4);
      let x = 0, y = 0;
      
      switch (side) {
        case 0: x = Math.random() * w; y = padding; break;
        case 1: x = w - padding; y = Math.random() * h; break;
        case 2: x = Math.random() * w; y = h - padding; break;
        case 3: x = padding; y = Math.random() * h; break;
      }

      particles.push({
        x,
        y,
        angle: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 1.5,
        life: 1,
        maxLife: 1,
        size: 1 + Math.random() * 3
      });
    };

    let animationId: number;
    let frameCount = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;
      const padding = 4;
      const cornerRadius = 20;

      // Draw glowing border
      ctx.save();
      
      // Outer glow - golden
      for (let i = 3; i >= 0; i--) {
        const glowSize = i * 4;
        ctx.strokeStyle = `rgba(251, 191, 36, ${0.1 - i * 0.02})`;
        ctx.lineWidth = 2 + glowSize;
        ctx.beginPath();
        ctx.roundRect(padding + glowSize / 2, padding + glowSize / 2, w - padding * 2 - glowSize, h - padding * 2 - glowSize, cornerRadius);
        ctx.stroke();
      }

      // Main border with golden gradient
      const gradient = ctx.createLinearGradient(0, 0, w, h);
      const time = Date.now() / 1000;
      const hueShift = Math.sin(time) * 5;
      gradient.addColorStop(0, `hsl(${45 + hueShift}, 93%, 47%)`);
      gradient.addColorStop(0.5, `hsl(${38 + hueShift}, 92%, 55%)`);
      gradient.addColorStop(1, `hsl(${45 + hueShift}, 93%, 47%)`);
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(padding, padding, w - padding * 2, h - padding * 2, cornerRadius);
      ctx.stroke();

      // Pulsing inner glow - golden
      const pulseAlpha = 0.3 + Math.sin(time * 3) * 0.2;
      ctx.strokeStyle = `rgba(253, 224, 71, ${pulseAlpha})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(padding + 2, padding + 2, w - padding * 2 - 4, h - padding * 2 - 4, cornerRadius - 2);
      ctx.stroke();

      ctx.restore();

      // Create new bolts and particles
      if (frameCount % 8 === 0 && Math.random() > 0.3) {
        createBolt();
      }
      if (particles.length < maxParticles && Math.random() > 0.7) {
        createParticle();
      }

      // Draw and update lightning bolts
      bolts.forEach((bolt, index) => {
        if (bolt.alpha <= 0) {
          bolts.splice(index, 1);
          return;
        }

        ctx.save();
        ctx.strokeStyle = `rgba(251, 191, 36, ${bolt.alpha})`;
        ctx.lineWidth = bolt.width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowColor = 'rgba(245, 158, 11, 0.8)';
        ctx.shadowBlur = 10;

        ctx.beginPath();
        ctx.moveTo(bolt.points[0].x, bolt.points[0].y);
        bolt.points.forEach((point, i) => {
          if (i > 0) ctx.lineTo(point.x, point.y);
        });
        ctx.stroke();

        // Bright core - golden
        ctx.strokeStyle = `rgba(254, 243, 199, ${bolt.alpha})`;
        ctx.lineWidth = bolt.width * 0.5;
        ctx.shadowBlur = 5;
        ctx.stroke();

        ctx.restore();

        bolt.alpha -= bolt.decay;
      });

      // Draw and update particles
      particles.forEach((particle, index) => {
        if (particle.life <= 0) {
          particles.splice(index, 1);
          return;
        }

        ctx.save();
        const alpha = particle.life;
        ctx.fillStyle = `rgba(251, 191, 36, ${alpha})`;
        ctx.shadowColor = 'rgba(245, 158, 11, 0.8)';
        ctx.shadowBlur = 8;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * alpha, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // Update particle
        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y += Math.sin(particle.angle) * particle.speed;
        particle.life -= 0.015;
      });

      // Traveling light effect along border
      const travelSpeed = 0.0008;
      const travelPos = (time * travelSpeed) % 1;
      const travelPos2 = ((time * travelSpeed) + 0.5) % 1;
      
      [travelPos, travelPos2].forEach((pos, idx) => {
        const perimeter = 2 * (w - padding * 2) + 2 * (h - padding * 2);
        const distance = pos * perimeter;
        
        let tx = 0, ty = 0;
        const innerW = w - padding * 2;
        const innerH = h - padding * 2;
        
        if (distance < innerW) {
          tx = padding + distance;
          ty = padding;
        } else if (distance < innerW + innerH) {
          tx = w - padding;
          ty = padding + (distance - innerW);
        } else if (distance < 2 * innerW + innerH) {
          tx = w - padding - (distance - innerW - innerH);
          ty = h - padding;
        } else {
          tx = padding;
          ty = h - padding - (distance - 2 * innerW - innerH);
        }

        // Draw traveling orb - golden
        const orbGradient = ctx.createRadialGradient(tx, ty, 0, tx, ty, 20);
        orbGradient.addColorStop(0, `rgba(254, 243, 199, ${0.9 - idx * 0.3})`);
        orbGradient.addColorStop(0.3, `rgba(251, 191, 36, ${0.6 - idx * 0.2})`);
        orbGradient.addColorStop(1, 'rgba(245, 158, 11, 0)');

        ctx.fillStyle = orbGradient;
        ctx.beginPath();
        ctx.arc(tx, ty, 20, 0, Math.PI * 2);
        ctx.fill();
      });

      frameCount++;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
      />
      <div className="relative z-0 p-6">
        {children}
      </div>
    </div>
  );
};

export default ElectricBorder;
