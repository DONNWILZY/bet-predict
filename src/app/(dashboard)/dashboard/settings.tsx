import React from 'react';
import { KeyRound, Shield, Paintbrush, Bell } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-white">Settings</h1>

      <div className="grid gap-6">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Security</h3>
          <div className="space-y-4">
            <button className="w-full flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-left">
              <div className="p-2 bg-blue-500/20 rounded-xl">
                <KeyRound className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-white font-medium">Change Password</p>
                <p className="text-gray-400 text-sm">Update your account password</p>
              </div>
            </button>
            <button className="w-full flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-left">
              <div className="p-2 bg-emerald-500/20 rounded-xl">
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-white font-medium">Two-Factor Authentication</p>
                <p className="text-gray-400 text-sm">Add an extra layer of security</p>
              </div>
            </button>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Preferences</h3>
          <div className="space-y-4">
            <button className="w-full flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-left">
              <div className="p-2 bg-purple-500/20 rounded-xl">
                <Paintbrush className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-white font-medium">Theme Settings</p>
                <p className="text-gray-400 text-sm">Customize your dashboard appearance</p>
              </div>
            </button>
            <button className="w-full flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-left">
              <div className="p-2 bg-amber-500/20 rounded-xl">
                <Bell className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-white font-medium">Notifications</p>
                <p className="text-gray-400 text-sm">Manage your notification preferences</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}