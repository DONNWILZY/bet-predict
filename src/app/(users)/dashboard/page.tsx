"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { requireRole } from "@/lib/auth/checkAuth";
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

// Constants for storage keys and API URL
const ACCESS_TOKEN_KEY = "accessToken";
const USER_KEY = "user";
const API_URL = "http://127.0.0.1:5000";

// Function to fetch user profile
async function fetchUserProfile() {
  try {
    const accessToken = sessionStorage.getItem(ACCESS_TOKEN_KEY);
    const userData = JSON.parse(localStorage.getItem(USER_KEY) || "{}");

    if (!accessToken || !userData.id) {
      throw new Error("Access token or user ID not found");
    }

    const response = await fetch(`${API_URL}/api/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (data.success && data.code === 200) {
      return data.profile;
    } else {
      throw new Error(data.message || "Failed to fetch profile");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching user profile:", error.message);
    } else {
      console.error("Error fetching user profile:", error);
    }
    throw error;
  }
}

// Function to fetch recent transactions (limited to 5)
async function fetchUserTransactions() {
  try {
    const accessToken = sessionStorage.getItem(ACCESS_TOKEN_KEY);
    const userData = JSON.parse(localStorage.getItem(USER_KEY) || "{}");

    if (!accessToken || !userData.id) {
      throw new Error("Access token or user ID not found");
    }

    const response = await fetch(`${API_URL}/api/transactions/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (data.success) {
      // Assuming response is { success: true, transactions: [...] }
      // Limit to 5 transactions
      return data.transactions.slice(0, 5).map((tx: { id: any; type: any; date: string | number | Date; amount: any; status: any; }) => ({
        id: tx.id,
        type: tx.type, // e.g., "Deposit", "Withdrawal"
        date: new Date(tx.date).toLocaleDateString(), // Format date
        time: new Date(tx.date).toLocaleTimeString(), // Format time
        amount: tx.amount, // Numeric amount
        status: tx.status // e.g., "Completed", "Pending"
      }));
    } else {
      throw new Error(data.message || "Failed to fetch transactions");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching user transactions:", error.message);
    } else {
      console.error("Error fetching user transactions:", error);
    }
    throw error;
  }
}

export default function ModernDashboard() {
  // AUTHENTICATION MIDDLEWARE
  const router = useRouter();
  const auth = requireRole(["USER", "ADMIN", "SUPERADMIN"], {
    name: '',
    email: '',
  });

  useEffect(() => {
    if (!auth.isAuthenticated && auth.redirect) router.push(auth.redirect);
    if (auth.unauthorized) router.push("/unauthorized");
  }, [auth, router]);

  if (auth.unauthorized) return null;
  if (!auth.isAuthenticated) return null;

  // AUTHENTICATION MIDDLEWARE END

  const [activeTab, setActiveTab] = useState('overview');
  const [showBalance, setShowBalance] = useState(true);
  const [bio, setBio] = useState<Bio>(defaultBio);
  const [kycStatus, setKycStatus] = useState<Status>('Pending');
  const [bankDetails, setBankDetails] = useState<BankDetails>(defaultBankDetails);
  const [kycDetails, setKycDetails] = useState<KycDetails>(defaultKycDetails);
  const [isEditing, setIsEditing] = useState(false);
  const [wallet, setWallet] = useState<Wallet>(defaultWallet);
  const [ticketTab, setTicketTab] = useState<'my' | 'purchased'>('my');
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  const isCreator = true;

  // Fetch profile and transactions on mount
  useEffect(() => {
    async function loadData() {
      try {
        // Fetch profile data
        const profile = await fetchUserProfile();
        setKycStatus(profile.kyc.status);
        setWallet({
          id: profile.wallet.id,
          userId: profile.wallet.userId,
          balance: profile.wallet.balance || 0,
          earning: profile.wallet.earning || 0,
          points: profile.wallet.points || 0,
        });
        setBio({
          name: profile.name ,
          phone: profile.phone ,
          dateOfBirth: profile.dateOfBirth ,
          location: profile.location ,
          bio: profile.bio ,
          gender: profile.gender ,
          occupation: profile.occupation || defaultBio.occupation,
          interests: profile.interests || defaultBio.interests,
          email: profile.email || defaultBio.email,
          interest: profile.interest || defaultBio.interest,
        });

        setBankDetails({
          id: profile.bankDetails.id,
          userId: profile.bankDetails.userId,
          bankName: profile.bankDetails.bankName,
          accountName: profile.bankDetails.accountName,
          accountNumber: profile.bankDetails.accountNumber,
        });
        setKycDetails({
          id: profile.kycDetails.id,
          userId: profile.kycDetails.userId,
          type: profile.kycDetails.type,
          number: profile.kycDetails.number,
          document: profile.kycDetails.document,
          status: profile.kycDetails.status,
          note: profile.kycDetails.note,
        });

        // Fetch recent transactions
        const fetchedTransactions = await fetchUserTransactions();
        setTransactions(fetchedTransactions);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Failed to load data:", error.message);
        } else {
          console.error("Failed to load data:", error);
        }
        // Use default values as fallback
        setKycStatus('PENDING');
        setWallet(defaultWallet);
        setBio(defaultBio);
        setBankDetails(defaultBankDetails);
        setKycDetails(defaultKycDetails);
        setTransactions([]);
      }
    }
    loadData();
  }, []);

  const getStatusColor = (status: Status): string => {
const colors: Record<Status, string> = {
    // --- General Process States ---
    Completed: 'bg-green-50 text-green-700 border-green-200',  // Use 'green' for final, successful completion
    Pending: 'bg-amber-50 text-amber-700 border-amber-200',    // Standard warning/waiting color
    Failed: 'bg-red-50 text-red-700 border-red-200',          // Standard error/negative color
    Active: 'bg-blue-50 text-blue-700 border-blue-200',        // Use blue for general ongoing activity

    // --- Win/Loss (Betting/Game) States ---
    Won: 'bg-emerald-50 text-emerald-800 border-emerald-300',  // Slight shift for high-value win (Emerald is vibrant)
    Lost: 'bg-red-50 text-red-700 border-red-200',
    
    // --- Lifecycle/Other States ---
    Expired: 'bg-gray-100 text-gray-700 border-gray-300',     // Slightly darker gray for better visibility/de-emphasis
    
    // --- Approval/Review States (Consistent Case-Insensitive Mapping) ---
    APPROVED: 'bg-green-50 text-green-700 border-green-200',
    Approved: "bg-green-50 text-green-700 border-green-200",
    
    DECLINED: "bg-red-50 text-red-700 border-red-200",
    Declined: "bg-red-50 text-red-700 border-red-200",
    
    Reviewing: "bg-yellow-50 text-yellow-700 border-yellow-200", // Using yellow for clear "in progress"
    REVIEWING: "bg-yellow-50 text-yellow-700 border-yellow-200",
    
    PENDING: "bg-amber-50 text-amber-700 border-amber-200"
};
    return colors[status] || 'bg-gray-50 text-gray-600 border-gray-200';
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
    <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:bg-gray-50 transition-all duration-300 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-purple-50 rounded-xl">
          <Icon className="w-5 h-5 text-purple-600" />
        </div>
        <div
          className={`flex items-center gap-1 text-xs font-medium ${trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}
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
        <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
        <p className="text-sm text-gray-600">{title}</p>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-50 via-white to-purple-50 border border-purple-100 rounded-2xl p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back, {auth.user.name}! 👋
            </h1>
            <p className="text-gray-600">Here's what's happening with your account today.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
              <Bell className="w-5 h-5 text-gray-700" />
            </button>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center text-white font-semibold shadow-lg">
              {auth.user?.name
                ? auth.user.name
                  .split(' ')
                  .map((n: string) => n[0])
                  .join('')
                  .toUpperCase()
                : 'NN'}
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Balance Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-lg font-semibold text-gray-900">Wallet Balance</h2>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {showBalance ? (
                  <Eye className="w-4 h-4 text-gray-500" />
                ) : (
                  <EyeOff className="w-4 h-4 text-gray-500" />
                )}
              </button>
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {showBalance ? `₦${wallet.balance.toLocaleString()}` : '₦••••••••'}
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-600">
                Earnings:{' '}
                <span className="text-emerald-600 font-semibold">
                  ₦{wallet.earning.toLocaleString()}
                </span>
              </span>
               <span className="text-gray-600">
                Points:{' '}
                <span className="text-emerald-600 font-semibold">
                  {(wallet.points)}
                </span>
              </span>
              <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(kycStatus)}`}>
                KYC {kycStatus}
              </span>
             
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-sm">
            <ArrowDownCircle className="w-4 h-4" />
            Deposit
          </button>
          <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
            <ArrowUpCircle className="w-4 h-4" />
            Withdraw
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-emerald-50 rounded-xl">
              <Award className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">78%</div>
              <div className="text-sm text-gray-600">Win Rate</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <TrendingUp className="w-3 h-3 text-emerald-600" />
            <span className="text-emerald-600 font-medium">+5% this month</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-50 rounded-xl">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">3</div>
              <div className="text-sm text-gray-600">Active Tickets</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Plus className="w-3 h-3 text-purple-600" />
            <span className="text-purple-600 font-medium">2 new today</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {transactions.length > 0 ? (
            transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2 rounded-xl ${tx.type === 'Deposit'
                        ? 'bg-emerald-50'
                        : tx.type === 'Withdrawal'
                          ? 'bg-red-50'
                          : 'bg-purple-50'
                      }`}
                  >
                    {tx.type === 'Deposit' ? (
                      <ArrowDownCircle className="w-4 h-4 text-emerald-600" />
                    ) : tx.type === 'Withdrawal' ? (
                      <ArrowUpCircle className="w-4 h-4 text-red-600" />
                    ) : (
                      <Activity className="w-4 h-4 text-purple-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">{tx.type}</p>
                    <p className="text-gray-500 text-sm">
                      {tx.date} at {tx.time}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${tx.amount > 0 ? 'text-emerald-600' : 'text-red-600'}`}
                  >
                    {tx.amount > 0 ? '+' : ''}₦{Math.abs(tx.amount).toLocaleString()}
                  </p>
                  <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(tx.status)}`}>
                    {tx.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No recent transactions available.</p>
          )}
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 text-gray-900">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
          <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
            <MoreHorizontal className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden bg-white border-b border-gray-200 p-2 shadow-sm">
        <div className="flex gap-1 overflow-x-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${activeTab === item.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
        <aside className="hidden lg:flex w-80 min-h-screen bg-white border-r border-gray-200 flex-col shadow-sm">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center shadow-lg">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === item.id
                      ? 'bg-purple-50 text-purple-700 border border-purple-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-auto p-8 border-t border-gray-200">
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors">
                <LifeBuoy className="w-5 h-5" />
                <span>Support</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors">
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