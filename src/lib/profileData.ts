import { Bio, BankDetails, KycDetails, Wallet, Transaction, Ticket, Subscription, NavItem } from './profileType';
import {
  LayoutDashboard,
  User,
  FileText,
  CreditCard,
  History,
  Stars,
  Settings,
} from 'lucide-react';

export const defaultBio: Bio = {
  name: 'GODSWILL EFFIONG',
  email: 'godswillee@gmail.com',
  phone: '+234 123 456 7890',
  dateOfBirth: '1990-05-15',
  location: 'Lagos, Nigeria',
  bio: 'Passionate sports predictor with 5+ years of experience in football analytics.',
  gender: 'Male',
  occupation: 'Sports Analyst',
};

export const defaultBankDetails: BankDetails = {
  bankName: 'First Bank of Nigeria',
  accountName: 'John Doe',
  accountNumber: '1234567890',

};

export const defaultKycDetails: KycDetails = {
  type: '',
  number: '',
  document: null,
};

export const defaultWallet: Wallet = {
  balance: 125000,
  earning: 15750,
};

export const transactions: Transaction[] = [
  { id: 1, type: 'Deposit', amount: 50000, status: 'Completed', date: '2024-06-24', time: '14:30' },
  { id: 2, type: 'Withdrawal', amount: 20000, status: 'Pending', date: '2024-06-23', time: '09:15' },
  { id: 3, type: 'Prediction Win', amount: 7500, status: 'Completed', date: '2024-06-22', time: '18:45' },
  { id: 4, type: 'Ticket Purchase', amount: -2500, status: 'Completed', date: '2024-06-21', time: '11:20' },
];

export const myTickets: Ticket[] = [
  { id: 1, ticketNo: 'TCK-123456', status: 'Won', amount: 7500, odds: '2.5x' },
  { id: 2, ticketNo: 'TCK-654321', status: 'Lost', amount: -2500, odds: '3.2x' },
  { id: 3, ticketNo: 'TCK-789012', status: 'Pending', amount: 0, odds: '1.8x' },
];

export const purchasedTickets: Ticket[] = [
  { id: 1, ticketNo: 'TCK-111222', status: 'Pending', amount: 0, predictor: 'SportsPro' },
  { id: 2, ticketNo: 'TCK-333444', status: 'Won', amount: 5000, predictor: 'BetMaster' },
];

export const subscriptions: Subscription[] = [
  { id: 1, plan: 'Premium Monthly', status: 'Active', expires: '2024-07-25', price: '₦5,000' },
  { id: 2, plan: 'Pro Weekly', status: 'Expired', expires: '2024-06-01', price: '₦1,500' },
];

export const navItems: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'tickets', label: 'Tickets', icon: FileText },
  { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard },
  { id: 'transactions', label: 'Transactions', icon: History },
  { id: 'adverts', label: 'Adverts', icon: Stars },
  { id: 'settings', label: 'Settings', icon: Settings },
];