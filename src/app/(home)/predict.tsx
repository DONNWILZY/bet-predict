"use client";
import { Circle } from "lucide-react";

// Example data (replace with real data or fetch from API)
const matches = [
  {
    id: 1,
    category: "Football",
    flagA: "🇫🇷",
    teamA: "France",
    flagB: "🇩🇪",
    teamB: "Germany",
    oddsA: 2.1,
    oddsB: 3.4,
    prediction: "A", // "A" or "B"
    result: "A",     // "A" (correct), "B" (wrong), or null (pending)
  },
  {
    id: 2,
    category: "Football",
    flagA: "🇧🇷",
    teamA: "Brazil",
    flagB: "🇦🇷",
    teamB: "Argentina",
    oddsA: 1.8,
    oddsB: 2.9,
    prediction: "B",
    result: "A",
  },
];

export function MatchPredictionsTable() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-12 bg-white rounded-2xl shadow-2xl overflow-x-auto border border-gray-100">
      <table className="w-full text-left font-sans">
        <thead>
          <tr className="bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-700 border-b border-gray-200">
            <th className="py-4 px-4 font-semibold text-sm uppercase tracking-wide">#</th>
            <th className="py-4 px-4 font-semibold text-sm uppercase tracking-wide">Category</th>
            <th className="py-4 px-4 font-semibold text-sm uppercase tracking-wide">Teams</th>
            <th className="py-4 px-4 font-semibold text-sm uppercase tracking-wide">Odds</th>
            <th className="py-4 px-4 font-semibold text-sm uppercase tracking-wide">Prediction</th>
            <th className="py-4 px-4 font-semibold text-sm uppercase tracking-wide">Result</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match, idx) => (
            <tr
              key={match.id}
              className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-300"
            >
              <td className="py-3 px-4 text-gray-600 font-medium">{idx + 1}</td>
              <td className="py-3 px-4 text-gray-600">{match.category}</td>
              <td className="py-3 px-4 flex items-center gap-3">
                <span className="text-2xl transform hover:scale-110 transition-transform">{match.flagA}</span>
                <span className="font-medium text-gray-800">{match.teamA}</span>
                <span className="mx-2 text-gray-400 font-light">vs</span>
                <span className="text-2xl transform hover:scale-110 transition-transform">{match.flagB}</span>
                <span className="font-medium text-gray-800">{match.teamB}</span>
              </td>
              <td className="py-3 px-4">
                <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mr-2 hover:bg-blue-200 transition-colors">
                  {match.oddsA}
                </span>
                <span className="text-gray-400 mx-1">/</span>
                <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
                  {match.oddsB}
                </span>
              </td>
              <td className="py-3 px-4">
                <span className="font-semibold text-indigo-600">
                  {match.prediction === "A" ? match.teamA : match.teamB}
                </span>
              </td>
              <td className="py-3 px-4">
                {match.result ? (
                  <Circle
                    className={`w-5 h-5 transform hover:scale-125 transition-transform ${
                      match.prediction === match.result ? "text-green-600" : "text-red-600"
                    }`}
                    fill={match.prediction === match.result ? "#10b981" : "#dc2626"}
                  />
                ) : (
                  <Circle className="w-5 h-5 text-gray-300 transform hover:scale-125 transition-transform" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}