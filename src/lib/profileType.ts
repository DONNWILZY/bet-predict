// src/lib/profileType.ts

export type Status = 'Completed' | 'Pending' | 'Failed' | 'Won' | 'Lost' | 'Active' | 'Expired' | 'Approved'| 'APPROVED' | 'DECLINED' | 'Declined' | 'Reviewing' | 'REVIEWING' | 'PENDING' | 'DECLINED' | 'REVIEWING';



export interface Bio {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  location: string;
  bio: string;
  gender: string;
  interests: string[];
  occupation: string;
  profilePicture?: File | null; // <-- OPTIONAL
  interest: string[]; 
  userName: string;             // <-- REQUIRED
}



export interface BankDetails {
  id: string;
  userId: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
}

export interface KycDetails {
  id: string;
  userId: string;
  type: string;
  number: string;
  status: Status | string;
  document: string | File | null;
  note?: string; // Add note for decline or other info
}

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  earning: number;
  points: number;
}

export interface Transaction {
  id: number;
  type: string;
  amount: number;
  status: Status;
  date: string;
  time: string;
}

export interface Ticket {
  id: number;
  ticketNo: string;
  status: Status;
  amount: number;
  odds?: string; // Optional, as it's only used in myTickets
  predictor?: string; // Optional, as it's only used in purchasedTickets
}

export interface Subscription {
  id: number;
  plan: string;
  status: Status;
  expires: string;
  price: string;

}

export interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}