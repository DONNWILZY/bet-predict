"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { requireRole } from "@/lib/auth/checkAuth";
import { 
  Users, TrendingUp, CreditCard, FileText, Settings, Mail, 
  CheckCircle, XCircle, Ban, Edit, Trash2, DollarSign, 
  BarChart3, Calendar, Clock, Award, AlertCircle, Send,
  Eye, Download, RefreshCw, ShieldCheck
} from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);

  const auth = requireRole(["ADMIN", "SUPERADMIN"], {
    name: '',
    email: '',
  });

  useEffect(() => {
    if (!auth.isAuthenticated && auth.redirect) router.push(auth.redirect);
    if (auth.unauthorized) router.push("/unauthorized");
  }, [auth, router]);

  // Mock stats - replace with API
  const stats = {
    totalUsers: 50234,
    totalPredictions: 12453,
    pendingTransactions: 45,
    pendingKYC: 23,
    totalRevenue: 5234500,
    totalExpenses: 1234500,
    activeSubscriptions: 3421
  };

  const recentUsers = [
    { id: "1", name: "John Doe", email: "john@example.com", status: "active", joined: "2025-10-01" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", status: "blocked", joined: "2025-10-02" },
  ];

  const pendingTransactions = [
    { id: "1", user: "John Doe", type: "DEPOSIT", amount: 5000, method: "OFFLINE", date: "2025-10-05" },
    { id: "2", user: "Jane Smith", type: "WITHDRAWAL", amount: 3000, method: "OFFLINE", date: "2025-10-05" },
  ];

  const pendingKYC = [
    { id: "1", user: "Mike Johnson", document: "National ID", submitted: "2025-10-04", status: "pending" },
  ];

  const handleApproveTransaction = async (id: string) => {
    setLoading(true);
    // API call to approve
    setTimeout(() => {
      alert("Transaction approved!");
      setLoading(false);
    }, 1000);
  };

  const handleRejectTransaction = async (id: string) => {
    setLoading(true);
    // API call to reject
    setTimeout(() => {
      alert("Transaction rejected!");
      setLoading(false);
    }, 1000);
  };

  const handleBlockUser = async (id: string) => {
    if (confirm("Are you sure you want to block this user?")) {
      // API call
      alert("User blocked!");
    }
  };

  const handleWeekendTask = async () => {
    if (confirm("Run weekend settlement task? This will process all pending settlements.")) {
      setLoading(true);
      // API call
      setTimeout(() => {
        alert("Weekend task completed!");
        setLoading(false);
      }, 2000);
    }
  };

  const handleWeeklyPayout = async () => {
    if (confirm("Process weekly payouts? This will payout all eligible creators.")) {
      setLoading(true);
      // API call
      setTimeout(() => {
        alert("Weekly payout processed!");
        setLoading(false);
      }, 2000);
    }
  };

  const handleBulkEmail = async () => {
    const message = prompt("Enter your message for bulk email:");
    if (message) {
      setLoading(true);
      // API call
      setTimeout(() => {
        alert("Bulk email sent to all users!");
        setLoading(false);
      }, 1500);
    }
  };

  if (auth.unauthorized) return null;
  if (!auth.isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-8 shadow-lg mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-purple-200">Welcome back, {auth.user.name} ({auth.user.email})</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-purple-600" />
              <span className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</span>
            </div>
            <h3 className="font-semibold text-gray-900">Total Users</h3>
            <p className="text-sm text-gray-600">Registered accounts</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <FileText className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">{stats.totalPredictions.toLocaleString()}</span>
            </div>
            <h3 className="font-semibold text-gray-900">Total Predictions</h3>
            <p className="text-sm text-gray-600">All time</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-emerald-600" />
              <span className="text-2xl font-bold text-gray-900">₦{(stats.totalRevenue / 1000).toFixed(0)}K</span>
            </div>
            <h3 className="font-semibold text-gray-900">Total Revenue</h3>
            <p className="text-sm text-gray-600">All time earnings</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <AlertCircle className="w-8 h-8 text-amber-600" />
              <span className="text-2xl font-bold text-gray-900">{stats.pendingTransactions}</span>
            </div>
            <h3 className="font-semibold text-gray-900">Pending Actions</h3>
            <p className="text-sm text-gray-600">Requires review</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border border-gray-200 rounded-xl p-2 shadow-sm mb-8 overflow-x-auto">
          <div className="flex gap-2">
            {["overview", "users", "transactions", "kyc", "finance", "bulk-actions"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? "bg-purple-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tab.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={handleWeekendTask}
                  disabled={loading}
                  className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl transition-colors disabled:opacity-50"
                >
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-900">Weekend Task</span>
                </button>
                <button
                  onClick={handleWeeklyPayout}
                  disabled={loading}
                  className="flex items-center gap-3 p-4 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors disabled:opacity-50"
                >
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                  <span className="font-medium text-gray-900">Weekly Payout</span>
                </button>
                <button
                  onClick={handleBulkEmail}
                  disabled={loading}
                  className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors disabled:opacity-50"
                >
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900">Bulk Email</span>
                </button>
                <button className="flex items-center gap-3 p-4 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition-colors">
                  <Download className="w-5 h-5 text-amber-600" />
                  <span className="font-medium text-gray-900">Export Data</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Pending Transactions</h3>
                <div className="space-y-3">
                  {pendingTransactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-semibold text-gray-900">{tx.user}</p>
                        <p className="text-sm text-gray-600">{tx.type} - ₦{tx.amount.toLocaleString()}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApproveTransaction(tx.id)}
                          className="p-2 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                        >
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                        </button>
                        <button
                          onClick={() => handleRejectTransaction(tx.id)}
                          className="p-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <XCircle className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Pending KYC</h3>
                <div className="space-y-3">
                  {pendingKYC.map((kyc) => (
                    <div key={kyc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-semibold text-gray-900">{kyc.user}</p>
                        <p className="text-sm text-gray-600">{kyc.document}</p>
                      </div>
                      <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors">
                        Review
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">User Management</h2>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  />
                  <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 text-gray-700 font-semibold">User</th>
                    <th className="text-left p-4 text-gray-700 font-semibold">Email</th>
                    <th className="text-left p-4 text-gray-700 font-semibold">Status</th>
                    <th className="text-left p-4 text-gray-700 font-semibold">Joined</th>
                    <th className="text-left p-4 text-gray-700 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-900">{user.name}</td>
                      <td className="p-4 text-gray-600">{user.email}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.status === "active" 
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="p-4 text-gray-600">{user.joined}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button className="p-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                            <Eye className="w-4 h-4 text-blue-600" />
                          </button>
                          <button className="p-2 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors">
                            <Edit className="w-4 h-4 text-amber-600" />
                          </button>
                          <button
                            onClick={() => handleBlockUser(user.id)}
                            className="p-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                          >
                            <Ban className="w-4 h-4 text-red-600" />
                          </button>
                          <button className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add similar sections for other tabs... */}
      </div>
    </div>
  );
}