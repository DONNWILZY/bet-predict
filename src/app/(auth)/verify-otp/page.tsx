"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  XCircle,
  Loader,
  KeyRound,
  CornerDownLeft,
} from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";
const VERIFY_API_URL = `${API_BASE}/api/auth/verify-email`;
const RESEND_API_URL = `${API_BASE}/api/auth/resend-verification-otp`;
const RESEND_COOLDOWN_SECONDS = 60;

const VerifyEmailPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Extract email from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlEmail = params.get("email");
    if (urlEmail) {
      setEmail(urlEmail);
      setMessage(`A verification code has been sent to ${urlEmail}.`);
    } else {
      setMessage("Error: Email missing. Please return to the signup page.");
    }
  }, []);

  // Cooldown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  // Verify OTP
  // Verify OTP
const handleVerify = async (e: React.FormEvent) => {
  e.preventDefault();
  setMessage("");

  if (!email || otp.length !== 6) {
    setMessage("Please enter the 6-digit code.");
    return;
  }

  setIsLoading(true);
  try {
    const response = await fetch(VERIFY_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    let data: any = {};
    try {
      data = await response.json();
    } catch {
      data = { message: "Unexpected server response." };
    }

    if (response.ok) {
      // ✅ Store auth data
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("role", data.user.role);

      setMessage("Email verified successfully! Redirecting...");

      // ✅ Redirect based on role
      setTimeout(() => {
        if (data.user.role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      }, 1500);
    } else {
      // ✅ Catch server-side errors (invalid/expired OTP, etc.)
      setMessage(data.message || "Verification failed. Try again.");
    }
  } catch (error: any) {
    console.error("Verification error:", error);
    setMessage(
      error.message || "Network error. Could not connect to the server."
    );
  } finally {
    setIsLoading(false);
  }
};


  // Resend OTP
  // Resend OTP
const handleResend = async () => {
  if (resendCooldown > 0 || isLoading || !email) return;

  setMessage("");
  setIsLoading(true);
  setResendCooldown(RESEND_COOLDOWN_SECONDS);

  try {
    const response = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    let data: any = {};
    try {
      data = await response.json();
    } catch {
      data = { message: "Unexpected server response." };
    }

    if (response.ok) {
      setMessage("New verification code sent! Check your inbox.");
    } else {
      setMessage(data.message || "Failed to resend code.");
      setResendCooldown(0); // reset cooldown if failed
    }
  } catch (error: any) {
    console.error("Resend error:", error);
    setMessage(
      error.message || "Network error. Could not connect to the server."
    );
    setResendCooldown(0); // reset cooldown if failed
  } finally {
    setIsLoading(false);
  }
};


  const isFormValid = otp.length === 6 && email && !isLoading;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 space-y-6 border border-gray-100">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-600 rounded-xl mb-2 shadow-lg">
            <KeyRound className="text-white w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Verify Your Email</h1>
          <p className="text-gray-500">
            Enter the 6-digit code sent to:
            <br />
            <strong className="text-purple-600 truncate block">
              {email || "your email address"}
            </strong>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleVerify} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              pattern="\d*"
              maxLength={6}
              placeholder="______"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))
              }
              required
              className="otp-input w-full px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 bg-gray-50 hover:bg-white text-gray-800 shadow-sm text-2xl tracking-[1rem]"
            />
            <KeyRound className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full flex justify-center items-center py-3 px-4 rounded-xl shadow-lg text-lg font-semibold text-white transition transform ${
              !isFormValid
                ? "bg-purple-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700 hover:scale-[1.01] focus:ring-4 focus:ring-purple-300"
            }`}
          >
            {isLoading ? (
              <>
                <Loader className="animate-spin w-5 h-5 mr-2" /> Verifying...
              </>
            ) : (
              "Verify Email"
            )}
          </button>
        </form>

        {/* Resend OTP */}
        <div className="text-center pt-2">
          <p className="text-sm text-gray-500 mb-2">Didn't receive the code?</p>
          <button
            onClick={handleResend}
            disabled={resendCooldown > 0 || isLoading || !email}
            className={`text-sm font-semibold p-2 rounded-lg ${
              resendCooldown > 0 || isLoading || !email
                ? "text-gray-400 cursor-not-allowed"
                : "text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100"
            }`}
          >
            {resendCooldown > 0
              ? `Resend in ${resendCooldown}s`
              : "Resend Code"}
          </button>
        </div>

        {/* Message area */}
        {message && (
          <div
            className={`p-4 rounded-xl shadow-sm ${
              message.toLowerCase().includes("success") ||
              message.toLowerCase().includes("sent")
                ? "bg-green-50 text-green-700 border border-green-300 flex items-center"
                : "bg-red-50 text-red-700 border border-red-300 flex items-center"
            }`}
          >
            {message.toLowerCase().includes("success") ||
            message.toLowerCase().includes("sent") ? (
              <CheckCircle className="w-5 h-5 mr-3" />
            ) : (
              <XCircle className="w-5 h-5 mr-3" />
            )}
            <p className="text-sm font-medium">{message}</p>
          </div>
        )}

        {/* Back to login */}
        <div className="text-center mt-4">
          <button
            onClick={() => router.push("/login")}
            className="text-sm text-gray-500 hover:text-purple-600 font-medium inline-flex items-center"
          >
            <CornerDownLeft className="w-4 h-4 mr-1" /> Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
