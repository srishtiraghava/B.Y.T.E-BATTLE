import React from "react";
import { useTheme } from "../../Theme/ThemeContext";

const TechStack = ({ techStack }) => {
  const { isDark } = useTheme();

  // Fallback tech stack
  const stack = techStack || ["React", "Python", "JavaScript", "Node.js", "C++"];

  return (
    <div
      className={`
        ${isDark ? "bg-gray-900/50" : "bg-white"} 
        border ${isDark ? "border-gray-700/30" : "border-gray-200"} 
        rounded-2xl p-6 flex flex-col space-y-3 shadow-md
      `}
    >
      <h3 className="font-semibold text-lg mb-2">Tech Stack</h3>

      <div className="flex flex-wrap gap-2">
        {stack.map((tech, index) => (
          <span
            key={index}
            className={`
              px-3 py-1 rounded-full text-sm font-medium
              transition-all duration-200
              ${isDark
                ? "bg-emerald-900/40 text-emerald-400 hover:bg-emerald-800/60"
                : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"}
            `}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
