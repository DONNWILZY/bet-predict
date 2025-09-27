//src\app\(auth)\mfa\page.tsx

"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/app/(home)/navbar";

export default function MFAPage() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Start countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setMessage(""); // Clear any error messages

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newCode = pasteData.split('').concat(['', '', '', '', '', '']).slice(0, 6);
    setCode(newCode);
    
    // Focus the last filled input or the first empty one
    const lastFilledIndex = newCode.findIndex(digit => !digit) - 1;
    const focusIndex = lastFilledIndex >= 0 ? Math.min(lastFilledIndex + 1, 5) : 5;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const fullCode = code.join('');
    if (fullCode.length !== 6) {
      setMessage("Please enter the complete 6-digit code");
      return;
    }

    setIsLoading(true);
    // TODO: Connect to your MFA/2FA verification API
    setTimeout(() => {
      // Simulate verification (you can change this logic)
      if (fullCode === "123456") {
        setMessage("Verification successful! Redirecting to dashboard...");
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      } else {
        setMessage("Invalid code. Please check and try again.");
        setCode(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleResendCode = async () => {
    setIsResending(true);
    setCanResend(false);
    setTimeLeft(300); // Reset timer
    
    // TODO: Call your resend MFA code API
    setTimeout(() => {
      setMessage("New verification code sent to your authenticator app!");
      setIsResending(false);
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-2xl mb-4">
              <span className="text-2xl">🔐</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Two-factor authentication</h1>
            <p className="text-gray-600">Enter the 6-digit code from your authenticator app</p>
          </div>

          {/* 2FA Form */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            <form onSubmit={handleVerify} className="space-y-6">
              {/* Code Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4 text-center">
                  Verification code
                </label>
                <div className="flex gap-3 justify-center" onPaste={handlePaste}>
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      // ref={(el) => (inputRefs.current[index] = el)}
                      className="w-12 h-12 text-center text-xl font-bold border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none bg-gray-50 hover:bg-white"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleInputChange(index, e.target.value.replace(/\D/g, ''))}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      disabled={isLoading}
                    />
                  ))}
                </div>
                <p className="text-gray-500 text-xs text-center mt-2">
                  You can paste the full code or enter it digit by digit
                </p>
              </div>

              {/* Timer */}
              <div className="text-center">
                <div className={`inline-flex items-center px-4 py-2 rounded-lg ${
                  timeLeft > 0 
                    ? 'bg-blue-50 border border-blue-200' 
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <span className="text-lg mr-2">⏱️</span>
                  <span className={`text-sm font-medium ${
                    timeLeft > 0 ? 'text-blue-700' : 'text-red-700'
                  }`}>
                    {timeLeft > 0 ? (
                      <>Code expires in: <span className="font-mono">{formatTime(timeLeft)}</span></>
                    ) : (
                      "Code has expired"
                    )}
                  </span>
                </div>
              </div>

              {/* Verify Button */}
              <Button 
                type="submit" 
                disabled={isLoading || code.join('').length !== 6 || timeLeft === 0}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Verifying...
                  </div>
                ) : (
                  "Verify code"
                )}
              </Button>

              {/* Message */}
              {message && (
                <div className={`p-4 rounded-xl ${
                  message.includes("successful") || message.includes("sent") 
                    ? "bg-green-50 border border-green-200" 
                    : "bg-red-50 border border-red-200"
                }`}>
                  <p className={`text-center text-sm font-medium ${
                    message.includes("successful") || message.includes("sent")
                      ? "text-green-700" 
                      : "text-red-700"
                  }`}>
                    {message}
                  </p>
                </div>
              )}

              {/* Resend Code */}
              <div className="text-center">
                {canResend || timeLeft === 0 ? (
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={isResending}
                    className="text-purple-600 hover:text-purple-500 transition-colors text-sm font-medium underline disabled:opacity-50"
                  >
                    {isResending ? "Sending new code..." : "Request new code"}
                  </button>
                ) : (
                  <p className="text-gray-500 text-sm">
                    Didn't receive the code? You can request a new one in {formatTime(timeLeft)}
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* Help Section */}
          <div className="mt-6 space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <span className="text-blue-500 text-lg">💡</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-blue-900 mb-1">Having trouble?</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Make sure your device's time is synchronized</li>
                    <li>• Check your authenticator app (Google Authenticator, Authy, etc.)</li>
                    <li>• Use the most recent code generated</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className="text-gray-500 text-sm">
                Can't access your authenticator?{" "}
                <button 
                  onClick={() => window.location.href = '/support'}
                  className="text-purple-600 hover:text-purple-500 font-medium transition-colors"
                >
                  Contact support
                </button>
              </p>
              <button 
                onClick={() => window.location.href = '/login'}
                className="text-gray-500 hover:text-gray-700 transition-colors text-sm font-medium"
              >
                ← Back to sign in
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}