"use client";

import { useState } from "react";
import { Code, Check, Zap, Crown, Star, Copy, ChevronRight } from "lucide-react";
import { Navbar } from "./../(home)/navbar"; 
import {Footer} from "../../components/ui/Footer";

export default function APIPricingDocsPage() {
  const [activeTab, setActiveTab] = useState<"pricing" | "docs">("pricing");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const pricingPlans = [
    {
      name: "Free",
      price: "₦0",
      period: "/month",
      description: "Perfect for testing and small projects",
      icon: Star,
      features: [
        "100 API calls/day",
        "Basic predictions",
        "Community support",
        "Rate limited",
        "Public endpoints only"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: "₦25,000",
      period: "/month",
      description: "For serious developers and businesses",
      icon: Zap,
      features: [
        "10,000 API calls/day",
        "All predictions",
        "Priority support",
        "Webhooks included",
        "Advanced analytics",
        "Custom rate limits"
      ],
      cta: "Start Pro",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "Tailored solutions for large scale",
      icon: Crown,
      features: [
        "Unlimited API calls",
        "Dedicated support",
        "SLA guarantee",
        "Custom integrations",
        "White-label options",
        "On-premise deployment"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const endpoints = [
    {
      method: "GET",
      path: "/api/predictions",
      description: "Get all predictions",
      example: `fetch('https://api.predictionhub.com/v1/predictions', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})`
    },
    {
      method: "GET",
      path: "/api/predictions/:id",
      description: "Get specific prediction",
      example: `fetch('https://api.predictionhub.com/v1/predictions/123', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})`
    },
    {
      method: "POST",
      path: "/api/predictions",
      description: "Create new prediction",
      example: `fetch('https://api.predictionhub.com/v1/predictions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    team1: "Arsenal",
    team2: "Chelsea",
    prediction: "1",
    odds: 2.5
  })
})`
    }
  ];

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            API Pricing & Documentation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Integrate our prediction engine into your applications
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab("pricing")}
            className={`px-8 py-3 rounded-xl font-semibold transition-all ${
              activeTab === "pricing"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-white text-gray-700 border border-gray-200 hover:border-purple-300"
            }`}
          >
            Pricing
          </button>
          <button
            onClick={() => setActiveTab("docs")}
            className={`px-8 py-3 rounded-xl font-semibold transition-all ${
              activeTab === "docs"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-white text-gray-700 border border-gray-200 hover:border-purple-300"
            }`}
          >
            Documentation
          </button>
        </div>

        {/* Pricing Tab */}
        {activeTab === "pricing" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {pricingPlans.map((plan, index) => {
                const Icon = plan.icon;
                return (
                  <div
                    key={index}
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

                    <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8 text-purple-600" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>

                    <div className="mb-6">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                        <span className="text-gray-600">{plan.period}</span>
                      </div>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      className={`w-full py-4 rounded-xl font-semibold transition-all ${
                        plan.popular
                          ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                      }`}
                    >
                      {plan.cta}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Documentation Tab */}
        {activeTab === "docs" && (
          <div className="space-y-8">
            {/* Getting Started */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting Started</h2>
              <p className="text-gray-600 mb-6">
                To get started with our API, you'll need an API key. You can generate one from your dashboard.
              </p>
              <div className="bg-gray-900 rounded-xl p-4 relative">
                <button
                  onClick={() => copyCode('export API_KEY="your_api_key_here"', 'env')}
                  className="absolute top-4 right-4 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  {copiedCode === 'env' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-400" />
                  )}
                </button>
                <pre className="text-green-400 text-sm overflow-x-auto">
                  export API_KEY="your_api_key_here"
                </pre>
              </div>
            </div>

            {/* API Endpoints */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">API Endpoints</h2>
              <div className="space-y-6">
                {endpoints.map((endpoint, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-lg text-sm font-bold ${
                        endpoint.method === 'GET' ? 'bg-blue-100 text-blue-700' :
                        endpoint.method === 'POST' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {endpoint.method}
                      </span>
                      <code className="text-purple-600 font-mono">{endpoint.path}</code>
                    </div>
                    <p className="text-gray-600 mb-4">{endpoint.description}</p>
                    <div className="bg-gray-900 rounded-xl p-4 relative">
                      <button
                        onClick={() => copyCode(endpoint.example, `endpoint-${index}`)}
                        className="absolute top-4 right-4 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        {copiedCode === `endpoint-${index}` ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                      <pre className="text-green-400 text-sm overflow-x-auto pr-12">
                        {endpoint.example}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Response Format */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Response Format</h2>
              <p className="text-gray-600 mb-4">All API responses follow this JSON structure:</p>
              <div className="bg-gray-900 rounded-xl p-4">
                <pre className="text-green-400 text-sm overflow-x-auto">{`{
  "success": true,
  "data": { ... },
  "message": "Success",
  "timestamp": "2025-10-06T12:00:00Z"
}`}</pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}