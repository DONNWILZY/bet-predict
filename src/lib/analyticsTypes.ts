// lib/types.ts
export interface AnalyticsData {
  totalEarnings: number;
  weeklyTips: Array<{ week: string; tips: number }>;
  weeklyEarnings: Array<{ week: string; earnings: number }>;
}

export interface Achievement {
  id: number;
  name: string;
  icon: string;
  unlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  description: string;
  progress?: number;
  target?: number;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  country: string;
  flag: string;
  earnings: number;
  winRate: number;
  isCurrentUser?: boolean;
}

export interface UserStats {
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

export interface Task {
  id: string;
  description: string;
  progress: number;
  target: number;
  reward: string;
  category: 'betting' | 'social' | 'engagement' | 'premium';
  difficulty: 'easy' | 'medium' | 'hard';
  xp: number;
}

export interface RecentActivity {
  id: number;
  type: 'win' | 'tip' | 'follower' | 'achievement';
  description: string;
  time: string;
  amount: string;
}

export interface GrowthDataPoint {
  period: string;
  earnings: number;
  followers: number;
  views: number;
  tips: number;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: any; // LucideIcon type
}

export interface StatCard {
  title: string;
  value: string;
  change: string;
  icon: any; // LucideIcon type
  color: string;
}

export type TabType = 'overview' | 'creator' | 'payment' | 'ads' | 'profile' | 'settings';
export type TimeFilter = '7d' | '30d' | '90d';
export type LeaderboardType = 'global' | 'country' | 'local';