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
import { navItems } from '@/lib/profileData';
import Adverts from './adverts';
import Profile from './Profile';
import Settings from './Settings';
import Transaction from './Transaction';
import Tickets from './Tickets';
import SubscriptionComponent from './Subscription';

const ACCESS_TOKEN_KEY = "accessToken";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";

async function fetchUserProfile() {
  try {
    const accessToken = sessionStorage.getItem(ACCESS_TOKEN_KEY);

    if (!accessToken) {
      throw new Error("Access token not found");
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
    console.error("Error fetching user profile:", error);
    throw error;
  }
}

async function fetchUserTransactions() {
  try {
    const accessToken = sessionStorage.getItem(ACCESS_TOKEN_KEY);

    if (!accessToken) {
      throw new Error("Access token not found");
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
      return data.transactions.slice(0, 5).map((tx: any) => ({
        id: tx.id,
        type: tx.type,
        date: new Date(tx.date).toLocaleDateString(),
        time: new Date(tx.date).toLocaleTimeString(),
        amount: tx.amount,
        status: tx.status
      }));
    } else {
      throw new Error(data.message || "Failed to fetch transactions");
    }
  } catch (error) {
    console.error("Error fetching user transactions:", error);
    throw error;
  }
}

export default function ModernDashboard() {
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

  const [activeTab, setActiveTab] = useState('overview');
  const [showBalance, setShowBalance] = useState(true);
const [bio, setBio] = useState<Bio>({
  name: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  location: '',
  bio: '',
  gender: '',
  occupation: '',
  interests: [],
  interest: [],
  
  // FIX: Add the missing 'userName' property
  userName: '', 
});
  const [kycStatus, setKycStatus] = useState<Status>('PENDING');
  const [bankDetails, setBankDetails] = useState<BankDetails>({
    id: '',
    userId: '',
    bankName: '',
    accountName: '',
    accountNumber: ''
  });
  const [kycDetails, setKycDetails] = useState<KycDetails>({
    id: '',
    userId: '',
    type: '',
    number: '',
    document: '',
    status: '',
    note: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [wallet, setWallet] = useState<Wallet>({
    id: '',
    userId: '',
    balance: 0,
    earning: 0,
    points: 0
  });
  const [ticketTab, setTicketTab] = useState<'my' | 'purchased'>('my');
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const isCreator = true;

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);

        const profile = await fetchUserProfile();
        
        // Set user name and email from API
        setUserName(profile.name || '');
        setUserEmail(profile.email || '');
        
        setKycStatus(profile.kyc?.status || 'PENDING');
        
        setWallet({
          id: profile.wallet?.id || '',
          userId: profile.wallet?.userId || '',
          balance: profile.wallet?.balance || 0,
          earning: profile.wallet?.earning || 0,
          points: profile.wallet?.points || 0,
        });
        
      setBio({
  name: profile.name || '',
  phone: profile.phone || '',
  dateOfBirth: profile.dateOfBirth || '',
  location: profile.location || '',
  bio: profile.bio || '',
  gender: profile.gender || '',
  occupation: profile.occupation || '',
  interests: profile.interests || [],
  email: profile.email || '',
  interest: profile.interests || [],
  
  // 💥 FIX: Add the required 'userName' property
  userName: profile.userName || '', // Use the value from your profile object
});

        if (profile.bankDetails) {
          setBankDetails({
            id: profile.bankDetails.id || '',
            userId: profile.bankDetails.userId || '',
            bankName: profile.bankDetails.bankName || '',
            accountName: profile.bankDetails.accountName || '',
            accountNumber: profile.bankDetails.accountNumber || '',
          });
        }

        if (profile.kycDetails) {
          setKycDetails({
            id: profile.kycDetails.id || '',
            userId: profile.kycDetails.userId || '',
            type: profile.kycDetails.type || '',
            number: profile.kycDetails.number || '',
            document: profile.kycDetails.document || '',
            status: profile.kycDetails.status || '',
            note: profile.kycDetails.note || '',
          });
        }

        const fetchedTransactions = await fetchUserTransactions();
        setTransactions(fetchedTransactions);
        
        setLoading(false);
      } catch (error) {
        console.error("Failed to load data:", error);
        setError(error instanceof Error ? error.message : "Failed to load data");
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const getStatusColor = (status: Status): string => {
    const colors: Record<Status, string> = {
      Completed: 'bg-green-50 text-green-700 border-green-200',
      Pending: 'bg-amber-50 text-amber-700 border-amber-200',
      Failed: 'bg-red-50 text-red-700 border-red-200',
      Active: 'bg-blue-50 text-blue-700 border-blue-200',
      Won: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      Lost: 'bg-red-50 text-red-700 border-red-200',
      Expired: 'bg-gray-100 text-gray-700 border-gray-300',
      APPROVED: 'bg-green-50 text-green-700 border-green-200',
      Approved: "bg-green-50 text-green-700 border-green-200",
      DECLINED: "bg-red-50 text-red-700 border-red-200",
      Declined: "bg-red-50 text-red-700 border-red-200",
      Reviewing: "bg-yellow-50 text-yellow-700 border-yellow-200",
      REVIEWING: "bg-yellow-50 text-yellow-700 border-yellow-200",
      PENDING: "bg-amber-50 text-amber-700 border-amber-200"
    };
    return colors[status] || 'bg-gray-50 text-gray-600 border-gray-200';
  };

  const renderOverview = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-purple-50 via-white to-purple-50 border border-purple-100 rounded-2xl p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back, {userName || 'User'}! 👋
            </h1>
            <p className="text-gray-600">Here's what's happening with your account today.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
              <Bell className="w-5 h-5 text-gray-700" />
            </button>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center text-white font-semibold shadow-lg">
              {userName
                ? userName
                  .split(' ')
                  .map((n: string) => n[0])
                  .join('')
                  .toUpperCase()
                : 'U'}
            </div>
          </div>
        </div>
      </div>

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
                  {wallet.points}
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
            <p className="text-gray-500 text-sm text-center py-8">No recent transactions available.</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-2xl">!</span>
            </div>
            <p className="text-gray-900 font-semibold mb-2">Failed to load data</p>
            <p className="text-gray-600 text-sm mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

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
      

      // userName={userName} 
      
      // userEmail={userEmail}
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
      <div className="lg:hidden bg-white border-b border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
          <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
            <MoreHorizontal className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

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

        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">{renderContent()}</main>
      </div>
    </div>
  );
}