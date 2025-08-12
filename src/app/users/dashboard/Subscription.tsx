import React from 'react';
import { CreditCard } from 'lucide-react';
import type { Subscription } from '@/lib/profileType';
import { Status } from '@/lib/profileType';
import { subscriptions } from '@/lib/profileData';

interface SubscriptionProps {
  getStatusColor: (status: Status) => string;
}

export default function Subscription({ getStatusColor }: SubscriptionProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Subscriptions</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors">
            Upgrade Plan
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {subscriptions.map((sub) => (
          <div
            key={sub.id}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-xl">
                  <CreditCard className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="font-mono text-blue-300 font-medium">{sub.plan}</p>
                  <p className="text-gray-400 text-sm">Expires: {sub.expires}</p>
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(sub.status)}`}
                >
                  {sub.status}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-white/10">
              <span className="text-gray-300">Price</span>
              <span className="font-semibold text-white">{sub.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}