import React from 'react';
import { Clock, Trophy, Calendar } from 'lucide-react';
import { dummyQuickScores, dummyResults, dummyFixtures, dummyHighlights } from '@/lib/premiumPredictionData';

export default function RightSidebar() {
  return (
    <aside className="h-full bg-white/95 backdrop-blur-xl border-l border-slate-200/50 p-4 overflow-y-auto">
      <div className="space-y-6">
        {/* Quick Scores */}
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-3">Quick Scores</h3>
          <div className="space-y-3">
            {dummyQuickScores.map(score => (
              <div key={score.id} className="bg-slate-50 rounded-xl p-3 border border-slate-200/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-700">{score.team1} vs {score.team2}</span>
                  </div>
                  <span className="text-sm font-bold text-blue-600">{score.score}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 mt-1">
                  <span>{score.league}</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {score.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-3">Today's Results</h3>
          <div className="space-y-3">
            {dummyResults.map(result => (
              <div key={result.id} className="bg-slate-50 rounded-xl p-3 border border-slate-200/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">{result.team1} vs {result.team2}</span>
                  <span className="text-sm font-bold text-green-600">{result.score}</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">{result.league} • {result.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Fixtures */}
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-3">Upcoming Fixtures</h3>
          <div className="space-y-3">
            {dummyFixtures.map(fixture => (
              <div key={fixture.id} className="bg-slate-50 rounded-xl p-3 border border-slate-200/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">{fixture.team1} vs {fixture.team2}</span>
                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    <Calendar size={12} />
                    {fixture.time}
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-1">{fixture.league} • {fixture.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-3">Highlights</h3>
          <div className="space-y-3">
            {dummyHighlights.map(highlight => (
              <div key={highlight.id} className="bg-slate-50 rounded-xl p-3 border border-slate-200/50">
                <p className="text-sm font-medium text-slate-700">{highlight.title}</p>
                <p className="text-xs text-slate-500 mt-1">{highlight.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}