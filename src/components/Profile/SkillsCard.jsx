import React from "react";
import { useTheme } from "../../Theme/ThemeContext";

const SkillsCard = ({ skills }) => {
  const { isDark } = useTheme();

  // Fallback skills
  const skillLevels = skills || [
    { level: "Advanced", color: "text-yellow-500", note: "Not enough data" },
    { level: "Intermediate", color: "text-orange-500", note: "Not enough data" },
    { level: "Beginner", color: "text-green-500", note: "Not enough data" },
  ];

  return (
    <div
      className={`
        ${isDark ? "bg-gray-900/50" : "bg-white"} 
        border ${isDark ? "border-gray-700/30" : "border-gray-200"} 
        rounded-2xl p-6 flex flex-col space-y-4 shadow-md
      `}
    >
      <h3 className="font-semibold text-lg mb-2">Skills</h3>

      <div className="space-y-3">
        {skillLevels.map((skill, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className={`font-semibold ${skill.color}`}>★ {skill.level}</span>
            <span className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>
              {skill.note}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsCard;
