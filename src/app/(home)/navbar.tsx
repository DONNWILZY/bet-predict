"use client";

import { useState, useEffect } from "react";
import { 
  Menu, 
  X, 
  Lock, 
  User, 
  LayoutDashboard, 
  Zap,
  Star,
  Sparkles,
  ArrowRight,
  Target,
  Activity,
  Trophy
} from "lucide-react";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const NavbarItems = [
    { href: "/", label: "Home", icon: <Zap className="w-4 h-4" /> },
    { href: "/predictions", label: "Predictions", icon: <Target className="w-4 h-4" /> },
    { href: "/live", label: "Live", icon: <Activity className="w-4 h-4" /> },
    { href: "/analytics", label: "Analytics", icon: <Trophy className="w-4 h-4" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Use a stronger purple for the primary color: violet or fuchsia
  const PRIMARY_COLOR_CLASSES = {
    // Used for gradients/accents (Replaced blue/emerald/violet)
    gradient: 'from-fuchsia-600 to-violet-600',
    hoverGradient: 'from-fuchsia-600/15 to-violet-600/15',
    logoGradient: 'from-fuchsia-400 via-violet-400 to-indigo-400',
    hoverButtonGradient: 'from-fuchsia-500 hover:to-violet-500',
    logoGlow: 'shadow-fuchsia-500/20',
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 shadow-2xl' 
          : 'bg-gradient-to-r from-slate-900/90 via-gray-900/90 to-slate-900/90 backdrop-blur-md border-b border-slate-700/30'
      }`}>
        {/* Animated background accent (Changed colors) */}
        <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600/5 via-violet-600/5 to-indigo-600/5 animate-pulse"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Enhanced Logo (Changed colors) */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${PRIMARY_COLOR_CLASSES.gradient} flex items-center justify-center shadow-lg ${PRIMARY_COLOR_CLASSES.logoGlow}`}>
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                {/* Accent ping color remains for contrast */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900 animate-ping"></div>
              </div>
              <div>
                <span className={`text-2xl font-bold bg-gradient-to-r ${PRIMARY_COLOR_CLASSES.logoGradient} bg-clip-text text-transparent`}>
                  BetPredict
                </span>
                <div className="flex items-center gap-1 -mt-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-slate-400 font-medium">PRO</span>
                </div>
              </div>
            </div>

            {/* Desktop Navigation (Changed colors) */}
            <div className="hidden lg:flex items-center space-x-1">
              {NavbarItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group relative px-4 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white transition-all duration-300"
                >
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-fuchsia-600/0 to-violet-600/0 group-hover:${PRIMARY_COLOR_CLASSES.hoverGradient} transition-all duration-300`}></div>
                  <div className="relative flex items-center gap-2">
                    {item.icon}
                    {item.label}
                  </div>
                  <div className={`absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r ${PRIMARY_COLOR_CLASSES.gradient} group-hover:w-full group-hover:left-0 transition-all duration-300`}></div>
                </a>
              ))}
            </div>

            {/* Right Section - Desktop (Changed colors) */}
            <div className="hidden lg:flex items-center space-x-3">
              <button className="relative px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors duration-200 flex items-center gap-2">
                <User className="w-4 h-4" />
                {isLoggedIn ? 'Dashboard' : 'Sign In'}
              </button>
              
              <button className={`group relative px-6 py-2.5 bg-gradient-to-r ${PRIMARY_COLOR_CLASSES.gradient} hover:${PRIMARY_COLOR_CLASSES.hoverButtonGradient} text-white text-sm font-semibold rounded-full shadow-lg hover:${PRIMARY_COLOR_CLASSES.logoGlow} transition-all duration-300 overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <div className="relative flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Premium
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-200"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu - REDESIGNED with solid background */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Solid background overlay - no transparency or blur */}
            <div className="absolute inset-0 bg-slate-900">
              {/* Subtle gradient overlay for visual depth */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800/30 via-slate-900 to-slate-900"></div>
              
              {/* Content container */}
              <div className="relative flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-700/50 bg-slate-800/20">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${PRIMARY_COLOR_CLASSES.gradient} flex items-center justify-center`}>
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-bold text-white">BetPredict</span>
                  </div>
                  <button 
                    onClick={() => setMobileOpen(false)}
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Mobile Navigation */}
                <div className="flex-1 px-6 py-8 space-y-4 bg-slate-900">
                  {NavbarItems.map((item, index) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-4 px-4 py-4 rounded-xl text-slate-300 hover:text-white bg-slate-800/30 hover:bg-slate-700/50 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-200 backdrop-blur-sm"
                      onClick={() => setMobileOpen(false)}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex-shrink-0">
                        {item.icon}
                      </div>
                      <span className="font-medium text-base">{item.label}</span>
                    </a>
                  ))}
                </div>

                {/* Mobile Action Buttons */}
                <div className="p-6 space-y-3 border-t border-slate-700/50 bg-slate-800/20">
                  <button className="w-full px-4 py-4 bg-slate-800/60 hover:bg-slate-700/70 text-white rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 border border-slate-700/30">
                    <User className="w-4 h-4" />
                    {isLoggedIn ? 'Dashboard' : 'Sign In'}
                  </button>
                  <button className={`w-full px-4 py-4 bg-gradient-to-r ${PRIMARY_COLOR_CLASSES.gradient} hover:${PRIMARY_COLOR_CLASSES.hoverButtonGradient} text-white rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl`}>
                    <Lock className="w-4 h-4" />
                    Get Premium
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};