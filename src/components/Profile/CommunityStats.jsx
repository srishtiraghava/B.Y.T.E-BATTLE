import React from "react";
import { Eye, MessageSquare, Star } from "lucide-react";
import { useTheme } from "../../Theme/ThemeContext";

const CommunityStats = ({ stats }) => {
  const { isDark } = useTheme();

  // Fallback stats if none are provided
  const defaultStats = stats || {
    views: 0,
    solutions: 0,
    reputation: 0,
  };

  // Helper to create each stat row
  const StatRow = ({ icon: Icon, label, value, color }) => (
    <div
      className={`
        flex items-center justify-between px-4 py-2 rounded-lg
        transition-all duration-200
        ${isDark ? "bg-gray-800/40 hover:bg-gray-800/60" : "bg-gray-100 hover:bg-gray-200"}
      `}
    >
      <div className="flex items-center gap-2">
        <Icon size={18} className={color} />
        <span className="font-medium">{label}</span>
      </div>
      <span className="font-semibold">{value}</span>
    </div>
  );

  return (
    <div
      className={`
        ${isDark ? "bg-gray-900/50" : "bg-white"} 
        border ${isDark ? "border-gray-700/30" : "border-gray-200"} 
        rounded-2xl p-6 flex flex-col space-y-3 shadow-md
      `}
    >
      <h3 className="font-semibold text-lg mb-2">Community Stats</h3>

      <StatRow
        icon={Eye}
        label="Views"
        value={defaultStats.views}
        color="text-blue-500"
      />

      <StatRow
        icon={MessageSquare}
        label="Solutions"
        value={defaultStats.solutions}
        color="text-green-500"
      />

      <StatRow
        icon={Star}
        label="Reputation"
        value={defaultStats.reputation}
        color="text-yellow-500"
      />
    </div>
  );
};

export default CommunityStats;
