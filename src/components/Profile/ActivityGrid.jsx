import React, { useState } from "react";
import { useTheme } from "../../Theme/ThemeContext";

const ActivityGrid = ({ activityData }) => {
  const { isDark } = useTheme();
  const [hoveredDay, setHoveredDay] = useState(null);

  const data = activityData || []; // fallback if no data

  // Group data into weeks
  const weeks = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  // Map count to color
  const getActivityColor = (count) => {
    if (count === 0) return isDark ? "#1f2937" : "#e5e7eb";
    if (count === 1) return isDark ? "#065f46" : "#86efac";
    if (count === 2) return isDark ? "#047857" : "#4ade80";
    if (count === 3) return isDark ? "#059669" : "#22c55e";
    if (count >= 4) return isDark ? "#10b981" : "#16a34a";
    return isDark ? "#10b981" : "#16a34a";
  };

  const totalActiveDays = data.filter((d) => d.count > 0).length;
  const totalBattles = data.reduce((sum, d) => sum + d.count, 0);
  const maxStreak = Math.max(
    ...data
      .map((d) => d.count > 0)
      .join("")
      .split("false")
      .map((s) => s.length)
  );

  return (
    <div
      className={`
        ${isDark ? "bg-gray-900/50" : "bg-white"} 
        border ${isDark ? "border-gray-700/30" : "border-gray-200"} 
        rounded-2xl p-6 shadow-md
      `}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <h3 className="font-semibold text-lg">
          {totalBattles} battles in the past year
        </h3>
        <div className="flex gap-4 text-sm">
          <span className={isDark ? "text-gray-400" : "text-gray-600"}>
            Active: <span className="font-semibold text-emerald-500">{totalActiveDays}</span>
          </span>
          <span className={isDark ? "text-gray-400" : "text-gray-600"}>
            Streak: <span className="font-semibold text-orange-500">{maxStreak}</span>
          </span>
        </div>
      </div>

      {/* Grid */}
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
        <div className={`mt-3 p-2 rounded-lg text-sm ${isDark ? "bg-gray-800" : "bg-gray-100"}`}>
          <div className="font-semibold">
            {hoveredDay.count} {hoveredDay.count === 1 ? "battle" : "battles"} on {hoveredDay.month} {hoveredDay.monthDay}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-2 mt-4 text-xs">
        <span className={isDark ? "text-gray-500" : "text-gray-400"}>Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: getActivityColor(level) }}
          />
        ))}
        <span className={isDark ? "text-gray-500" : "text-gray-400"}>More</span>
      </div>
    </div>
  );
};

export default ActivityGrid;
