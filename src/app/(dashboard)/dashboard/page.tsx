"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  User,
  FileText,
  ShieldCheck,
  CreditCard,
  History,
  ArrowDownCircle,
  ArrowUpCircle,
} from "lucide-react";

type BioKey = "name" | "email" | "phone";

export default function DashboardPage() {
  const [bio, setBio] = useState<Record<BioKey, string>>({
    name: "",
    email: "",
    phone: "",
  });

  const [kycStatus, setKycStatus] = useState("Not Submitted");
  const [kycType, setKycType] = useState("");
  const [wallet, setWallet] = useState({ balance: 1000 });
  const [transactions, setTransactions] = useState([
    { id: 1, type: "Deposit", amount: 500, status: "Completed", date: "2024-06-24" },
    { id: 2, type: "Withdrawal", amount: 200, status: "Pending", date: "2024-06-23" },
  ]);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const statusBadge = {
    Completed: "bg-green-600",
    Pending: "bg-yellow-500",
    Failed: "bg-red-600",
    "Not Submitted": "bg-gray-600",
  }[kycStatus] || "bg-gray-600";

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gray-900 border-r border-gray-800 p-6 space-y-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <nav className="space-y-3 text-gray-300 text-sm font-medium">
          {(["profile", "kyc", "wallet", "transactions", "withdraw"] as const).map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className="flex items-center gap-2 hover:text-white transition px-2 py-1 rounded hover:bg-gray-800"
            >
              {{
                profile: <User className="w-4 h-4" />,
                kyc: <ShieldCheck className="w-4 h-4" />,
                wallet: <CreditCard className="w-4 h-4" />,
                transactions: <History className="w-4 h-4" />,
                withdraw: <ArrowUpCircle className="w-4 h-4" />,
              }[section]}
              <span className="capitalize">{section}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-10 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile */}
          <section id="profile" className="bg-gray-900 rounded-lg p-6 shadow border border-gray-800">
            <div className="flex items-center gap-2 mb-4">
              <User className="text-blue-400" />
              <h2 className="text-xl font-semibold">Basic Bio</h2>
            </div>
            <form className="space-y-4 max-w-md">
              {(["name", "email", "phone"] as BioKey[]).map((field) => (
                <input
                  key={field}
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={bio[field]}
                  onChange={(e) => setBio({ ...bio, [field]: e.target.value })}
                />
              ))}
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Save Changes</Button>
            </form>
          </section>

          {/* KYC */}
          <section id="kyc" className="bg-gray-900 rounded-lg p-6 shadow border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-yellow-400" />
                <h2 className="text-xl font-semibold">KYC Verification</h2>
              </div>
              <span className={`px-3 py-1 text-sm rounded-full ${statusBadge}`}>
                {kycStatus}
              </span>
            </div>
            <div className="space-y-4 max-w-md">
              <select
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                value={kycType}
                onChange={(e) => setKycType(e.target.value)}
              >
                <option value="">Select KYC Type</option>
                <option value="passport">Passport</option>
                <option value="driver_license">Driver’s License</option>
                <option value="national_id">National ID</option>
              </select>
              <input
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                placeholder="Document Number"
              />
              <label className="w-full flex items-center p-2 rounded bg-gray-800 text-white border border-gray-700 cursor-pointer hover:bg-gray-700">
                <FileText className="mr-2" /> Upload document
                <input type="file" className="hidden" />
              </label>
              <Button className="w-full bg-yellow-500 hover:bg-yellow-600">Submit KYC</Button>
            </div>
          </section>

          {/* Wallet */}
          <section id="wallet" className="bg-gray-900 rounded-lg p-6 shadow border border-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="text-green-400" />
              <h2 className="text-xl font-semibold">Wallet</h2>
            </div>
            <div className="text-3xl font-bold mb-4">${wallet.balance.toFixed(2)}</div>
            <Button className="bg-green-600 hover:bg-green-700 w-full flex gap-2 justify-center items-center">
              <ArrowDownCircle className="w-5 h-5" /> Deposit
            </Button>
          </section>

          {/* Withdraw */}
          <section id="withdraw" className="bg-gray-900 rounded-lg p-6 shadow border border-gray-800">
            <div className="flex items-center gap-2 mb-4">
              <ArrowUpCircle className="text-red-400" />
              <h2 className="text-xl font-semibold">Request Withdrawal</h2>
            </div>
            <form className="space-y-4 max-w-sm">
              <input
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                type="number"
                placeholder="Amount"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
              />
              <Button className="w-full bg-red-600 hover:bg-red-700 flex items-center justify-center gap-2">
                <ArrowUpCircle className="w-5 h-5" /> Request Withdrawal
              </Button>
            </form>
          </section>
        </div>

        {/* Transactions */}
        <section id="transactions" className="bg-gray-900 rounded-lg p-6 shadow border border-gray-800">
          <div className="flex items-center gap-2 mb-4">
            <History className="text-purple-400" />
            <h2 className="text-xl font-semibold">Transaction History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-700 bg-gray-800 text-gray-300">
                <tr>
                  {["Date", "Type", "Amount", "Status"].map((h) => (
                    <th key={h} className="py-2 px-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="even:bg-gray-800 odd:bg-gray-900 hover:bg-gray-800 transition"
                  >
                    <td className="py-2 px-3">{tx.date}</td>
                    <td className="py-2 px-3">{tx.type}</td>
                    <td className="py-2 px-3">${tx.amount}</td>
                    <td className="py-2 px-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        {
                          Completed: "bg-green-600",
                          Pending: "bg-yellow-500",
                          Failed: "bg-red-600",
                        }[tx.status] || "bg-gray-500"
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
