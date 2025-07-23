"use client";
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Calendar, Trophy, Bell, Clock, TrendingUp, Circle } from 'lucide-react';
import { matches, predictionTypes, timeFrames, leagues } from '@/lib/HomepredictData';
import { Match } from '@/lib/predictYtype';

// Define possible section keys
type Section = 'nigerian' | 'timeFrames' | 'leagues';

// Define content keys based on getFilteredMatches and getContentTitle
type ContentKey =
  | 'default'
  | 'today'
  | 'tomorrow'
  | 'yesterday'
  | 'live'
  | 'nigerian'
  | 'weekend'
  | 'all'
  | 'top'
  | `league-${string}`;

// Define types for state
type ExpandedSections = Record<Section, boolean>;

export function MatchPredictionsTable() {
  const [selectedContent, setSelectedContent] = useState<ContentKey>('default');
  const [selectedPredictionType, setSelectedPredictionType] = useState<string>('Predictions 1X2');
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    nigerian: true,
    timeFrames: true,
    leagues: false,
  });

  const toggleSection = (section: Section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleContentChange = (contentKey: ContentKey, predictionType: string = 'Predictions 1X2') => {
    setSelectedContent(contentKey);
    setSelectedPredictionType(predictionType);
  };

  const getFilteredMatches = (): Match[] => {
    if (selectedContent === 'default') {
      return matches;
    }

    switch (selectedContent) {
      case 'today':
        return matches.filter((match) => match.date === 'Today');
      case 'tomorrow':
        return matches.filter((match) => match.date === 'Tomorrow');
      case 'yesterday':
        return matches.filter((match) => match.date === 'Yesterday');
      case 'live':
        return matches.filter((match) => match.result === null);
      case 'nigerian':
        return matches.filter((match) => match.category === 'Nigerian League');
      default:
        if (selectedContent.startsWith('league-')) {
          const leagueName = selectedContent.replace('league-', '').replace(/-/g, ' ');
          return matches.filter((match) => match.category.toLowerCase() === leagueName.toLowerCase());
        }
        return matches;
    }
  };

  const getContentTitle = (): string => {
    if (selectedContent === 'default') {
      return 'All Predictions';
    }

    switch (selectedContent) {
      case 'today':
        return "Today's Predictions";
      case 'tomorrow':
        return "Tomorrow's Predictions";
      case 'yesterday':
        return "Yesterday's Predictions";
      case 'live':
        return 'Live Predictions';
      case 'weekend':
        return 'Weekend Predictions';
      case 'all':
        return 'All Predictions';
      case 'top':
        return 'Top Predictions';
      case 'nigerian':
        return 'Nigerian League';
      default:
        if (selectedContent.startsWith('league-')) {
          return selectedContent
            .replace('league-', '')
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (l) => l.toUpperCase());
        }
        return 'Predictions';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Blue Theme */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-xl p-6 sticky top-6 text-white">
              <h2 className="text-lg font-bold mb-4 flex items-center">
                <Trophy className="w-5 h-5 mr-2" />
                Predictions Menu
              </h2>

              {/* Nigerian League Section */}
              <div className="mb-6">
                <button
                  onClick={() => toggleSection('nigerian')}
                  className="flex items-center justify-between w-full text-left font-semibold hover:text-blue-200 transition-colors"
                >
                  Nigerian League
                  {expandedSections.nigerian ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>

                {expandedSections.nigerian && (
                  <div className="mt-3 ml-4 space-y-2">
                    {predictionTypes.map((type, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleContentChange('nigerian', type)}
                        className={`block w-full text-left text-sm py-2 px-3 rounded-lg transition-all ${
                          selectedContent === 'nigerian' && selectedPredictionType === type
                            ? 'bg-blue-500 text-white font-medium'
                            : 'text-blue-100 hover:bg-blue-700'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Time Frames Section */}
              <div className="mb-6">
                <button
                  onClick={() => toggleSection('timeFrames')}
                  className="flex items-center justify-between w-full text-left font-semibold hover:text-blue-200 transition-colors"
                >
                  Time Frames
                  {expandedSections.timeFrames ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>

                {expandedSections.timeFrames && (
                  <div className="mt-3 ml-4 space-y-2">
                    {timeFrames.map((timeFrame, idx) => (
                      <div key={idx}>
                        <button
                          onClick={() => handleContentChange(timeFrame.key)}
                          className={`block w-full text-left text-sm py-2 px-3 rounded-lg transition-all ${
                            selectedContent === timeFrame.key
                              ? 'bg-blue-500 text-white font-medium'
                              : 'text-blue-100 hover:bg-blue-700'
                          }`}
                        >
                          {timeFrame.label}
                        </button>
                        {selectedContent === timeFrame.key && (
                          <div className="mt-2 ml-4 space-y-1">
                            {predictionTypes.map((type, typeIdx) => (
                              <button
                                key={typeIdx}
                                onClick={() => handleContentChange(timeFrame.key, type)}
                                className={`block w-full text-left text-xs py-1 px-2 rounded transition-all ${
                                  selectedPredictionType === type
                                    ? 'bg-blue-400 text-white'
                                    : 'text-blue-200 hover:bg-blue-700'
                                }`}
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Leagues Section */}
              <div>
                <button
                  onClick={() => toggleSection('leagues')}
                  className="flex items-center justify-between w-full text-left font-semibold hover:text-blue-200 transition-colors"
                >
                  Leagues & Regions
                  {expandedSections.leagues ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>

                {expandedSections.leagues && (
                  <div className="mt-3 ml-4 space-y-3">
                    {leagues.map((country, idx) => (
                      <div key={idx}>
                        <h4 className="font-medium text-blue-200 text-sm">{country.country}</h4>
                        <div className="ml-2 space-y-1">
                          {country.leagues.map((league: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, leagueIdx: React.Key | null | undefined) => (
                            <button
                              key={leagueIdx}
                              onClick={() => {
                                if (typeof league === 'string' && league) {
                                  handleContentChange(`league-${league.toLowerCase().replace(/\s+/g, '-')}`);
                                }
                              }}
                              className="block w-full text-left text-xs py-1 px-2 rounded text-blue-100 hover:bg-blue-700 transition-colors"
                            >
                              {league}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6">
            <div className="w-full bg-white rounded-2xl shadow-2xl overflow-x-auto border border-gray-100">
              {/* Content Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                <h2 className="text-xl font-bold flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  {getContentTitle()}
                </h2>
                <p className="text-blue-100 mt-1">Type: {selectedPredictionType}</p>
              </div>

              {/* Predictions Table */}
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
                  {getFilteredMatches().map((match, idx) => (
                    <tr
                      key={match.id}
                      className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-300"
                    >
                      <td className="py-3 px-4 text-gray-600 font-medium">{idx + 1}</td>
                      <td className="py-3 px-4 text-gray-600">{match.category}</td>
                      <td className="py-3 px-4 flex items-center gap-3">
                        <span className="text-2xl transform hover:scale-110 transition-transform">
                          {match.flagA}
                        </span>
                        <span className="font-medium text-gray-800">{match.teamA}</span>
                        <span className="mx-2 text-gray-400 font-light">vs</span>
                        <span className="text-2xl transform hover:scale-110 transition-transform">
                          {match.flagB}
                        </span>
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
                          {match.prediction === 'A' ? match.teamA : match.teamB}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {match.result ? (
                          <Circle
                            className={`w-5 h-5 transform hover:scale-125 transition-transform ${
                              match.prediction === match.result ? 'text-green-600' : 'text-red-600'
                            }`}
                            fill={match.prediction === match.result ? '#10b981' : '#dc2626'}
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
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Calendar Widget */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                  Calendar
                </h3>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">July 2025</div>
                  <div className="grid grid-cols-7 gap-1 mt-4 text-xs">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                      <div key={`${day}-${index}`} className="p-2 text-center font-medium text-gray-600">
                        {day}
                      </div>
                    ))}
                    {Array.from({ length: 31 }, (_, i) => (
                      <div
                        key={i + 1}
                        className={`p-2 text-center cursor-pointer rounded ${
                          i + 1 === 4 ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
                        }`}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Featured Leagues */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Trophy className="w-5 h-5 text-blue-600 mr-2" />
                  Featured Leagues
                </h3>
                <div className="space-y-3">
                  {['Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'Ligue 1'].map((league, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                    >
                      <span className="font-medium text-gray-800">{league}</span>
                      <span className="text-sm text-gray-500">12 matches</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Season Results */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                  Success Rate
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Today</span>
                    <span className="font-bold text-green-600">78%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">This Week</span>
                    <span className="font-bold text-green-600">72%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">This Month</span>
                    <span className="font-bold text-blue-600">69%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Overall</span>
                    <span className="font-bold text-blue-600">71%</span>
                  </div>
                </div>
              </div>

              {/* News Updates */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Bell className="w-5 h-5 text-blue-600 mr-2" />
                  Latest Updates
                </h3>
                <div className="space-y-3">
                  {[
                    { title: 'New prediction algorithm launched', time: '2 hours ago' },
                    { title: 'Weekend predictions now available', time: '5 hours ago' },
                    { title: 'Nigerian League coverage expanded', time: '1 day ago' },
                  ].map((update, idx) => (
                    <div key={idx} className="border-l-4 border-blue-500 pl-4 py-2">
                      <div className="text-sm font-medium text-gray-800">{update.title}</div>
                      <div className="text-xs text-gray-500">{update.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}