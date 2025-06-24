"use client";
import { Circle, Dribbble, Trophy, Volleyball, Medal, Award } from "lucide-react";

const sports = [
  { name: "Football", icon: <Circle className="w-5 h-5" /> },
  { name: "Basketball", icon: <Dribbble className="w-5 h-5" /> },
  { name: "Baseball", icon: <Award className="w-5 h-5" /> },
  { name: "Tennis", icon: <Circle className="w-5 h-5" /> },
  { name: "Volleyball", icon: <Volleyball className="w-5 h-5" /> },
  { name: "Hockey", icon: <Award className="w-5 h-5" /> },
  { name: "Cricket", icon: <Award className="w-5 h-5" /> },
  { name: "Golf", icon: <Award className="w-5 h-5" /> },
  { name: "eSports", icon: <Trophy className="w-5 h-5" /> },
  { name: "Olympics", icon: <Medal className="w-5 h-5" /> },
];

export function SportsBar() {
  return (
    <div className="w-full bg-gray-900 border-b border-gray-800">
      <div className="flex flex-row gap-2 py-4 px-2 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-900 whitespace-nowrap">
        {sports.map((sport) => (
          <button
            key={sport.name}
            className="flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-950 transition-colors text-white shrink-0"
          >
            {sport.icon}
            <span className="font-medium">{sport.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
