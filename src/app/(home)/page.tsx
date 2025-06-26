"use client";
import { Navbar } from "./navbar";
import { SportsBar } from "./SportsMenu";
import { MatchPredictionsTable } from "./predict";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <SportsBar />
      <main className="flex-1 flex flex-col items-center justify-start py-8">
        <MatchPredictionsTable />
      </main>
    </div>
  );
}