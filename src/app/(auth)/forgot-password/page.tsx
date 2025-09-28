"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Loader,
  Eye,
  EyeOff,
  AlertTriangle,
  Send,
  CheckCircle,
  XCircle,
  Key,
} from "lucide-react";

/**
 * Password Reset Page
 *
 * Routes used (matching the backend you described):
 *  - POST /api/auth/password/request-reset       { email }
 *  - POST /api/auth/password/reset               { email, otp, newPassword }
 *
 * Note: ensure NEXT_PUBLIC_API_URL is set (e.g. http://localhost:5000) or the code will use relative /api paths.
 */

// --- API Configuration ---
const ENV_BASE = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_API_URL : undefined;
const BASE_URL = ENV_BASE && ENV_BASE.length > 0 ? ENV_BASE.replace(/\/$/, "") : ""; // e.g. "http://localhost:5000" OR "" (relative)
const REQUEST_RESET_URL = `${BASE_URL || ""}/api/auth/password/request-reset`;
const RESET_PASSWORD_URL = `${BASE_URL || ""}/api/auth/password/reset`;

// --- Types for helper components ---
interface InputGroupProps {
  name: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  required?: boolean;
  error?: string | null;
  className?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

interface PasswordInputGroupProps {
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  required?: boolean;
  error?: string | null;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

type Stage = "email" | "reset" | "success";

interface StrengthResult {
  score: number; // 0..5
  strength: "Empty" | "Weak" | "Moderate" | "Strong";
}

// --- Utilities ---
const parseApiError = async (res: Response) => {
  // Always try JSON first. If fails, fallback to text.
  try {
    const data = await res.json();
    // Normalize common shapes:
    if (data == null) return { message: "Unexpected server response" };
    const msg =
      data.message ||
      data.error ||
      (Array.isArray(data.errors) && data.errors[0]?.msg) ||
      (Array.isArray(data.errors) && data.errors[0]) ||
      JSON.stringify(data);
    return { message: typeof msg === "string" ? msg : JSON.stringify(msg), raw: data };
  } catch (err) {
    try {
      const text = await res.text();
      return { message: text || "Unexpected server response", raw: text };
    } catch {
      return { message: "Unexpected server response", raw: null };
    }
  }
};

const checkPasswordStrength = (password: string): StrengthResult => {
  let score = 0;
  if (!password || password.length === 0) return { score: 0, strength: "Empty" };

  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  let strength: StrengthResult["strength"] = "Weak";
  if (score < 3) strength = "Weak";
  else if (score < 5) strength = "Moderate";
  else strength = "Strong";

  return { score, strength };
};

// --- Small UI helper components ---
const InputGroup: React.FC<InputGroupProps> = ({
  name,
  type,
  placeholder,
  value,
  onChange,
  Icon,
  required = false,
  error = null,
  className = "",
  inputProps,
}) => (
  <div className={`space-y-1 ${className}`}>
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        className={`w-full pl-12 pr-4 py-3 border rounded-xl transition-all outline-none bg-gray-50 hover:bg-white text-gray-800 shadow-sm
        ${error ? "border-red-400 focus:ring-red-500" : "border-gray-200 focus:ring-purple-500 focus:border-transparent"}`}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        {...inputProps}
      />
    </div>
    {error && (
      <p className="text-red-500 text-xs font-medium flex items-center px-1" role="alert">
        <AlertTriangle className="w-3 h-3 mr-1" /> {error}
      </p>
    )}
  </div>
);

const PasswordInputGroup: React.FC<PasswordInputGroupProps> = ({
  name,
  placeholder,
  value,
  onChange,
  showPassword,
  setShowPassword,
  required = false,
  error = null,
  inputProps,
}) => (
  <div className="space-y-1">
    <div className="relative">
      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        minLength={8}
        className={`w-full pl-12 pr-12 py-3 border rounded-xl transition-all outline-none bg-gray-50 hover:bg-white text-gray-800 shadow-sm
          ${error ? "border-red-400 focus:ring-red-500" : "border-gray-200 focus:ring-purple-500 focus:border-transparent"}`}
        {...inputProps}
      />
      <button
        type="button"
        onClick={() => setShowPassword((s) => !s)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </button>
    </div>
    {error && (
      <p className="text-red-500 text-xs font-medium flex items-center px-1" role="alert">
        <AlertTriangle className="w-3 h-3 mr-1" /> {error}
      </p>
    )}
  </div>
);

const PasswordStrengthIndicator: React.FC<{ strengthResult: StrengthResult }> = ({ strengthResult }) => {
  const { score, strength } = strengthResult;

  const getStyle = (s: string) => {
    switch (s) {
      case "Weak":
        return "bg-red-500 w-1/3";
      case "Moderate":
        return "bg-yellow-500 w-2/3";
      case "Strong":
        return "bg-green-500 w-full";
      default:
        return "bg-gray-200 w-0";
    }
  };

  const getColor = (s: string) => {
    switch (s) {
      case "Weak":
        return "text-red-500";
      case "Moderate":
        return "text-yellow-500";
      case "Strong":
        return "text-green-500";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="mt-1 space-y-1 px-1">
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-500 ${getStyle(strength)}`} style={{ width: score === 0 ? "0%" : `${(score / 5) * 100}%` }} />
      </div>
      <p className={`text-xs font-medium ${getColor(strength)}`}>Password Strength: {strength}</p>
    </div>
  );
};

// --- Main Page Component ---
const PasswordResetPage: React.FC = () => {
  const router = useRouter();

  const [stage, setStage] = useState<Stage>("email");
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const [passwordStrength, setPasswordStrength] = useState<StrengthResult>({ score: 0, strength: "Empty" });
  const [validationErrors, setValidationErrors] = useState<Record<string, string | null>>({});

  // Validate form for reset stage
  const validateResetForm = useCallback((data: typeof formData) => {
    const errors: Record<string, string | null> = {
      email: null,
      otp: null,
      newPassword: null,
      confirmPassword: null,
    };

    if (!data.email) errors.email = "Email is required.";
    if (!data.otp) errors.otp = "OTP is required.";
    if (!data.newPassword) errors.newPassword = "New password is required.";
    if (!data.confirmPassword) errors.confirmPassword = "Confirmation is required.";

    if (data.newPassword && data.newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters long.";
    }

    if (data.newPassword && data.confirmPassword && data.newPassword !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    const s = checkPasswordStrength(data.newPassword);
    setPasswordStrength(s);

    setValidationErrors(errors);

    // If any value is non-null string, invalid
    return Object.values(errors).every((v) => v === null);
  }, []);

  useEffect(() => {
    if (stage === "reset") {
      validateResetForm(formData);
    } else {
      // Reset validation errors when stage changes away
      setValidationErrors({});
      setPasswordStrength({ score: 0, strength: "Empty" });
    }
  }, [formData.newPassword, formData.confirmPassword, stage, validateResetForm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // OTP: only numeric
    const nextVal = name === "otp" ? value.replace(/\D/g, "").slice(0, 6) : value;
    setFormData((prev) => ({ ...prev, [name]: nextVal }));
  };

  // Stage 1: Request Reset
  const handleRequestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setValidationErrors({});

    if (!formData.email) {
      setValidationErrors({ email: "Email is required." });
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(REQUEST_RESET_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const parsed = await parseApiError(res);

      if (res.ok) {
        setMessage("If an account exists, a reset code has been sent to your email.");
        setStage("reset");
      } else {
        setMessage(parsed.message || "Failed to request password reset. Please try again.");
      }
    } catch (err) {
      console.error("Request reset network error:", err);
      setMessage("Network error. Could not connect to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  // Stage 2: Submit OTP + New Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const isValid = validateResetForm(formData);
    if (!isValid) {
      setMessage("Please correct the errors in the form before submitting.");
      return;
    }

    // require moderate strength
    if (passwordStrength.score < 3) {
      setMessage("Please use a stronger password (Moderate or Strong).");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(RESET_PASSWORD_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp,
          newPassword: formData.newPassword,
        }),
      });

      const parsed = await parseApiError(res);

      if (res.ok) {
        setMessage("Password reset successfully! Redirecting to login...");
        setStage("success");
        // use router push for Next.js navigation
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        setMessage(parsed.message || "Password reset failed. Check your OTP or request a new code.");
      }
    } catch (err) {
      console.error("Reset password network error:", err);
      setMessage("Network error. Could not connect to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  // small progress UI
  const progressPercent = stage === "email" ? 33 : stage === "reset" ? 66 : 100;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-inter">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 space-y-6 transform transition duration-500 hover:shadow-3xl border border-gray-100">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-600 rounded-xl mb-2 shadow-lg">
            <Lock className="text-white w-7 h-7" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Password Reset</h1>
          <p className="text-gray-500">
            {stage === "email" && "Step 1: Request code"}
            {stage === "reset" && "Step 2: Enter code & new password"}
            {stage === "success" && "Complete!"}
          </p>
        </div>

        {/* small progress bar */}
        <div className="w-full">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-purple-600 transition-all" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`p-4 rounded-xl shadow-sm transition-all ${
              message.toLowerCase().includes("success") || stage === "success"
                ? "bg-green-50 text-green-700 border border-green-300 flex items-center"
                : "bg-red-50 text-red-700 border border-red-300 flex items-center"
            }`}
            role="status"
            aria-live="polite"
          >
            {message.toLowerCase().includes("success") || stage === "success" ? (
              <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 mr-3 flex-shrink-0" />
            )}
            <p className="text-sm font-medium break-words">{message}</p>
          </div>
        )}

        {/* Forms */}
        {stage === "email" && (
          <form onSubmit={handleRequestEmail} className="space-y-6">
            <p className="text-gray-500 text-center">Enter your email to receive a password reset code.</p>
            <InputGroup
              name="email"
              type="email"
              placeholder="Your Email Address"
              value={formData.email}
              onChange={handleInputChange}
              Icon={Mail}
              required
              error={validationErrors.email}
              inputProps={{ autoComplete: "email" }}
            />
            <button
              type="submit"
              disabled={isLoading || !formData.email}
              className={`w-full flex justify-center items-center py-3 px-4 rounded-xl shadow-lg text-lg font-semibold text-white transition duration-200 ease-in-out transform ${
                isLoading || !formData.email
                  ? "bg-purple-400 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700 hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-purple-300"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader className="animate-spin w-5 h-5 mr-2" /> Sending Code...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" /> Request Reset Code
                </>
              )}
            </button>
          </form>
        )}

        {stage === "reset" && (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <p className="text-gray-500 text-center">
              Enter the OTP sent to <strong className="text-purple-600">{formData.email}</strong> and your new password.
            </p>

            <InputGroup
              name="otp"
              type="text"
              placeholder="6-Digit OTP Code"
              value={formData.otp}
              onChange={handleInputChange}
              Icon={Key}
              required
              error={validationErrors.otp}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*", maxLength: 6, "aria-label": "One time password" }}
            />

            <div>
              <PasswordInputGroup
                name="newPassword"
                placeholder="New Password (min 8 chars, strong preferred)"
                value={formData.newPassword}
                onChange={handleInputChange}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                required
                error={validationErrors.newPassword}
                inputProps={{ autoComplete: "new-password" }}
              />
              <PasswordStrengthIndicator strengthResult={passwordStrength} />
            </div>

            <PasswordInputGroup
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              showPassword={showConfirmPassword}
              setShowPassword={setShowConfirmPassword}
              required
              error={validationErrors.confirmPassword}
              inputProps={{ autoComplete: "new-password" }}
            />

            <button
              type="submit"
              disabled={
                isLoading ||
                passwordStrength.score < 3 ||
                !!validationErrors.confirmPassword ||
                !!validationErrors.newPassword
              }
              className={`w-full flex justify-center items-center py-3 px-4 rounded-xl shadow-lg text-lg font-semibold text-white transition duration-200 ease-in-out transform ${
                isLoading
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-green-300"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader className="animate-spin w-5 h-5 mr-2" /> Resetting...
                </>
              ) : (
                "Set New Password"
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setStage("email");
                setMessage("");
                setValidationErrors({});
                setFormData((f) => ({ ...f, otp: "", newPassword: "", confirmPassword: "" }));
              }}
              className="w-full text-sm text-purple-600 hover:text-purple-800 transition-colors mt-4 p-2"
            >
              &larr; Request a different email
            </button>
          </form>
        )}

        {stage === "success" && (
          <div className="text-center p-4">
            <p className="text-lg font-semibold text-gray-700">You're all set!</p>
            <p className="text-sm text-gray-500">Redirecting to the login page shortly...</p>
            <Loader className="animate-spin w-6 h-6 mx-auto mt-4 text-green-600" />
          </div>
        )}

        <div className="text-center mt-6">
          <a href="/login" className="text-purple-600 font-semibold hover:text-purple-700 transition-colors text-sm">
            &larr; Back to Sign In
          </a>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetPage;
