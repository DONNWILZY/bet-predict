"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Smartphone,
  Lock,
  CheckCircle,
  XCircle,
  Loader,
  Eye,
  EyeOff,
} from "lucide-react";

const SIGNUP_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`;

interface InputGroupProps {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  required?: boolean;
}

interface PasswordInputGroupProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  required?: boolean;
}

interface SimpleLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const SimpleLink: React.FC<SimpleLinkProps> = ({ href, children, className }) => (
  <a href={href} className={className}>
    {children}
  </a>
);

const InputGroup: React.FC<InputGroupProps> = ({
  name,
  type,
  placeholder,
  value,
  onChange,
  Icon,
  required = false,
}) => (
  <div>
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none bg-gray-50 hover:bg-white text-gray-800 shadow-sm"
      />
    </div>
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
}) => (
  <div>
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
        className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none bg-gray-50 hover:bg-white text-gray-800 shadow-sm"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
      >
        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </button>
    </div>
  </div>
);

// Password strength checker
const checkPasswordStrength = (password: string): string => {
  if (!password) return "";
  if (password.length < 8) return "Password too short (min 8 chars)";
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  const strength = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean)
    .length;

  if (strength <= 1) return "Weak password";
  if (strength === 2) return "Fair password";
  if (strength === 3) return "Good password";
  return "Strong password 💪";
};

const SignupPage: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSignup = async (e: React.FormEvent) => {
  e.preventDefault();
  setMessage("");

  // --- Client-side validation ---
  if (formData.password !== formData.confirmPassword) {
    setMessage("Passwords do not match!");
    return;
  }

  const passwordFeedback = checkPasswordStrength(formData.password);
  if (
    passwordFeedback.startsWith("Weak") ||
    passwordFeedback.startsWith("Password too short")
  ) {
    setMessage(passwordFeedback);
    return;
  }

  if (!agreedToTerms) {
    setMessage("Please agree to our terms and conditions");
    return;
  }

  setIsLoading(true);

  try {
    const response = await fetch(SIGNUP_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      }),
    });

    // --- Always parse as JSON safely ---
    let data: any = {};
    try {
      data = await response.json();
    } catch {
      data = { message: "Unexpected response from server." };
    }

    // --- Success ---
    if (response.ok) {
      setMessage(
        "Account created successfully! Redirecting for email verification..."
      );
      setTimeout(() => {
        router.push(`/verify-otp?email=${encodeURIComponent(formData.email)}`);
      }, 1500);
      return;
    }

    // --- Error from backend ---
    setMessage(data.message || "Signup failed. Please try again.");
  } catch (error: any) {
    console.error("Signup error:", error);
    setMessage(
      error.message || "Network error. Could not connect to the server."
    );
  } finally {
    setIsLoading(false);
  }
};


  const passwordStrength = checkPasswordStrength(formData.password);

  const isFormValid =
    formData.password === formData.confirmPassword &&
    agreedToTerms &&
    formData.name &&
    formData.username &&
    formData.email &&
    formData.phone &&
    formData.password &&
    formData.password.length >= 8;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white shadow-2xl rounded-2xl p-8 space-y-6 transform transition duration-500 hover:shadow-3xl border border-gray-100">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-600 rounded-xl mb-2 shadow-lg">
            <User className="text-white w-7 h-7" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Create Your Account</h1>
          <p className="text-gray-500">Start your prediction journey today.</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          {/* name + username */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputGroup
              name="name"
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              Icon={User}
              required
            />
            <InputGroup
              name="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              Icon={User}
              required
            />
          </div>

          {/* email + phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputGroup
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              Icon={Mail}
              required
            />
            <InputGroup
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              Icon={Smartphone}
              required
            />
          </div>

          {/* password + confirm */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PasswordInputGroup
              name="password"
              placeholder="Password (min 8 chars)"
              value={formData.password}
              onChange={handleInputChange}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              required
            />
            <PasswordInputGroup
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              showPassword={showConfirmPassword}
              setShowPassword={setShowConfirmPassword}
              required
            />
          </div>

          {/* Password strength */}
          {formData.password && (
            <p
              className={`text-sm font-medium mt-1 ${
                passwordStrength.includes("Strong")
                  ? "text-green-600"
                  : passwordStrength.includes("Good")
                  ? "text-blue-600"
                  : passwordStrength.includes("Fair")
                  ? "text-yellow-600"
                  : "text-red-500"
              }`}
            >
              {passwordStrength}
            </p>
          )}

          {/* mismatch */}
          {formData.confirmPassword &&
            formData.password !== formData.confirmPassword && (
              <p className="text-red-500 text-sm font-medium mt-1">
                Passwords do not match.
              </p>
            )}

          {/* terms */}
          <div className="flex items-start space-x-3 pt-2">
            <input
              id="terms"
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2 mt-0.5 shadow-sm"
            />
            <label htmlFor="terms" className="text-sm text-gray-600 leading-5">
              I agree to the{" "}
              <SimpleLink
                href="/terms"
                className="text-purple-600 hover:text-purple-500 font-medium"
              >
                Terms of Service
              </SimpleLink>{" "}
              and{" "}
              <SimpleLink
                href="/privacy"
                className="text-purple-600 hover:text-purple-500 font-medium"
              >
                Privacy Policy
              </SimpleLink>
            </label>
          </div>

          {/* submit */}
          <button
            type="submit"
            disabled={isLoading || !isFormValid}
            className={`w-full flex justify-center items-center py-3 px-4 rounded-xl shadow-lg text-lg font-semibold text-white transition duration-200 ease-in-out transform ${
              isLoading || !isFormValid
                ? "bg-purple-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700 hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-purple-300"
            }`}
          >
            {isLoading ? (
              <>
                <Loader className="animate-spin w-5 h-5 mr-2" /> Signing Up...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* message */}
        {message && (
          <div
            className={`p-4 rounded-xl shadow-sm ${
              message.includes("successfully") || message.includes("Redirecting")
                ? "bg-green-50 text-green-700 border border-green-300 flex items-center"
                : "bg-red-50 text-red-700 border border-red-300 flex items-center"
            }`}
          >
            {message.includes("successfully") || message.includes("Redirecting") ? (
              <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 mr-3 flex-shrink-0" />
            )}
            <p className="text-sm font-medium">{message}</p>
          </div>
        )}

        {/* sign in link */}
        <div className="text-center mt-6">
          <span className="text-gray-500 text-sm">Already have an account? </span>
          <SimpleLink
            href="/login"
            className="text-purple-600 font-semibold hover:text-purple-700 transition-colors text-sm"
          >
            Sign in
          </SimpleLink>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
