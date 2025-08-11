"use client";

import React, { useState, useMemo } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Trophy, 
  Target, 
  Calendar,
  Filter,
  Download,
  Share,
  Bell,
  Settings,
  ChevronRight,
  Star,
  Zap,
  Award,
  Users,
  Eye,
  ShoppingCart,
  Ticket,
  Clock,
  BarChart3,
  Activity,
  Gift,
  Crown,
  Flame,
  Medal
} from "lucide-react";

// Mock analytics data type
interface AnalyticsData {
  totalEarnings: number;
  weeklyTips: Array<{ week: string; tips: number }>;
  weeklyEarnings: Array<{ week: string; earnings: number }>;
}

interface Task {
  id: string;
  description: string;
  progress: number;
  target: number;
  reward: string;
  category: 'betting' | 'social' | 'engagement' | 'premium';
  difficulty: 'easy' | 'medium' | 'hard';
  xp: number;
}

interface UserAnalyticsProps {
  analytics: AnalyticsData;
}

export default function UserAnalytics({ analytics }: UserAnalyticsProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeFilter, setTimeFilter] = useState('7d');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Enhanced mock data
  const userStats = {
    level: 7,
    xp: 2850,
    xpToNext: 4000,
    streak: 12,
    rank: 156,
    totalUsers: 45000,
    winRate: 68.5,
    roi: 15.3
  };

  const achievements = [
    { id: 1, name: "First Win", icon: "🏆", unlocked: true, rarity: "common" },
    { id: 2, name: "Hat Trick", icon: "⚽", unlocked: true, rarity: "rare" },
    { id: 3, name: "Streak Master", icon: "🔥", unlocked: false, rarity: "epic" },
    { id: 4, name: "Legend", icon: "👑", unlocked: false, rarity: "legendary" }
  ];

  const tasks: Task[] = [
    { 
      id: "task_001", 
      description: "Win 3 consecutive bets", 
      progress: 2, 
      target: 3, 
      reward: "Premium Badge", 
      category: 'betting',
      difficulty: 'hard',
      xp: 150
    },
    { 
      id: "task_002", 
      description: "Create 10 quality tips", 
      progress: 7, 
      target: 10, 
      reward: "Creator Status", 
      category: 'social',
      difficulty: 'medium',
      xp: 100
    },
    { 
      id: "task_003", 
      description: "Gain 50 new followers", 
      progress: 32, 
      target: 50, 
      reward: "Influencer Badge", 
      category: 'social',
      difficulty: 'hard',
      xp: 200
    },
    { 
      id: "task_004", 
      description: "Reach 5K profile views", 
      progress: 3200, 
      target: 5000, 
      reward: "Visibility Boost", 
      category: 'engagement',
      difficulty: 'medium',
      xp: 80
    },
    { 
      id: "task_005", 
      description: "Make 5 premium purchases", 
      progress: 3, 
      target: 5, 
      reward: "VIP Access", 
      category: 'premium',
      difficulty: 'easy',
      xp: 50
    },
    { 
      id: "task_006", 
      description: "Maintain 14-day streak", 
      progress: 12, 
      target: 14, 
      reward: "Streak Master", 
      category: 'engagement',
      difficulty: 'hard',
      xp: 250
    }
  ];

  const recentActivities = [
    { id: 1, type: 'win', description: 'Won bet on Chelsea vs Arsenal', time: '2 hours ago', amount: '+₦1,200' },
    { id: 2, type: 'tip', description: 'Created premium tip for El Clasico', time: '5 hours ago', amount: '+50 XP' },
    { id: 3, type: 'follower', description: '3 new followers', time: '1 day ago', amount: '+15 XP' },
    { id: 4, type: 'achievement', description: 'Unlocked "Consistent Player" badge', time: '2 days ago', amount: '+100 XP' }
  ];

  const filteredTasks = selectedCategory === 'all' 
    ? tasks 
    : tasks.filter(task => task.category === selectedCategory);

  const completedTasks = tasks.filter(task => task.progress >= task.target).length;
  const totalTasks = tasks.length;

  const weeklyData = [
    { day: 'Mon', tips: 4, earnings: 850, views: 1200 },
    { day: 'Tue', tips: 6, earnings: 1200, views: 1800 },
    { day: 'Wed', tips: 3, earnings: 600, views: 900 },
    { day: 'Thu', tips: 8, earnings: 1800, views: 2400 },
    { day: 'Fri', tips: 5, earnings: 1100, views: 1600 },
    { day: 'Sat', tips: 9, earnings: 2200, views: 3200 },
    { day: 'Sun', tips: 7, earnings: 1500, views: 2100 }
  ];

  const maxEarnings = Math.max(...weeklyData.map(d => d.earnings));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Enhanced Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                {userStats.streak > 10 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                    <Flame className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Analytics Dashboard
                </h1>
                <p className="text-sm text-gray-500">Level {userStats.level} • Rank #{userStats.rank.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Share className="w-5 h-5 text-gray-600" />
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all">
                <Download className="w-4 h-4 inline mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              title: "Total Earnings", 
              value: `₦${analytics.totalEarnings.toLocaleString()}`, 
              change: "+12.5%",
              trend: "up",
              icon: Trophy,
              color: "from-emerald-500 to-teal-600",
              bgColor: "from-emerald-50 to-teal-50"
            },
            { 
              title: "Success Rate", 
              value: `${userStats.winRate}%`, 
              change: "+3.2%",
              trend: "up",
              icon: Target,
              color: "from-blue-500 to-indigo-600",
              bgColor: "from-blue-50 to-indigo-50"
            },
            { 
              title: "Total Tips", 
              value: analytics.weeklyTips.reduce((sum, w) => sum + w.tips, 0), 
              change: "+8.1%",
              trend: "up",
              icon: Ticket,
              color: "from-purple-500 to-pink-600",
              bgColor: "from-purple-50 to-pink-50"
            },
            { 
              title: "ROI", 
              value: `${userStats.roi}%`, 
              change: "-1.2%",
              trend: "down",
              icon: TrendingUp,
              color: "from-orange-500 to-red-600",
              bgColor: "from-orange-50 to-red-50"
            }
          ].map((stat, idx) => (
            <div key={idx} className={`relative overflow-hidden bg-gradient-to-br ${stat.bgColor} backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:shadow-xl transition-all duration-300 group`}>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center gap-1">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                    <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-r ${stat.color} opacity-10 rounded-full blur-2xl`}></div>
            </div>
          ))}
        </div>

        {/* Level Progress & Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Level Progress */}
          <div className="lg:col-span-1 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600" />
              Level Progress
            </h3>
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="56" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(userStats.xp / userStats.xpToNext) * 352} 352`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900">Lvl {userStats.level}</span>
                  <span className="text-xs text-gray-500">{userStats.xp}/{userStats.xpToNext} XP</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium text-gray-700">{userStats.streak} day streak</span>
                </div>
                <p className="text-xs text-gray-500">Keep it up to unlock exclusive rewards!</p>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Medal className="w-5 h-5 text-yellow-600" />
              Achievements
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                  achievement.unlocked 
                    ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200' 
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}>
                  <div className="text-center space-y-2">
                    <div className="text-2xl">{achievement.icon}</div>
                    <p className="text-xs font-medium text-gray-700">{achievement.name}</p>
                    <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      achievement.rarity === 'legendary' ? 'bg-purple-100 text-purple-700' :
                      achievement.rarity === 'epic' ? 'bg-orange-100 text-orange-700' :
                      achievement.rarity === 'rare' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {achievement.rarity}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Tasks Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Daily Challenges
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                {completedTasks}/{totalTasks} Complete
              </span>
            </h3>
            <div className="flex items-center gap-2">
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="betting">Betting</option>
                <option value="social">Social</option>
                <option value="engagement">Engagement</option>
                <option value="premium">Premium</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredTasks.map((task) => {
              const progressPercent = Math.min((task.progress / task.target) * 100, 100);
              const isCompleted = task.progress >= task.target;
              
              return (
                <div key={task.id} className={`p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                  isCompleted 
                    ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200' 
                    : 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200 hover:border-blue-300'
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-gray-800 text-sm">{task.description}</p>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          task.difficulty === 'hard' ? 'bg-red-100 text-red-700' :
                          task.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {task.difficulty}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>+{task.xp} XP</span>
                        <span className="capitalize">{task.category}</span>
                      </div>
                    </div>
                    {isCompleted && (
                      <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          isCompleted ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-blue-500 to-purple-500'
                        }`}
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-600 font-medium">{task.progress.toLocaleString()}/{task.target.toLocaleString()}</span>
                      <span className="text-purple-600 font-medium">🎁 {task.reward}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly Performance Chart */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              Weekly Performance
            </h3>
            <div className="flex items-center gap-2">
              {['7d', '30d', '90d'].map((period) => (
                <button
                  key={period}
                  onClick={() => setTimeFilter(period)}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                    timeFilter === period 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-4">
            {weeklyData.map((day, idx) => (
              <div key={idx} className="text-center">
                <div className="text-xs font-medium text-gray-500 mb-2">{day.day}</div>
                <div className="space-y-2">
                  <div className="bg-gray-100 rounded-lg p-2 h-16 flex flex-col justify-end">
                    <div 
                      className="bg-gradient-to-t from-blue-500 to-purple-500 rounded"
                      style={{ height: `${(day.earnings / maxEarnings) * 100}%`, minHeight: '4px' }}
                    ></div>
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="font-medium text-gray-900">₦{day.earnings}</div>
                    <div className="text-gray-500">{day.tips} tips</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-600" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'win' ? 'bg-emerald-500' :
                  activity.type === 'tip' ? 'bg-blue-500' :
                  activity.type === 'follower' ? 'bg-purple-500' :
                  'bg-yellow-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{activity.description}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <div className="text-sm font-medium text-emerald-600">{activity.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}