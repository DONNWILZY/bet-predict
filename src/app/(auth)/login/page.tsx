"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const LOGIN_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signin`;

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [requireOtp, setRequireOtp] = useState(false);

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setMessage("");
  setIsLoading(true);

  try {
    const response = await fetch(LOGIN_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        otp: requireOtp ? otp : "", // include OTP if required
      }),
    });

    let data: any = {};
    try {
      data = await response.clone().json();
    } catch {
      data = { message: await response.clone().text() };
    }

    // --- Handle 2FA or new device OTP ---
    if (response.status === 403) {
      const msg = data.message || "";
      if (
        msg.includes("2FA verification required") ||
        msg.includes("New device detected")
      ) {
        setMessage("OTP required. Please enter the code sent to your email.");
        setRequireOtp(true); // 🔑 reveal OTP input
        return;
      }

      setMessage(msg || "Access denied.");
      return;
    }

    // --- Handle invalid credentials or server error ---
    if (!response.ok) {
      setMessage(data.message || "Login failed. Please try again.");
      return;
    }

    // --- ✅ Successful login ---
    // Security-first storage strategy:
    // - accessToken → sessionStorage (short-lived, cleared on browser close)
    // - refreshToken → localStorage (long-lived, used to refresh session)
    // - user object → localStorage (not sensitive, used for role/UI guards)

    sessionStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("user", JSON.stringify(data.user));

    setMessage("Login successful! Redirecting...");

    setTimeout(() => {
      if (data.user.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    }, 1200);
  } catch (error: any) {
    console.error("Login error:", error);
    setMessage(
      error.message || "Network error. Could not connect to the server."
    );
  } finally {
    setIsLoading(false);
  }
};

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-2xl mb-4">
            <span className="text-2xl font-bold text-white">⚽</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
          <p className="text-gray-600">
            Sign in to your BET-PREDICT-PRO account
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email address
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none bg-gray-50 hover:bg-white"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none bg-gray-50 hover:bg-white pr-12"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            {/* OTP (only visible when required) */}
            {requireOtp && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  One-Time Password (OTP)
                </label>
                <input
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none bg-gray-50 hover:bg-white"
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
            )}

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-purple-600 hover:text-purple-500 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {requireOtp ? "Verifying..." : "Signing in..."}
                </div>
              ) : requireOtp ? (
                "Verify OTP"
              ) : (
                "Sign in"
              )}
            </Button>

            {/* Message */}
            {message && (
              <div
                className={`p-4 rounded-xl shadow-sm ${
                  message.includes("success") || message.includes("Redirecting")
                    ? "bg-green-50 text-green-700 border border-green-300"
                    : "bg-red-50 text-red-700 border border-red-300"
                }`}
              >
                <p className="text-center text-sm font-medium">{message}</p>
              </div>
            )}
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                New to BET-PREDICT-PRO?
              </span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center w-full py-3 border border-purple-200 rounded-xl text-purple-600 font-semibold hover:bg-purple-50 transition-all duration-200"
            >
              Create an account
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs mt-8">
          Protected by enterprise-grade security
        </p>
      </div>
    </main>
  );
}
