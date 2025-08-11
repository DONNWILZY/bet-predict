//src\app\premium\MobilePredictionCard.tsx

import React, { useState } from 'react';
import { Star, Users, Shield, Heart, Share2, Bookmark, MoreHorizontal, MapPin, Clock, Eye } from 'lucide-react';
import { Prediction } from '@/lib/premiumTypes';

interface MobilePredictionCardProps extends Prediction {
  onPay: (ticketId: number) => void;
  onUserClick: (predictor: Prediction['predictor']) => void;
}

export default function MobilePredictionCard({ id, predictor, premium, price, games, timestamp, views, likes, confidence, onPay, premiumTicketsViewed, paid, subscriptionId, onUserClick }: MobilePredictionCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showPayMessage, setShowPayMessage] = useState(false);
  
  const correctGames = games.filter(g => g.status === "correct").length;
  const totalGames = games.length;
  const accuracy = totalGames > 0 ? Math.round((correctGames / totalGames) * 100) : 0;

  const timeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "now";
    if (diffInHours < 24) return `${diffInHours}h`;
    return `${Math.floor(diffInHours / 24)}d`;
  };

  const getConfidenceColor = (confidence: number): string => {
    if (confidence >= 80) return "from-green-500 to-emerald-500";
    if (confidence >= 60) return "from-amber-500 to-orange-500";
    return "from-red-500 to-pink-500";
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 overflow-hidden mx-3 sm:mx-0">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src={predictor.avatar} 
                className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-200 cursor-pointer" 
                alt={predictor.name}
                onClick={() => onUserClick(predictor)}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${predictor.name}&background=6366f1&color=fff&size=48`;
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
                <h3 
                  className="font-bold text-slate-800 truncate cursor-pointer hover:text-blue-500"
                  onClick={() => onUserClick(predictor)}
                >
                  {predictor.name}
                </h3>
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

      <div className="space-y-3 px-4">
        {games.map((game, index) => (
          <div key={index} className="border border-slate-200 rounded-xl overflow-hidden">
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
            
            <div className="p-3">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="flex items-center gap-2 flex-1">
                  <img 
                    src={game.logo1} 
                    className="w-8 h-8 rounded" 
                    alt={game.team1}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${game.team1}&background=random&size=32`;
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
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${game.team2}&background=random&size=32`;
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div 
                  className="flex items-center gap-2 relative"
                  onMouseEnter={() => premium && !paid && !subscriptionId && setShowPayMessage(true)}
                  onMouseLeave={() => setShowPayMessage(false)}
                >
                  <span className="text-sm text-slate-600">Tip:</span>
                  <span className={`font-bold text-slate-800 bg-blue-50 px-2 py-1 rounded-full text-sm ${
                    premium && !paid && !subscriptionId ? 'blur-sm select-none' : ''
                  }`}>
                    {premium && !paid && !subscriptionId ? "***" : game.prediction}
                  </span>
                  {premium && !paid && !subscriptionId && showPayMessage && (
                    <div className="absolute left-0 top-full mt-2 bg-black/80 text-white text-xs p-2 rounded-lg z-10">
                      Pay to access games on this ticket
                    </div>
                  )}
                </div>
                
                {game.odds && (
                  <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm font-medium">
                    @{game.odds}
                  </div>
                )}
              </div>

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

        {premium && !paid && !subscriptionId && (
          <div className="p-4">
            <button
              onClick={() => onPay(id)}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Pay to View (₦{price})
            </button>
            <p className="text-xs text-slate-600 mt-2 text-center">Premium Tickets Viewed: {premiumTicketsViewed}/5</p>
          </div>
        )}
      </div>

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