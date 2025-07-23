// src/lib/predictYtype.ts

// src/lib/predictYtype.ts
export interface Match {
  id: string | number;
  category: string;
  teamA: string;
  teamB: string;
  flagA: string;
  flagB: string;
  oddsA: string | number;
  oddsB: string | number;
  prediction: 'A' | 'B';
  result: string | null;
  date: string;
  time?: string;  // <-- Added this (optional because some matches don’t have time)
}

export interface TimeFrame {
  label: string;
  key: ContentKey;
}

export interface LeagueGroup {
  country: string;
  leagues: string[];
}

// Add this type
export type ContentKey =
  | "today"
  | "live"
  | "yesterday"
  | "tomorrow"
  | "weekend"
  | "all"
  | "top"
  | "nigerian"
  | `league-${string}`
  | "default";

export interface TimeFrame {
  label: string;
  key: ContentKey;
}
