import React from "react";
import { useTheme } from "../../Theme/ThemeContext";

const BattleStatsCard = ({ stats }) => {
  const { isDark } = useTheme();

  const userStats = stats || {
    battlesWon: 45,
    battlesTotal: 75,
    winRate: 60,
    currentStreak: 5,
  };

  const { battlesWon, battlesTotal, winRate, currentStreak } = userStats;

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const progress = (battlesWon / battlesTotal) * circumference;

  return (
    <div
      className={`
        ${isDark ? "bg-gray-900/60" : "bg-white"} 
        border ${isDark ? "border-gray-700/50" : "border-gray-200"} 
        rounded-3xl p-6 flex flex-col items-center shadow-lg
        transition-all duration-300
      `}
    >
      {/* Card Header */}
      <h3 className={`text-xl font-semibold mb-6 ${isDark ? "text-gray-100" : "text-gray-900"}`}>
        Battle Stats
      </h3>

      {/* Circular Chart */}
      <div className="relative w-48 h-48 mb-6">
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
            className="transition-all duration-1000 ease-out"
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
      <div className="w-full space-y-3">
        <div className="flex justify-between items-center px-5 py-3 rounded-xl bg-green-500/10">
          <span className="text-green-500 font-medium">Won</span>
          <span className="font-semibold">{battlesWon}/{battlesTotal}</span>
        </div>
        <div className="flex justify-between items-center px-5 py-3 rounded-xl bg-red-500/10">
          <span className="text-red-500 font-medium">Lost</span>
          <span className="font-semibold">{battlesTotal - battlesWon}/{battlesTotal}</span>
        </div>
        <div className="pt-4 border-t border-gray-700/30 flex justify-between items-center">
          <span className={isDark ? "text-gray-400" : "text-gray-600"}>Current Streak</span>
          <span className="font-semibold text-emerald-500">{currentStreak} days 🔥</span>
        </div>
      </div>

      {/* Win Rate Bar */}
      <div className="w-full mt-6">
        <div className="flex justify-between mb-1">
          <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Win Rate</span>
          <span className="font-semibold">{winRate}%</span>
        </div>
        <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-4">
          <div
            className="bg-gradient-to-r from-emerald-500 to-green-500 h-4 rounded-full transition-all duration-1000"
            style={{ width: `${winRate}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default BattleStatsCard;
