import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, Swords, Zap, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom'

const TITLE = ['B', '.', 'Y', '.', 'T', '.', 'E', ' ', 'B', 'A', 'T', 'T', 'L', 'E'];

const ByteBattleHomepage = () => {
  const [isDark, setIsDark] = useState(false);
  const [visibleLetters, setVisibleLetters] = useState([]);
  const [timeLeft, setTimeLeft] = useState(255);
  const navigate = useNavigate()



  /* LETTER ANIMATION */
  useEffect(() => {
    TITLE.forEach((_, i) => {
      setTimeout(() => {
        setVisibleLetters(prev => [...prev, i]);
      }, i * 120);
    });
  }, []);

  /* TIMER */
  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft(p => (p <= 0 ? 300 : p - 1));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const formatTime = s =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  /* THEME */
  const theme = {
    navText: isDark
      ? 'text-orange-500 hover:text-red-400'
      : 'text-blue-600 hover:text-blue-500',

    iconBg: isDark
      ? 'bg-gradient-to-br from-red-500 to-red-600'
      : 'bg-gradient-to-br from-blue-500 to-red-400',

    bigStartBtn: isDark
      ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
      : 'bg-gradient-to-r from-blue-500 to-red-400 hover:from-blue-600 hover:to-red-500',

    smallStartBtn: isDark
      ? 'bg-red-600 hover:bg-red-700'
      : 'bg-blue-600 hover:bg-blue-700',

    rulesBtn: 'bg-green-600 hover:bg-green-700', // ALWAYS GREEN
  };

  return (
    <div className={`min-h-screen transition-colors ${isDark ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>

      {/* NAVBAR */}
      <nav className="px-6 py-4 flex justify-between items-center border-b border-gray-300">
        <div className="flex items-center gap-2">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${theme.iconBg}`}>
            <Swords className="text-white w-5 h-5" />
          </div>
          <span className={`text-xl font-bold ${theme.navText}`}>ByteBattle</span>
        </div>

        <div className="flex items-center gap-6">
          {['Home', 'Guide', 'Level Sheet', 'Contest'].map(item => (
            <a key={item} href="#" className={`font-medium ${theme.navText}`}>
              {item}
            </a>
          ))}

          {/* THEME TOGGLER — FIXED */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            {isDark ? (
              <Sun className="text-yellow-400" />
            ) : (
              <Moon className="text-blue-600" />  
            )}
          </button>

          <button className="px-6 py-2 bg-gray-900 text-white rounded-lg" onClick={() => navigate('/login')}>
            Login
          </button>

          <Menu className="md:hidden" />
        </div>
      </nav>



      {/* HERO */}
      <main className="text-center py-20">

        {/* LETTER ANIMATION HEADING */}
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
          {TITLE.map((ch, i) => (
            <span
              key={i}
              className={`inline-block transition-all duration-500
                ${visibleLetters.includes(i) ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}
                ${isDark ? 'text-red-500' : 'text-blue-600'}
              `}
              style={{ marginRight: ch === ' ' ? '12px' : '2px' }}
            >
              {ch}
            </span>
          ))}
        </h1>

        <p className="text-gray-500 mb-8">EVERY TICK COUNTS.</p>

        {/* TIMER */}
        <div className="text-7xl font-mono font-bold mb-10 text-blue-500">
          {formatTime(timeLeft)}
        </div>

        {/* BIG START */}
        <button className={`px-12 py-4 rounded-xl text-white font-semibold ${theme.bigStartBtn}`}>
          START BATTLE
        </button>

       <div className="mt-8 flex justify-center gap-4">

  {/* Start Battle – theme based */}
  <button
    className={`px-8 py-3 rounded-xl text-white font-semibold flex items-center gap-2
      ${isDark ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}
    `}
  >
    <Zap size={18} />
    Start Battle
  </button>

  {/* View Rules – always green */}
  <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 rounded-xl font-semibold text-lg transition shadow-lg hover:shadow-xl flex items-center space-x-2">
                                <Trophy className="w-5 h-5" />
                                <span>View Rules</span>
                            </button>

</div>

      </main>
    </div>
  );
};

export default ByteBattleHomepage;