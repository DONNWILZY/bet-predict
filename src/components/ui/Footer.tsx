import Link from "next/link";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      // Here you would typically send the email to your backend
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const quickLinks = [
    { name: "Live Betting", href: "/live" },
    { name: "Sports Analysis", href: "/analysis" },
    { name: "Predictions", href: "/predictions" },
    { name: "Statistics", href: "/stats" },
    { name: "Leaderboard", href: "/leaderboard" },
    { name: "Premium", href: "/premium" }
  ];

  const sportsCategories = [
    { name: "Football", href: "/sports/football" },
    { name: "Basketball", href: "/sports/basketball" },
    { name: "Tennis", href: "/sports/tennis" },
    { name: "Baseball", href: "/sports/baseball" },
    { name: "Soccer", href: "/sports/soccer" },
    { name: "Hockey", href: "/sports/hockey" }
  ];

  const resources = [
    { name: "Betting Guide", href: "/guide" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Responsible Gaming", href: "/responsible" },
    { name: "FAQ", href: "/faq" },
    { name: "Support", href: "/support" }
  ];

  const socialLinks = [
    { name: "Twitter", href: "#", icon: "🐦" },
    { name: "Facebook", href: "#", icon: "📘" },
    { name: "Instagram", href: "#", icon: "📸" },
    { name: "YouTube", href: "#", icon: "📺" },
    { name: "Discord", href: "#", icon: "💬" },
    { name: "Telegram", href: "#", icon: "✈️" }
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-slate-700 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Stay Ahead of the Game
              </h3>
              <p className="text-slate-300 mt-1">
                Get exclusive betting tips, predictions, and analysis delivered to your inbox
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[250px]"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
              >
                {subscribed ? "✓ Subscribed!" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">BP</span>
              </div>
              <span className="text-xl font-bold">Bet-Predict</span>
            </div>
            <p className="text-slate-300 mb-4 leading-relaxed">
              Your ultimate destination for sports betting predictions, live odds, and expert analysis. 
              Make informed decisions with our AI-powered insights.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors duration-200 hover:scale-110 transform"
                  title={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sports Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-purple-400">Sports</h4>
            <ul className="space-y-2">
              {sportsCategories.map((sport) => (
                <li key={sport.name}>
                  <Link
                    href={sport.href}
                    className="text-slate-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {sport.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-green-400">Resources</h4>
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <Link
                    href={resource.href}
                    className="text-slate-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {resource.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>


        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-slate-400 text-sm">
            <span>© {new Date().getFullYear()} Bet-Predict. All rights reserved.</span>
            <div className="flex gap-4">
              <Link href="/about" className="hover:text-white transition-colors">
                About
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
              <Link href="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>System Status: Operational</span>
            </div>
            <div className="text-xs bg-slate-800 px-2 py-1 rounded">
              v2.1.0
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-slate-900/80 border-t border-slate-700 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-400">
          <p>
            Gambling can be addictive. Please bet responsibly. Must be 18+ to participate. 
            <Link href="/responsible" className="text-blue-400 hover:text-blue-300 ml-1">
              Learn more about responsible gaming
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}