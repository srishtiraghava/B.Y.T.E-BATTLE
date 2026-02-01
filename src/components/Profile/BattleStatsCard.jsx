import React from "react";
import { useTheme } from "../../Theme/ThemeContext";

const BattleStatsCard = ({ stats }) => {
  const { isDark } = useTheme();

  // Fallback stats
  const userStats = stats || {
    battlesWon: 45,
    battlesTotal: 75,
    winRate: 60,
    currentStreak: 5,
  };

  const { battlesWon, battlesTotal, winRate, currentStreak } = userStats;

  // Circular chart calculations
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const progress = (battlesWon / battlesTotal) * circumference;

  return (
    <div
      className={`
        ${isDark ? "bg-gray-900/50" : "bg-white"} 
        border ${isDark ? "border-gray-700/30" : "border-gray-200"} 
        rounded-2xl p-6 flex flex-col items-center shadow-md
      `}
    >
      <h3 className="font-semibold text-lg mb-4">Battle Stats</h3>

      {/* Circular Chart */}
      <div className="relative w-48 h-48 mb-4">
        <svg width="192" height="192" className="transform -rotate-90">
          {/* Background Circle */}
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke={isDark ? "#1f2937" : "#e5e7eb"}
            strokeWidth="16"
            fill="none"
          />
          {/* Progress Circle */}
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke="#10b981"
            strokeWidth="16"
            fill="none"
            strokeDasharray={`${progress} ${circumference}`}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold">{battlesWon}</div>
          <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            /{battlesTotal} Won
          </div>
        </div>
      </div>

      {/* Stats Bars */}
      <div className="w-full space-y-2">
        <div className="flex justify-between px-4 py-2 rounded-lg bg-green-500/10">
          <span className="text-green-500 font-medium">Won</span>
          <span className="font-semibold">{battlesWon}/{battlesTotal}</span>
        </div>
        <div className="flex justify-between px-4 py-2 rounded-lg bg-red-500/10">
          <span className="text-red-500 font-medium">Lost</span>
          <span className="font-semibold">{battlesTotal - battlesWon}/{battlesTotal}</span>
        </div>
        <div className="pt-4 border-t border-gray-700/30 flex justify-between">
          <span className={isDark ? "text-gray-400" : "text-gray-600"}>Current Streak</span>
          <span className="font-semibold text-emerald-500">{currentStreak} days 🔥</span>
        </div>
      </div>

      {/* Win Rate Bar */}
      <div className="w-full mt-4">
        <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Win Rate: {winRate}%</span>
        <div className="w-full bg-gray-700 rounded-full h-3 mt-1">
          <div
            className="bg-gradient-to-r from-emerald-500 to-green-500 h-3 rounded-full transition-all duration-1000"
            style={{ width: `${winRate}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default BattleStatsCard;
