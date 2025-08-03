import React from 'react';
import { X, Bell, Users, Heart, Shield } from 'lucide-react';
import { Notification } from '@/lib/premiumTypes';

interface NotificationsViewProps {
  onClose: () => void;
}

export default function NotificationsView({ onClose }: NotificationsViewProps) {
  const notifications: Notification[] = [
    {
      id: 1,
      type: 'tip',
      message: "Sara Win posted a new premium tip for Premier League matches!",
      timestamp: "2025-08-03T09:30:00Z",
      read: false
    },
    {
      id: 2,
      type: 'follow',
      message: "Elite Bets started following you.",
      timestamp: "2025-08-03T08:15:00Z",
      read: false
    },
    {
      id: 3,
      type: 'like',
      message: "John Tips liked your prediction for Chelsea vs. Arsenal.",
      timestamp: "2025-08-02T18:45:00Z",
      read: true
    },
    {
      id: 4,
      type: 'system',
      message: "Your subscription is expiring soon. Renew now to continue accessing premium tips!",
      timestamp: "2025-08-01T12:00:00Z",
      read: true
    }
  ];

  const timeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    return `${Math.floor(diffInHours / 24)} day${diffInHours / 24 > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50 mx-3 sm:mx-0 md:m-6">
      <div className="sticky top-0 bg-white rounded-t-2xl p-4 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell size={20} className="text-slate-600" />
          <h2 className="text-xl font-bold text-slate-800">Notifications</h2>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
          <X size={20} />
        </button>
      </div>
      
      <div className="p-4 space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <div 
              key={notification.id} 
              className={`p-3 rounded-xl flex items-start gap-3 ${
                notification.read ? 'bg-slate-50' : 'bg-blue-50'
              }`}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                {notification.type === 'tip' && <Bell size={16} className="text-white" />}
                {notification.type === 'follow' && <Users size={16} className="text-white" />}
                {notification.type === 'like' && <Heart size={16} className="text-white" />}
                {notification.type === 'system' && <Shield size={16} className="text-white" />}
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-800">{notification.message}</p>
                <p className="text-xs text-slate-500 mt-1">{timeAgo(notification.timestamp)}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-slate-600 text-center py-6">No notifications yet.</p>
        )}
      </div>
    </div>
  );
}