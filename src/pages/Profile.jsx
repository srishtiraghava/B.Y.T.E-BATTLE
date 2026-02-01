import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Moon,
  Sun,
  Menu,
  Swords,
  Edit,
  Eye,
  MessageSquare,
  Star,
  Trophy,
  Zap,
} from "lucide-react";
import { useTheme } from "../Theme/ThemeContext"; // ← adjust path to match your project
import { NoiseBackground } from "@/components/ui/noise-background";
import Navbar from "../components/Comman/NavBar";

import ProfileCard from "../components/Profile/ProfileCard";
import CommunityStats from "../components/Profile/CommunityStats";
import TechStack from "../components/Profile/TechStack";
import SkillsCard from "../components/Profile/SkillsCard";
import BattleStatsCard from "../components/Profile/BattleStatsCard";
import BadgesCard from "../components/Profile/BadgeCard";
import ActivityGrid from "../components/Profile/ActivityGrid";

const Profile = () => {
  const { isDark, toggleTheme } = useTheme();
  const [hoveredDay, setHoveredDay] = useState(null);

  const theme = {
    navText: isDark
      ? "text-green-400 hover:text-green-300"
      : "text-green-700 hover:text-green-800",
    iconBg: isDark
      ? "bg-gradient-to-br from-emerald-800 to-emerald-800"
      : "bg-gradient-to-br from-emerald-800 to-emerald-800",
    cardBg: isDark ? "bg-gray-900/50" : "bg-white",
    cardBorder: isDark ? "border-gray-700/30" : "border-gray-200",
  };

  const userSkills = [
    {
      level: "Advanced",
      color: "text-yellow-500",
      note: "Expert in algorithms",
    },
    {
      level: "Intermediate",
      color: "text-orange-500",
      note: "Familiar with React",
    },
    { level: "Beginner", color: "text-green-500", note: "Learning C++" },
  ];

  // Sample data
  const userData = {
    username: "CodeWarrior",
    rank: "~50,000",
    battlesWon: 45,
    battlesTotal: 75,
    winRate: 60,
    codeforcesHandle: "codewarrior_cf",
    techStack: ["React", "Python", "JavaScript", "Node.js", "C++"],
    expertise: "Intermediate",
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
        date: date.toISOString().split("T")[0],
        count: count,
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        monthDay: date.getDate(),
        month: date.toLocaleDateString("en-US", { month: "short" }),
      });
    }

    return { data, currentStreak, maxStreak };
  };

  const {
    data: activityData,
    currentStreak,
    maxStreak,
  } = generateActivityData();

  const getActivityColor = (count) => {
    if (count === 0) return isDark ? "#1f2937" : "#e5e7eb";
    if (count === 1) return isDark ? "#065f46" : "#86efac";
    if (count === 2) return isDark ? "#047857" : "#4ade80";
    if (count === 3) return isDark ? "#059669" : "#22c55e";
    if (count >= 4) return isDark ? "#10b981" : "#16a34a";
    return isDark ? "#10b981" : "#16a34a";
  };

  const totalActiveDays = activityData.filter((d) => d.count > 0).length;
  const totalBattles = activityData.reduce((sum, d) => sum + d.count, 0);

  // Group data by weeks
  const weeks = [];
  for (let i = 0; i < activityData.length; i += 7) {
    weeks.push(activityData.slice(i, i + 7));
  }

  return (
    <div
      className={`min-h-screen transition-colors ${isDark ? "bg-black text-white" : "bg-gray-50 text-gray-900"}`}
    >
      <Navbar />

      {/* PROFILE CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT SIDEBAR */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <ProfileCard
              userData={userData}
              className="shadow-md rounded-xl p-6 bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700/30"
            />
            <CommunityStats
              stats={{ views: 123, solutions: 45, reputation: 67 }}
              className="shadow-md rounded-xl p-6 bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700/30"
            />
            <TechStack
              techStack={userData.techStack}
              className="shadow-md rounded-xl p-6 bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700/30"
            />
            <div className="shadow-md rounded-xl p-6 bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700/30">
              <h3 className="font-semibold text-lg mb-2">Codeforces</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                @{userData.codeforcesHandle}
              </p>
            </div>
            <SkillsCard
              skills={userSkills}
              className="shadow-md rounded-xl p-6 bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700/30"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Battle Stats */}
            <BattleStatsCard
              stats={{
                battlesWon: userData.battlesWon,
                battlesTotal: userData.battlesTotal,
                winRate: userData.winRate,
                currentStreak: currentStreak,
              }}
              className="shadow-md rounded-xl p-6 bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700/30"
            />

            {/* Bottom Row: Badges + Activity */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Badges Card */}
              <div className="lg:w-1/4 flex-shrink-0">
                <BadgesCard
                  badgeCount={userData.badges ?? 0}
                  className="shadow-md rounded-xl p-6 bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700/30"
                />
              </div>

              {/* Activity Grid: Full remaining width */}
              <div className="lg:flex-1 overflow-x-auto">
                <ActivityGrid
                  activityData={activityData}
                  className="shadow-md rounded-xl p-6 bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700/30 w-full min-w-[700px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
