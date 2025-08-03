import React from 'react';
import { Home, Users, Bookmark, User } from 'lucide-react';
import { BottomNavigationProps } from '@/lib/premiumTypes';

export default function BottomNavigation({ activeTab, setActiveTab }: BottomNavigationProps) {
  const tabs = [
    { id: 'feed', icon: Home, label: 'Feed' },
    { id: 'following', icon: Users, label: 'Following' },
    { id: 'saved', icon: Bookmark, label: 'Saved' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-200/50 md:hidden">
      <div className="flex justify-around py-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex flex-col items-center gap-1 py-2 ${
              activeTab === tab.id ? 'text-blue-500' : 'text-slate-600'
            }`}
          >
            <tab.icon size={20} />
            <span className="text-xs">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}