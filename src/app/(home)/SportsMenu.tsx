"use client";

import { useState } from "react";
import { 
  Circle,
  Dribbble,
  Trophy,
  Award,
  Target,
  Gamepad2,
  Activity,
  Mountain,
  Waves,
  TrendingUp,
  Zap
} from "lucide-react";

const sports = [
  { name: "Basketball", icon: <Dribbble className="w-5 h-5" />, color: "bg-orange-500", live: true, matches: 8 },
  { name: "Soccer", icon: <Circle className="w-5 h-5" />, color: "bg-green-500", live: true, matches: 8 },
  { name: "Baseball", icon: <Award className="w-5 h-5" />, color: "bg-blue-500", live: false, matches: 6 },
  { name: "Tennis", icon: <Target className="w-5 h-5" />, color: "bg-yellow-500", live: true, matches: 15 },
  { name: "Volleyball", icon: <Circle className="w-5 h-5" />, color: "bg-pink-500", live: false, matches: 4 },
  { name: "Hockey", icon: <Activity className="w-5 h-5" />, color: "bg-cyan-500", live: true, matches: 7 },
  { name: "Cricket", icon: <Award className="w-5 h-5" />, color: "bg-lime-500", live: true, matches: 3 },
  { name: "Golf", icon: <Mountain className="w-5 h-5" />, color: "bg-emerald-500", live: false, matches: 2 },
  { name: "eSports", icon: <Gamepad2 className="w-5 h-5" />, color: "bg-purple-500", live: true, matches: 25 },
  { name: "Swimming", icon: <Waves className="w-5 h-5" />, color: "bg-sky-500", live: false, matches: 1 }
];

export function SportsBar() {
  const [selectedSport, setSelectedSport] = useState("Soccer");

  return (
    <div className="relative w-full bg-purple-950 border-b border-purple-400/20">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 py-5 overflow-x-auto scrollbar-thin scrollbar-thumb-purple-600/50 scrollbar-track-transparent">

          {/* All Sports Button */}
          <button
            onClick={() => setSelectedSport("All")}
            className={`flex items-center gap-4 px-8 py-4 rounded-3xl font-bold shrink-0 border-2 transition-colors ${
              selectedSport === "All"
                ? "bg-purple-600 text-white border-purple-600"
                : "bg-purple-900 text-purple-200 hover:bg-purple-800 hover:text-white border-purple-500/30"
            }`}
          >
            <Trophy className="w-6 h-6" />
            <div className="flex flex-col items-start">
              <span className="text-lg">All Sports</span>
              <span className="text-xs opacity-75 font-normal">View Everything</span>
            </div>
          </button>

          {/* Sports Buttons */}
          {sports.map((sport) => (
            <button
              key={sport.name}
              onClick={() => setSelectedSport(sport.name)}
              className={`flex items-center gap-4 px-6 py-4 rounded-3xl font-semibold shrink-0 border-2 transition-colors ${
                selectedSport === sport.name
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-purple-900 text-purple-200 hover:bg-purple-800 hover:text-white border-purple-600/20"
              }`}
            >
              {/* Icon with live bubble effect */}
              <div className="relative">
                {sport.live && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className={`animate-ping absolute inline-flex h-9 w-9 rounded-full ${sport.color} opacity-60`}></span>
                  </span>
                )}
                <div className={`relative p-2.5 rounded-xl text-white ${sport.color}`}>
                  {sport.icon}
                </div>
              </div>

              <div className="flex flex-col items-start">
                <span className="text-base">{sport.name}</span>
                <div className="flex items-center gap-3 text-xs">
                  {sport.live && (
                    <span className="text-emerald-300 font-medium">● Live</span>
                  )}
                  <span className="text-purple-300">{sport.matches} matches</span>
                </div>
              </div>
            </button>
          ))}

          {/* Trending Indicator */}
          <div className="flex items-center gap-3 px-6 py-3 bg-purple-800 rounded-2xl border border-purple-400/30 shrink-0 ml-6">
            <TrendingUp className="w-4 h-4 text-purple-300" />
            <div className="flex flex-col">
              <span className="text-sm text-purple-200 font-semibold">Trending</span>
              <span className="text-xs text-purple-300">Hot matches</span>
            </div>
            <Zap className="w-4 h-4 text-purple-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
