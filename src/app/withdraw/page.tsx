"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Wallet, CreditCard, AlertCircle, CheckCircle } from "lucide-react";

export default function WithdrawalPage() {
  const router = useRouter();
  const [withdrawalMethod, setWithdrawalMethod] = useState<"manual" | "paystack">("manual");
  const [amount, setAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const availableBalance = 50000; // Get from context/API

  const handleWithdrawal = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    if (parseFloat(amount) > availableBalance) {
      alert("Insufficient balance");
      return;
    }

    if (withdrawalMethod === "manual" && (!bankName || !accountNumber || !accountName)) {
      alert("Please fill in all bank details");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://127.0.0.1:5000/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: "WITHDRAWAL",
          amount: parseFloat(amount),
          method: withdrawalMethod === "manual" ? "OFFLINE" : "PAYSTACK",
          reference: withdrawalMethod === "manual" ? `${bankName}-${accountNumber}` : null,
          note: note || `Withdrawal to ${accountName}`,
          bankDetails: withdrawalMethod === "manual" ? {
            bankName,
            accountNumber,
            accountName,
          } : null,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => router.push("/dashboard"), 2000);
      } else {
        alert("Failed to process withdrawal");
      }
    } catch (error) {
      console.error("Withdrawal error:", error);
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 max-w-md w-full text-center shadow-lg">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Withdrawal Requested!</h2>
          <p className="text-gray-600">Your withdrawal request has been submitted successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto p-4 lg:p-8">
        {/* Header */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-8 shadow-lg mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Withdraw Funds</h1>
          <p className="text-purple-200">Transfer money from your wallet</p>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-purple-200">Available Balance:</span>
            <span className="text-2xl font-bold text-white">₦{availableBalance.toLocaleString()}</span>
          </div>
        </div>

        {/* Method Selection */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Select Withdrawal Method</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setWithdrawalMethod("manual")}
              className={`p-6 rounded-xl border-2 transition-all ${
                withdrawalMethod === "manual"
                  ? "border-purple-600 bg-purple-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Wallet className={`w-8 h-8 mb-3 ${withdrawalMethod === "manual" ? "text-purple-600" : "text-gray-400"}`} />
              <h3 className="font-bold text-gray-900 mb-1">Manual Withdrawal</h3>
              <p className="text-sm text-gray-600">Bank transfer (24-48 hours)</p>
            </button>

            <button
              onClick={() => setWithdrawalMethod("paystack")}
              className={`p-6 rounded-xl border-2 transition-all ${
                withdrawalMethod === "paystack"
                  ? "border-purple-600 bg-purple-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <CreditCard className={`w-8 h-8 mb-3 ${withdrawalMethod === "paystack" ? "text-purple-600" : "text-gray-400"}`} />
              <h3 className="font-bold text-gray-900 mb-1">Paystack</h3>
              <p className="text-sm text-gray-600">Instant transfer</p>
            </button>
          </div>
        </div>

        {/* Withdrawal Form */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Withdrawal Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₦)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                max={availableBalance}
                className="w-full p-4 border border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              />
              <p className="text-xs text-gray-500 mt-1">
                Maximum: ₦{availableBalance.toLocaleString()}
              </p>
            </div>

            {withdrawalMethod === "manual" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                  <select
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  >
                    <option value="">Select Bank</option>
                    <option value="Access Bank">Access Bank</option>
                    <option value="GTBank">GTBank</option>
                    <option value="First Bank">First Bank</option>
                    <option value="UBA">UBA</option>
                    <option value="Zenith Bank">Zenith Bank</option>
                    <option value="Sterling Bank">Sterling Bank</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="10-digit account number"
                    maxLength={10}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Name</label>
                  <input
                    type="text"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    placeholder="Account holder name"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Note (Optional)</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add any additional information"
                rows={3}
                className="w-full p-4 border border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all resize-none"
              />
            </div>

            <div className={`${withdrawalMethod === "manual" ? "bg-amber-50 border-amber-200" : "bg-blue-50 border-blue-200"} border rounded-xl p-4 flex gap-3`}>
              <AlertCircle className={`w-5 h-5 ${withdrawalMethod === "manual" ? "text-amber-600" : "text-blue-600"} flex-shrink-0`} />
              <div className={`text-sm ${withdrawalMethod === "manual" ? "text-amber-700" : "text-blue-700"}`}>
                <p className="font-semibold mb-1">
                  {withdrawalMethod === "manual" ? "Processing Time: 24-48 hours" : "Instant Processing"}
                </p>
                <p>
                  {withdrawalMethod === "manual" 
                    ? "Manual withdrawals are reviewed and processed within 1-2 business days." 
                    : "Your funds will be transferred immediately after confirmation."}
                </p>
              </div>
            </div>

            <button
              onClick={handleWithdrawal}
              disabled={loading || !amount || parseFloat(amount) <= 0}
              className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {loading ? "Processing..." : `Withdraw ₦${amount || "0"}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}