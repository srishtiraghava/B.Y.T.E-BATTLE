import { useTheme } from './ThemeContext';
import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, Swords, Zap, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { NoiseBackground } from "@/components/ui/noise-background";

import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { motion } from "motion/react";
import { Link } from 'react-router-dom';



const TITLE = ['B', '.', 'Y', '.', 'T', '.', 'E', ' ', 'B', 'A', 'T', 'T', 'L', 'E'];

const ByteBattleHomepage = () => {
  const [visibleLetters, setVisibleLetters] = useState([]);
  const [timeLeft, setTimeLeft] = useState(255);
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    TITLE.forEach((_, i) => {
      setTimeout(() => {
        setVisibleLetters(prev => [...prev, i]);
      }, i * 120);
    });
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft(p => (p <= 0 ? 300 : p - 1));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const formatTime = s =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const theme = {
    navText: isDark
      ? 'text-green-400 hover:text-green-300'
      : 'text-green-700 hover:text-green-800',

    iconBg: isDark
      ? 'bg-gradient-to-br from-emerald-800 to-emerald-800'
      : 'bg-gradient-to-br from-emerald-800 to-emerald-800',

    startBtn: isDark
      ? 'bg-emerald-700 hover:bg-emerald-800'
      : 'bg-emerald-700 hover:bg-emerald-800',

    rulesBtn: isDark
      ? 'bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900'
      : 'bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900',
  };

  return (
  <div className={`min-h-screen transition-colors ${isDark ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
    
     
      {/* NAVBAR */}
   
      <nav className="px-6 py-4 flex justify-between items-center border-b border-gray-700/30">
        <div className="flex items-center gap-2">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${theme.iconBg}`}>
            <Swords className="text-white w-5 h-5" />
          </div>
          <div>
      <motion.div className="relative mx-4 my-4 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row">
        <LayoutTextFlip
          text="Welcome to "
          words={["Code Clash", "1v1 Arena", "Code Fight Club", "Duel Grounds"]}
        />
      </motion.div>
      
    </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
  {['Home', 'Guide', 'Level Sheet', 'Profile'].map(item => {
    const path = item === 'Home' ? '/' 
               : item === 'Profile' ? '/Profile'    // or '/profile' if you change the route
               : `/${item.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <Link
        key={item}
        to={path}
        className={`font-medium transition-colors ${theme.navText}`}
      >
        {item}
      </Link>
    );
  })}

  {/* theme toggle button */}
  <button 
    onClick={toggleTheme}
    className="p-2 rounded-lg border transition-colors border-gray-600/50 hover:border-gray-500"
    style={{ backgroundColor: isDark ? '#374151' : '#ffffff' }}
  >
    {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-700" />}
  </button>

  <button 
    className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
    onClick={() => navigate('/login')}
  >
    Login
  </button>
</div>

        <Menu className="md:hidden text-gray-400" size={24} />
      </nav>

      {/* HERO */}
      <main className="text-center py-20 px-4 max-w-5xl mx-auto">

        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
          {TITLE.map((ch, i) => (
            <span
              key={i}
              className={`inline-block transition-all duration-500
                ${visibleLetters.includes(i) ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}
                ${isDark ? 'text-emerald-700' : 'text-emerald-700'}
              `}
              style={{ marginRight: ch === ' ' ? '12px' : '2px' }}
            >
              {ch}
            </span>
          ))}
        </h1>

        <p className={`text-xl md:text-2xl font-medium mb-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          EVERY TICK COUNTS.
        </p>

        <div className="text-7xl md:text-8xl font-mono font-black mb-12 text-emerald-500 tracking-wider">
          {formatTime(timeLeft)}
        </div>

        <div className="flex flex-col justify-center items-center gap-6 md:gap-8 mt-4">
          <div className="flex flex-col sm:flex-row gap-6 md:gap-8">
           <NoiseBackground
      containerClassName="w-fit rounded-xl"
      gradientColors={[
        "rgb(255, 100, 150)",
        "rgb(100, 150, 255)",
        "rgb(255, 200, 100)",
      ]}
    >
      <button
        className={`
          px-10 py-4 rounded-xl font-bold text-lg
          bg-gradient-to-r from-neutral-900 via-neutral-950 to-black
          text-white
          shadow-lg hover:shadow-xl 
          transform hover:-translate-y-1 
          transition-all duration-200 
          active:scale-98
        `}
      >
        <Trophy size={20} className="inline mr-2" />
        View Rules
      </button>
    </NoiseBackground>
 <div className="flex justify-center">
     <NoiseBackground
      containerClassName="w-fit rounded-xl"
      gradientColors={[
        "rgb(255, 100, 150)",
        "rgb(100, 150, 255)",
        "rgb(255, 200, 100)",
      ]}
    >
      <button
        className={`
          px-10 py-4 rounded-xl font-bold text-lg
          bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500
          text-black
          shadow-lg hover:shadow-xl 
          transform hover:-translate-y-1 
          transition-all duration-200 
          active:scale-98
        `}
      >
        <Zap size={20} className="inline mr-2" />
        Start Battle
      </button>
    </NoiseBackground>
    </div>
          </div>

          {/* Tagline section */}
          <div className="mt-6 text-center space-y-2 md:space-y-3">
            <p className={`text-xl md:text-2xl font-semibold tracking-wide ${isDark ? 'text-emerald-400/90' : 'text-emerald-700'}`}>
              1 vs 1 coding platform
            </p>

            <p className={`text-lg md:text-xl font-bold ${isDark ? 'text-emerald-500' : 'text-emerald-600'}`}>
              Code Fast. Break Things. Fix Faster.
            </p>

            <p className={`mt-2 text-lg md:text-xl font-medium italic ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              "Lock in or get locked out"
            </p>
          </div>
        </div>

      </main>
    </div>
  );
};


export default ByteBattleHomepage;
