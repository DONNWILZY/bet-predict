//D:\desktop\NEXTJS\xx\my-app\src\app\premium\leftSidebar.tsx
 
import React, { useState } from 'react';
import { Search, Trophy, Clock, Users, Shield, ChevronDown, User, Settings, X } from 'lucide-react';
import { ModernSidebarProps } from '@/lib/premiumTypes';

interface LeftSidebarProps extends ModernSidebarProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function LeftSidebar({ isOpen, onClose, activeFilter, setActiveFilter, searchQuery, setSearchQuery }: LeftSidebarProps) {
  const [showStats, setShowStats] = useState(false);
  
  const filters = [
    { id: "all", label: "All Predictions", icon: Trophy, count: 247 },
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

  const handleFilterClick = (filterId: string) => {
    setActiveFilter(filterId);
    setSearchQuery('');
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`
        fixed md:relative top-0 left-0 h-full w-full max-w-xs md:max-w-none md:w-80 
        bg-white/95 backdrop-blur-xl shadow-2xl z-50 border-r border-slate-200/50
        transform transition-all duration-300 ease-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
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

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tips..."
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

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

        <nav className="flex-1 p-4 space-y-1">
          {filters.map(filter => {
            const Icon = filter.icon;
            return (
              <button
                key={filter.id}
                onClick={() => handleFilterClick(filter.id)}
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