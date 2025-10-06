"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Crown, Zap, Star, ArrowRight } from "lucide-react";

export default function SubscriptionPlansPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const plans = [
    {
      id: "1",
      name: "Silver Plan",
      description: "Access to 10 premium tickets per month",
      price: 2500,
      duration: 30,
      accessCount: 10,
      features: [
        "10 Premium Tickets/month",
        "Basic Analytics",
        "Email Support",
        "30 Days Access"
      ],
      icon: Star,
      color: "gray",
      popular: false
    },
    {
      id: "2",
      name: "Gold Plan",
      description: "Access to 20 premium tickets per month",
      price: 5000,
      duration: 30,
      accessCount: 20,
      features: [
        "20 Premium Tickets/month",
        "Advanced Analytics",
        "Priority Support",
        "30 Days Access",
        "Exclusive Tips"
      ],
      icon: Crown,
      color: "amber",
      popular: true
    },
    {
      id: "3",
      name: "Platinum Plan",
      description: "Unlimited access to all premium tickets",
      price: 10000,
      duration: 30,
      accessCount: -1,
      features: [
        "Unlimited Premium Tickets",
        "Premium Analytics",
        "24/7 Support",
        "30 Days Access",
        "Exclusive Tips",
        "Creator Badge"
      ],
      icon: Zap,
      color: "purple",
      popular: false
    }
  ];

  const handleSubscribe = async (planId: string, price: number) => {
    setLoading(planId);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://127.0.0.1:5000/api/subscriptions/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ planId }),
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/dashboard/subscriptions/${data.subscription.id}`);
      } else {
        alert("Failed to subscribe");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      alert("An error occurred");
    } finally {
      setLoading(null);
    }
  };

  const getColorClasses = (color: string, type: "bg" | "text" | "border") => {
    const colors = {
      gray: { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-200" },
      amber: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200" },
      purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200" }
    };
    return colors[color as keyof typeof colors][type];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600">
            Get access to premium predictions and boost your winning chances
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.id}
                className={`relative bg-white border-2 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all ${
                  plan.popular
                    ? "border-purple-500 scale-105"
                    : "border-gray-200 hover:border-purple-300"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className={`w-16 h-16 ${getColorClasses(plan.color, "bg")} rounded-2xl flex items-center justify-center mb-6`}>
                  <Icon className={`w-8 h-8 ${getColorClasses(plan.color, "text")}`} />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-gray-900">₦{plan.price.toLocaleString()}</span>
                    <span className="text-gray-600">/{plan.duration} days</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(plan.id, plan.price)}
                  disabled={loading === plan.id}
                  className={`w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                    plan.popular
                      ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading === plan.id ? (
                    "Processing..."
                  ) : (
                    <>
                      Subscribe Now
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How do subscriptions work?</h3>
              <p className="text-gray-600 text-sm">
                Subscribe to any plan and get instant access to premium tickets. Your subscription renews automatically after 30 days.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-600 text-sm">
                Yes! You can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600 text-sm">
                We accept all major payment methods including cards, bank transfers, and mobile money via Paystack.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I upgrade my plan?</h3>
              <p className="text-gray-600 text-sm">
                Absolutely! You can upgrade to a higher plan anytime. The price difference will be calculated and you'll get full access immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}