"use client";

import Link from "next/link";
import Image from "next/image";

// Example mock data (replace with API later)
const matches = [
  {
    id: "1",
    home: { name: "Crvena Zvezda", logo: "/team-1.png" },
    away: { name: "Pafos", logo: "/team-2.png" },
    date: "25 Sep 2025",
    league: "Champions League",
  },
  {
    id: "2",
    home: { name: "Real Madrid", logo: "/team-3.png" },
    away: { name: "Barcelona", logo: "/team-4.png" },
    date: "26 Sep 2025",
    league: "La Liga",
  },
  {
    id: "3",
    home: { name: "Man City", logo: "/team-5.png" },
    away: { name: "Liverpool", logo: "/team-6.png" },
    date: "30 Sep 2025",
    league: "Premier League",
  },
];

export default function MatchesPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      <h1 className="text-2xl font-bold text-center mb-6">
        Upcoming Matches & Predictions
      </h1>

      <div className="grid gap-6">
        {matches.map((match) => (
          <Link
            key={match.id}
            href={`/match/${match.id}`}
            className="block bg-gradient-to-r from-purple-900 to-purple-800 rounded-lg p-4 shadow-md hover:shadow-lg hover:scale-[1.01] transition-transform duration-200"
          >
            <div className="flex items-center justify-between">
              {/* Teams */}
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-center">
                  <Image
                    src={match.home.logo}
                    alt={match.home.name}
                    width={40}
                    height={40}
                  />
                  <span className="text-sm mt-1">{match.home.name}</span>
                </div>

                <span className="font-bold text-lg">vs</span>

                <div className="flex flex-col items-center">
                  <Image
                    src={match.away.logo}
                    alt={match.away.name}
                    width={40}
                    height={40}
                  />
                  <span className="text-sm mt-1">{match.away.name}</span>
                </div>
              </div>

              {/* Match Info */}
              <div className="text-right">
                <div className="text-xs text-purple-200">{match.league}</div>
                <div className="text-sm font-semibold">{match.date}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
