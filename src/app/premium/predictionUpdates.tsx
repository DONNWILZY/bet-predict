// src/app/premium/predictionUpdates.tsx

import React, { useState, useEffect } from 'react';
import { Prediction } from '@/lib/premiumTypes';
import { dummyPredictions } from '@/lib/premiumPredictionData';
import MobilePredictionCard from './MobilePredictionCard';

interface PredictionUpdatesProps {
  activeTab: string;
  activeFilter: string;
  setPredictions: React.Dispatch<React.SetStateAction<Prediction[]>>;
  searchQuery?: string;
  isSubscribed: boolean;
  premiumTicketsViewed: number;
  onPay: (ticketId: number) => void;
}

export default function PredictionUpdates({ activeTab, activeFilter, setPredictions, searchQuery = '', isSubscribed, premiumTicketsViewed, onPay }: PredictionUpdatesProps) {
  const [feed, setFeed] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const hasPaid = false;

  const dummyFollowing = [
    { name: "Sara Win", avatar: "/sara.jpg", rating: 4.9, followers: 12400, verified: true, winStreak: 7 },
    { name: "Elite Bets", avatar: "/elite.jpg", rating: 5.0, followers: 25600, verified: true, winStreak: 12 },
    { name: "John Tips", avatar: "/john.jpg", rating: 4.8, followers: 8200, verified: false, winStreak: 3 }
  ];

  const dummySavedPredictions: Prediction[] = [
  {
    id: 4,
    timestamp: "2025-07-08T12:00:00Z",
    predictor: { 
      name: "Saved Tip", 
      avatar: "/saved.jpg", 
      rating: 4.7, 
      followers: 5000,
      verified: true,
      winStreak: 5
    },
    premium: false,
    price: 0,
    views: 1500,
    likes: 200,
    confidence: 80,
    games: [
      { 
        team1: "Tottenham", 
        team2: "Arsenal", 
        logo1: "/tottenham.png", 
        logo2: "/arsenal.png", 
        prediction: "1", 
        odds: "2.10",
        status: "correct", 
        date: "2025-07-09", 
        time: "15:00", 
        stadium: "Tottenham Hotspur Stadium",
        league: "Premier League"
      }
    ],
    premiumTicketsViewed: 0,
    paid: false,
    subscriptionId: null,
    isSubscribed: false,   // <-- Added
    onPay: function (ticketId: number): void {  // <-- Added
      throw new Error('Function not implemented.');
    }
  }
];


  useEffect(() => {
    setTimeout(() => {
      let filteredPredictions = dummyPredictions.map(pred => ({
        ...pred,
        paid: pred.paid ?? false,
        subscriptionId: pred.subscriptionId ?? null
      }));
      
      if (searchQuery) {
        filteredPredictions = filteredPredictions.filter(pred =>
          pred.predictor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pred.games.some(game =>
            game.team1.toLowerCase().includes(searchQuery.toLowerCase()) ||
            game.team2.toLowerCase().includes(searchQuery.toLowerCase()) ||
            game.league.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      }

      if (activeTab === 'following') {
        filteredPredictions = [];
      } else if (activeTab === 'saved') {
        filteredPredictions = dummySavedPredictions;
      } else if (activeTab === 'profile') {
        filteredPredictions = [];
      }

      if (activeTab === 'feed') {
        if (activeFilter === 'newest') {
          filteredPredictions = filteredPredictions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        } else if (activeFilter === 'top-rated') {
          filteredPredictions = filteredPredictions.sort((a, b) => b.predictor.rating - a.predictor.rating);
        } else if (activeFilter === 'premium') {
          filteredPredictions = filteredPredictions.filter(pred => pred.premium);
        } else if (activeFilter === 'following') {
          filteredPredictions = filteredPredictions.filter(pred => pred.predictor.followers > 10000);
        }
      }

      setFeed(filteredPredictions);
      setPredictions(filteredPredictions);
      setLoading(false);
    }, 1000);
  }, [activeTab, activeFilter, searchQuery, setPredictions]);

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

  if (activeTab === 'following') {
    return (
      <div className="p-4 mx-3 sm:mx-0 pb-20 md:pb-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Following</h2>
        {dummyFollowing.length > 0 ? (
          <div className="space-y-3">
            {dummyFollowing.map((predictor, index) => (
              <div key={index} className="bg-white rounded-xl p-4 border border-slate-200/50 flex items-center gap-3">
                <img 
                  src={predictor.avatar} 
                  className="w-10 h-10 rounded-full object-cover" 
                  alt={predictor.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${predictor.name}&background=6366f1&color=fff&size=40`;
                  }}
                />
                <div>
                  <p className="font-medium text-slate-800">{predictor.name}</p>
                  <p className="text-sm text-slate-500">Rating: {predictor.rating} • {predictor.followers} followers</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-600">You are not following any predictors yet.</p>
        )}
      </div>
    );
  }

  if (activeTab === 'saved') {
    return (
      <div className="p-4 mx-3 sm:mx-0 pb-20 md:pb-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Saved</h2>
        {dummySavedPredictions.length > 0 ? (
          <div className="space-y-4">
            {dummySavedPredictions.map(pred => (
              <MobilePredictionCard 
                key={pred.id} 
                {...pred} 
                isSubscribed={isSubscribed} 
                premiumTicketsViewed={premiumTicketsViewed}
                onPay={onPay}
              />
            ))}
          </div>
        ) : (
          <p className="text-slate-600">No saved predictions yet.</p>
        )}
      </div>
    );
  }

  if (activeTab === 'profile') {
    return (
      <div className="p-4 mx-3 sm:mx-0 pb-20 md:pb-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Profile</h2>
        <p className="text-slate-600">Your profile information and activity will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-20 md:pb-6">
      {refreshing && (
        <div className="flex justify-center py-4">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {feed.length > 0 ? (
        feed.map(pred => (
          <MobilePredictionCard 
            key={pred.id} 
            {...pred} 
            isSubscribed={isSubscribed} 
            premiumTicketsViewed={premiumTicketsViewed}
            onPay={onPay}
          />
        ))
      ) : (
        <div className="p-4 mx-3 sm:mx-0">
          <p className="text-slate-600">No predictions match your search or filter.</p>
        </div>
      )}

      {feed.length > 0 && (
        <div className="flex justify-center py-6">
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium hover:shadow-lg transition-all">
            Load More Tips
          </button>
        </div>
      )}
    </div>
  );
}