"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, CreditCard, Wallet, AlertCircle, CheckCircle } from "lucide-react";
import { Navbar } from "./../(home)/navbar"; 
import {Footer} from "../../components/ui/Footer";
// Removed: import { PaystackButton } from "react-paystack";

// Add global declaration for PaystackPop
declare const PaystackPop: any;

export default function DepositPage() {
  const router = useRouter();
  const [depositMethod, setDepositMethod] = useState<"manual" | "paystack">("manual");
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [note, setNote] = useState("");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofUrl, setProofUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_xxxxxxxxxxxxxxxxxxxxxxxx";
  const userEmail = "user@example.com"; // Replace with user email from your auth context

  const handleManualDeposit = async () => {
    // ... (Your manual deposit logic remains unchanged)
  };

  const handlePaystackPayment = () => {
    if (!amount) {
      setError("Please enter an amount.");
      return;
    }

    if (typeof PaystackPop === "undefined") {
      setError("Paystack script not loaded. Please try again or check your network.");
      return;
    }

    PaystackPop.setup({
      key: publicKey,
      email: userEmail,
      amount: parseFloat(amount) * 100, // Paystack expects amount in kobo
      ref: `NEXTJS_${new Date().getTime()}`,
      onClose: () => {
        setError("Payment was cancelled.");
      },
      callback: async (response: any) => {
        // You should verify this transaction on your server
        setLoading(true);
        try {
          const token = localStorage.getItem("accessToken");
          const res = await fetch("http://127.0.0.1:5000/api/transactions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
              type: "DEPOSIT",
              amount: parseFloat(amount),
              method: "PAYSTACK",
              reference: response.reference,
              note: "Paystack deposit",
            }),
          });

          if (res.ok) {
            setSuccess(true);
            setTimeout(() => router.push("/dashboard"), 2000);
          } else {
            setError("Failed to create deposit record.");
          }
        } catch (err) {
          console.error("Verification error:", err);
          setError("An error occurred while verifying the payment.");
        } finally {
          setLoading(false);
        }
      },
    }).openIframe();
  };

  if (success) {
    return 
    
    (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 flex items-center justify-center p-4">
        <Navbar />
        <div className="bg-white border border-gray-200 rounded-2xl p-8 max-w-md w-full text-center shadow-lg">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Deposit Submitted!</h2>
          <p className="text-gray-600">Your deposit request has been submitted successfully.</p>
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
          <h1 className="text-3xl font-bold text-white mb-2">Deposit Funds</h1>
          <p className="text-purple-200">Add money to your wallet</p>
        </div>

        {/* Method Selection */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Select Deposit Method</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => { setDepositMethod("manual"); setError(""); }}
              className={`p-6 rounded-xl border-2 transition-all ${
                depositMethod === "manual"
                  ? "border-purple-600 bg-purple-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Wallet className={`w-8 h-8 mb-3 ${depositMethod === "manual" ? "text-purple-600" : "text-gray-400"}`} />
              <h3 className="font-bold text-gray-900 mb-1">Manual Deposit</h3>
              <p className="text-sm text-gray-600">Bank transfer with proof upload</p>
            </button>

            <button
              onClick={() => { setDepositMethod("paystack"); setError(""); }}
              className={`p-6 rounded-xl border-2 transition-all ${
                depositMethod === "paystack"
                  ? "border-purple-600 bg-purple-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <CreditCard className={`w-8 h-8 mb-3 ${depositMethod === "paystack" ? "text-purple-600" : "text-gray-400"}`} />
              <h3 className="font-bold text-gray-900 mb-1">Paystack</h3>
              <p className="text-sm text-gray-600">Instant payment with card</p>
            </button>
          </div>
        </div>

        {/* Manual Deposit Form */}
        {depositMethod === "manual" && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Manual Deposit Details</h2>
            
            <div className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3 text-sm text-red-700 bg-red-50 rounded-xl">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₦)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reference Number</label>
                <input
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="Bank transaction reference"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Note (Optional)</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add any additional information"
                  rows={3}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Proof of Payment</label>
                <input
                  type="file"
                  onChange={(e) => setProofFile(e.target.files ? e.target.files[0] : null)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                />
              </div>

              <button
                onClick={handleManualDeposit}
                disabled={loading}
                className="w-full px-6 py-4 bg-purple-600 text-white font-bold rounded-xl shadow-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400"
              >
                {loading ? "Submitting..." : "Submit Manual Deposit"}
              </button>
            </div>
          </div>
        )}

        {/* Paystack Payment Section */}
        {depositMethod === "paystack" && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Pay with Paystack</h2>
            
            <div className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3 text-sm text-red-700 bg-red-50 rounded-xl">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              )}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₦)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                />
              </div>

              <button
                onClick={handlePaystackPayment}
                disabled={loading || !amount}
                className="w-full px-6 py-4 bg-purple-600 text-white font-bold rounded-xl shadow-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400"
              >
                {loading ? "Processing..." : "Proceed to Paystack"}
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

