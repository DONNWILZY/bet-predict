// lib/data.ts
import { 
  DollarSign, 
  Target, 
  UserPlus, 
  Eye, 
  BarChart3, 
  HeadphonesIcon, 
  CreditCard, 
  Megaphone, 
  User, 
  Settings 
} from "lucide-react";
import type { 
  UserStats, 
  Achievement, 
  LeaderboardEntry, 
  Task, 
  RecentActivity, 
  GrowthDataPoint, 
  MenuItem, 
  StatCard,
  AnalyticsData 
} from "./analyticsTypes";

// Mock Analytics Data
export const mockAnalyticsData: AnalyticsData = {
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

// User Statistics
export const userStats: UserStats = {
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

// Achievements Data
export const achievements: Achievement[] = [
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

// Leaderboard Data
export const globalLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "BetKing_Pro", country: "Nigeria", flag: "🇳🇬", earnings: 850000, winRate: 89.2 },
  { rank: 2, name: "FootballWiz", country: "Ghana", flag: "🇬🇭", earnings: 720000, winRate: 85.1 },
  { rank: 3, name: "PredictMaster", country: "Kenya", flag: "🇰🇪", earnings: 680000, winRate: 83.7 },
  { rank: 4, name: "GoalGetter", country: "South Africa", flag: "🇿🇦", earnings: 620000, winRate: 81.3 },
  { rank: 5, name: "SportsSage", country: "Nigeria", flag: "🇳🇬", earnings: 580000, winRate: 79.8 },
  { rank: 156, name: "You", country: "Nigeria", flag: "🇳🇬", earnings: 125000, winRate: 68.5, isCurrentUser: true }
];

// Tasks Data
export const tasks: Task[] = [
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

// Recent Activities
export const recentActivities: RecentActivity[] = [
  { id: 1, type: 'win', description: 'Won bet on Chelsea vs Arsenal', time: '2 hours ago', amount: '+₦1,200' },
  { id: 2, type: 'tip', description: 'Created premium tip for El Clasico', time: '5 hours ago', amount: '+50 XP' },
  { id: 3, type: 'follower', description: '3 new followers', time: '1 day ago', amount: '+15 XP' },
  { id: 4, type: 'achievement', description: 'Unlocked "Consistent Player" badge', time: '2 days ago', amount: '+100 XP' }
];

// Menu Items
export const menuItems: MenuItem[] = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'creator', label: 'Creator Support', icon: HeadphonesIcon },
  { id: 'payment', label: 'Payment Setup', icon: CreditCard },
  { id: 'ads', label: 'Ads Center', icon: Megaphone },
  { id: 'profile', label: 'Profile Status', icon: User },
  { id: 'settings', label: 'Settings', icon: Settings }
];

// Stat Cards Data
export const getStatCards = (analytics: AnalyticsData, userStats: UserStats): StatCard[] => [
  { 
    title: "Earnings", 
    value: `₦${(analytics.totalEarnings / 1000).toFixed(0)}k`, 
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

// Growth Chart Data Generator
export const generateGrowthData = (period: string): GrowthDataPoint[] => {
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