export type AdStatus = 'Active' | 'Paused' | 'Pending' | 'Rejected';
export type CampaignObjective = 'Brand_Awareness' | 'Reach' | 'Traffic' | 'Engagement' | 'App_Installs' | 'Video_Views' | 'Lead_Generation' | 'Conversions';
export type AdPlacement = 'Facebook_Feed' | 'Instagram_Feed' | 'Instagram_Stories' | 'Facebook_Stories' | 'Messenger' | 'Audience_Network' | 'Google_Search' | 'Google_Display' | 'YouTube';
export type BidStrategy = 'Lowest_Cost' | 'Cost_Cap' | 'Bid_Cap' | 'Target_Cost';
export type Gender = 'All' | 'Male' | 'Female' | 'Non_Binary';
export type AgeRange = '13-17' | '18-24' | '25-34' | '35-44' | '45-54' | '55-64' | '65+';
export type Section = 'demographics' | 'interests' | 'custom';

export interface Location {
  type: 'Country' | 'State' | 'City' | 'Radius';
  name: string;
  radius?: number;
}

export interface Demographics {
  gender: Gender;
  ageRanges: AgeRange[];
  locations: Location[];
  languages: string[];
}

export interface Interests {
  categories: string[];
  keywords: string[];
  behaviors: string[];
}

export interface Targeting {
  demographics: Demographics;
  interests: Interests;
  customAudiences: string[];
  lookalikePer: number;
}

export interface AdSchedule {
  enabled: boolean;
  timezone: string;
  schedule: {
    [key: string]: {
      enabled: boolean;
      startTime: string;
      endTime: string;
    };
  };
}

export interface AdData {
  id: number;
  title: string;
  description: string;
  budget: string;
  dailyBudget: string;
  totalBudget: string;
  status: AdStatus;
  created: string;
  startDate: string;
  endDate?: string;
  image?: File | null;
  objective: CampaignObjective;
  placements: AdPlacement[];
  bidStrategy: BidStrategy;
  bidAmount?: string;
  targeting: Targeting;
  schedule: AdSchedule;
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  spent: number;
  conversions: number;
}

export interface AdFormState {
  title: string;
  description: string;
  dailyBudget: string;
  totalBudget: string;
  startDate: string;
  endDate: string;
  image: File | null;
  objective: CampaignObjective;
  placements: AdPlacement[];
  bidStrategy: BidStrategy;
  bidAmount: string;
  targeting: Targeting;
  schedule: AdSchedule;
}