"use client";

import Image from "next/image";
import Link from "next/link";

interface MatchPageProps {
  params: { id: string };
}

export default function MatchPage({ params }: MatchPageProps) {
  const matchId = params.id;

  // Mock Data (replace later with API)
  const teams = {
    home: { name: "Crvena Zvezda", logo: "/team-1.png" },
    away: { name: "Pafos", logo: "/team-2.png" },
  };

  const predictions = {
    homeWin: 65,
    draw: 20,
    awayWin: 15,
    winner: "Crvena Zvezda",
  };

  const last5Home = [
    { vs: "Team A", score: "3-1", result: "W" },
    { vs: "Team B", score: "2-2", result: "D" },
    { vs: "Team C", score: "1-0", result: "W" },
    { vs: "Team D", score: "0-2", result: "L" },
    { vs: "Team E", score: "2-1", result: "W" },
  ];

  const last5Away = [
    { vs: "Team F", score: "1-1", result: "D" },
    { vs: "Team G", score: "0-3", result: "L" },
    { vs: "Team H", score: "2-0", result: "W" },
    { vs: "Team I", score: "1-2", result: "L" },
    { vs: "Team J", score: "0-0", result: "D" },
  ];

  const next5 = [
    { opponent: "Club X", date: "25 Sep" },
    { opponent: "Club Y", date: "30 Sep" },
    { opponent: "Club Z", date: "5 Oct" },
    { opponent: "Club W", date: "12 Oct" },
    { opponent: "Club V", date: "18 Oct" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-purple-800 rounded-xl p-6 shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-2">Match Preview</h1>
        <div className="flex justify-center items-center gap-6">
          <div className="flex flex-col items-center">
            <Image src={teams.home.logo} alt="home" width={64} height={64} />
            <span className="mt-2 font-semibold">{teams.home.name}</span>
          </div>
          <span className="text-xl font-bold">vs</span>
          <div className="flex flex-col items-center">
            <Image src={teams.away.logo} alt="away" width={64} height={64} />
            <span className="mt-2 font-semibold">{teams.away.name}</span>
          </div>
        </div>
        <p className="mt-3 text-sm text-purple-200">Champions League • 19 Aug 2025</p>
      </div>

      {/* Predictions */}
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <div className="bg-purple-950/60 p-4 rounded-lg shadow">
          <h2 className="font-bold mb-2">Win Probabilities</h2>
          <div className="text-sm">Home Win: {predictions.homeWin}%</div>
          <div className="text-sm">Draw: {predictions.draw}%</div>
          <div className="text-sm">Away Win: {predictions.awayWin}%</div>
        </div>
        <div className="bg-purple-950/60 p-4 rounded-lg shadow md:col-span-2">
          <h2 className="font-bold mb-2">Prediction</h2>
          <p className="text-lg">
            Likely Winner:{" "}
            <span className="font-bold text-purple-300">{predictions.winner}</span>
          </p>
        </div>
      </div>

      {/* Last 5 Matches */}
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div className="bg-purple-950/60 p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Last 5 - {teams.home.name}</h3>
          <ul className="space-y-2">
            {last5Home.map((m, i) => (
              <li key={i} className="flex justify-between text-sm">
                <span>{m.vs}</span>
                <span className="font-bold">{m.score}</span>
                <span
                  className={`${
                    m.result === "W"
                      ? "text-green-400"
                      : m.result === "L"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }`}
                >
                  {m.result}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-purple-950/60 p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Last 5 - {teams.away.name}</h3>
          <ul className="space-y-2">
            {last5Away.map((m, i) => (
              <li key={i} className="flex justify-between text-sm">
                <span>{m.vs}</span>
                <span className="font-bold">{m.score}</span>
                <span
                  className={`${
                    m.result === "W"
                      ? "text-green-400"
                      : m.result === "L"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }`}
                >
                  {m.result}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Next 5 Matches */}
      <div className="mt-6 bg-purple-950/60 p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">Next 5 Matches</h3>
        <ul className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
          {next5.map((m, i) => (
            <li key={i} className="bg-purple-800/40 p-2 rounded text-center">
              <div>{m.opponent}</div>
              <div className="text-xs text-purple-300">{m.date}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
