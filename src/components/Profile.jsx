import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, Menu, Swords, Edit, Eye, MessageSquare, Star, Trophy,Zap} from 'lucide-react';
import { useTheme } from './ThemeContext';  // ← adjust path to match your project
import { NoiseBackground } from "@/components/ui/noise-background";

const Profile = () => {
  const { isDark, toggleTheme } = useTheme();
  const [hoveredDay, setHoveredDay] = useState(null);

  const theme = {
    navText: isDark
      ? 'text-green-400 hover:text-green-300'
      : 'text-green-700 hover:text-green-800',
    iconBg: isDark
      ? 'bg-gradient-to-br from-emerald-800 to-emerald-800'
      : 'bg-gradient-to-br from-emerald-800 to-emerald-800',
    cardBg: isDark ? 'bg-gray-900/50' : 'bg-white',
    cardBorder: isDark ? 'border-gray-700/30' : 'border-gray-200',
  };

  // Sample data
  const userData = {
    username: 'CodeWarrior',
    rank: '~50,000',
    battlesWon: 45,
    battlesTotal: 75,
    winRate: 60,
    codeforcesHandle: 'codewarrior_cf',
    techStack: ['React', 'Python', 'JavaScript', 'Node.js', 'C++'],
    expertise: 'Intermediate',
  };

  // Generate 365 days activity data with realistic patterns
  const generateActivityData = () => {
    const data = [];
    const today = new Date();
    let currentStreak = 0;
    let maxStreak = 0;
    let tempStreak = 0;
    
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // More realistic pattern: active on weekdays, less on weekends
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      let count = 0;
      if (isWeekend) {
        count = Math.random() > 0.7 ? Math.floor(Math.random() * 3) : 0;
      } else {
        count = Math.random() > 0.5 ? Math.floor(Math.random() * 5) + 1 : 0;
      }
      
      // Track streaks
      if (count > 0) {
        tempStreak++;
        if (i === 0) currentStreak = tempStreak;
        maxStreak = Math.max(maxStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
      
      data.push({
        date: date.toISOString().split('T')[0],
        count: count,
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        monthDay: date.getDate(),
        month: date.toLocaleDateString('en-US', { month: 'short' }),
      });
    }
    
    return { data, currentStreak, maxStreak };
  };

  const { data: activityData, currentStreak, maxStreak } = generateActivityData();

  const getActivityColor = (count) => {
    if (count === 0) return isDark ? '#1f2937' : '#e5e7eb';
    if (count === 1) return isDark ? '#065f46' : '#86efac';
    if (count === 2) return isDark ? '#047857' : '#4ade80';
    if (count === 3) return isDark ? '#059669' : '#22c55e';
    if (count >= 4) return isDark ? '#10b981' : '#16a34a';
    return isDark ? '#10b981' : '#16a34a';
  };

  const totalActiveDays = activityData.filter(d => d.count > 0).length;
  const totalBattles = activityData.reduce((sum, d) => sum + d.count, 0);

  // Group data by weeks
  const weeks = [];
  for (let i = 0; i < activityData.length; i += 7) {
    weeks.push(activityData.slice(i, i + 7));
  }

  return (
    <div className={`min-h-screen transition-colors ${isDark ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      
      {/* NAVBAR */}
      <nav className="px-6 py-4 flex justify-between items-center border-b border-gray-700/30">
        <div className="flex items-center gap-2">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${theme.iconBg}`}>
            <Swords className="text-white w-5 h-5" />
          </div>
          <div className="text-xl font-bold ml-2">
            <span className="text-emerald-500">Byte</span>
            <span className={isDark ? 'text-white' : 'text-gray-900'}>Battle</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={`font-medium transition-colors ${theme.navText}`}
          >
            Home
          </Link>

          {['Guide', 'Level Sheet', 'Profile'].map(item => (
            <a 
              key={item} 
              href="#" 
              className={`font-medium transition-colors ${theme.navText}`}
            >
              {item}
            </a>
          ))}

          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg border transition-colors border-gray-600/50 hover:border-gray-500"
            style={{
              backgroundColor: isDark ? '#374151' : '#ffffff',
            }}
          >
            {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-700" />}
          </button>

          <button className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition">
            Logout
          </button>
        </div>

        <Menu className="md:hidden text-gray-400" size={24} />
      </nav>

      {/* PROFILE CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT SIDEBAR - Profile */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Profile Card */}
            <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-xl p-6`}>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-4xl font-bold text-white">CW</span>
                </div>
                
                <h2 className="text-2xl font-bold mb-1">{userData.username}</h2>
                <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Rank ~{userData.rank}
                </p>
                
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
        Edit Profile
      </button>
    </NoiseBackground>
              </div>

              {/* Community Stats */}
              <div className="mt-6 space-y-3">
                <h3 className="font-semibold text-lg mb-4">Community Stats</h3>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye size={16} className="text-blue-500" />
                    <span>Views</span>
                  </div>
                  <span className="font-semibold">0</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare size={16} className="text-green-500" />
                    <span>Solutions</span>
                  </div>
                  <span className="font-semibold">0</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star size={16} className="text-yellow-500" />
                    <span>Reputation</span>
                  </div>
                  <span className="font-semibold">0</span>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mt-6">
                <h3 className="font-semibold text-lg mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {userData.techStack.map((tech, i) => (
                    <span 
                      key={i} 
                      className={`px-3 py-1 rounded-full text-sm ${
                        isDark ? 'bg-emerald-900/40 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Codeforces Handle */}
              <div className="mt-6">
                <h3 className="font-semibold text-lg mb-2">Codeforces</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  @{userData.codeforcesHandle}
                </p>
              </div>

              {/* Skills */}
              <div className="mt-6">
                <h3 className="font-semibold text-lg mb-3">Skills</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-500">★ Advanced</span>
                    <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Not enough data</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-orange-500">★ Intermediate</span>
                    <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Not enough data</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-green-500">★ Beginner</span>
                    <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Not enough data</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT CONTENT - Stats & Activity */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Top Row - Battle Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Circular Battle Chart */}
              <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-xl p-6`}>
                <div className="flex flex-col items-center">
                  <div className="relative w-48 h-48 mb-4">
                    <svg className="transform -rotate-90" width="192" height="192">
                      <circle
                        cx="96"
                        cy="96"
                        r="80"
                        stroke={isDark ? '#1f2937' : '#e5e7eb'}
                        strokeWidth="16"
                        fill="none"
                      />
                      <circle
                        cx="96"
                        cy="96"
                        r="80"
                        stroke="#10b981"
                        strokeWidth="16"
                        fill="none"
                        strokeDasharray={`${(userData.battlesWon / userData.battlesTotal) * 502.65} 502.65`}
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-4xl font-bold">{userData.battlesWon}</div>
                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        /{userData.battlesTotal}
                      </div>
                      <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Won</div>
                    </div>
                  </div>
                  
                  <div className="w-full space-y-2">
                    <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-green-500/10">
                      <span className="text-green-500">Won</span>
                      <span className="font-semibold">{userData.battlesWon}/{userData.battlesTotal}</span>
                    </div>
                    <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-red-500/10">
                      <span className="text-red-500">Lost</span>
                      <span className="font-semibold">{userData.battlesTotal - userData.battlesWon}/{userData.battlesTotal}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Stats */}
              <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-xl p-6`}>
                <h3 className="font-semibold text-lg mb-6">Battle Statistics</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Total Battles</span>
                      <span className="font-bold text-xl">{userData.battlesTotal}</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Battles Won</span>
                      <span className="font-bold text-xl text-green-500">{userData.battlesWon}</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Win Rate</span>
                      <span className="font-bold text-xl text-emerald-500">{userData.winRate}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-green-500 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${userData.winRate}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-700/30">
                    <div className="flex justify-between">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Current Streak</span>
                      <span className="font-semibold">{currentStreak} days 🔥</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Badges and 365 Days Activity - Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Badges Card */}
              <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-xl p-6`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Badges</h3>
                  <span className="text-2xl font-bold">0</span>
                </div>
                <div className={`h-32 flex items-center justify-center ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                  <Trophy size={48} className="opacity-30" />
                </div>
                <p className={`text-center text-sm mt-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  No badges earned yet
                </p>
              </div>

              {/* 365 Days Activity Grid */}
              <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-xl p-6 lg:col-span-2`}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                  <h3 className="font-semibold text-lg">
                    {totalBattles} battles in the past year
                  </h3>
                  <div className="flex gap-4 text-sm">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                      Active: <span className="font-semibold text-emerald-500">{totalActiveDays}</span>
                    </span>
                    <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                      Streak: <span className="font-semibold text-orange-500">{maxStreak}</span>
                    </span>
                  </div>
                </div>

                <div className="overflow-x-auto pb-2">
                  <div className="inline-flex gap-1">
                    {weeks.map((week, weekIndex) => (
                      <div key={weekIndex} className="flex flex-col gap-1">
                        {week.map((day, dayIndex) => (
                          <div
                            key={dayIndex}
                            className="w-3 h-3 rounded-sm cursor-pointer hover:ring-2 hover:ring-emerald-500 transition-all relative"
                            style={{ backgroundColor: getActivityColor(day.count) }}
                            onMouseEnter={() => setHoveredDay(day)}
                            onMouseLeave={() => setHoveredDay(null)}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tooltip */}
                {hoveredDay && (
                  <div className={`mt-3 p-2 rounded-lg text-sm ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <div className="font-semibold">
                      {hoveredDay.count} {hoveredDay.count === 1 ? 'battle' : 'battles'} on {hoveredDay.month} {hoveredDay.monthDay}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 mt-4 text-xs">
                  <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>Less</span>
                  {[0, 1, 2, 3, 4].map(level => (
                    <div
                      key={level}
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: getActivityColor(level) }}
                    />
                  ))}
                  <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>More</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

    </div>
  );
};

export default Profile;