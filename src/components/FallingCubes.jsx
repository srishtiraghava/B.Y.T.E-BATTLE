import { useEffect, useRef } from "react";

const FallingCubes = ({ theme }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // 🔽 Smaller cube size = less gap = denser look
    let cubeSize = 12;
    let drops = [];
    let columns = 0;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      columns = Math.floor(canvas.width / cubeSize);
      drops = Array(columns).fill(1);
    };

    init();
    window.addEventListener("resize", init);

    const colors =
      theme === "dark"
        ? {
            fade: "rgba(0,0,0,0.08)",   // 🔥 longer trails
            cube: "#00ff66",
            glow: "#00ff66",
          }
        : {
            fade: "rgba(255,255,255,0.08)",
            cube: "#007744",
            glow: "#00aa55",
          };

    const draw = () => {
      // 🌊 trail fade (do NOT fully clear)
      ctx.fillStyle = colors.fade;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = colors.cube;

      // ✨ STRONG GLOW
      ctx.shadowColor = colors.glow;
      ctx.shadowBlur = 24;

      for (let i = 0; i < drops.length; i++) {
        ctx.fillRect(
          i * cubeSize,
          drops[i] * cubeSize,
          cubeSize - 1,
          cubeSize - 1
        );

        if (drops[i] * cubeSize > canvas.height && Math.random() > 0.965) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      ctx.shadowBlur = 0; // reset (important)
    };

    const interval = setInterval(draw, 30);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", init);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
};

export default FallingCubes;