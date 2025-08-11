"use client";

import React, { useState } from "react";
import { 
  Crown,
  Flame,
  Bell,
  Menu,
  X,
  BarChart3,
  Target,
  HeadphonesIcon,
  CreditCard,
  Megaphone,
  User,
  Settings
} from "lucide-react";

// Types
interface AnalyticsData {
  totalEarnings: number;
  weeklyTips: Array<{ week: string; tips: number }>;
  weeklyEarnings: Array<{ week: string; earnings: number }>;
}

interface Achievement {
  id: number;
  name: string;
  icon: string;
  unlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  description: string;
  progress?: number;
  target?: number;
}

interface UserProfile {
  id: string;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  bio: string;
  avatar: string;
  location: string;
  dateJoined: string;
  isVerified: boolean;
  socialLinks: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
}

interface UserStats {
  level: number;
  xp: number;
  xpToNext: number;
  streak: number;
  rank: number;
  totalUsers: number;
  winRate: number;
  roi: number;
  followers: number;
  views: number;
  totalTips: number;
  premiumSubscribers: number;
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

interface LeaderboardEntry {
  rank: number;
  name: string;
  country: string;
  flag: string;
  earnings: number;
  winRate: number;
  isCurrentUser?: boolean;
}

interface RecentActivity {
  id: number;
  type: 'win' | 'tip' | 'follower' | 'achievement';
  description: string;
  time: string;
  amount: string;
}

interface WeeklyData {
  day: string;
  tips: number;
  earnings: number;
  views: number;
}

type TabType = 'overview' | 'tasks' | 'creator' | 'payment' | 'ads' | 'profile' | 'settings';
type TimeFilter = '7d' | '30d' | '90d';
type LeaderboardType = 'global' | 'country' | 'local';

interface UserAnalyticsProps {
  analytics?: AnalyticsData;
}

// Mock Data
const dummyAnalytics: AnalyticsData = {
  totalEarnings: 125000,
  weeklyTips: [
    { week: "Week 1", tips: 35 },
    { week: "Week 2", tips: 42 },
    { week: "Week 3", tips: 38 },
    { week: "Week 4", tips: 45 }
  ],
  weeklyEarnings: [
    { week: "Week 1", earnings: 8500 },
    { week: "Week 2", earnings: 12000 },
    { week: "Week 3", earnings: 9500 },
    { week: "Week 4", earnings: 15000 }
  ]
};

const userStats: UserStats = {
  level: 7,
  xp: 2850,
  xpToNext: 4000,
  streak: 12,
  rank: 156,
  totalUsers: 45000,
  winRate: 68.5,
  roi: 15.3,
  followers: 1247,
  views: 15600,
  totalTips: 160,
  premiumSubscribers: 89
};

const userProfile: UserProfile = {
  id: "user_001",
  username: "BetMaster_NG",
  fullName: "John Okafor",
  email: "john.okafor@email.com",
  phone: "+234 813 555 0123",
  bio: "Professional sports analyst with 5+ years experience. Specializing in Premier League and Champions League predictions.",
  avatar: "/api/placeholder/100/100",
  location: "Onitsha, Anambra State",
  dateJoined: "2022-03-15",
  isVerified: true,
  socialLinks: {
    twitter: "@betmaster_ng",
    instagram: "betmaster_ng",
    facebook: "john.okafor.betmaster"
  }
};

const achievements: Achievement[] = [
  { 
    id: 1, 
    name: "First Win", 
    icon: "🏆", 
    unlocked: true, 
    rarity: "common",
    description: "Win your first bet"
  },
  { 
    id: 2, 
    name: "Hat Trick", 
    icon: "⚽", 
    unlocked: true, 
    rarity: "rare",
    description: "Win 3 bets in a row"
  },
  { 
    id: 3, 
    name: "Weekly Winner", 
    icon: "📅", 
    unlocked: true, 
    rarity: "common",
    description: "Win 5 bets in a week"
  },
  { 
    id: 4, 
    name: "High Roller", 
    icon: "💎", 
    unlocked: true, 
    rarity: "epic",
    description: "Win a bet with 10+ odds"
  },
  { 
    id: 5, 
    name: "Streak Master", 
    icon: "🔥", 
    unlocked: false, 
    rarity: "epic",
    description: "Maintain 30-day streak",
    progress: 12,
    target: 30
  },
  { 
    id: 6, 
    name: "Social Star", 
    icon: "⭐", 
    unlocked: false, 
    rarity: "rare",
    description: "Get 5000 followers",
    progress: 1247,
    target: 5000
  },
  { 
    id: 7, 
    name: "Legend", 
    icon: "👑", 
    unlocked: false, 
    rarity: "legendary",
    description: "Reach top 10 global ranking",
    progress: 156,
    target: 10
  },
  { 
    id: 8, 
    name: "Content King", 
    icon: "📱", 
    unlocked: false, 
    rarity: "epic",
    description: "Create 100 premium tips",
    progress: 67,
    target: 100
  }
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

const globalLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "BetKing_Pro", country: "Nigeria", flag: "🇳🇬", earnings: 850000, winRate: 89.2 },
  { rank: 2, name: "FootballWiz", country: "Ghana", flag: "🇬🇭", earnings: 720000, winRate: 85.1 },
  { rank: 3, name: "PredictMaster", country: "Kenya", flag: "🇰🇪", earnings: 680000, winRate: 83.7 },
  { rank: 4, name: "GoalGetter", country: "South Africa", flag: "🇿🇦", earnings: 620000, winRate: 81.3 },
  { rank: 5, name: "SportsSage", country: "Nigeria", flag: "🇳🇬", earnings: 580000, winRate: 79.8 },
  { rank: 156, name: "You", country: "Nigeria", flag: "🇳🇬", earnings: 125000, winRate: 68.5, isCurrentUser: true }
];

const recentActivities: RecentActivity[] = [
  { id: 1, type: 'win', description: 'Won bet on Chelsea vs Arsenal', time: '2 hours ago', amount: '+₦1,200' },
  { id: 2, type: 'tip', description: 'Created premium tip for El Clasico', time: '5 hours ago', amount: '+50 XP' },
  { id: 3, type: 'follower', description: '3 new followers', time: '1 day ago', amount: '+15 XP' },
  { id: 4, type: 'achievement', description: 'Unlocked "Consistent Player" badge', time: '2 days ago', amount: '+100 XP' }
];

const weeklyData: WeeklyData[] = [
  { day: 'Mon', tips: 4, earnings: 850, views: 1200 },
  { day: 'Tue', tips: 6, earnings: 1200, views: 1800 },
  { day: 'Wed', tips: 3, earnings: 600, views: 900 },
  { day: 'Thu', tips: 8, earnings: 1800, views: 2400 },
  { day: 'Fri', tips: 5, earnings: 1100, views: 1600 },
  { day: 'Sat', tips: 9, earnings: 2200, views: 3200 },
  { day: 'Sun', tips: 7, earnings: 1500, views: 2100 }
];

export default function UserAnalytics({ analytics }: UserAnalyticsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const analyticsData = analytics || dummyAnalytics;

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'tasks', label: 'Tasks', icon: Target },
    { id: 'creator', label: 'Creator Support', icon: HeadphonesIcon },
    { id: 'payment', label: 'Payment Setup', icon: CreditCard },
    { id: 'ads', label: 'Ads Center', icon: Megaphone },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  // Overview Tab Content
  const OverviewTab = () => {
    const [timeFilter, setTimeFilter] = useState<TimeFilter>('7d');
    const [selectedLeaderboard, setSelectedLeaderboard] = useState<LeaderboardType>('global');
    
    const statCards = [
      { 
        title: "Total Earnings", 
        value: `₦${analyticsData.totalEarnings.toLocaleString()}`, 
        change: "+12.5%",
        trend: "up",
        icon: Crown,
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
        value: analyticsData.weeklyTips.reduce((sum, w) => sum + w.tips, 0), 
        change: "+8.1%",
        trend: "up",
        icon: BarChart3,
        color: "from-purple-500 to-pink-600",
        bgColor: "from-purple-50 to-pink-50"
      },
      { 
        title: "ROI", 
        value: `${userStats.roi}%`, 
        change: "-1.2%",
        trend: "down",
        icon: BarChart3,
        color: "from-orange-500 to-red-600",
        bgColor: "from-orange-50 to-red-50"
      }
    ];

    const maxEarnings = Math.max(...weeklyData.map(d => d.earnings));
    const getRarityStyles = (rarity: Achievement['rarity']): string => {
      const styles = {
        legendary: 'bg-purple-100 text-purple-700',
        epic: 'bg-orange-100 text-orange-700',
        rare: 'bg-blue-100 text-blue-700',
        common: 'bg-gray-100 text-gray-700'
      };
      return styles[rarity];
    };

    const filterLeaderboard = (type: LeaderboardType): LeaderboardEntry[] => {
      switch (type) {
        case 'country':
          return globalLeaderboard.filter(entry => entry.country === "Nigeria");
        case 'local':
          return globalLeaderboard.filter(entry => entry.country === "Nigeria").slice(0, 3);
        default:
          return globalLeaderboard;
      }
    };

    const filteredLeaderboard = filterLeaderboard(selectedLeaderboard);

    return (
      <div className="space-y-6 pb-20 md:pb-6">
        {/* Stats Grid - 4 cards on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {statCards.map((stat, idx) => (
            <div key={idx} className={`relative overflow-hidden bg-gradient-to-br ${stat.bgColor} backdrop-blur-sm rounded-2xl p-3 md:p-6 border border-white/20 hover:shadow-xl transition-all duration-300 group`}>
              <div className="flex items-start justify-between">
                <div className="space-y-1 md:space-y-2">
                  <p className="text-xs md:text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-lg md:text-2xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center gap-1">
                    <span className={`text-xs md:text-sm font-medium text-emerald-600`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-2 md:p-3 bg-gradient-to-r ${stat.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Level Progress & Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Level Progress Circle */}
          <div className="lg:col-span-1 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Crown className="w-5 h-5 text-purple-600" />
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

          {/* Achievements - Box Format */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-600" />
              Achievements
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievements.slice(0, 8).map((achievement) => {
                const progressPercent = achievement.progress && achievement.target 
                  ? (achievement.progress / achievement.target) * 100 
                  : 0;
                return (
                  <div key={achievement.id} className={`p-4 rounded-xl border-2 transition-all hover:scale-105 relative ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200' 
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}>
                    {!achievement.unlocked && (
                      <div className="absolute top-2 right-2">
                        <X className="w-4 h-4 text-gray-400" />
                      </div>
                    )}
                    <div className="text-center space-y-2">
                      <div className={`text-2xl ${!achievement.unlocked ? 'grayscale opacity-50' : ''}`}>
                        {achievement.icon}
                      </div>
                      <p className="text-xs font-medium text-gray-700">{achievement.name}</p>
                      <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getRarityStyles(achievement.rarity)}`}>
                        {achievement.rarity}
                      </div>
                      {!achievement.unlocked && achievement.progress && achievement.target && (
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-purple-500 h-1.5 rounded-full transition-all"
                              style={{ width: `${progressPercent}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {achievement.progress.toLocaleString()}/{achievement.target.toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
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
              {(['7d', '30d', '90d'] as TimeFilter[]).map((period) => (
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

        {/* Leaderboard & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Leaderboard */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Crown className="w-5 h-5 text-yellow-600" />
                Leaderboard
              </h3>
              <select 
                value={selectedLeaderboard} 
                onChange={(e) => setSelectedLeaderboard(e.target.value as LeaderboardType)}
                className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="global">🌍 Global</option>
                <option value="country">🇳🇬 Nigeria</option>
                <option value="local">📍 Onitsha</option>
              </select>
            </div>
            <div className="space-y-2">
              {filteredLeaderboard.map((entry) => (
                <div key={entry.rank} className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                  entry.isCurrentUser ? 'bg-purple-100 border border-purple-200' : 'hover:bg-gray-50'
                }`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    entry.rank <= 3 ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {entry.rank}
                  </div>
                  <span className="text-lg">{entry.flag}</span>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-gray-800">{entry.name}</p>
                    <p className="text-xs text-gray-500">{entry.winRate}% win rate</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">₦{entry.earnings.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-green-600" />
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
  };

  // Tasks Tab Content
  const TasksTab = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    
    const filteredTasks = selectedCategory === 'all' 
      ? tasks 
      : tasks.filter(task => task.category === selectedCategory);

    const completedTasks = tasks.filter(task => task.progress >= task.target).length;
    const totalTasks = tasks.length;

    const getDifficultyStyles = (difficulty: Task['difficulty']): string => {
      const styles = {
        hard: 'bg-red-100 text-red-700',
        medium: 'bg-yellow-100 text-yellow-700',
        easy: 'bg-green-100 text-green-700'
      };
      return styles[difficulty];
    };

    return (
      <div className="space-y-6 pb-20 md:pb-6">
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
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyStyles(task.difficulty)}`}>
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

        {/* Task Categories Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { category: 'betting', label: 'Betting', icon: '🎯', color: 'from-red-500 to-pink-500' },
            { category: 'social', label: 'Social', icon: '👥', color: 'from-blue-500 to-indigo-500' },
            { category: 'engagement', label: 'Engagement', icon: '❤️', color: 'from-purple-500 to-pink-500' },
            { category: 'premium', label: 'Premium', icon: '💎', color: 'from-yellow-500 to-orange-500' }
          ].map((cat) => {
            const categoryTasks = tasks.filter(task => task.category === cat.category);
            const completed = categoryTasks.filter(task => task.progress >= task.target).length;
            
            return (
              <div key={cat.category} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-center space-y-2">
                  <div className={`w-12 h-12 mx-auto bg-gradient-to-r ${cat.color} rounded-full flex items-center justify-center text-2xl`}>
                    {cat.icon}
                  </div>
                  <h4 className="font-medium text-gray-800">{cat.label}</h4>
                  <p className="text-sm text-gray-600">{completed}/{categoryTasks.length} Complete</p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className={`bg-gradient-to-r ${cat.color} h-1.5 rounded-full transition-all`}
                      style={{ width: `${categoryTasks.length ? (completed / categoryTasks.length) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Profile Tab Content  
  const ProfileTab = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState(userProfile);

    const handleSave = () => {
      console.log('Saving profile:', editedProfile);
      setIsEditing(false);
    };

    const handleCancel = () => {
      setEditedProfile(userProfile);
      setIsEditing(false);
    };

    const profileStats = [
      { label: 'Followers', value: userStats.followers.toLocaleString(), icon: User, color: 'text-blue-600' },
      { label: 'Profile Views', value: userStats.views.toLocaleString(), icon: BarChart3, color: 'text-green-600' },
      { label: 'Tips Created', value: userStats.totalTips.toString(), icon: Crown, color: 'text-purple-600' },
      { label: 'Premium Subs', value: userStats.premiumSubscribers.toString(), icon: Crown, color: 'text-yellow-600' }
    ];

    return (
      <div className="space-y-6 pb-20 md:pb-6">
        {/* Profile Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {userProfile.fullName.split(' ').map(n => n[0]).join('')}
                </div>
                {isEditing && (
                  <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <User className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-gray-900">{userProfile.fullName}</h2>
                  {userProfile.isVerified && (
                    <Crown className="w-5 h-5 text-blue-500" />
                  )}
                </div>
                <p className="text-gray-600">@{userProfile.username}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <User className="w-4 h-4" />
                  {userProfile.location}
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {/* Profile Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {profileStats.map((stat, idx) => (
              <div key={idx} className="text-center p-3 bg-gray-50 rounded-lg">
                <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Bio Section */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Bio</h3>
            {isEditing ? (
              <textarea
                value={editedProfile.bio}
                onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-gray-700">{userProfile.bio}</p>
            )}
          </div>
        </div>

        {/* Edit Profile Form */}
        {isEditing && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Edit Profile Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={editedProfile.fullName}
                    onChange={(e) => setEditedProfile({...editedProfile, fullName: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                  <input
                    type="text"
                    value={editedProfile.username}
                    onChange={(e) => setEditedProfile({...editedProfile, username: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={editedProfile.phone}
                    onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={editedProfile.location}
                  onChange={(e) => setEditedProfile({...editedProfile, location: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <Crown className="w-4 h-4" />
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Creator Support Tab
  const CreatorSupportTab = () => (
    <div className="space-y-6 pb-20 md:pb-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Creator Support</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <HeadphonesIcon className="w-6 h-6 text-blue-600" />
                <h3 className="font-semibold text-blue-900">24/7 Support Chat</h3>
              </div>
              <p className="text-sm text-blue-700 mb-3">Get help with content creation, monetization, and platform features.</p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                Start Chat
              </button>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <User className="w-6 h-6 text-green-600" />
                <h3 className="font-semibold text-green-900">Creator Resources</h3>
              </div>
              <p className="text-sm text-green-700 mb-3">Access guides, templates, and best practices.</p>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors">
                View Resources
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Crown className="w-6 h-6 text-purple-600" />
                <h3 className="font-semibold text-purple-900">Partnership Program</h3>
              </div>
              <p className="text-sm text-purple-700 mb-3">Join our exclusive creator partnership program for additional benefits.</p>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Bottom Navigation for Mobile
  const BottomNavigation = () => {
    const tabs = [
      { id: 'overview', icon: BarChart3, label: 'Overview' },
      { id: 'tasks', icon: Target, label: 'Tasks' },
      { id: 'creator', icon: HeadphonesIcon, label: 'Support' },
      { id: 'profile', icon: User, label: 'Profile' },
    ];

    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-200/50 md:hidden z-50">
        <div className="flex justify-around py-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex-1 flex flex-col items-center gap-1 py-2 transition-colors ${
                activeTab === tab.id ? 'text-purple-600' : 'text-slate-600'
              }`}
            >
              <tab.icon size={20} />
              <span className="text-xs">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'tasks':
        return <TasksTab />;
      case 'creator':
        return <CreatorSupportTab />;
      case 'profile':
        return <ProfileTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Mobile Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors md:hidden"
              >
                {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Crown className="w-6 h-6 text-purple-600" />
                  {userStats.streak > 10 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                      <Flame className="w-2 h-2 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Dashboard</h1>
                  <p className="text-xs text-gray-500">Level {userStats.level} • Rank #{userStats.rank.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-gray-600" />
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-white border-t border-gray-200 px-4 py-2">
            <div className="grid grid-cols-2 gap-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as TabType);
                    setShowMobileMenu(false);
                  }}
                  className={`flex items-center gap-2 p-2 rounded-lg text-sm transition-colors ${
                    activeTab === item.id ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed left-0 top-16 w-64 h-full bg-white/80 backdrop-blur-sm border-r border-white/20 p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as TabType)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm transition-colors ${
                activeTab === item.id ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="md:ml-64 px-4 md:px-6 py-6">
        {renderTabContent()}
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}