//src\app\(auth)\signup\page.tsx

"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/app/(home)/navbar";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    if (!agreedToTerms) {
      setMessage("Please agree to our terms and conditions");
      return;
    }

    setIsLoading(true);
    // TODO: Connect to your signup API
    setTimeout(() => {
      setMessage("Account created successfully! Please check your email to verify your account.");
      setIsLoading(false);
    }, 1000);
  };

  const getPasswordStrength = (password: string) => {
    if (password.length < 6) return { strength: "Weak", color: "bg-red-500", textColor: "text-red-600", width: "w-1/3" };
    if (password.length < 10) return { strength: "Medium", color: "bg-yellow-500", textColor: "text-yellow-600", width: "w-2/3" };
    return { strength: "Strong", color: "bg-green-500", textColor: "text-green-600", width: "w-full" };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const passwordRequirements = [
    { test: formData.password.length >= 8, text: "At least 8 characters" },
    { test: /[A-Z]/.test(formData.password), text: "One uppercase letter" },
    { test: /[0-9]/.test(formData.password), text: "One number" },
    { test: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password), text: "One special character" }
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-2xl mb-4">
              <span className="text-2xl font-bold text-white">⚽</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Join BET-PREDICT-PRO</h1>
            <p className="text-gray-600">Create your account and start winning predictions</p>
          </div>

          {/* Signup Form */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            <form onSubmit={handleSignup} className="space-y-5">
              {/* Name and Username Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full name
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none bg-gray-50 hover:bg-white"
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none bg-gray-50 hover:bg-white"
                    type="text"
                    name="username"
                    placeholder="johndoe"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email address
                </label>
                <input
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none bg-gray-50 hover:bg-white"
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone number
                </label>
                <input
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none bg-gray-50 hover:bg-white"
                  type="tel"
                  name="phone"
                  placeholder="+234 xxx xxx xxxx"
                  value={formData.phone}
                  onChange={handleInputChange}
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
                    name="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleInputChange}
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
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color} ${passwordStrength.width}`}></div>
                      </div>
                      <span className={`text-xs font-medium ${passwordStrength.textColor}`}>
                        {passwordStrength.strength}
                      </span>
                    </div>
                    
                    {/* Password Requirements */}
                    <div className="grid grid-cols-2 gap-2">
                      {passwordRequirements.map((req, index) => (
                        <div key={index} className="flex items-center text-xs">
                          <span className={`w-3 h-3 rounded-full mr-2 flex items-center justify-center text-xs font-bold ${
                            req.test ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                          }`}>
                            {req.test ? '✓' : '·'}
                          </span>
                          <span className={req.test ? 'text-green-700' : 'text-gray-600'}>
                            {req.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none bg-gray-50 hover:bg-white pr-12"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1 font-medium">Passwords do not match</p>
                )}
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start space-x-3">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2 mt-0.5"
                />
                <label htmlFor="terms" className="text-sm text-gray-600 leading-5">
                  I agree to the{" "}
                  <Link href="/terms" className="text-purple-600 hover:text-purple-500 font-medium">
                    Terms of Service
                  </Link>
                  {" "}and{" "}
                  <Link href="/privacy" className="text-purple-600 hover:text-purple-500 font-medium">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                disabled={isLoading || !agreedToTerms || formData.password !== formData.confirmPassword}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating account...
                  </div>
                ) : (
                  "Create account"
                )}
              </Button>

              {/* Message */}
              {message && (
                <div className={`p-4 rounded-xl ${
                  message.includes("successfully") || message.includes("check your email")
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}>
                  <p className={`text-center text-sm font-medium ${
                    message.includes("successfully") || message.includes("check your email")
                      ? "text-green-700"
                      : "text-red-700"
                  }`}>
                    {message}
                  </p>
                </div>
              )}
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Already have an account?</span>
              </div>
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <Link href="/login" className="inline-flex items-center justify-center w-full py-3 border border-purple-200 rounded-xl text-purple-600 font-semibold hover:bg-purple-50 transition-all duration-200">
                Sign in instead
              </Link>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-500 text-xs mt-8">
            Join over 50,000+ successful football predictors worldwide
          </p>
        </div>
      </main>
    </>
  );
}