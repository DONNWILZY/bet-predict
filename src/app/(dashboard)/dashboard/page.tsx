"use client";

import Adverts from "./adverts";

import { useState } from "react";
import {
  User,
  FileText,
  ShieldCheck,
  CreditCard,
  History,
  ArrowDownCircle,
  ArrowUpCircle,
  Settings,
  LogOut,
  LayoutDashboard,
  ChevronDown,
  ChevronUp,
  Star,
  ArrowLeft,
  Home,
  LifeBuoy,
  Paintbrush,
  KeyRound,
  Shield,
  Wallet,
  TrendingUp,
  Calendar,
  MoreHorizontal,
  Bell,
  Search,
  Plus,
  Eye,
  EyeOff,
  Copy,
  Award,
  Activity,
  Stars
} from "lucide-react";

export default function ModernDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showBalance, setShowBalance] = useState(true);
  const [bio, setBio] = useState({ 
    name: "GODSWILL EFFIONG", 
    email: "godswillee@gmail.com", 
    phone: "+234 123 456 7890",
    dateOfBirth: "1990-05-15",
    location: "Lagos, Nigeria",
    bio: "Passionate sports predictor with 5+ years of experience in football analytics.",
    gender: "Male",
    occupation: "Sports Analyst"
  });
  const [kycStatus, setKycStatus] = useState("Verified");
  const [bankDetails, setBankDetails] = useState({
    bankName: "First Bank of Nigeria",
    accountName: "John Doe",
    accountNumber: "1234567890"
  });
  const [kycDetails, setKycDetails] = useState({
    type: "",
    number: "",
    document: null
  });
  const [isEditing, setIsEditing] = useState(false);
  const [wallet, setWallet] = useState({ balance: 125000, earning: 15750 });
  const [ticketTab, setTicketTab] = useState("my");
  const isPredictor = true;

  const transactions = [
    { id: 1, type: "Deposit", amount: 50000, status: "Completed", date: "2024-06-24", time: "14:30" },
    { id: 2, type: "Withdrawal", amount: 20000, status: "Pending", date: "2024-06-23", time: "09:15" },
    { id: 3, type: "Prediction Win", amount: 7500, status: "Completed", date: "2024-06-22", time: "18:45" },
    { id: 4, type: "Ticket Purchase", amount: -2500, status: "Completed", date: "2024-06-21", time: "11:20" },
  ];

  const myTickets = [
    { id: 1, ticketNo: "TCK-123456", status: "Won", amount: 7500, odds: "2.5x" },
    { id: 2, ticketNo: "TCK-654321", status: "Lost", amount: -2500, odds: "3.2x" },
    { id: 3, ticketNo: "TCK-789012", status: "Pending", amount: 0, odds: "1.8x" },
  ];

  const purchasedTickets = [
    { id: 1, ticketNo: "TCK-111222", status: "Pending", amount: 0, predictor: "SportsPro" },
    { id: 2, ticketNo: "TCK-333444", status: "Won", amount: 5000, predictor: "BetMaster" },
  ];

  const subscriptions = [
    { id: 1, plan: "Premium Monthly", status: "Active", expires: "2024-07-25", price: "₦5,000" },
    { id: 2, plan: "Pro Weekly", status: "Expired", expires: "2024-06-01", price: "₦1,500" },
  ];

  const getStatusColor = (status) => {
    const colors = {
      Completed: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      Pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      Failed: "bg-red-500/10 text-red-500 border-red-500/20",
      Won: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      Lost: "bg-red-500/10 text-red-500 border-red-500/20",
      Active: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      Expired: "bg-gray-500/10 text-gray-400 border-gray-500/20",
      Verified: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    };

    return colors[status] || "bg-gray-500/10 text-gray-400 border-gray-500/20";
  };

  const StatCard = ({ title, value, change, icon: Icon, trend }) => (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl">
          <Icon className="w-5 h-5 text-blue-400" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium ${trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
          {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <ArrowDownCircle className="w-3 h-3" />}
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
            <h1 className="text-2xl font-bold text-white mb-2">Welcome back, {bio.name.split(' ')[0]}! 👋</h1>
            <p className="text-gray-300">Here's what's happening with your account today.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
              <Bell className="w-5 h-5 text-white" />
            </button>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold">
              {bio.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Balance"
          value={showBalance ? `₦${wallet.balance.toLocaleString()}` : "₦••••••"}
          change="+12.5%"
          icon={Wallet}
          trend="up"
        />
        <StatCard
          title="Total Earnings"
          value={showBalance ? `₦${wallet.earning.toLocaleString()}` : "₦••••••"}
          change="+8.2%"
          icon={TrendingUp}
          trend="up"
        />
        <StatCard
          title="Active Tickets"
          value="3"
          change="+2"
          icon={FileText}
          trend="up"
        />
        <StatCard
          title="Win Rate"
          value="78%"
          change="+5%"
          icon={Award}
          trend="up"
        />
      </div> */}

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
                {showBalance ? <Eye className="w-4 h-4 text-gray-400" /> : <EyeOff className="w-4 h-4 text-gray-400" />}
              </button>
            </div>
            <div className="text-4xl font-bold text-white mb-2">
              {showBalance ? `₦${wallet.balance.toLocaleString()}` : "₦••••••••"}
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-300">
                Earnings: <span className="text-emerald-400 font-semibold">₦{wallet.earning.toLocaleString()}</span>
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
          <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">View All</button>
        </div>
        <div className="space-y-4">
          {transactions.slice(0, 3).map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-xl ${tx.type === 'Deposit' ? 'bg-emerald-500/20' : tx.type === 'Withdrawal' ? 'bg-red-500/20' : 'bg-blue-500/20'}`}>
                  {tx.type === 'Deposit' ? <ArrowDownCircle className="w-4 h-4 text-emerald-400" /> : 
                   tx.type === 'Withdrawal' ? <ArrowUpCircle className="w-4 h-4 text-red-400" /> : 
                   <Activity className="w-4 h-4 text-blue-400" />}
                </div>
                <div>
                  <p className="text-white font-medium">{tx.type}</p>
                  <p className="text-gray-400 text-sm">{tx.date} at {tx.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${tx.amount > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
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

  const renderProfile = () => (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
                {bio.name.split(' ').map(n => n[0]).join('')}
              </div>
              <button className="absolute -bottom-2 -right-2 p-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-white transition-colors">
                <User className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{bio.name}</h2>
              <p className="text-gray-400 mb-2">{bio.email}</p>
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(kycStatus)}`}>
                  KYC {kycStatus}
                </span>
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-sm">
                  Premium Member
                </span>
              </div>
              <p className="text-gray-300 text-sm max-w-md">{bio.bio}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-6 py-3 rounded-xl font-medium transition-colors ${
              isEditing 
                ? "bg-emerald-600 hover:bg-emerald-500 text-white" 
                : "bg-blue-600 hover:bg-blue-500 text-white"
            }`}
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
        <h3 className="text-xl font-semibold text-white mb-6">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
            <input
              className={`w-full p-4 rounded-xl border text-white placeholder-gray-400 transition-all ${
                isEditing 
                  ? "bg-white/5 border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20" 
                  : "bg-white/5 border-white/5 cursor-not-allowed opacity-60"
              }`}
              value={bio.name}
              onChange={(e) => isEditing && setBio({ ...bio, name: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <input
              className={`w-full p-4 rounded-xl border text-white placeholder-gray-400 transition-all ${
                isEditing 
                  ? "bg-white/5 border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20" 
                  : "bg-white/5 border-white/5 cursor-not-allowed opacity-60"
              }`}
              value={bio.email}
              onChange={(e) => isEditing && setBio({ ...bio, email: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
            <input
              className={`w-full p-4 rounded-xl border text-white placeholder-gray-400 transition-all ${
                isEditing 
                  ? "bg-white/5 border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20" 
                  : "bg-white/5 border-white/5 cursor-not-allowed opacity-60"
              }`}
              value={bio.phone}
              onChange={(e) => isEditing && setBio({ ...bio, phone: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Date of Birth</label>
            <input
              type="date"
              className={`w-full p-4 rounded-xl border text-white placeholder-gray-400 transition-all ${
                isEditing 
                  ? "bg-white/5 border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20" 
                  : "bg-white/5 border-white/5 cursor-not-allowed opacity-60"
              }`}
              value={bio.dateOfBirth}
              onChange={(e) => isEditing && setBio({ ...bio, dateOfBirth: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
            <input
              className={`w-full p-4 rounded-xl border text-white placeholder-gray-400 transition-all ${
                isEditing 
                  ? "bg-white/5 border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20" 
                  : "bg-white/5 border-white/5 cursor-not-allowed opacity-60"
              }`}
              value={bio.location}
              onChange={(e) => isEditing && setBio({ ...bio, location: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
            <select
              className={`w-full p-4 rounded-xl border text-white transition-all ${
                isEditing 
                  ? "bg-white/5 border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20" 
                  : "bg-white/5 border-white/5 cursor-not-allowed opacity-60"
              }`}
              value={bio.gender}
              onChange={(e) => isEditing && setBio({ ...bio, gender: e.target.value })}
              disabled={!isEditing}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Occupation</label>
            <input
              className={`w-full p-4 rounded-xl border text-white placeholder-gray-400 transition-all ${
                isEditing 
                  ? "bg-white/5 border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20" 
                  : "bg-white/5 border-white/5 cursor-not-allowed opacity-60"
              }`}
              value={bio.occupation}
              onChange={(e) => isEditing && setBio({ ...bio, occupation: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
            <textarea
              rows="4"
              className={`w-full p-4 rounded-xl border text-white placeholder-gray-400 transition-all resize-none ${
                isEditing 
                  ? "bg-white/5 border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20" 
                  : "bg-white/5 border-white/5 cursor-not-allowed opacity-60"
              }`}
              value={bio.bio}
              onChange={(e) => isEditing && setBio({ ...bio, bio: e.target.value })}
              disabled={!isEditing}
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>
      </div>

      {/* Bank Account Details */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-emerald-500/20 rounded-xl">
            <CreditCard className="w-5 h-5 text-emerald-400" />
          </div>
          <h3 className="text-xl font-semibold text-white">Bank Account Details</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Bank Name</label>
            <select
              className={`w-full p-4 rounded-xl border text-white transition-all ${
                isEditing 
                  ? "bg-white/5 border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20" 
                  : "bg-white/5 border-white/5 cursor-not-allowed opacity-60"
              }`}
              value={bankDetails.bankName}
              onChange={(e) => isEditing && setBankDetails({ ...bankDetails, bankName: e.target.value })}
              disabled={!isEditing}
            >
              <option value="">Select Bank</option>
              <option value="First Bank of Nigeria">First Bank of Nigeria</option>
              <option value="Access Bank">Access Bank</option>
              <option value="GTBank">GTBank</option>
              <option value="UBA">UBA</option>
              <option value="Zenith Bank">Zenith Bank</option>
              <option value="Sterling Bank">Sterling Bank</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Account Name</label>
            <input
              className={`w-full p-4 rounded-xl border text-white placeholder-gray-400 transition-all ${
                isEditing 
                  ? "bg-white/5 border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20" 
                  : "bg-white/5 border-white/5 cursor-not-allowed opacity-60"
              }`}
              value={bankDetails.accountName}
              onChange={(e) => isEditing && setBankDetails({ ...bankDetails, accountName: e.target.value })}
              disabled={!isEditing}
              placeholder="Account holder name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Account Number</label>
            <input
              className={`w-full p-4 rounded-xl border text-white placeholder-gray-400 transition-all ${
                isEditing 
                  ? "bg-white/5 border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20" 
                  : "bg-white/5 border-white/5 cursor-not-allowed opacity-60"
              }`}
              value={bankDetails.accountNumber}
              onChange={(e) => isEditing && setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
              disabled={!isEditing}
              placeholder="10-digit account number"
              maxLength="10"
            />
          </div>
          <div className="flex items-end">
            <button
              className={`w-full px-6 py-4 rounded-xl font-medium transition-colors ${
                isEditing
                  ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                  : "bg-white/5 text-gray-400 cursor-not-allowed"
              }`}
              disabled={!isEditing}
            >
              Verify Account
            </button>
          </div>
        </div>
      </div>

      {/* KYC Verification */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">KYC Verification</h3>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(kycStatus)}`}>
            {kycStatus}
          </span>
        </div>
        
        {kycStatus !== "Verified" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Document Type</label>
              <select
                className={`w-full p-4 rounded-xl border text-white transition-all ${
                  isEditing 
                    ? "bg-white/5 border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20" 
                    : "bg-white/5 border-white/5 cursor-not-allowed opacity-60"
                }`}
                value={kycDetails.type}
                onChange={(e) => isEditing && setKycDetails({ ...kycDetails, type: e.target.value })}
                disabled={!isEditing}
              >
                <option value="">Select Document Type</option>
                <option value="national_id">National ID</option>
                <option value="drivers_license">Driver's License</option>
                <option value="passport">International Passport</option>
                <option value="voters_card">Voter's Card</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Document Number</label>
              <input
                className={`w-full p-4 rounded-xl border text-white placeholder-gray-400 transition-all ${
                  isEditing 
                    ? "bg-white/5 border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20" 
                    : "bg-white/5 border-white/5 cursor-not-allowed opacity-60"
                }`}
                value={kycDetails.number}
                onChange={(e) => isEditing && setKycDetails({ ...kycDetails, number: e.target.value })}
                disabled={!isEditing}
                placeholder="Enter document number"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Upload Document</label>
              <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                isEditing 
                  ? "border-white/20 hover:border-blue-500/50 cursor-pointer" 
                  : "border-white/10 cursor-not-allowed opacity-60"
              }`}>
                <FileText className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-300 mb-2">Click to upload or drag and drop</p>
                <p className="text-gray-400 text-sm">PNG, JPG, PDF up to 5MB</p>
                <input 
                  type="file" 
                  className="hidden" 
                  disabled={!isEditing}
                  accept=".png,.jpg,.jpeg,.pdf"
                />
              </div>
            </div>
            {isEditing && (
              <div className="md:col-span-2">
                <button className="w-full bg-amber-600 hover:bg-amber-500 text-white px-6 py-4 rounded-xl font-medium transition-colors">
                  Submit KYC Documents
                </button>
              </div>
            )}
          </div>
        )}
        
        {kycStatus === "Verified" && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Verification Complete</h4>
            <p className="text-gray-400">Your identity has been verified successfully.</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderTickets = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">My Tickets</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setTicketTab("my")}
            className={`px-4 py-2 rounded-xl font-medium transition-colors ${
              ticketTab === "my" 
                ? "bg-blue-600 text-white" 
                : "bg-white/5 text-gray-300 hover:bg-white/10"
            }`}
          >
            My Predictions
          </button>
          <button
            onClick={() => setTicketTab("purchased")}
            className={`px-4 py-2 rounded-xl font-medium transition-colors ${
              ticketTab === "purchased" 
                ? "bg-blue-600 text-white" 
                : "bg-white/5 text-gray-300 hover:bg-white/10"
            }`}
          >
            Purchased
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {(ticketTab === "my" ? myTickets : purchasedTickets).map((ticket) => (
          <div key={ticket.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-xl">
                  <FileText className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="font-mono text-blue-300 font-medium">{ticket.ticketNo}</p>
                  {ticketTab === "purchased" && (
                    <p className="text-gray-400 text-sm">by {ticket.predictor}</p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(ticket.status)}`}>
                  {ticket.status}
                </span>
                {ticketTab === "my" && (
                  <p className="text-gray-400 text-sm mt-1">Odds: {ticket.odds}</p>
                )}
              </div>
            </div>
            {ticket.amount !== 0 && (
              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <span className="text-gray-300">Amount</span>
                <span className={`font-semibold ${ticket.amount > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {ticket.amount > 0 ? '+' : ''}₦{Math.abs(ticket.amount).toLocaleString()}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderTransactions = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Transaction History</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors">
            Filter
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors">
            Export
          </button>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left p-6 text-gray-300 font-medium">Transaction</th>
                <th className="text-left p-6 text-gray-300 font-medium">Date & Time</th>
                <th className="text-left p-6 text-gray-300 font-medium">Amount</th>
                <th className="text-left p-6 text-gray-300 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, index) => (
                <tr key={tx.id} className={`${index !== transactions.length - 1 ? 'border-b border-white/5' : ''} hover:bg-white/5 transition-colors`}>
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${tx.type === 'Deposit' ? 'bg-emerald-500/20' : tx.type === 'Withdrawal' ? 'bg-red-500/20' : 'bg-blue-500/20'}`}>
                        {tx.type === 'Deposit' ? <ArrowDownCircle className="w-4 h-4 text-emerald-400" /> : 
                         tx.type === 'Withdrawal' ? <ArrowUpCircle className="w-4 h-4 text-red-400" /> : 
                         <Activity className="w-4 h-4 text-blue-400" />}
                      </div>
                      <span className="text-white font-medium">{tx.type}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="text-white">{tx.date}</div>
                    <div className="text-gray-400 text-sm">{tx.time}</div>
                  </td>
                  <td className="p-6">
                    <span className={`font-semibold ${tx.amount > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {tx.amount > 0 ? '+' : ''}₦{Math.abs(tx.amount).toLocaleString()}
                    </span>
                  </td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(tx.status)}`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

   

  const renderSettings = () => (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-white">Settings</h1>
      
      <div className="grid gap-6">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Security</h3>
          <div className="space-y-4">
            <button className="w-full flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-left">
              <div className="p-2 bg-blue-500/20 rounded-xl">
                <KeyRound className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-white font-medium">Change Password</p>
                <p className="text-gray-400 text-sm">Update your account password</p>
              </div>
            </button>
            <button className="w-full flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-left">
              <div className="p-2 bg-emerald-500/20 rounded-xl">
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-white font-medium">Two-Factor Authentication</p>
                <p className="text-gray-400 text-sm">Add an extra layer of security</p>
              </div>
            </button>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Preferences</h3>
          <div className="space-y-4">
            <button className="w-full flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-left">
              <div className="p-2 bg-purple-500/20 rounded-xl">
                <Paintbrush className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-white font-medium">Theme Settings</p>
                <p className="text-gray-400 text-sm">Customize your dashboard appearance</p>
              </div>
            </button>
            <button className="w-full flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-left">
              <div className="p-2 bg-amber-500/20 rounded-xl">
                <Bell className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-white font-medium">Notifications</p>
                <p className="text-gray-400 text-sm">Manage your notification preferences</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "overview": return renderOverview();
      case "profile": return renderProfile();
      case "tickets": return renderTickets();
      case "transactions": return renderTransactions();
      case "settings": return renderSettings();
      case "adverts": return <Adverts />;
      default: return renderOverview();
    }
  };

  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "profile", label: "Profile", icon: User },
    { id: "tickets", label: "Tickets", icon: FileText },
    { id: "subscriptions", label: "Subscriptions", icon: CreditCard }, // Changed icon to CreditCard for subscriptions
    { id: "transactions", label: "Transactions", icon: History },
    { id: "adverts", label: "Adverts", icon: Stars },
    { id: "settings", label: "Settings", icon: Settings },
  ];

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
                  ? "bg-blue-600 text-white" 
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
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
                      ? "bg-blue-600/20 text-blue-400 border border-blue-500/30" 
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
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
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}