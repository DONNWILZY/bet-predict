import React, { useState } from 'react';
import { Shield, Star, Users, Trophy, Percent, Ticket, Eye, Heart, Share2, Calendar, Clock, TrendingUp, Award, CheckCircle, XCircle, AlertCircle, Filter, Grid, List } from 'lucide-react';
import MobilePredictionCard from './MobilePredictionCard';
import { User, Prediction } from '@/lib/premiumTypes';

interface UserProfileProps {
  user: User;
  predictions: Prediction[];
  onPay: (ticketId: number) => void;
}

export default function EnhancedUserProfile({ user, predictions, onPay }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState<'predictions' | 'tickets'>('predictions');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'won' | 'lost'>('all');

  const activePredictions = predictions.filter(p => p.games.some(g => !g.status));
  
  const filteredPredictions = predictions.filter(p => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'active') return p.games.some(g => !g.status);
    if (filterStatus === 'won') return p.games.every(g => g.status === 'correct');
    if (filterStatus === 'lost') return p.games.some(g => g.status === 'wrong');
    return true;
  });

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'won': case 'correct': return <CheckCircle size={16} className="text-green-500" />;
      case 'lost': case 'wrong': return <XCircle size={16} className="text-red-500" />;
      case 'active': case 'pending': return <AlertCircle size={16} className="text-amber-500" />;
      default: return <Clock size={16} className="text-slate-400" />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 min-h-screen">
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        
        {/* Enhanced Profile Header */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/50 overflow-hidden mb-6">
          {/* Cover Background */}
          <div className="h-32 md:h-48 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-end gap-4">
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-20 h-20 md:w-32 md:h-32 rounded-2xl object-cover ring-4 ring-white shadow-xl"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${user.username}&background=6366f1&color=fff&size=128`;
                    }}
                  />
                  {user.isCreator && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center ring-2 ring-white">
                      <Shield size={16} className="text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 text-white mb-2">
                  <h1 className="text-2xl md:text-4xl font-bold mb-1">{user.username}</h1>
                  {user.isCreator && user.creatorStats && (
                    <div className="flex items-center gap-4 text-sm md:text-base opacity-90">
                      <div className="flex items-center gap-1">
                        <Star size={16} className="fill-current text-yellow-400" />
                        <span>{user.creatorStats.rating.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={16} />
                        <span>{user.creatorStats.reviews} reviews</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Trophy size={16} />
                        <span>{user.creatorStats.accuracy}% accuracy</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-slate-700 mb-4">{user.bio || 'Professional sports analyst and betting expert.'}</p>
                <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                  <Calendar size={16} />
                  <span>Active Creator</span>
                </div>
                {user.contact && (
                  <div className="flex items-center gap-2 text-sm text-blue-600">
                    <span>Contact: {user.contact}</span>
                  </div>
                )}
              </div>

              {/* Creator Stats Grid */}
              {user.isCreator && user.creatorStats && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-2xl border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy size={20} className="text-green-600" />
                      <span className="text-sm font-medium text-green-700">Total Wins</span>
                    </div>
                    <div className="text-2xl font-bold text-green-800">{user.creatorStats.totalWins}</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-2xl border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Ticket size={20} className="text-blue-600" />
                      <span className="text-sm font-medium text-blue-700">Total Tickets</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-800">{user.creatorStats.totalTickets}</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-2xl border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Users size={20} className="text-purple-600" />
                      <span className="text-sm font-medium text-purple-700">Reviews</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-800">{user.creatorStats.reviews}</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-2xl border border-amber-200">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp size={20} className="text-amber-600" />
                      <span className="text-sm font-medium text-amber-700">Active</span>
                    </div>
                    <div className="text-2xl font-bold text-amber-800">{user.creatorStats.activeTickets}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 p-2 mb-6">
          <div className="flex">
            <button
              onClick={() => setActiveTab('predictions')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
                activeTab === 'predictions'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <TrendingUp size={18} />
              <span>My Predictions</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                activeTab === 'predictions' 
                  ? 'bg-white/20 text-white' 
                  : 'bg-slate-200 text-slate-600'
              }`}>
                {predictions.length}
              </span>
            </button>
            
            <button
              onClick={() => setActiveTab('tickets')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
                activeTab === 'tickets'
                  ? 'bg-purple-500 text-white shadow-lg'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Ticket size={18} />
              <span>Active Tickets</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                activeTab === 'tickets' 
                  ? 'bg-white/20 text-white' 
                  : 'bg-slate-200 text-slate-600'
              }`}>
                {activePredictions.length}
              </span>
            </button>
          </div>
        </div>

        {/* Filters & View Controls */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-slate-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="won">Won</option>
                <option value="lost">Lost</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                <List size={18} />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                <Grid size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="space-y-6">
          {activeTab === 'predictions' ? (
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <TrendingUp size={20} className="text-blue-500" />
                My Predictions Timeline
              </h2>
              
              <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 gap-6' : 'space-y-6'}>
                {filteredPredictions.length > 0 ? (
                  filteredPredictions.map(prediction => (
                    <div key={prediction.id} className="relative">
                      <MobilePredictionCard
                        {...prediction}
                        onPay={onPay}
                        onUserClick={(predictor) => {
                          // Handle user click if needed
                          console.log('User clicked:', predictor);
                        }}
                      />
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-slate-500 col-span-full">
                    <TrendingUp size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">No predictions found</p>
                    <p className="text-sm">Try adjusting your filters or create your first prediction</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Active Tickets */
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Ticket size={20} className="text-purple-500" />
                Active Tickets
              </h2>
              
              <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {activePredictions.length > 0 ? (
                  activePredictions.map(prediction => (
                    <div key={prediction.id} className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border border-slate-200/50 overflow-hidden hover:shadow-lg transition-all">
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={prediction.predictor.avatar}
                              alt={prediction.predictor.name}
                              className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${prediction.predictor.name}&background=random&size=48`;
                              }}
                            />
                            <div>
                              <h3 className="font-bold text-slate-800 text-sm">{prediction.predictor.name}</h3>
                              <div className="flex items-center gap-1">
                                <Star size={12} className="text-yellow-500 fill-current" />
                                <span className="text-xs text-slate-600">{prediction.predictor.rating}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-amber-100 text-amber-700 border border-amber-200 px-2 py-1 rounded-full text-xs font-medium">
                            <div className="flex items-center gap-1">
                              <AlertCircle size={12} />
                              <span>Active</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {prediction.premium && (
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-600">Ticket Price:</span>
                              <span className="font-bold text-purple-600">₦{prediction.price}</span>
                            </div>
                          )}
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Games:</span>
                            <span className="font-medium">{prediction.games.length}</span>
                          </div>
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Confidence:</span>
                            <span className="font-bold text-blue-600">{prediction.confidence}%</span>
                          </div>

                          <div className="pt-3 border-t border-slate-200">
                            <div className="flex items-center justify-between text-xs text-slate-500">
                              <span>Date: {new Date(prediction.timestamp).toLocaleDateString()}</span>
                              <button 
                                onClick={() => onPay(prediction.id)}
                                className="text-blue-500 hover:text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded"
                              >
                                View Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-slate-500 col-span-full">
                    <Ticket size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">No active tickets</p>
                    <p className="text-sm">Your active prediction tickets will appear here</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}