"use client";
import { useState } from 'react';
import {
  User,
  FileText,
  ShieldCheck,
  CreditCard,
  History,
  ArrowDownCircle,
  ArrowUpCircle,
  Settings as SettingsIcon,
  LogOut,
  LayoutDashboard,
  MoreHorizontal,
  Bell,
  TrendingUp,
  Award,
  Activity,
  EyeOff,
  Plus,
  LifeBuoy,
  Eye,
} from 'lucide-react';
import {
  Bio,
  BankDetails,
  KycDetails,
  Wallet,
  Transaction as TransactionType,
  Ticket,
  Subscription,
  NavItem,
  Status,
} from '@/lib/profileType';
import {
  defaultBio,
  defaultBankDetails,
  defaultKycDetails,
  defaultWallet,
  transactions,
  myTickets,
  purchasedTickets,
  subscriptions,
  navItems,
} from '@/lib/profileData';
import Adverts from './adverts';
import Profile from './Profile';
import Settings from './Settings';
import Transaction from './Transaction';
import Tickets from './Tickets';
import SubscriptionComponent from './Subscription';


export default function ModernDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showBalance, setShowBalance] = useState(true);
  const [bio, setBio] = useState<Bio>(defaultBio);
  const [kycStatus, setKycStatus] = useState<Status>('Pending');
  const [bankDetails, setBankDetails] = useState<BankDetails>(defaultBankDetails);
  const [kycDetails, setKycDetails] = useState<KycDetails>(defaultKycDetails);
  const [isEditing, setIsEditing] = useState(false);
  const [wallet, setWallet] = useState<Wallet>(defaultWallet);
  const [ticketTab, setTicketTab] = useState<'my' | 'purchased'>('my');
  const isPredictor = true;

  const getStatusColor = (status: Status): string => {
    const colors: Record<Status, string> = {
      Completed: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
      Pending: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
      Failed: 'bg-red-500/10 text-red-500 border-red-500/20',
      Won: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
      Lost: 'bg-red-500/10 text-red-500 border-red-500/20',
      Active: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      Expired: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
      Verified: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    };
    return colors[status] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  };

  const StatCard = ({
    title,
    value,
    change,
    icon: Icon,
    trend,
  }: {
    title: string;
    value: string;
    change: string;
    icon: React.ComponentType<{ className?: string }>;
    trend: 'up' | 'down';
  }) => (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl">
          <Icon className="w-5 h-5 text-blue-400" />
        </div>
        <div
          className={`flex items-center gap-1 text-xs font-medium ${
            trend === 'up' ? 'text-emerald-400' : 'text-red-400'
          }`}
        >
          {trend === 'up' ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <ArrowDownCircle className="w-3 h-3" />
          )}
          {change}
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold text-white mb-1">{value}</p>
        <p className="text-sm text-gray-400">{title}</p>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 border border-white/10 rounded-2xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Welcome back, {bio.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-gray-300">Here's what's happening with your account today.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
              <Bell className="w-5 h-5 text-white" />
            </button>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold">
              {bio.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Balance"
          value={showBalance ? `₦${wallet.balance.toLocaleString()}` : '₦••••••'}
          change="+12.5%"
          icon={CreditCard}
          trend="up"
        />
        <StatCard
          title="Total Earnings"
          value={showBalance ? `₦${wallet.earning.toLocaleString()}` : '₦••••••'}
          change="+8.2%"
          icon={TrendingUp}
          trend="up"
        />
        <StatCard title="Active Tickets" value="3" change="+2" icon={FileText} trend="up" />
        <StatCard title="Win Rate" value="78%" change="+5%" icon={Award} trend="up" />
      </div>

      {/* Wallet Balance Card */}
      <div className="bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 border border-white/10 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-lg font-semibold text-white">Wallet Balance</h2>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                {showBalance ? (
                  <Eye className="w-4 h-4 text-gray-400" />
                ) : (
                  <EyeOff className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
            <div className="text-4xl font-bold text-white mb-2">
              {showBalance ? `₦${wallet.balance.toLocaleString()}` : '₦••••••••'}
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-300">
                Earnings:{' '}
                <span className="text-emerald-400 font-semibold">
                  ₦{wallet.earning.toLocaleString()}
                </span>
              </span>
              <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(kycStatus)}`}>
                KYC {kycStatus}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
            <ArrowDownCircle className="w-4 h-4" />
            Deposit
          </button>
          <button className="flex-1 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
            <ArrowUpCircle className="w-4 h-4" />
            Withdraw
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-xl">
              <Award className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">78%</div>
              <div className="text-sm text-gray-400">Win Rate</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <TrendingUp className="w-3 h-3 text-emerald-400" />
            <span className="text-emerald-400 font-medium">+5% this month</span>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl">
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">3</div>
              <div className="text-sm text-gray-400">Active Tickets</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Plus className="w-3 h-3 text-blue-400" />
            <span className="text-blue-400 font-medium">2 new today</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
          <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {transactions.slice(0, 3).map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-2 rounded-xl ${
                    tx.type === 'Deposit'
                      ? 'bg-emerald-500/20'
                      : tx.type === 'Withdrawal'
                      ? 'bg-red-500/20'
                      : 'bg-blue-500/20'
                  }`}
                >
                  {tx.type === 'Deposit' ? (
                    <ArrowDownCircle className="w-4 h-4 text-emerald-400" />
                  ) : tx.type === 'Withdrawal' ? (
                    <ArrowUpCircle className="w-4 h-4 text-red-400" />
                  ) : (
                    <Activity className="w-4 h-4 text-blue-400" />
                  )}
                </div>
                <div>
                  <p className="text-white font-medium">{tx.type}</p>
                  <p className="text-gray-400 text-sm">
                    {tx.date} at {tx.time}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`font-semibold ${
                    tx.amount > 0 ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  {tx.amount > 0 ? '+' : ''}₦{Math.abs(tx.amount).toLocaleString()}
                </p>
                <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(tx.status)}`}>
                  {tx.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'profile':
        return (
          <Profile
            bio={bio}
            setBio={setBio}
            kycStatus={kycStatus}
            setKycStatus={setKycStatus}
            bankDetails={bankDetails}
            setBankDetails={setBankDetails}
            kycDetails={kycDetails}
            setKycDetails={setKycDetails}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            getStatusColor={getStatusColor}
          />
        );
      case 'tickets':
        return <Tickets ticketTab={ticketTab} setTicketTab={setTicketTab} getStatusColor={getStatusColor} />;
      case 'transactions':
        return <Transaction getStatusColor={getStatusColor} />;
      case 'subscriptions':
        return <SubscriptionComponent getStatusColor={getStatusColor} />;
      case 'settings':
        return <Settings />;
      case 'adverts':
        return <Adverts />;
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Mobile Header */}
      <div className="lg:hidden bg-black/20 backdrop-blur-sm border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button className="p-2 bg-white/10 rounded-xl">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden bg-black/20 backdrop-blur-sm border-b border-white/10 p-2">
        <div className="flex gap-1 overflow-x-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-80 min-h-screen bg-black/20 backdrop-blur-sm border-r border-white/10 flex-col">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-auto p-8 border-t border-white/10">
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                <LifeBuoy className="w-5 h-5" />
                <span>Support</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">{renderContent()}</main>
      </div>
    </div>
  );
}