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
import { Prediction, Subscription } from '@/lib/premiumTypes';

export default function PremiumPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('feed');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showCreateTipModal, setShowCreateTipModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [premiumTicketsViewed, setPremiumTicketsViewed] = useState(0);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    { id: 'sub_001', name: 'Basic Plan', ticketsRemaining: 5 },
    { id: 'sub_002', name: 'Pro Plan', ticketsRemaining: 10 }
  ]);

  const handleCreateTip = (newPredictionInput: Omit<Prediction, 'id' | 'timestamp' | 'views' | 'likes' | 'premiumTicketsViewed' | 'paid' | 'subscriptionId'>) => {
    const newId = Math.max(...predictions.map(p => p.id), 0) + 1;
    const newPrediction: Prediction = {
      ...newPredictionInput,
      id: newId,
      timestamp: new Date().toISOString(),
      views: 0,
      likes: 0,
      premiumTicketsViewed: isSubscribed ? premiumTicketsViewed : premiumTicketsViewed + (newPredictionInput.premium ? 1 : 0),
      paid: false,
      subscriptionId: null
    };
    setPredictions([newPrediction, ...predictions]);
    setShowCreateTipModal(false);
    if (newPrediction.premium && !isSubscribed) {
      setPremiumTicketsViewed(prev => prev + 1);
    }
  };

  const handlePay = (ticketId: number) => {
    setSelectedTicketId(ticketId);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (ticketId: number, subscriptionId: string | null) => {
    if (!isSubscribed && !subscriptionId) {
      setPremiumTicketsViewed(prev => prev + 1);
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
              {showNotifications ? (
                <NotificationsView onClose={() => setShowNotifications(false)} />
              ) : showPaymentModal && selectedTicketId ? (
                <PaymentModal 
                  ticketId={selectedTicketId}
                  price={predictions.find(p => p.id === selectedTicketId)?.price || 0}
                  subscriptions={subscriptions}
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
                  isSubscribed={isSubscribed}
                  premiumTicketsViewed={premiumTicketsViewed}
                  onPay={handlePay}
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