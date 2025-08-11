// src/app/premium/page.tsx

"use client";

import React, { useState } from 'react';
import { Bell, Menu } from 'lucide-react';
import LeftSidebar from './leftSidebar';
import RightSidebar from './rightSidebar';
import PredictionUpdates from './predictionUpdates';
import BottomNavigation from './BottomNavigation';
import CreateTipModal from './CreateTipModal';
import NotificationsView from './NotificationsView';
import PaymentModal from './PaymentModal';
import UserProfile from './UserProfile';
import { Prediction, Subscription, User } from '@/lib/premiumTypes';
import { dummyPredictions } from '@/lib/premiumPredictionData';

export default function PremiumPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('feed');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showCreateTipModal, setShowCreateTipModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [predictions, setPredictions] = useState<Prediction[]>(dummyPredictions);
  const [searchQuery, setSearchQuery] = useState('');
  const [premiumTicketsViewed, setPremiumTicketsViewed] = useState(0);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    { id: 'sub_001', name: 'Basic Plan', ticketsRemaining: 5 },
    { id: 'sub_002', name: 'Pro Plan', ticketsRemaining: 10 }
  ]);
  const [user, setUser] = useState<User>({
    id: 'user_001',
    username: 'Current User',
    avatar: '/user.jpg',
    bio: 'Passionate about sports betting and analytics.',
    contact: 'user@example.com',
    isCreator: true,
    walletBalance: 500,
    creatorStats: {
      rating: 4.8,
      reviews: 120,
      totalTickets: 50,
      totalWins: 40,
      totalLosses: 10,
      accuracy: 80,
      activeTickets: 3
    },
    tasks: [
      { id: 'task_001', description: 'Create 5 accurate games this week', progress: 3, target: 5, reward: 'Level Up' },
      { id: 'task_002', description: 'Create 30 tickets this week', progress: 15, target: 30, reward: 'Pro Badge' }
    ]
  });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // FIXED & CLEANED: handleCreateTip
  const handleCreateTip = (
    newPredictionData: Omit<Prediction, 'id' | 'timestamp' | 'views' | 'likes' | 'premiumTicketsViewed' | 'paid' | 'subscriptionId'>
  ) => {
    const newId = Math.max(...predictions.map(p => p.id), 0) + 1;

    const completePrediction: Prediction = {
      ...newPredictionData,
      id: newId,
      timestamp: new Date().toISOString(),
      views: 0,
      likes: 0,
      premiumTicketsViewed: !subscriptions.length
        ? premiumTicketsViewed + (newPredictionData.premium ? 1 : 0)
        : premiumTicketsViewed,
      paid: false,
      subscriptionId: null
    };

    setPredictions([completePrediction, ...predictions]);
    setShowCreateTipModal(false);

    // Increment premium view count if needed
    if (newPredictionData.premium && !subscriptions.length) {
      setPremiumTicketsViewed(prev => prev + 1);
    }
  };

  const handlePay = (ticketId: number) => {
    setSelectedTicketId(ticketId);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (ticketId: number, subscriptionId: string | null) => {
    if (!subscriptions.length && !subscriptionId) {
      setPremiumTicketsViewed(prev => prev + 1);
      setUser(prev => ({
        ...prev,
        walletBalance: prev.walletBalance - (predictions.find(p => p.id === ticketId)?.price || 0)
      }));
    }
    if (subscriptionId) {
      setSubscriptions(prev =>
        prev.map(sub =>
          sub.id === subscriptionId ? { ...sub, ticketsRemaining: sub.ticketsRemaining - 1 } : sub
        )
      );
    }
    setPredictions(prev =>
      prev.map(pred =>
        pred.id === ticketId ? { ...pred, paid: true, subscriptionId } : pred
      )
    );
    setShowPaymentModal(false);
    setSelectedTicketId(null);
  };

  const handleUserClick = (predictor: Prediction['predictor']) => {
  // Simulate fetching user data; replace with API call in production
  setSelectedUser({
    id: `user_${predictor.name.toLowerCase().replace(' ', '_')}`,
    username: predictor.name,
    avatar: predictor.avatar,
    bio: `${predictor.name}'s bio goes here.`,
    contact: `${predictor.name.toLowerCase().replace(' ', '.')}@example.com`,
    isCreator: predictor.verified,
    walletBalance: 0,
    creatorStats: {
      rating: predictor.rating,
      reviews: Math.floor(predictor.followers / 10),
      totalTickets: predictions.filter(p => p.predictor.name === predictor.name).length,
      totalWins: predictions
        .filter(p => p.predictor.name === predictor.name)
        .reduce((sum, p) => sum + p.games.filter(g => g.status === 'correct').length, 0),
      totalLosses: predictions
        .filter(p => p.predictor.name === predictor.name)
        .reduce((sum, p) => sum + p.games.filter(g => g.status === 'wrong').length, 0),
      accuracy:
        (predictions
          .filter(p => p.predictor.name === predictor.name)
          .reduce((sum, p) => sum + p.games.filter(g => g.status === 'correct').length, 0) /
          predictions
            .filter(p => p.predictor.name === predictor.name)
            .reduce((sum, p) => sum + p.games.filter(g => g.status).length, 0)) *
          100 || 0,
      activeTickets: predictions.filter(p => p.predictor.name === predictor.name && p.games.some(g => !g.status)).length
    },
    tasks: [
      { id: 'task_001', description: 'Create 5 accurate games this week', progress: 3, target: 5, reward: 'Level Up' },
      { id: 'task_002', description: 'Create 30 tickets this week', progress: 15, target: 30, reward: 'Pro Badge' }
    ]
  });
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="flex h-screen">
        <div className="hidden md:block">
          <LeftSidebar 
            isOpen={true} 
            onClose={() => {}} 
            activeFilter={activeFilter} 
            setActiveFilter={setActiveFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
        
        <div className="md:hidden">
          <LeftSidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)} 
            activeFilter={activeFilter} 
            setActiveFilter={setActiveFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
        
        <main className="flex-1 flex">
          <div className="flex-1 overflow-y-auto">
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
                  <button 
                    onClick={() => setShowCreateTipModal(true)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-xl text-sm hover:bg-blue-600 transition-colors"
                  >
                    Create Tip
                  </button>
                  <button 
                    onClick={() => setShowNotifications(true)}
                    className="p-2 hover:bg-slate-100 rounded-xl relative"
                  >
                    <Bell size={20} className="text-slate-600" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                  </button>
                </div>
              </div>
            </div>

            <div className="hidden md:block sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-slate-200/50">
              <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-800">Prediction Feed</h1>
                    <p className="text-slate-600 mt-1">Latest betting tips from top predictors</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setShowCreateTipModal(true)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                    >
                      Create Tip
                    </button>
                    <button 
                      onClick={() => setShowNotifications(true)}
                      className="p-2 hover:bg-slate-100 rounded-xl relative"
                    >
                      <Bell size={20} className="text-slate-600" />
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:p-6">
              {selectedUser ? (
                <UserProfile
                  user={selectedUser}
                  predictions={predictions.filter(p => p.predictor.name === selectedUser.username)}
                  onPay={handlePay}
                />
              ) : showNotifications ? (
                <NotificationsView onClose={() => setShowNotifications(false)} />
              ) : showPaymentModal && selectedTicketId ? (
                <PaymentModal 
                  ticketId={selectedTicketId}
                  price={predictions.find(p => p.id === selectedTicketId)?.price || 0}
                  subscriptions={subscriptions}
                  user={user}
                  onClose={() => {
                    setShowPaymentModal(false);
                    setSelectedTicketId(null);
                  }}
                  onPaymentSuccess={handlePaymentSuccess}
                />
              ) : (
                <PredictionUpdates 
                  activeTab={activeTab} 
                  activeFilter={activeFilter} 
                  setPredictions={setPredictions}
                  searchQuery={searchQuery}
                  premiumTicketsViewed={premiumTicketsViewed}
                  onPay={handlePay}
                  onUserClick={handleUserClick}
                />
              )}
            </div>
          </div>
          <div className="hidden lg:block w-80 overflow-y-auto">
            <RightSidebar />
          </div>
        </main>
      </div>

      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {showCreateTipModal && (
        <CreateTipModal 
          onClose={() => setShowCreateTipModal(false)} 
          onSubmit={handleCreateTip}
        />
      )}
    </div>
  );
}
