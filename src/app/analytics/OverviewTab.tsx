"use client";

import React, { useState } from "react";
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
  Medal,
  Globe,
  MapPin,
  CreditCard,
  HeadphonesIcon,
  Megaphone,
  User,
  Lock,
  Menu,
  X,
  ChevronDown,
  DollarSign,
  UserPlus,
  Play
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

interface LeaderboardEntry {
  rank: number;
  name: string;
  country: string;
  flag: string;
  earnings: number;
  winRate: number;
  isCurrentUser?: boolean;
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

interface RecentActivity {
  id: number;
  type: 'win' | 'tip' | 'follower' | 'achievement';
  description: string;
  time: string;
  amount: string;
}

interface GrowthDataPoint {
  period: string;
  earnings: number;
  followers: number;
  views: number;
  tips: number;
}

type TabType = 'overview' | 'creator' | 'payment' | 'ads' | 'profile' | 'settings';
type TimeFilter = '7d' | '30d' | '90d';
type LeaderboardType = 'global' | 'country' | 'local';

interface UserAnalyticsProps {
  analytics?: AnalyticsData;
}

export default function UserAnalytics({ analytics }: UserAnalyticsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('7d');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedLeaderboard, setSelectedLeaderboard] = useState<LeaderboardType>('global');

  // Mock data
  const mockAnalyticsData: AnalyticsData = {
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

  const analyticsData = analytics || mockAnalyticsData;

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
    views: 15600
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
      name: "Streak Master", 
      icon: "🔥", 
      unlocked: false, 
      rarity: "epic",
      description: "Maintain 30-day streak",
      progress: 12,
      target: 30
    },
    { 
      id: 4, 
      name: "Legend", 
      icon: "👑", 
      unlocked: false, 
      rarity: "legendary",
      description: "Reach top 10 global ranking",
      progress: 156,
      target: 10
    },
    { 
      id: 5, 
      name: "Social Star", 
      icon: "⭐", 
      unlocked: false, 
      rarity: "rare",
      description: "Get 5000 followers",
      progress: 1247,
      target: 5000
    },
    { 
      id: 6, 
      name: "Millionaire", 
      icon: "💰", 
      unlocked: false, 
      rarity: "legendary",
      description: "Earn ₦1,000,000 total",
      progress: 450000,
      target: 1000000
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

  const recentActivities: RecentActivity[] = [
    { id: 1, type: 'win', description: 'Won bet on Chelsea vs Arsenal', time: '2 hours ago', amount: '+₦1,200' },
    { id: 2, type: 'tip', description: 'Created premium tip for El Clasico', time: '5 hours ago', amount: '+50 XP' },
    { id: 3, type: 'follower', description: '3 new followers', time: '1 day ago', amount: '+15 XP' },
    { id: 4, type: 'achievement', description: 'Unlocked "Consistent Player" badge', time: '2 days ago', amount: '+100 XP' }
  ];

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'creator', label: 'Creator Support', icon: HeadphonesIcon },
    { id: 'payment', label: 'Payment Setup', icon: CreditCard },
    { id: 'ads', label: 'Ads Center', icon: Megaphone },
    { id: 'profile', label: 'Profile Status', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  // Utility functions
  const generateGrowthData = (period: string): GrowthDataPoint[] => {
    const baseData = {
      '7d': [
        { period: 'Mon', earnings: 850, followers: 1200, views: 3200, tips: 4 },
        { period: 'Tue', earnings: 1200, followers: 1220, views: 3800, tips: 6 },
        { period: 'Wed', earnings: 600, followers: 1235, views: 2900, tips: 3 },
        { period: 'Thu', earnings: 1800, followers: 1240, views: 4200, tips: 8 },
        { period: 'Fri', earnings: 1100, followers: 1245, views: 3600, tips: 5 },
        { period: 'Sat', earnings: 2200, followers: 1247, views: 5200, tips: 9 },
        { period: 'Sun', earnings: 1500, followers: 1247, views: 4100, tips: 7 }
      ],
      '30d': [
        { period: 'Week 1', earnings: 8500, followers: 1150, views: 25000, tips: 35 },
        { period: 'Week 2', earnings: 12000, followers: 1180, views: 28000, tips: 42 },
        { period: 'Week 3', earnings: 9500, followers: 1210, views: 31000, tips: 38 },
        { period: 'Week 4', earnings: 15000, followers: 1247, views: 35000, tips: 45 }
      ],
      '90d': [
        { period: 'Month 1', earnings: 45000, followers: 980, views: 120000, tips: 160 },
        { period: 'Month 2', earnings: 52000, followers: 1120, views: 140000, tips: 185 },
        { period: 'Month 3', earnings: 48000, followers: 1247, views: 156000, tips: 172 }
      ]
    };
    return baseData[period as keyof typeof baseData] || baseData['7d'];
  };

  const getRarityStyles = (rarity: Achievement['rarity']) => {
    const styles = {
      legendary: 'bg-purple-100 text-purple-700',
      epic: 'bg-orange-100 text-orange-700',
      rare: 'bg-blue-100 text-blue-700',
      common: 'bg-gray-100 text-gray-700'
    };
    return styles[rarity];
  };

  const getDifficultyStyles = (difficulty: Task['difficulty']) => {
    const styles = {
      hard: 'bg-red-100 text-red-700',
      medium: 'bg-yellow-100 text-yellow-700',
      easy: 'bg-green-100 text-green-700'
    };
    return styles[difficulty];
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

  const generateSVGPath = (
    data: GrowthDataPoint[], 
    metric: keyof Omit<GrowthDataPoint, 'period'>,
    maxValue: number,
    height: number = 192
  ): string => {
    const points = data.map((d, i) => {
      const x = (i * (100 / (data.length - 1)));
      const y = height - (d[metric] / maxValue) * 160;
      return `${i === 0 ? 'M' : 'L'} ${x}% ${y}`;
    }).join(' ');
    
    return points;
  };

  const generateAreaPath = (
    data: GrowthDataPoint[], 
    metric: keyof Omit<GrowthDataPoint, 'period'>,
    maxValue: number,
    height: number = 192
  ): string => {
    const linePath = generateSVGPath(data, metric, maxValue, height);
    return `${linePath} L 100% ${height} L 0 ${height} Z`;
  };

  // Computed data
  const statCards = [
    { 
      title: "Earnings", 
      value: `₦${(analyticsData.totalEarnings / 1000).toFixed(0)}k`, 
      change: "+12.5%",
      icon: DollarSign,
      color: "from-emerald-500 to-teal-600"
    },
    { 
      title: "Win Rate", 
      value: `${userStats.winRate}%`, 
      change: "+3.2%",
      icon: Target,
      color: "from-blue-500 to-indigo-600"
    },
    { 
      title: "Followers", 
      value: `${(userStats.followers / 1000).toFixed(1)}k`, 
      change: "+8.1%",
      icon: UserPlus,
      color: "from-purple-500 to-pink-600"
    },
    { 
      title: "Views", 
      value: `${(userStats.views / 1000).toFixed(0)}k`, 
      change: "+15.3%",
      icon: Eye,
      color: "from-orange-500 to-red-600"
    }
  ];

  const growthData = generateGrowthData(timeFilter);
  const maxValues = {
    earnings: Math.max(...growthData.map(d => d.earnings)),
    followers: Math.max(...growthData.map(d => d.followers)),
    views: Math.max(...growthData.map(d => d.views)),
    tips: Math.max(...growthData.map(d => d.tips))
  };

  const filteredLeaderboard = filterLeaderboard(selectedLeaderboard);
  const filteredTasks = selectedCategory === 'all' 
    ? tasks 
    : tasks.filter(task => task.category === selectedCategory);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Mobile-Optimized Stats - 2 rows of 2 cards */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
              {statCards.map((stat, idx) => (
                <div key={idx} className={`bg-gradient-to-br ${stat.color} rounded-xl p-3 md:p-4 text-white`}>
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
                    <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
                      {stat.change}
                    </span>
                  </div>
                  <div>
                    <p className="text-lg md:text-xl font-bold">{stat.value}</p>
                    <p className="text-xs opacity-90">{stat.title}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Growth Chart */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <h3 className="text-lg font-bold text-gray-900">Growth Analytics</h3>
                <div className="flex gap-2">
                  {(['7d', '30d', '90d'] as TimeFilter[]).map((period) => (
                    <button
                      key={period}
                      onClick={() => setTimeFilter(period)}
                      className={`px-3 py-1 text-xs md:text-sm rounded-lg transition-colors ${
                        timeFilter === period 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {/* Chart Legend */}
                <div className="flex flex-wrap gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <span>Earnings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Followers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span>Views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span>Tips</span>
                  </div>
                </div>

                {/* Multi-line Chart */}
                <div className="relative h-48 md:h-64">
                  <svg className="w-full h-full">
                    <defs>
                      <linearGradient id="earningsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.3"/>
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    
                    {/* Earnings Area */}
                    <path
                      d={generateAreaPath(growthData, 'earnings', maxValues.earnings, 192)}
                      fill="url(#earningsGradient)"
                    />
                    
                    {/* Earnings Line */}
                    <path
                      d={generateSVGPath(growthData, 'earnings', maxValues.earnings, 192)}
                      stroke="#10b981"
                      strokeWidth="3"
                      fill="none"
                    />

                    {/* Followers Line */}
                    <path
                      d={generateSVGPath(growthData, 'followers', maxValues.followers, 192)}
                      stroke="#3b82f6"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                    />

                    {/* Views Line */}
                    <path
                      d={generateSVGPath(growthData, 'views', maxValues.views, 192)}
                      stroke="#8b5cf6"
                      strokeWidth="2"
                      fill="none"
                    />

                    {/* Tips Line */}
                    <path
                      d={generateSVGPath(growthData, 'tips', maxValues.tips, 192)}
                      stroke="#f97316"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="3,3"
                    />
                  </svg>
                  
                  {/* X-axis labels */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 mt-2">
                    {growthData.map((d, i) => (
                      <span key={i}>{d.period}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements & Leaderboard */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Achievements with Upcoming (Locked) */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Medal className="w-5 h-5 text-yellow-600" />
                  Achievements
                </h3>
                <div className="space-y-3">
                  {achievements.map((achievement) => {
                    const progressPercent = achievement.progress && achievement.target 
                      ? (achievement.progress / achievement.target) * 100 
                      : 0;
                    return (
                      <div key={achievement.id} className={`p-3 rounded-xl border-2 transition-all ${
                        achievement.unlocked 
                          ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' 
                          : 'bg-gray-50 border-gray-200 relative'
                      }`}>
                        {!achievement.unlocked && (
                          <div className="absolute top-2 right-2">
                            <Lock className="w-4 h-4 text-gray-400" />
                          </div>
                        )}
                        <div className="flex items-center gap-3">
                          <div className={`text-2xl ${!achievement.unlocked ? 'grayscale opacity-50' : ''}`}>
                            {achievement.icon}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm text-gray-800">{achievement.name}</p>
                            <p className="text-xs text-gray-600">{achievement.description}</p>
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
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityStyles(achievement.rarity)}`}>
                            {achievement.rarity}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Leaderboard */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-600" />
                    Leaderboard
                  </h3>
                  <select 
                    value={selectedLeaderboard} 
                    onChange={(e) => setSelectedLeaderboard(e.target.value as LeaderboardType)}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-lg"
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
            </div>
          </div>
        );

      case 'creator':
        return (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Creator Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900">24/7 Support Chat</h3>
                  <p className="text-sm text-blue-700 mb-3">Get help with content creation, monetization, and platform features.</p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Start Chat</button>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-900">Creator Resources</h3>
                  <p className="text-sm text-green-700 mb-3">Access guides, templates, and best practices.</p>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm">View Resources</button>
                </div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-900">Partnership Program</h3>
                <p className="text-sm text-purple-700 mb-3">Join our exclusive creator partnership program for additional benefits.</p>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm">Learn More</button>
              </div>
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Setup</h2>
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900">Bank Account</h3>
                <p className="text-sm text-gray-600 mb-3">Add your bank account for withdrawals</p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Add Bank Account</button>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900">Payment History</h3>
                <p className="text-sm text-gray-600 mb-3">View your payment transactions</p>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm">View History</button>
              </div>
            </div>
          </div>
        );

      case 'ads':
        return (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Ads Center</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-semibold text-orange-900">Promote Your Tips</h3>
                <p className="text-sm text-orange-700 mb-3">Boost visibility of your best predictions</p>
                <button className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm">Create Ad</button>
              </div>
              <div className="p-4 bg-pink-50 rounded-lg">
                <h3 className="font-semibold text-pink-900">Ad Performance</h3>
                <p className="text-sm text-pink-700 mb-3">Track your advertising campaigns</p>
                <button className="px-4 py-2 bg-pink-600 text-white rounded-lg text-sm">View Analytics</button>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Profile Status</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-green-900">Profile Verification</h3>
                  <p className="text-sm text-green-700">Your profile is verified and active</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-900">Verified</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">Visibility Score</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Profile Views</span>
                      <span className="font-medium">8.5/10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-yellow-600" />
                    <h3 className="font-semibold text-gray-900">Engagement Rate</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>User Interaction</span>
                      <span className="font-medium">7.2/10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Profile Optimization Tips</h3>
                <ul className="space-y-1 text-sm text-blue-700">
                  <li>• Add a professional profile picture</li>
                  <li>• Complete your bio section</li>
                  <li>• Share more engaging content</li>
                  <li>• Respond to follower comments</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'settings':
        const notificationSettings = [
          { label: "Email notifications", enabled: true },
          { label: "Push notifications", enabled: true },
          { label: "SMS alerts", enabled: false },
          { label: "Weekly reports", enabled: true }
        ];

        const privacySettings = [
          { label: "Show earnings publicly", enabled: false },
          { label: "Allow direct messages", enabled: true },
          { label: "Show online status", enabled: true }
        ];

        const ToggleSwitch = ({ enabled }: { enabled: boolean }) => (
          <div className={`w-12 h-6 rounded-full p-1 transition-colors ${
            enabled ? 'bg-purple-600' : 'bg-gray-300'
          }`}>
            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
              enabled ? 'translate-x-6' : 'translate-x-0'
            }`}></div>
          </div>
        );

        return (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Settings</h2>
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                <div className="space-y-3">
                  {notificationSettings.map((setting, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-700">{setting.label}</span>
                      <ToggleSwitch enabled={setting.enabled} />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Privacy</h3>
                <div className="space-y-3">
                  {privacySettings.map((setting, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-700">{setting.label}</span>
                      <ToggleSwitch enabled={setting.enabled} />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
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
                <Crown className="w-6 h-6 text-purple-600" />
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Dashboard</h1>
                  <p className="text-xs text-gray-500">Level {userStats.level}</p>
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
    </div>
  );
}