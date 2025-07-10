"use client";

import React, { useState, useEffect } from "react";
import { Star, Users, TrendingUp, Filter, Search, Bell, Menu, X, Shield, Clock, MapPin, Trophy, Eye, Heart, Share2, Download, Home, Bookmark, Settings, User, ChevronDown, MoreHorizontal } from "lucide-react";

// Enhanced dummy data
const dummyPredictions = [
  {
    id: 3,
    timestamp: "2025-07-06T14:30:00Z",
    predictor: { 
      name: "Sara Win", 
      avatar: "/sara.jpg", 
      rating: 4.9, 
      followers: 12400,
      verified: true,
      winStreak: 7
    },
    premium: false,
    price: 0,
    views: 2840,
    likes: 156,
    confidence: 85,
    games: [
      { 
        team1: "Juventus", 
        team2: "Inter", 
        logo1: "/juve.png", 
        logo2: "/inter.png", 
        prediction: "2", 
        odds: "2.40",
        status: "correct", 
        date: "2025-07-08", 
        time: "21:00", 
        stadium: "Allianz Stadium",
        league: "Serie A"
      }
    ]
  },
  {
    id: 1,
    timestamp: "2025-07-07T10:00:00Z",
    predictor: { 
      name: "John Tips", 
      avatar: "/john.jpg", 
      rating: 4.8, 
      followers: 8200,
      verified: false,
      winStreak: 3
    },
    premium: false,
    price: 0,
    views: 1920,
    likes: 89,
    confidence: 78,
    games: [
      { 
        team1: "Man Utd", 
        team2: "Chelsea", 
        logo1: "/manutd.png", 
        logo2: "/chelsea.png", 
        prediction: "1X", 
        odds: "1.85",
        status: "correct", 
        date: "2025-07-10", 
        time: "18:00", 
        stadium: "Old Trafford",
        league: "Premier League"
      },
      { 
        team1: "Madrid", 
        team2: "Barca", 
        logo1: "/rm.png", 
        logo2: "/fcb.png", 
        prediction: "Over 2.5", 
        odds: "1.75",
        status: "wrong", 
        date: "2025-07-12", 
        time: "20:00", 
        stadium: "Santiago Bernabéu",
        league: "La Liga"
      }
    ]
  },
  {
    id: 2,
    timestamp: "2025-07-05T16:45:00Z",
    predictor: { 
      name: "Elite Bets", 
      avatar: "/elite.jpg", 
      rating: 5.0, 
      followers: 25600,
      verified: true,
      winStreak: 12
    },
    premium: true,
    price: 500,
    views: 4580,
    likes: 312,
    confidence: 92,
    games: [
      { 
        team1: "PSG", 
        team2: "Lyon", 
        logo1: "/psg.png", 
        logo2: "/lyon.png", 
        prediction: "GG", 
        odds: "1.90",
        status: null, 
        date: "2025-07-11", 
        time: "19:30", 
        stadium: "Parc des Princes",
        league: "Ligue 1"
      }
    ]
  }
];

// Bottom Navigation for Mobile
function BottomNavigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'feed', icon: Home, label: 'Feed' },
    { id: 'following', icon: Users, label: 'Following' },
    { id: 'saved', icon: Bookmark, label: 'Saved' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 md:hidden">
      <div className="flex">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center py-2 px-1 transition-colors ${
                activeTab === tab.id 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs mt-1 font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Floating Action Button for Mobile
function FloatingActionButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-4 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg flex items-center justify-center z-40 md:hidden hover:shadow-xl transition-all"
    >
      <Filter size={24} />
    </button>
  );
}

// Modern Sidebar Component
function ModernSidebar({ isOpen, onClose }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [showStats, setShowStats] = useState(false);
  
  const filters = [
    { id: "all", label: "All Predictions", icon: TrendingUp, count: 247 },
    { id: "newest", label: "Latest", icon: Clock, count: 45 },
    { id: "top-rated", label: "Top Rated", icon: Trophy, count: 89 },
    { id: "premium", label: "Premium", icon: Shield, count: 23 },
    { id: "following", label: "Following", icon: Users, count: 12 }
  ];

  const quickStats = [
    { label: "Win Rate", value: "78%", color: "text-green-600" },
    { label: "Avg Odds", value: "2.3", color: "text-blue-600" },
    { label: "This Week", value: "+12", color: "text-purple-600" }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed md:relative top-0 left-0 h-full w-full max-w-xs md:max-w-none md:w-80 
        bg-white/95 backdrop-blur-xl shadow-2xl z-50 border-r border-slate-200/50
        transform transition-all duration-300 ease-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Header */}
        <div className="p-4 border-b border-slate-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Trophy size={16} className="text-white" />
              </div>
              <h2 className="text-lg font-bold text-slate-800">Bet-Prediction</h2>
            </div>
            <button 
              onClick={onClose}
              className="md:hidden p-2 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search tips..."
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="p-4 border-b border-slate-200/50">
          <button
            onClick={() => setShowStats(!showStats)}
            className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl hover:from-blue-50 hover:to-purple-50 transition-all"
          >
            <span className="text-sm font-medium text-slate-700">Quick Stats</span>
            <ChevronDown size={16} className={`transform transition-transform ${showStats ? 'rotate-180' : ''}`} />
          </button>
          
          {showStats && (
            <div className="mt-3 grid grid-cols-3 gap-2">
              {quickStats.map((stat, index) => (
                <div key={index} className="text-center p-2 bg-white rounded-lg border border-slate-200/50">
                  <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {filters.map(filter => {
            const Icon = filter.icon;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`
                  w-full flex items-center justify-between p-3 rounded-xl text-left transition-all group
                  ${activeFilter === filter.id 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} />
                  <span className="font-medium">{filter.label}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  activeFilter === filter.id 
                    ? 'bg-white/20 text-white' 
                    : 'bg-slate-200 text-slate-500'
                }`}>
                  {filter.count}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200/50">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <User size={18} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-slate-800">John Doe</div>
              <div className="text-sm text-slate-500">Premium Member</div>
            </div>
            <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
              <Settings size={16} className="text-slate-500" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

// Enhanced Mobile-First Prediction Card
function MobilePredictionCard({ predictor, premium, price, games, timestamp, views, likes, confidence }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showMore, setShowMore] = useState(false);
  
  const correctGames = games.filter(g => g.status === "correct").length;
  const totalGames = games.length;
  const accuracy = totalGames > 0 ? Math.round((correctGames / totalGames) * 100) : 0;

  const timeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now - time) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "now";
    if (diffInHours < 24) return `${diffInHours}h`;
    return `${Math.floor(diffInHours / 24)}d`;
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return "from-green-500 to-emerald-500";
    if (confidence >= 60) return "from-amber-500 to-orange-500";
    return "from-red-500 to-pink-500";
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 overflow-hidden mx-3 sm:mx-0">
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src={predictor.avatar} 
                className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-200" 
                alt={predictor.name}
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${predictor.name}&background=6366f1&color=fff&size=48`;
                }}
              />
              {predictor.verified && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                  <Shield size={10} className="text-white" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-slate-800 truncate">{predictor.name}</h3>
                {predictor.winStreak > 5 && (
                  <span className="bg-orange-100 text-orange-600 text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap">
                    🔥{predictor.winStreak}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-yellow-500 fill-current" />
                  <span className="font-medium text-slate-700">{predictor.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={12} className="text-slate-400" />
                  <span className="text-slate-600">{(predictor.followers / 1000).toFixed(1)}k</span>
                </div>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500">{timeAgo(timestamp)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {premium && (
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                ₦{price}
              </div>
            )}
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                isFollowing 
                  ? 'bg-slate-100 text-slate-700' 
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>
        </div>

        {/* Confidence Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Confidence</span>
            <span className="text-sm font-bold text-slate-800">{confidence}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full bg-gradient-to-r ${getConfidenceColor(confidence)}`}
              style={{ width: `${confidence}%` }}
            />
          </div>
        </div>
      </div>

      {/* Games */}
      <div className="space-y-3 px-4">
        {games.map((game, index) => (
          <div key={index} className="border border-slate-200 rounded-xl overflow-hidden">
            {/* Game Header */}
            <div className="bg-slate-50 px-3 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-700 bg-white px-2 py-1 rounded-full">
                  {game.league}
                </span>
                <span className="text-xs text-slate-500">{game.date}</span>
              </div>
              {game.status && (
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  game.status === "correct" ? "bg-green-500" : "bg-red-500"
                }`}>
                  <span className="text-white text-xs font-bold">
                    {game.status === "correct" ? "✓" : "✗"}
                  </span>
                </div>
              )}
            </div>
            
            {/* Game Content */}
            <div className="p-3">
              {/* Teams */}
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="flex items-center gap-2 flex-1">
                  <img 
                    src={game.logo1} 
                    className="w-8 h-8 rounded" 
                    alt={game.team1}
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${game.team1}&background=random&size=32`;
                    }}
                  />
                  <span className="font-semibold text-slate-800 text-sm truncate">{game.team1}</span>
                </div>
                
                <div className="px-3 py-1 bg-slate-100 rounded-full">
                  <span className="text-slate-600 font-medium text-sm">VS</span>
                </div>
                
                <div className="flex items-center gap-2 flex-1 justify-end">
                  <span className="font-semibold text-slate-800 text-sm truncate">{game.team2}</span>
                  <img 
                    src={game.logo2} 
                    className="w-8 h-8 rounded" 
                    alt={game.team2}
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${game.team2}&background=random&size=32`;
                    }}
                  />
                </div>
              </div>

              {/* Prediction & Odds */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">Tip:</span>
                  <span className="font-bold text-slate-800 bg-blue-50 px-2 py-1 rounded-full text-sm">
                    {premium && !showMore ? "***" : game.prediction}
                  </span>
                </div>
                
                {game.odds && (
                  <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm font-medium">
                    @{game.odds}
                  </div>
                )}
              </div>

              {/* Game Details */}
              {showMore && (
                <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <MapPin size={12} />
                    <span className="truncate">{game.stadium}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{game.time}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-100 bg-slate-50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4 text-sm">
            <span className="text-slate-600">
              Win Rate: <span className="font-bold text-green-600">{accuracy}%</span>
            </span>
            <span className="text-slate-600">
              Games: <span className="font-bold">{totalGames}</span>
            </span>
          </div>
          
          <button 
            onClick={() => setShowMore(!showMore)}
            className="text-blue-500 text-sm font-medium"
          >
            {showMore ? 'Less' : 'More'}
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button className="flex items-center gap-1 px-2 py-1 hover:bg-slate-100 rounded-lg transition-colors">
              <Eye size={14} className="text-slate-500" />
              <span className="text-sm text-slate-600">{(views / 1000).toFixed(1)}k</span>
            </button>
            
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-colors ${
                isLiked ? 'bg-red-50 text-red-600' : 'hover:bg-slate-100'
              }`}
            >
              <Heart size={14} className={isLiked ? 'fill-current text-red-500' : 'text-slate-500'} />
              <span className="text-sm">{likes + (isLiked ? 1 : 0)}</span>
            </button>
          </div>
          
          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <Share2 size={14} className="text-slate-500" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <Bookmark size={14} className="text-slate-500" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <MoreHorizontal size={14} className="text-slate-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Feed Component
function ResponsivePredictionFeed() {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFeed(dummyPredictions);
      setLoading(false);
    }, 1000);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="space-y-4 pb-20 md:pb-0">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200 p-4 mx-3 sm:mx-0 animate-pulse">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="w-32 h-4 bg-slate-200 rounded"></div>
                <div className="w-24 h-3 bg-slate-200 rounded"></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="w-full h-16 bg-slate-100 rounded-xl"></div>
              <div className="w-3/4 h-4 bg-slate-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-20 md:pb-6">
      {/* Pull to refresh indicator */}
      {refreshing && (
        <div className="flex justify-center py-4">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Feed */}
      {feed.map(pred => (
        <MobilePredictionCard key={pred.id} {...pred} />
      ))}

      {/* Load more */}
      <div className="flex justify-center py-6">
        <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium hover:shadow-lg transition-all">
          Load More Tips
        </button>
      </div>
    </div>
  );
}

// Main App Component
export default function AdvancedMobilePredictionApp() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('feed');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar - Hidden on mobile except when opened */}
        <div className="hidden md:block">
          <ModernSidebar isOpen={true} onClose={() => {}} />
        </div>
        
        {/* Mobile Sidebar */}
        <div className="md:hidden">
          <ModernSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </div>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Top Bar - Mobile */}
          <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-slate-200/50 md:hidden">
            <div className="flex items-center justify-between px-4 py-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <Menu size={20} />
              </button>
              
              <h1 className="font-bold text-lg text-slate-800">BetTips</h1>
              
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-slate-100 rounded-xl relative">
                  <Bell size={20} className="text-slate-600" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:block sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-slate-200/50">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">Prediction Feed</h1>
                  <p className="text-slate-600 mt-1">Latest betting tips from top predictors</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
                    Create Tip
                  </button>
                  <button className="p-2 hover:bg-slate-100 rounded-xl relative">
                    <Bell size={20} className="text-slate-600" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="md:p-6">
            <ResponsivePredictionFeed />
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Floating Action Button */}
      <FloatingActionButton onClick={() => setSidebarOpen(true)} />
    </div>
  );
}