"use client";

import { Trophy, Target, TrendingUp, Users, Zap, Shield, BarChart3, Bell } from "lucide-react";
import { Navbar } from "./../(home)/navbar"; 
import {Footer} from "../../components/ui/Footer";

export default function ServicesPage() {
  const services = [
    {
      icon: Trophy,
      title: "Match Predictions",
      description: "Expert predictions for football matches across major leagues worldwide. Our AI-powered analysis provides accurate forecasts with detailed statistics.",
      features: ["90+ leagues covered", "Real-time updates", "Historical data analysis", "85%+ accuracy rate"]
    },
    {
      icon: Target,
      title: "Premium Tickets",
      description: "Access exclusive prediction tickets from top creators. Get winning combinations curated by experienced predictors.",
      features: ["Verified creators", "High-odds selections", "Booking codes included", "Money-back guarantee"]
    },
    {
      icon: TrendingUp,
      title: "Analytics Dashboard",
      description: "Track your betting performance with comprehensive analytics. Monitor wins, losses, and profitability over time.",
      features: ["Performance metrics", "Win rate tracking", "Profit/loss analysis", "Custom reports"]
    },
    {
      icon: Users,
      title: "Community Platform",
      description: "Join thousands of bettors sharing insights and predictions. Engage with creators and fellow enthusiasts.",
      features: ["Discussion forums", "Creator interactions", "Live chat support", "Social features"]
    },
    {
      icon: Zap,
      title: "Instant Notifications",
      description: "Never miss a match or prediction update. Get real-time alerts on your device for important events.",
      features: ["Push notifications", "Email alerts", "SMS updates", "Custom preferences"]
    },
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "Safe and secure payment processing for deposits and withdrawals. Multiple payment methods supported.",
      features: ["Encrypted payments", "Fast withdrawals", "Multiple methods", "24/7 security"]
    },
    {
      icon: BarChart3,
      title: "Subscription Plans",
      description: "Flexible subscription options tailored to your needs. Access premium content at affordable prices.",
      features: ["3 plan tiers", "Monthly billing", "Cancel anytime", "Money-back guarantee"]
    },
    {
      icon: Bell,
      title: "Creator Tools",
      description: "Powerful tools for predictors to share their expertise. Monetize your predictions and build your audience.",
      features: ["Ticket creation", "Earnings tracking", "Analytics tools", "Audience insights"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to make informed betting decisions and maximize your winning potential
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-purple-300"
              >
                <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-12 text-center shadow-lg">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-purple-200 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already winning with our expert predictions and tools
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg">
              Start Free Trial
            </button>
            <button className="px-8 py-4 bg-purple-700 text-white rounded-xl font-semibold hover:bg-purple-800 transition-colors border-2 border-white/20">
              View Pricing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}