"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  MapPin, 
  Cloud, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Trophy,
  Users,
  Activity,
  AlertCircle,
  ChevronRight,
  Target
} from "lucide-react";

import { Navbar } from "../.././(home)/navbar";

interface MatchPageProps {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function MatchPage({ params }: MatchPageProps) {
 const [activeTab, setActiveTab] = useState("details");
  const [predictionTab, setPredictionTab] = useState("1x2");
  const [headToHeadLeague, setHeadToHeadLeague] = useState("all");
  const [teamStatsTab, setTeamStatsTab] = useState("team1");
  // Mock Data
  const match = {
    team1: {
      name: "Crvena Zvezda",
      logo: "/team-1.png",
      form: ["W", "W", "D", "L", "W", "W"],
      position: "2nd",
      league: "Serbian SuperLiga"
    },
    team2: {
      name: "Pafos FC",
      logo: "/team-2.png",
      form: ["L", "D", "W", "L", "L", "D"],
      position: "18th",
      league: "Cyprus First Division"
    },
    venue: "Rajko Mitić Stadium",
    weather: "Clear, 24°C",
    date: "19 Aug 2025",
    time: "20:00",
    league: "UEFA Champions League",
    prediction: "1",
    predictionStatus: "ongoing", // correct, wrong, ongoing
    score: { team1: 1, team2: 0 },
    matchTime: "45'",
    distance: 1847
  };

  const predictions = {
    "1x2": {
      team1Win: 68,
      draw: 22,
      team2Win: 10,
      prediction: "1",
      correctScore: "2-1",
      avgGoals: 2.8,
      coef: 1.45
    },
    "underOver": {
      under: 35,
      over: 65,
      prediction: "Over 2.5",
      avgGoals: 2.8,
      coef: 1.75
    },
    "halfTime": {
      team1Win: 45,
      draw: 38,
      team2Win: 17,
      prediction: "1",
      htScore: "1-0",
      coef: 2.10
    },
    "htft": {
      prediction: "1/1",
      probability: 42,
      coef: 2.25
    },
    "btts": {
      yes: 58,
      no: 42,
      prediction: "Yes",
      coef: 1.85
    }
  };

  const headToHead = [
    { date: "15 Mar 2024", league: "Champions League", team1: 2, team2: 1, venue: "Home" },
    { date: "20 Sep 2023", league: "Champions League", team1: 1, team2: 1, venue: "Away" },
    { date: "10 May 2023", league: "Friendly", team1: 3, team2: 0, venue: "Neutral" },
    { date: "5 Dec 2022", league: "Europa League", team1: 0, team2: 2, venue: "Away" },
  ];

  const injured = {
    team1: [
      { name: "Marko Ilic", reason: "Knee injury", return: "Unknown" },
      { name: "Stefan Mitrovic", reason: "Suspended", return: "Next match" }
    ],
    team2: [
      { name: "Bruno Felipe", reason: "Ankle injury", return: "2 weeks" },
      { name: "Jairo", reason: "Red card", return: "1 match" }
    ]
  };

  const standings = [
    { pos: 1, team: "FK Partizan", pts: 38, gp: 26, w: 12, d: 2, l: 12, gf: 35, ga: 25, diff: 10 },
    { pos: 2, team: "Crvena Zvezda", pts: 36, gp: 26, w: 11, d: 3, l: 12, gf: 38, ga: 28, diff: 10 },
    { pos: 3, team: "Vojvodina", pts: 33, gp: 26, w: 10, d: 3, l: 13, gf: 30, ga: 25, diff: 5 },
    { pos: 16, team: "FK Rad", pts: 25, gp: 26, w: 6, d: 7, l: 13, gf: 22, ga: 35, diff: -13 },
    { pos: 17, team: "Napredak", pts: 23, gp: 25, w: 5, d: 8, l: 12, gf: 20, ga: 38, diff: -18 },
    { pos: 18, team: "Pafos FC", pts: 21, gp: 24, w: 5, d: 6, l: 13, gf: 24, ga: 40, diff: -16 },
  ];

  const lastMatches = [
    { date: "10 Aug", opponent: "Partizan", score: "2-1", result: "W" },
    { date: "5 Aug", opponent: "Vojvodina", score: "1-1", result: "D" },
    { date: "30 Jul", opponent: "TSC", score: "3-0", result: "W" },
    { date: "25 Jul", opponent: "Cukaricki", score: "0-2", result: "L" },
    { date: "20 Jul", opponent: "Mladost", score: "2-0", result: "W" },
    { date: "15 Jul", opponent: "Radnicki", score: "1-0", result: "W" },
  ];

  const getFormColor = (result: string) => {
    if (result === "W") return "bg-emerald-500";
    if (result === "L") return "bg-red-500";
    return "bg-amber-500";
  };

  const getPredictionStatusColor = () => {
    if (match.predictionStatus === "correct") return "border-emerald-500 bg-emerald-50";
    if (match.predictionStatus === "wrong") return "border-red-500 bg-red-50";
    return "border-amber-500 bg-amber-50";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        {/* Main Tabs */}
        <div className="bg-white border border-gray-200 rounded-2xl mb-6 shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-200">
            {["details", "preview", "match-centre"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-6 py-4 font-semibold capitalize transition-colors ${
                  activeTab === tab
                    ? "bg-purple-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {tab.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Match Header */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-8 shadow-lg mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Team 1 */}
            <div className="flex flex-col items-center lg:items-end text-center lg:text-right">
              <div className="w-32 h-32 bg-white rounded-2xl p-4 mb-4 shadow-lg">
                <div className="w-full h-full bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
                  Logo
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{match.team1.name}</h2>
              <div className="flex gap-1 mb-2">
                {match.team1.form.map((result, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full ${getFormColor(result)} flex items-center justify-center text-white text-xs font-bold`}
                  >
                    {result}
                  </div>
                ))}
              </div>
              <span className="text-purple-200 text-sm">{match.team1.position} place</span>
            </div>

            {/* Match Info Center */}
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl font-bold text-white mb-2">
                {match.team1.name.split(" ")[0]} <span className="text-purple-200">vs</span>{" "}
                {match.team2.name.split(" ")[0]}
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-3 w-full">
                <div className="flex items-center justify-center gap-2 text-white mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{match.venue}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-white/90">
                  <Cloud className="w-4 h-4" />
                  <span className="text-sm">{match.weather}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-white mb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{match.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{match.time}</span>
                </div>
              </div>

              {/* Prediction Circle */}
              <div className={`w-20 h-20 rounded-full border-4 ${getPredictionStatusColor()} flex items-center justify-center mb-3`}>
                <span className="text-2xl font-bold text-gray-900">{match.prediction}</span>
              </div>

              {/* Live Score */}
              <div className="bg-white rounded-xl px-6 py-3 mb-2">
                <div className="text-3xl font-bold text-gray-900">
                  {match.score.team1} - {match.score.team2}
                </div>
              </div>

              {/* Match Time */}
              <div className="bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold">
                {match.matchTime}
              </div>
            </div>

            {/* Team 2 */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="w-32 h-32 bg-white rounded-2xl p-4 mb-4 shadow-lg">
                <div className="w-full h-full bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
                  Logo
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{match.team2.name}</h2>
              <div className="flex gap-1 mb-2">
                {match.team2.form.map((result, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full ${getFormColor(result)} flex items-center justify-center text-white text-xs font-bold`}
                  >
                    {result}
                  </div>
                ))}
              </div>
              <span className="text-purple-200 text-sm">{match.team2.position} place</span>
            </div>
          </div>

          {/* League Badge */}
          <div className="text-center mt-6">
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-semibold">
              {match.league}
            </span>
          </div>
        </div>

        {/* Content Based on Active Tab */}
        {activeTab === "details" && (
          <div className="space-y-6">
            {/* Predictions Section */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-purple-600" />
                Predictions
              </h2>

              {/* Prediction Tabs */}
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {["1x2", "under/over 2.5", "half time", "ht/ft", "btts", "handicap", "scorers", "corners", "cards"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setPredictionTab(tab)}
                    className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                      predictionTab === tab
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {tab.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* 1X2 Prediction */}
              {predictionTab === "1x2" && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-purple-50">
                      <tr>
                        <th className="text-left p-4 text-gray-700 font-semibold">Team</th>
                        <th className="text-center p-4 text-gray-700 font-semibold">Probability</th>
                        <th className="text-center p-4 text-gray-700 font-semibold">Prediction</th>
                        <th className="text-center p-4 text-gray-700 font-semibold">Correct Score</th>
                        <th className="text-center p-4 text-gray-700 font-semibold">Avg Goals</th>
                        <th className="text-center p-4 text-gray-700 font-semibold">Weather</th>
                        <th className="text-center p-4 text-gray-700 font-semibold">Coef</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="p-4 font-medium text-gray-900">{match.team1.name}</td>
                        <td className="p-4 text-center">
                          <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full font-semibold">
                            {predictions["1x2"].team1Win}%
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-bold">
                            1
                          </span>
                        </td>
                        <td className="p-4 text-center font-semibold text-gray-700">{predictions["1x2"].correctScore}</td>
                        <td className="p-4 text-center text-gray-700">{predictions["1x2"].avgGoals}</td>
                        <td className="p-4 text-center text-gray-700">{match.weather}</td>
                        <td className="p-4 text-center font-bold text-purple-600">{predictions["1x2"].coef}</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="p-4 font-medium text-gray-700">Draw</td>
                        <td className="p-4 text-center">
                          <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full font-semibold">
                            {predictions["1x2"].draw}%
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-500 rounded-full font-bold">
                            X
                          </span>
                        </td>
                        <td className="p-4 text-center text-gray-400">-</td>
                        <td className="p-4 text-center text-gray-700">{predictions["1x2"].avgGoals}</td>
                        <td className="p-4 text-center text-gray-700">{match.weather}</td>
                        <td className="p-4 text-center text-gray-400">3.20</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-medium text-gray-900">{match.team2.name}</td>
                        <td className="p-4 text-center">
                          <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full font-semibold">
                            {predictions["1x2"].team2Win}%
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-500 rounded-full font-bold">
                            2
                          </span>
                        </td>
                        <td className="p-4 text-center text-gray-400">0-2</td>
                        <td className="p-4 text-center text-gray-700">{predictions["1x2"].avgGoals}</td>
                        <td className="p-4 text-center text-gray-700">{match.weather}</td>
                        <td className="p-4 text-center text-gray-400">8.50</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* Under/Over 2.5 */}
              {predictionTab === "under/over 2.5" && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-purple-50">
                      <tr>
                        <th className="text-left p-4 text-gray-700 font-semibold">Outcome</th>
                        <th className="text-center p-4 text-gray-700 font-semibold">Probability</th>
                        <th className="text-center p-4 text-gray-700 font-semibold">Prediction</th>
                        <th className="text-center p-4 text-gray-700 font-semibold">Avg Goals</th>
                        <th className="text-center p-4 text-gray-700 font-semibold">Coef</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="p-4 font-medium text-gray-900">Over 2.5</td>
                        <td className="p-4 text-center">
                          <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full font-semibold">
                            {predictions.underOver.over}%
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-bold">
                            Over
                          </span>
                        </td>
                        <td className="p-4 text-center font-semibold text-gray-700">{predictions.underOver.avgGoals}</td>
                        <td className="p-4 text-center font-bold text-purple-600">{predictions.underOver.coef}</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-medium text-gray-900">Under 2.5</td>
                        <td className="p-4 text-center">
                          <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full font-semibold">
                            {predictions.underOver.under}%
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-500 rounded-full font-bold">
                            Under
                          </span>
                        </td>
                        <td className="p-4 text-center text-gray-700">{predictions.underOver.avgGoals}</td>
                        <td className="p-4 text-center text-gray-400">2.10</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* BTTS */}
              {predictionTab === "btts" && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-purple-50">
                      <tr>
                        <th className="text-left p-4 text-gray-700 font-semibold">Both Teams To Score</th>
                        <th className="text-center p-4 text-gray-700 font-semibold">Probability</th>
                        <th className="text-center p-4 text-gray-700 font-semibold">Prediction</th>
                        <th className="text-center p-4 text-gray-700 font-semibold">Coef</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="p-4 font-medium text-gray-900">Yes</td>
                        <td className="p-4 text-center">
                          <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full font-semibold">
                            {predictions.btts.yes}%
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-bold">
                            Yes
                          </span>
                        </td>
                        <td className="p-4 text-center font-bold text-purple-600">{predictions.btts.coef}</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-medium text-gray-900">No</td>
                        <td className="p-4 text-center">
                          <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full font-semibold">
                            {predictions.btts.no}%
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-500 rounded-full font-bold">
                            No
                          </span>
                        </td>
                        <td className="p-4 text-center text-gray-400">2.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Two Column Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Column 1: Head to Head */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Head to Head</h3>
                
                {/* League Filter */}
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                  {["all", "champions league", "europa league", "friendly"].map((league) => (
                    <button
                      key={league}
                      onClick={() => setHeadToHeadLeague(league)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                        headToHeadLeague === league
                          ? "bg-purple-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {league.charAt(0).toUpperCase() + league.slice(1)}
                    </button>
                  ))}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-3 text-gray-700 text-sm font-semibold">Date</th>
                        <th className="text-left p-3 text-gray-700 text-sm font-semibold">League</th>
                        <th className="text-center p-3 text-gray-700 text-sm font-semibold">Score</th>
                        <th className="text-center p-3 text-gray-700 text-sm font-semibold">Venue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {headToHead.map((h2h, i) => (
                        <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="p-3 text-sm text-gray-600">{h2h.date}</td>
                          <td className="p-3 text-sm text-gray-600">{h2h.league}</td>
                          <td className="p-3 text-center">
                            <span className={`font-semibold ${h2h.team1 > h2h.team2 ? 'text-emerald-600' : h2h.team1 < h2h.team2 ? 'text-red-600' : 'text-amber-600'}`}>
                              {h2h.team1} - {h2h.team2}
                            </span>
                          </td>
                          <td className="p-3 text-center text-sm text-gray-600">{h2h.venue}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Summary */}
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-emerald-50 rounded-lg">
                    <div className="text-2xl font-bold text-emerald-600">50%</div>
                    <div className="text-sm text-gray-600">Wins</div>
                  </div>
                  <div className="text-center p-3 bg-amber-50 rounded-lg">
                    <div className="text-2xl font-bold text-amber-600">25%</div>
                    <div className="text-sm text-gray-600">Draws</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">25%</div>
                    <div className="text-sm text-gray-600">Losses</div>
                  </div>
                </div>
              </div>

              {/* Column 2: Match Info */}
              <div className="space-y-6">
                {/* Match Intro */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Match Introduction</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {match.team1.name} hosts {match.team2.name} at {match.venue} in what promises to be an exciting 
                    {match.league} encounter. The home side comes into this match in strong form, sitting {match.team1.position} 
                    in the standings, while the visitors are currently {match.team2.position}. Weather conditions are expected 
                    to be favorable with {match.weather.toLowerCase()}.
                  </p>
                </div>

                {/* Injured & Suspended */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    Injured & Suspended
                  </h3>
                  
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => setTeamStatsTab("team1")}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                        teamStatsTab === "team1"
                          ? "bg-purple-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {match.team1.name}
                    </button>
                    <button
                      onClick={() => setTeamStatsTab("team2")}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                        teamStatsTab === "team2"
                          ? "bg-purple-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {match.team2.name}
                    </button>
                  </div>

                  <div className="space-y-3">
                    {(teamStatsTab === "team1" ? injured.team1 : injured.team2).map((player, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{player.name}</p>
                          <p className="text-sm text-gray-600">{player.reason}</p>
                        </div>
                        <span className="text-xs text-gray-500">{player.return}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Distance */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Straight Line Distance</h3>
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <p className="font-semibold text-gray-900">Belgrade</p>
                      <p className="text-sm text-gray-600">Serbia</p>
                    </div>
                    <div className="flex-1 mx-4 relative">
                      <div className="h-1 bg-purple-200 rounded-full"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 py-1 rounded-full border-2 border-purple-600 font-bold text-purple-600">
                        {match.distance}km
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-gray-900">Paphos</p>
                      <p className="text-sm text-gray-600">Cyprus</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between text-sm text-gray-600">
                    <span>{match.venue}</span>
                    <span>{match.team2.name} Stadium</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Standings */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-purple-600" />
                League Standings
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-purple-50">
                    <tr>
                      <th className="text-left p-3 text-gray-700 font-semibold">Pos</th>
                      <th className="text-left p-3 text-gray-700 font-semibold">Team</th>
                      <th className="text-center p-3 text-gray-700 font-semibold">PTS</th>
                      <th className="text-center p-3 text-gray-700 font-semibold">GP</th>
                      <th className="text-center p-3 text-gray-700 font-semibold">W</th>
                      <th className="text-center p-3 text-gray-700 font-semibold">D</th>
                      <th className="text-center p-3 text-gray-700 font-semibold">L</th>
                      <th className="text-center p-3 text-gray-700 font-semibold">GF</th>
                      <th className="text-center p-3 text-gray-700 font-semibold">GA</th>
                      <th className="text-center p-3 text-gray-700 font-semibold">+/-</th>
                    </tr>
                  </thead>
                  <tbody>
                    {standings.slice(0, 5).map((team) => (
                      <tr 
                        key={team.pos} 
                        className={`border-b border-gray-200 hover:bg-gray-50 ${
                          team.team === match.team1.name || team.team === match.team2.name
                            ? "bg-purple-50 font-semibold"
                            : ""
                        }`}
                      >
                        <td className="p-3 text-gray-900">{team.pos}</td>
                        <td className="p-3 text-gray-900">{team.team}</td>
                        <td className="p-3 text-center font-bold text-purple-600">{team.pts}</td>
                        <td className="p-3 text-center text-gray-600">{team.gp}</td>
                        <td className="p-3 text-center text-gray-600">{team.w}</td>
                        <td className="p-3 text-center text-gray-600">{team.d}</td>
                        <td className="p-3 text-center text-gray-600">{team.l}</td>
                        <td className="p-3 text-center text-gray-600">{team.gf}</td>
                        <td className="p-3 text-center text-gray-600">{team.ga}</td>
                        <td className={`p-3 text-center font-semibold ${
                          team.diff > 0 ? "text-emerald-600" : team.diff < 0 ? "text-red-600" : "text-gray-600"
                        }`}>
                          {team.diff > 0 ? "+" : ""}{team.diff}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="mt-4 w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                View Full Table
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Last 6 Matches */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Activity className="w-6 h-6 text-purple-600" />
                Last 6 Matches
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3 text-gray-700 font-semibold">Date</th>
                      <th className="text-left p-3 text-gray-700 font-semibold">Opponent</th>
                      <th className="text-center p-3 text-gray-700 font-semibold">Score</th>
                      <th className="text-center p-3 text-gray-700 font-semibold">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lastMatches.map((match, i) => (
                      <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="p-3 text-gray-600">{match.date}</td>
                        <td className="p-3 text-gray-900">{match.opponent}</td>
                        <td className="p-3 text-center font-semibold text-gray-700">{match.score}</td>
                        <td className="p-3 text-center">
                          <span className={`inline-block w-8 h-8 rounded-full ${getFormColor(match.result)} text-white font-bold flex items-center justify-center text-sm`}>
                            {match.result}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Home Matches */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Home Matches</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-emerald-50">
                    <tr>
                      <th className="text-left p-3 text-gray-700 font-semibold">Date</th>
                      <th className="text-left p-3 text-gray-700 font-semibold">Opponent</th>
                      <th className="text-center p-3 text-gray-700 font-semibold">Score</th>
                      <th className="text-center p-3 text-gray-700 font-semibold">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lastMatches.slice(0, 3).map((match, i) => (
                      <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="p-3 text-gray-600">{match.date}</td>
                        <td className="p-3 text-gray-900">{match.opponent}</td>
                        <td className="p-3 text-center font-semibold text-gray-700">{match.score}</td>
                        <td className="p-3 text-center">
                          <span className={`inline-block w-8 h-8 rounded-full ${getFormColor(match.result)} text-white font-bold flex items-center justify-center text-sm`}>
                            {match.result}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Away Matches */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Away Matches</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-red-50">
                    <tr>
                      <th className="text-left p-3 text-gray-700 font-semibold">Date</th>
                      <th className="text-left p-3 text-gray-700 font-semibold">Opponent</th>
                      <th className="text-center p-3 text-gray-700 font-semibold">Score</th>
                      <th className="text-center p-3 text-gray-700 font-semibold">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lastMatches.slice(3, 6).map((match, i) => (
                      <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="p-3 text-gray-600">{match.date}</td>
                        <td className="p-3 text-gray-900">{match.opponent}</td>
                        <td className="p-3 text-center font-semibold text-gray-700">{match.score}</td>
                        <td className="p-3 text-center">
                          <span className={`inline-block w-8 h-8 rounded-full ${getFormColor(match.result)} text-white font-bold flex items-center justify-center text-sm`}>
                            {match.result}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Match Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Overall Win Rate</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">68%</div>
                  <p className="text-sm text-gray-600">Home team advantage</p>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Goals Average</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">2.8</div>
                  <p className="text-sm text-gray-600">Goals per match</p>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Clean Sheets</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">45%</div>
                  <p className="text-sm text-gray-600">Matches without conceding</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "preview" && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Match Preview</h2>
            <p className="text-gray-600">Preview content coming soon...</p>
          </div>
        )}

        {activeTab === "match-centre" && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Match Centre</h2>
            <p className="text-gray-600">Live match updates coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}