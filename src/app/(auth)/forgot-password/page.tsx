// app/(auth)/verify-email/VerifyEmailContent.tsx
"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/app/(home)/navbar";

export default function VerifyEmailContent() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams?.get("token");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setMessage("Invalid or missing verification link. Please request a new verification email.");
        setIsLoading(false);
        return;
      }

      try {
        // TODO: Replace with your actual API call to verify the email token
        // Example: await fetch(`/api/verify-email?token=${token}`);
        // Simulate API call
        setTimeout(() => {
          setTokenValid(true);
          setMessage("Email verified successfully! You can now sign in.");
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        setMessage("Failed to verify email. The link may be invalid or expired.");
        setIsLoading(false);
      }
    };

    verifyEmail();
  }, [token]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-2xl mb-4">
                <span className="text-2xl">🔄</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Verifying Email...</h1>
              <p className="text-gray-600">Please wait while we verify your email.</p>
            </div>
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
              <div className="animate-pulse bg-gray-200 h-10 rounded-xl"></div>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (!tokenValid) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500 rounded-2xl mb-4">
                <span className="text-2xl">⚠️</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Invalid Link</h1>
              <p className="text-gray-600">This verification link is invalid or has expired.</p>
            </div>
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
              <p className="text-gray-600 mb-6">Please request a new verification email to continue.</p>
              <Button
                onClick={() => window.location.href = "/signup"}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
              >
                Request New Verification Email
              </Button>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-2xl mb-4">
              <span className="text-2xl">✅</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Verified</h1>
            <p className="text-gray-600">Your email has been successfully verified!</p>
          </div>
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
            <p className="text-gray-600 mb-6">{message}</p>
            <Button
              onClick={() => window.location.href = "/login"}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-green-500/25"
            >
              Continue to Sign In
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}