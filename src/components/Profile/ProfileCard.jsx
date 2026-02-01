import React from "react";
import { Zap } from "lucide-react";
import { NoiseBackground } from "@/components/ui/noise-background";
import { useTheme } from "../../Theme/ThemeContext";

const ProfileCard = ({ userData }) => {
  const { isDark } = useTheme();

  // Fallback user data if not passed as props
  const user = userData || {
    username: "CodeWarrior",
    rank: "~50,000",
  };

  return (
    <div
      className={`
        ${isDark ? "bg-gray-900/50" : "bg-white"}
        border ${isDark ? "border-gray-700/30" : "border-gray-200"}
        rounded-2xl p-6 flex flex-col items-center space-y-4
        shadow-md transition-all duration-300 hover:scale-105
      `}
    >
      {/* Avatar */}
      <div
        className={`
          w-28 h-28 rounded-full flex items-center justify-center mb-2
          ${isDark
            ? "bg-gradient-to-br from-emerald-700 to-emerald-500 shadow-lg"
            : "bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-md"}
        `}
      >
        <span className="text-4xl font-bold text-white">
          {user.username.slice(0, 2).toUpperCase()}
        </span>
      </div>

      {/* Username */}
      <h2 className="text-2xl font-extrabold">{user.username}</h2>

      {/* Rank */}
      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        <span className="font-semibold">Rank:</span> {user.rank}
      </p>

      {/* Edit Button */}
      <NoiseBackground
        containerClassName="w-fit rounded-full"
        gradientColors={["rgb(255, 100, 150)", "rgb(100, 150, 255)", "rgb(255, 200, 100)"]}
      >
        <button
          className={`
            px-6 py-2 rounded-full font-semibold text-sm
            bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500
            text-black shadow-md hover:shadow-lg
            transform hover:-translate-y-1 transition-all duration-200
            flex items-center gap-2
          `}
        >
          <Zap size={18} />
          Edit Profile
        </button>
      </NoiseBackground>
    </div>
  );
};

export default ProfileCard;
