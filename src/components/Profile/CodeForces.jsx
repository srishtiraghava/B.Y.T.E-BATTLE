import React from "react";
import { useTheme } from "../../Theme/ThemeContext";

const CodeforcesCard = ({ handle }) => {
  const { isDark } = useTheme();

  return (
    <div
      className={`
        ${isDark ? "bg-gray-900/50" : "bg-white"} 
        border ${isDark ? "border-gray-700/30" : "border-gray-200"} 
        rounded-2xl p-6 flex flex-col space-y-3 shadow-md
      `}
    >
      <h3 className="font-semibold text-lg">Codeforces</h3>

      <p className="text-sm text-gray-600 dark:text-gray-400">
        @{handle}
      </p>
    </div>
  );
};

export default CodeforcesCard;
