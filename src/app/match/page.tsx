"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Trophy, Clock, TrendingUp, Search } from "lucide-react";
import { Navbar } from "../(home)/navbar";

// Expanded mock data with more upcoming matches as of October 3, 2025
const matches = [
  {
    id: "1",
    home: { name: "AFC Bournemouth", logo: "/team-1.png", form: ["W", "D", "W"] },
    away: { name: "Fulham", logo: "/team-2.png", form: ["L", "W", "D"] },
    date: "4 Oct",
    time: "15:00",
    league: "Premier League",
    prediction: "1",
    probability: 55,
  },
  {
    id: "2",
    home: { name: "Arsenal", logo: "/team-3.png", form: ["W", "W", "W"] },
    away: { name: "Olympiakos", logo: "/team-4.png", form: ["D", "W", "L"] },
    date: "5 Oct",
    time: "20:00",
    league: "Champions League",
    prediction: "1",
    probability: 75,
  },
  {
    id: "3",
    home: { name: "Barcelona", logo: "/team-5.png", form: ["W", "L", "W"] },
    away: { name: "Girona", logo: "/team-6.png", form: ["W", "D", "W"] },
    date: "5 Oct",
    time: "20:00",
    league: "La Liga",
    prediction: "1",
    probability: 70,
  },
  {
    id: "4",
    home: { name: "Borussia Dortmund", logo: "/team-7.png", form: ["W", "W", "D"] },
    away: { name: "RB Leipzig", logo: "/team-8.png", form: ["L", "W", "D"] },
    date: "4 Oct",
    time: "14:30",
    league: "Bundesliga",
    prediction: "1",
    probability: 60,
  },
  {
    id: "5",
    home: { name: "Atalanta", logo: "/team-9.png", form: ["W", "D", "W"] },
    away: { name: "Lazio", logo: "/team-10.png", form: ["L", "L", "D"] },
    date: "4 Oct",
    time: "19:45",
    league: "Serie A",
    prediction: "1",
    probability: 65,
  },
  {
    id: "6",
    home: { name: "AS Monaco", logo: "/team-11.png", form: ["D", "W", "W"] },
    away: { name: "OGC Nice", logo: "/team-12.png", form: ["W", "W", "L"] },
    date: "5 Oct",
    time: "20:00",
    league: "Ligue 1",
    prediction: "X",
    probability: 38,
  },
  {
    id: "7",
    home: { name: "Manchester United", logo: "/team-13.png", form: ["D", "W", "L"] },
    away: { name: "Tottenham", logo: "/team-14.png", form: ["W", "D", "W"] },
    date: "6 Oct",
    time: "16:30",
    league: "Premier League",
    prediction: "1",
    probability: 52,
  },
  {
    id: "8",
    home: { name: "Bayern Munich", logo: "/team-15.png", form: ["W", "W", "W"] },
    away: { name: "Stuttgart", logo: "/team-16.png", form: ["L", "D", "L"] },
    date: "5 Oct",
    time: "18:30",
    league: "Bundesliga",
    prediction: "1",
    probability: 80,
  },
  {
    id: "9",
    home: { name: "Juventus", logo: "/team-17.png", form: ["W", "D", "W"] },
    away: { name: "Milan", logo: "/team-18.png", form: ["D", "W", "L"] },
    date: "6 Oct",
    time: "20:45",
    league: "Serie A",
    prediction: "X",
    probability: 45,
  },
  {
    id: "10",
    home: { name: "PSG", logo: "/team-19.png", form: ["W", "W", "D"] },
    away: { name: "Rennes", logo: "/team-20.png", form: ["L", "W", "W"] },
    date: "6 Oct",
    time: "15:00",
    league: "Ligue 1",
    prediction: "1",
    probability: 68,
  },
  {
    id: "11",
    home: { name: "Real Madrid", logo: "/team-21.png", form: ["W", "L", "W"] },
    away: { name: "Alaves", logo: "/team-22.png", form: ["D", "L", "D"] },
    date: "4 Oct",
    time: "21:00",
    league: "La Liga",
    prediction: "1",
    probability: 82,
  },
  {
    id: "12",
    home: { name: "Liverpool", logo: "/team-23.png", form: ["W", "W", "W"] },
    away: { name: "Chelsea", logo: "/team-24.png", form: ["D", "W", "L"] },
    date: "6 Oct",
    time: "17:30",
    league: "Premier League",
    prediction: "1",
    probability: 62,
  },
];

export default function MatchesPage() {
  const [selectedLeague, setSelectedLeague] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const leagues = ["all", "champions league", "premier league", "la liga", "bundesliga", "ligue 1", "serie a"];

  const getFormColor = (result: string) => {
    if (result === "W") return "bg-emerald-500";
    if (result === "L") return "bg-red-500";
    return "bg-amber-500";
  };

  const getPredictionColor = (prediction: string) => {
    if (prediction === "1") return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (prediction === "2") return "bg-red-50 text-red-700 border-red-200";
    return "bg-amber-50 text-amber-700 border-amber-200";
  };

  const filteredMatches = matches.filter(match => {
    const matchesLeague = selectedLeague === "all" || match.league.toLowerCase().includes(selectedLeague);
    const matchesSearch = match.home.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         match.away.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLeague && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        {/* Compact Header */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-4 lg:p-6 shadow-sm mb-6">
          <h1 className="text-xl lg:text-2xl font-bold text-white text-center">
            Upcoming Matches & Predictions
          </h1>
        </div>

        {/* Compact Filters */}
        <div className="bg-white border border-gray-200 rounded-xl p-3 lg:p-4 shadow-sm mb-4">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search teams..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                />
              </div>
            </div>
            <div className="flex gap-1 lg:gap-2 overflow-x-auto">
              {leagues.map((league) => (
                <button
                  key={league}
                  onClick={() => setSelectedLeague(league)}
                  className={`px-3 py-1 lg:px-4 lg:py-2 text-xs lg:text-sm rounded-lg font-medium whitespace-nowrap transition-colors ${
                    selectedLeague === league
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {league.charAt(0).toUpperCase() + league.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Compact Matches Grid - More columns for density */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4">
          {filteredMatches.map((match) => (
            <Link
              key={match.id}
              href={`/match/${match.id}`}
              className="block bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-purple-300 transition-all h-full"
            >
              <div className="p-3 lg:p-4">
                {/* Top Bar - Compact */}
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs font-medium">
                    {match.league}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <span>{match.date}</span>
                    <span>•</span>
                    <span>{match.time}</span>
                  </div>
                </div>

                {/* Teams Compact - Horizontal on all, team1 left, team2 right; stack forms if needed on mobile */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  {/* Home Team - Left */}
                  <div className="flex items-center gap-1 flex-1 min-w-0">
                    <div className="w-6 h-6 bg-gray-100 rounded flex-shrink-0">
                      <div className="w-full h-full bg-gray-200 rounded text-[10px] flex items-center justify-center text-gray-400">
                        L
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-900 text-xs truncate">{match.home.name}</p>
                      <div className="flex gap-0.5">
                        {match.home.form.map((result, i) => (
                          <div
                            key={i}
                            className={`w-3 h-3 rounded-full ${getFormColor(result)} flex items-center justify-center text-white text-[8px] font-bold`}
                          >
                            {result}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Prediction - Center */}
                  <div className="flex flex-col items-center gap-1 flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full border-2 ${getPredictionColor(match.prediction)} flex items-center justify-center`}>
                      <span className="text-xs font-bold">{match.prediction}</span>
                    </div>
                    <span className="text-[8px] text-gray-500">{match.probability}%</span>
                  </div>

                  {/* Away Team - Right */}
                  <div className="flex items-center gap-1 flex-1 min-w-0 justify-end">
                    <div className="min-w-0 flex-1 text-right">
                      <p className="font-semibold text-gray-900 text-xs truncate">{match.away.name}</p>
                      <div className="flex gap-0.5 justify-end">
                        {match.away.form.map((result, i) => (
                          <div
                            key={i}
                            className={`w-3 h-3 rounded-full ${getFormColor(result)} flex items-center justify-center text-white text-[8px] font-bold`}
                          >
                            {result}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="w-6 h-6 bg-gray-100 rounded flex-shrink-0">
                      <div className="w-full h-full bg-gray-200 rounded text-[10px] flex items-center justify-center text-gray-400">
                        L
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Action */}
                <button className="w-full mt-2 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded text-xs font-medium transition-colors">
                  View Details
                </button>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredMatches.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm col-span-full">
            <Search className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <h3 className="text-lg font-bold text-gray-900 mb-1">No matches found</h3>
            <p className="text-sm text-gray-600">Try adjusting your filters</p>
          </div>
        )}

        {/* Compact Stats Summary - Reduced size */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="w-4 h-4 text-purple-600" />
              <h3 className="font-semibold text-gray-900 text-sm">Total Matches</h3>
            </div>
            <div className="text-xl font-bold text-purple-600">{matches.length}</div>
            <p className="text-xs text-gray-600 mt-1">Upcoming</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <h3 className="font-semibold text-gray-900 text-sm">Accuracy</h3>
            </div>
            <div className="text-xl font-bold text-emerald-600">87%</div>
            <p className="text-xs text-gray-600 mt-1">Last 30 days</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-amber-600" />
              <h3 className="font-semibold text-gray-900 text-sm">Leagues</h3>
            </div>
            <div className="text-xl font-bold text-amber-600">{leagues.length - 1}</div>
            <p className="text-xs text-gray-600 mt-1">Covered</p>
          </div>
        </div>
      </div>
    </div>
  );
}