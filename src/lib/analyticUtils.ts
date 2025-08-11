// lib/utils.ts
import type { 
  GrowthDataPoint, 
  LeaderboardEntry, 
  Task, 
  Achievement,
  LeaderboardType 
} from "./analyticsTypes";

// Utility Functions
export const calculateMaxValues = (data: GrowthDataPoint[]) => ({
  earnings: Math.max(...data.map(d => d.earnings)),
  followers: Math.max(...data.map(d => d.followers)),
  views: Math.max(...data.map(d => d.views)),
  tips: Math.max(...data.map(d => d.tips))
});

export const filterLeaderboard = (
  leaderboard: LeaderboardEntry[], 
  type: LeaderboardType
): LeaderboardEntry[] => {
  switch (type) {
    case 'country':
      return leaderboard.filter(entry => entry.country === "Nigeria");
    case 'local':
      // Mock local filtering - in real app, filter by city/region
      return leaderboard.filter(entry => entry.country === "Nigeria").slice(0, 3);
    default:
      return leaderboard;
  }
};

export const filterTasks = (tasks: Task[], category: string): Task[] => {
  return category === 'all' 
    ? tasks 
    : tasks.filter(task => task.category === category);
};

export const getTaskProgress = (task: Task) => ({
  progressPercent: Math.min((task.progress / task.target) * 100, 100),
  isCompleted: task.progress >= task.target
});

export const getAchievementProgress = (achievement: Achievement) => {
  if (!achievement.progress || !achievement.target) return { progressPercent: 0 };
  return {
    progressPercent: (achievement.progress / achievement.target) * 100
  };
};

export const getRarityStyles = (rarity: Achievement['rarity']) => {
  const styles = {
    legendary: 'bg-purple-100 text-purple-700',
    epic: 'bg-orange-100 text-orange-700',
    rare: 'bg-blue-100 text-blue-700',
    common: 'bg-gray-100 text-gray-700'
  };
  return styles[rarity];
};

export const getDifficultyStyles = (difficulty: Task['difficulty']) => {
  const styles = {
    hard: 'bg-red-100 text-red-700',
    medium: 'bg-yellow-100 text-yellow-700',
    easy: 'bg-green-100 text-green-700'
  };
  return styles[difficulty];
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return num.toString();
};

export const formatCurrency = (amount: number): string => {
  return `₦${amount.toLocaleString()}`;
};

export const getActivityIcon = (type: string) => {
  const colors = {
    win: 'bg-emerald-500',
    tip: 'bg-blue-500',
    follower: 'bg-purple-500',
    achievement: 'bg-yellow-500'
  };
  return colors[type as keyof typeof colors] || 'bg-gray-500';
};

export const generateSVGPath = (
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

export const generateAreaPath = (
  data: GrowthDataPoint[], 
  metric: keyof Omit<GrowthDataPoint, 'period'>,
  maxValue: number,
  height: number = 192
): string => {
  const linePath = generateSVGPath(data, metric, maxValue, height);
  return `${linePath} L 100% ${height} L 0 ${height} Z`;
};

export const getLeaderboardIcon = (rank: number): string => {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return '🏅';
};

export const getXPProgress = (currentXP: number, nextLevelXP: number) => ({
  percentage: (currentXP / nextLevelXP) * 100,
  remaining: nextLevelXP - currentXP
});

export const getStreakBonus = (streak: number): number => {
  if (streak >= 30) return 3;
  if (streak >= 14) return 2;
  if (streak >= 7) return 1;
  return 0;
};