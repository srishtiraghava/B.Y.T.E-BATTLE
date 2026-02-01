import React from "react";
import { Trophy } from "lucide-react";
import { useTheme } from "../../Theme/ThemeContext";

const BadgesCard = ({ badgeCount }) => {
  const { isDark } = useTheme();

  const count = badgeCount ?? 0; // default to 0 if not provided

  return (
    <div
      className={`
        ${isDark ? "bg-gray-900/50" : "bg-white"} 
        border ${isDark ? "border-gray-700/30" : "border-gray-200"} 
        rounded-2xl p-6 flex flex-col items-center justify-center shadow-md
        space-y-4 transition-all duration-200 hover:scale-105
      `}
    >
      <div className="flex items-center justify-between w-full mb-2">
        <h3 className="font-semibold text-lg">Badges</h3>
        <span className="text-2xl font-bold">{count}</span>
      </div>

      {/* Trophy Icon */}
      <div
        className={`
          w-full h-32 flex items-center justify-center
          ${isDark ? "text-gray-600" : "text-gray-400"}
        `}
      >
        <Trophy size={48} className="opacity-30" />
      </div>

      {/* Badge message */}
      {count === 0 && (
        <p className={`text-center text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>
          No badges earned yet
        </p>
      )}
    </div>
  );
};

export default BadgesCard;
