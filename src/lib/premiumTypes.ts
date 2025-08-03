export interface Predictor {
  name: string;
  avatar: string;
  rating: number;
  followers: number;
  verified: boolean;
  winStreak: number;
}

export interface Game {
  team1: string;
  team2: string;
  logo1: string;
  logo2: string;
  prediction: string;
  odds: string;
  status: "correct" | "wrong" | "In-Progress" | null;
  date: string;
  time: string;
  stadium: string;
  league: string;
}

export interface Prediction {
  id: number;
  timestamp: string;
  predictor: Predictor;
  premium: boolean;
  price: number;
  views: number;
  likes: number;
  confidence: number;
  games: Game[];
  premiumTicketsViewed: number;
  paid: boolean;
  subscriptionId: string | null;
}

export interface ModernSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface Notification {
  id: number;
  type: 'tip' | 'follow' | 'like' | 'system';
  message: string;
  timestamp: string;
  read: boolean;
}

export interface Subscription {
  id: string;
  name: string;
  ticketsRemaining: number;
}

export interface BottomNavigationProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}