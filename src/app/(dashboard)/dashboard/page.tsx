"use client";

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
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("account");
  const [showProfileSubmenu, setShowProfileSubmenu] = useState(false);
  const [showSettingsSubmenu, setShowSettingsSubmenu] = useState(false);
  const [bio, setBio] = useState({ name: "John Doe", email: "john@example.com", phone: "" });
  const [kycStatus, setKycStatus] = useState("Not Submitted");
  const [wallet, setWallet] = useState<{ balance: number; earning: number }>({ balance: 1000, earning: 150 });
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [kycType, setKycType] = useState("");
  const [ticketTab, setTicketTab] = useState<"my" | "purchased">("my");
  const isPredictor = true; // Set this based on user role

  // Placeholder data
  const transactions = [
    { id: 1, type: "Deposit", amount: 500, status: "Completed", date: "2024-06-24" },
    { id: 2, type: "Withdrawal", amount: 200, status: "Pending", date: "2024-06-23" },
  ];
  const myTickets = [
    { id: 1, ticketNo: "TCK-123456", status: "Won" },
    { id: 2, ticketNo: "TCK-654321", status: "Lost" },
  ];
  const purchasedTickets = [
    { id: 1, ticketNo: "TCK-111222", status: "Pending" },
    { id: 2, ticketNo: "TCK-333444", status: "Won" },
  ];
  const subscriptions = [
    { id: 1, plan: "Monthly", status: "Active", expires: "2024-07-25" },
    { id: 2, plan: "Weekly", status: "Expired", expires: "2024-06-01" },
  ];

  const statusBadge = {
    Completed: "bg-green-600",
    Pending: "bg-yellow-500",
    Failed: "bg-red-600",
    Submitted: "bg-blue-600",
    "Not Submitted": "bg-gray-600",
  }[kycStatus] || "bg-gray-600";

  const renderTab = () => {
    switch (activeTab) {
      case "account":
        return (
          <div className="space-y-6">
            {/* Personal Details Card */}
            <div className="bg-gray-900 p-6 rounded-lg shadow border border-gray-800 flex items-center space-x-4">
              <div className="rounded-full bg-gray-700 w-14 h-14 md:w-[30px] md:h-[30px]" />
              <div>
                <p className="font-semibold text-lg md:text-sm">{bio.name}</p>
                <p className="text-xs text-gray-400">Regular</p>
                <p className="text-xs text-yellow-400">{kycStatus}</p>
              </div>
            </div>
            {/* Balance & Earning Card */}
            <div className="bg-gray-900 p-6 rounded-lg shadow border border-gray-800">
              <div className="flex flex-col items-start text-left mb-4">
              <div className="text-gray-400 text-sm mb-1">Balance</div>
              <div className="text-3xl font-bold mb-1">₦{wallet.balance.toFixed(2)}</div>
              <div className="text-xs text-gray-400">
                Earning: <span className="ml-1 text-green-400 font-semibold">₦{wallet.earning.toFixed(2)}</span>
              </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
              <button className="bg-blue-600 hover:bg-blue-400 text-xs px-2 py-1 text-white rounded">Deposit</button>
              <button className="bg-blue-600 hover:bg-blue-400 text-xs px-2 py-1 text-white rounded">Withdraw</button>
              </div>
            </div>

            {/* Ticket Tabs */}
            <div className="bg-gray-900 p-6 rounded-lg shadow border border-gray-800">
              <div className="flex items-center gap-2 mb-4">
                <button
                  className={`px-4 py-1 rounded text-xs font-semibold ${ticketTab === "my" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300"}`}
                  onClick={() => setTicketTab("my")}
                  disabled={!isPredictor}
                >
                  My Tickets
                </button>
                <button
                  className={`px-4 py-1 rounded text-xs font-semibold ${ticketTab === "purchased" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300"}`}
                  onClick={() => setTicketTab("purchased")}
                >
                  Purchased
                </button>
              </div>
              {/* Ticket Lists */}
              {ticketTab === "my" && isPredictor && (
                <div>
                  {myTickets.length === 0 ? (
                    <div className="text-gray-400 text-sm">No tickets yet.</div>
                  ) : (
                    <ul className="space-y-2">
                      {myTickets.map((ticket) => (
                        <li key={ticket.id} className="flex justify-between items-center bg-gray-800 rounded p-2">
                          <span className="font-mono text-blue-300">{ticket.ticketNo}</span>
                          <span className={`text-xs ${ticket.status === "Won" ? "text-green-400" : "text-red-400"}`}>{ticket.status}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
              {ticketTab === "purchased" && (
                <div>
                  {purchasedTickets.length === 0 ? (
                    <div className="text-gray-400 text-sm">No purchased tickets yet.</div>
                  ) : (
                    <ul className="space-y-2">
                      {purchasedTickets.map((ticket) => (
                        <li key={ticket.id} className="flex justify-between items-center bg-gray-800 rounded p-2">
                          <span className="font-mono text-blue-300">{ticket.ticketNo}</span>
                          <span className={`text-xs ${ticket.status === "Pending" ? "text-yellow-400" : ticket.status === "Won" ? "text-green-400" : "text-red-400"}`}>{ticket.status}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* Transaction List */}
            <div className="bg-gray-900 p-6 rounded-lg shadow border border-gray-800">
              <div className="flex items-center gap-2 mb-2">
                <History className="text-purple-400 w-4 h-4" />
                <h2 className="text-sm font-semibold">Transaction History</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr>
                      <th className="py-2">Date</th>
                      <th className="py-2">Type</th>
                      <th className="py-2">Amount</th>
                      <th className="py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map(tx => (
                      <tr key={tx.id} className="border-t border-gray-700">
                        <td className="py-2">{tx.date}</td>
                        <td className="py-2">{tx.type}</td>
                        <td className="py-2">₦{tx.amount}</td>
                        <td className="py-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${tx.status === "Completed" ? "bg-green-600" : tx.status === "Pending" ? "bg-yellow-500" : "bg-red-600"}`}>
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Subscription Module */}
            <div className="bg-gray-900 p-6 rounded-lg shadow border border-gray-800">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="text-blue-400 w-4 h-4" />
                <h2 className="text-sm font-semibold">Subscriptions</h2>
              </div>
              <ul className="space-y-2">
                {subscriptions.map(sub => (
                  <li key={sub.id} className="flex justify-between items-center bg-gray-800 rounded p-2">
                    <span>{sub.plan}</span>
                    <span className={`text-xs ${sub.status === "Active" ? "text-green-400" : "text-gray-400"}`}>{sub.status}</span>
                    <span className="text-xs text-gray-400">Expires: {sub.expires}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      case "profile":
        return (
          <div className="space-y-6">
            <form className="space-y-4 bg-gray-900 p-6 rounded-lg border border-gray-800">
              {(["name", "email", "phone"] as Array<keyof typeof bio>).map((field) => (
                <input
                  key={field}
                  className="w-full p-2 rounded bg-gray-800 text-sm text-white border border-gray-700"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={bio[field]}
                  onChange={(e) => setBio({ ...bio, [field]: e.target.value })}
                />
              ))}
              <Button className="w-full bg-blue-600 text-white text-xs">Save</Button>
            </form>

            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-semibold">KYC</p>
                <span className={`px-2 py-1 text-xs rounded-full ${statusBadge}`}>{kycStatus}</span>
              </div>
              {kycStatus !== "Submitted" && kycStatus !== "Completed" && (
                <>
                  <select
                    className="w-full p-2 rounded bg-gray-800 text-white text-xs border border-gray-700 mb-2"
                    value={kycType}
                    onChange={(e) => setKycType(e.target.value)}
                  >
                    <option value="">Select KYC Type</option>
                    <option value="passport">Passport</option>
                    <option value="driver_license">Driver’s License</option>
                    <option value="national_id">National ID</option>
                  </select>
                  <input
                    placeholder="Document Number"
                    className="w-full p-2 rounded bg-gray-800 text-white text-xs border border-gray-700 mb-2"
                  />
                  <label className="block w-full p-2 rounded bg-gray-800 text-white text-xs border border-gray-700 cursor-pointer mb-2">
                    <FileText className="inline mr-2" /> Upload Document
                    <input type="file" className="hidden" />
                  </label>
                  <Button className="w-full bg-yellow-500 text-white text-xs">Submit KYC</Button>
                </>
              )}
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 space-y-4">
            <h2 className="text-sm font-semibold">Settings</h2>
            <div className="space-y-2">
              <Button className="w-full flex gap-2 text-xs text-black bg-white hover:bg-gray-100">
                <Paintbrush className="w-4 h-4" /> Change Theme
              </Button>
              <Button className="w-full flex gap-2 text-xs text-black bg-white hover:bg-gray-100">
                <KeyRound className="w-4 h-4" /> Change Password
              </Button>
              <Button className="w-full flex gap-2 text-xs text-black bg-white hover:bg-gray-100">
                <Shield className="w-4 h-4" /> Two Factor Authentication
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold">Dashboard</h2>
        </div>
      </div>

      {/* Always-visible Mobile Menu */}
      <div className="md:hidden overflow-x-auto whitespace-nowrap bg-gray-900 px-2 py-2 border-b border-gray-800 flex gap-2">
        <button onClick={() => setActiveTab("account")} className="text-xs px-3 py-1 rounded bg-gray-800">Account</button>
        <button onClick={() => setActiveTab("profile")} className="text-xs px-3 py-1 rounded bg-gray-800">Profile</button>
        <button onClick={() => setActiveTab("settings")} className="text-xs px-3 py-1 rounded bg-gray-800">Settings</button>
        <button className="text-xs px-3 py-1 rounded bg-red-600 ml-auto">Logout</button>
      </div>

      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <aside className="w-64 hidden md:flex flex-col bg-gray-900 p-4 border-r border-gray-800 justify-between min-h-screen">
          <div className="flex flex-col justify-between h-full">
            <div>
              <h2 className="text-xl font-bold mb-4">Dashboard</h2>
              <nav className="space-y-1 text-sm">
                <button onClick={() => setActiveTab("account")} className="w-full text-left flex items-center gap-2 p-2 rounded hover:bg-gray-800">
                  <CreditCard className="w-4 h-4" /> Account
                </button>
                <div>
                  <button onClick={() => setShowProfileSubmenu(!showProfileSubmenu)} className="w-full text-left flex items-center justify-between p-2 rounded hover:bg-gray-800">
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4" /> Profile
                    </span>
                    {showProfileSubmenu ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {showProfileSubmenu && (
                    <div className="ml-6 mt-1 space-y-1">
                      <button onClick={() => setActiveTab("profile")} className="w-full text-left text-xs hover:underline">My Info</button>
                    </div>
                  )}
                </div>
                <div>
                  <button onClick={() => setShowSettingsSubmenu(!showSettingsSubmenu)} className="w-full text-left flex items-center justify-between p-2 rounded hover:bg-gray-800">
                    <span className="flex items-center gap-2">
                      <Settings className="w-4 h-4" /> Settings
                    </span>
                    {showSettingsSubmenu ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {showSettingsSubmenu && (
                    <div className="ml-6 mt-1 space-y-1">
                      <button onClick={() => setActiveTab("settings")} className="w-full text-left text-xs hover:underline">Preferences</button>
                    </div>
                  )}
                </div>
              </nav>
            </div>
            <div className="border-t border-gray-800 pt-4 space-y-1">
              <button className="flex items-center gap-2 text-sm text-gray-300 hover:text-white">
                <LifeBuoy className="w-4 h-4" /> Support
              </button>
              <button className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 overflow-y-auto space-y-6">
          {renderTab()}
        </main>
      </div>
    </div>
  );
}