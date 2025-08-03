// src/lib/profileType.ts

export type Status = 'Completed' | 'Pending' | 'Failed' | 'Won' | 'Lost' | 'Active' | 'Expired' | 'Verified';

export interface Bio {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  location: string;
  bio: string;
  gender: string;
  occupation: string;
  profilePicture?: File | null;
  interest: string[]; 
}

export interface BankDetails {
  bankName: string;
  accountName: string;
  accountNumber: string;
}

export interface KycDetails {
  type: string;
  number: string;
  document: File | null;
  note?: string; // Add note for decline or other info
}

export interface Wallet {
  balance: number;
  earning: number;
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