"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CreditCard, Calendar, Check, X, RefreshCw, AlertCircle, TrendingUp } from "lucide-react";

interface SubscriptionDetailsProps {
  params: { id: string };
}

export default function SubscriptionDetailsPage({ params }: SubscriptionDetailsProps) {
  const router = useRouter();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mock data - replace with API call using params.id
  const subscription = {
    id: "90aa255a-7f10-4deb-826b-39c203cd8289",
    userId: "3ad91c04-80f9-455f-9a2a-817a193bf051",
    planId: "cf29fda6-6bb0-4d49-9305-5c85047544ed",
    status: "ACTIVE",
    expires: "2025-10-18T19:03:24.814Z",
    remainingAccess: 20,
    createdAt: "2025-09-18T19:03:24.814Z",
    plan: {
      id: "cf29fda6-6bb0-4d49-9305-5c85047544ed",
      name: "Gold Plan",
      description: "Access to 20 premium tickets per month",
      price: "5000",
      duration: 30,
      accessCount: 20,
      active: true
    }
  };

  const handleCancelSubscription = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`http://127.0.0.1:5000/api/subscriptions/${params.id}/cancel`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        router.push("/dashboard");
      } else {
        alert("Failed to cancel subscription");
      }
    } catch (error) {
      console.error("Cancel error:", error);
      alert("An error occurred");
    } finally {
      setLoading(false);
      setShowCancelModal(false);
    }
  };

  const handleRenewSubscription = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`http://127.0.0.1:5000/api/subscriptions/${params.id}/renew`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        window.location.reload();
      } else {
        alert("Failed to renew subscription");
      }
    } catch (error) {
      console.error("Renew error:", error);
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const daysRemaining = Math.ceil(
    (new Date(subscription.expires).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
  const usagePercentage = ((subscription.plan.accessCount - subscription.remainingAccess) / subscription.plan.accessCount) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto p-4 lg:p-8">
        {/* Header */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Subscriptions
        </button>

        {/* Subscription Header */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-8 shadow-lg mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{subscription.plan.name}</h1>
              <p className="text-purple-200">{subscription.plan.description}</p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-bold ${
              subscription.status === "ACTIVE" 
                ? "bg-emerald-500 text-white" 
                : "bg-red-500 text-white"
            }`}>
              {subscription.status}
            </span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-8 h-8 text-purple-600" />
              <span className="text-2xl font-bold text-gray-900">{daysRemaining}</span>
            </div>
            <h3 className="font-semibold text-gray-900">Days Remaining</h3>
            <p className="text-sm text-gray-600">Expires {new Date(subscription.expires).toLocaleDateString()}</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <CreditCard className="w-8 h-8 text-emerald-600" />
              <span className="text-2xl font-bold text-gray-900">{subscription.remainingAccess}</span>
            </div>
            <h3 className="font-semibold text-gray-900">Tickets Remaining</h3>
            <p className="text-sm text-gray-600">Out of {subscription.plan.accessCount}</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-amber-600" />
              <span className="text-2xl font-bold text-gray-900">₦{parseInt(subscription.plan.price).toLocaleString()}</span>
            </div>
            <h3 className="font-semibold text-gray-900">Monthly Cost</h3>
            <p className="text-sm text-gray-600">Auto-renews</p>
          </div>
        </div>

        {/* Usage Progress */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Usage This Month</h2>
          <div className="mb-2">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">
                {subscription.plan.accessCount - subscription.remainingAccess} of {subscription.plan.accessCount} tickets used
              </span>
              <span className="font-semibold text-purple-600">{usagePercentage.toFixed(0)}%</span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-600 to-purple-800 transition-all duration-500"
                style={{ width: `${usagePercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Subscription Details */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Subscription Details</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Subscription ID</span>
              <span className="font-mono text-sm text-gray-900">{subscription.id}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Started On</span>
              <span className="font-semibold text-gray-900">
                {new Date(subscription.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Next Billing Date</span>
              <span className="font-semibold text-gray-900">
                {new Date(subscription.expires).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-gray-600">Auto-Renewal</span>
              <span className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold text-emerald-600">Enabled</span>
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={handleRenewSubscription}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            <RefreshCw className="w-5 h-5" />
            Renew Now
          </button>
          <button
            onClick={() => setShowCancelModal(true)}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-semibold transition-colors border-2 border-red-200"
          >
            <X className="w-5 h-5" />
            Cancel Subscription
          </button>
        </div>

        {/* Benefits */}
        <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900">Premium Access</h3>
                <p className="text-sm text-gray-600">Access to {subscription.plan.accessCount} premium tickets monthly</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900">Advanced Analytics</h3>
                <p className="text-sm text-gray-600">Detailed insights and statistics</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900">Priority Support</h3>
                <p className="text-sm text-gray-600">Get help when you need it</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900">Exclusive Tips</h3>
                <p className="text-sm text-gray-600">Expert predictions and insights</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cancel Modal */}
        {showCancelModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-10 h-10 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Cancel Subscription?</h2>
              <p className="text-gray-600 text-center mb-6">
                You'll lose access to premium tickets after {new Date(subscription.expires).toLocaleDateString()}. 
                You can resubscribe anytime.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                >
                  Keep Subscription
                </button>
                <button
                  onClick={handleCancelSubscription}
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Canceling..." : "Yes, Cancel"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}