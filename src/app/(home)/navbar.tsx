"use client"; // 👈 Must be the very first line

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const NavbarItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/Hello", label: "Hello" }, // TODO: Verify if this is intentional
];

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-950 to-gray-900 text-white h-16 flex items-center border-b border-gray-800/50 px-4 md:px-8 shadow-sm">
      {/* Left: Logo */}
      <div className="flex-1 flex items-center">
        <Link href="/" className="flex items-center">
          <span className={cn("text-xl md:text-2xl font-semibold tracking-tight", poppins.className)}>
            Bet-Predict
          </span>
        </Link>
      </div>

      {/* Center: Nav links (hidden on mobile) */}
      <div className="hidden md:flex flex-1 justify-center gap-8">
        {NavbarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-sm hover:text-blue-300 transition-colors duration-200"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Right: Login/Dashboard & Premium (hidden on mobile) */}
      <div className="hidden md:flex flex-1 justify-end items-center gap-3">
        <Button
          variant="default"
          size="sm"
          onClick={() => setIsLoggedIn((v) => !v)}
          className="bg-white text-gray-900 hover:bg-gray-200 text-xs font-medium rounded-full px-4"
        >
          {isLoggedIn ? (
            <Link href="/dashboard" className="inline-block w-full h-full">
              Dashboard
            </Link>
          ) : (
            "Sign Up"
          )}
        </Button>
        <Button
          variant="default"
          size="sm"
          className="bg-blue-600 text-white hover:bg-blue-700 text-xs font-medium rounded-full px-4"
        >
          Premium
        </Button>
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden ml-2"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6 text-blue-300" />
      </button>

      {/* Mobile Drawer/Popup */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900/95 flex flex-col">
          {/* Header with close button */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800/50">
            <span className={cn("text-xl font-semibold tracking-tight", poppins.className)}>
              Bet-Predict
            </span>
            <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <X className="w-6 h-6 text-blue-300" />
            </button>
          </div>
          {/* Nav links */}
          <div className="flex-1 flex flex-col justify-center items-end pr-8 gap-6">
            {NavbarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-lg text-gray-200 hover:text-blue-300 transition-colors duration-200"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          {/* Bottom buttons */}
          <div className="flex flex-col gap-3 p-4 border-t border-gray-800/50">
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                setIsLoggedIn((v) => !v);
                setMobileOpen(false);
              }}
              className="w-full bg-white text-gray-900 hover:bg-gray-200 text-sm font-medium rounded-full"
            >
              {isLoggedIn ? (
                <Link href="/dashboard" className="inline-block w-full h-full">
                  Dashboard
                </Link>
              ) : (
                "Sign Up"
              )}
            </Button>
            <Button
              variant="default"
              size="sm"
              className="w-full bg-red-600 text-white hover:bg-transparent-700 text-sm font-medium rounded-full"
            >
              Premium
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};