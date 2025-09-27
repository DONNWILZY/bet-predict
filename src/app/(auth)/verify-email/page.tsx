//src\app\(auth)\verify-email\page.tsx

"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/app/(home)/navbar";

export default function VerifyEmailPage() {
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error' | 'pending'>('loading');
  const [message, setMessage] = useState("Verifying your email address...");
  const [email, setEmail] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const searchParams = useSearchParams();
  const token = searchParams?.get('token');
  const userEmail = searchParams?.get('email');

  useEffect(() => {
    if (userEmail) {
      setEmail(decodeURIComponent(userEmail));
    }

    if (token) {
      // TODO: Verify token with your API
      setTimeout(() => {
        // Simulate API call - you can change this logic
        const isValid = Math.random() > 0.2; // 80% success rate for demo
        if (isValid) {
          setVerificationStatus('success');
          setMessage("Your email has been successfully verified!");
        } else {
          setVerificationStatus('error');
          setMessage("This verification link is invalid or has expired.");
        }
      }, 2500);
    } else {
      setVerificationStatus('pending');
      setMessage("Please check your email for a verification link.");
    }
  }, [token, userEmail]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleResendVerification = async () => {
    setIsResending(true);
    setResendCooldown(60); // 60 second cooldown
    
    // TODO: Call your resend verification API
    setTimeout(() => {
      setMessage("New verification email sent! Please check your inbox and spam folder.");
      setIsResending(false);
    }, 1000);
  };

  const getStatusConfig = () => {
    switch (verificationStatus) {
      case 'loading':
        return {
          icon: (
            <div className="relative">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-purple-200 border-t-purple-600"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs">📧</span>
              </div>
            </div>
          ),
          bgColor: 'bg-purple-600',
          title: 'Verifying your email...',
          subtitle: 'This will only take a moment'
        };
      case 'success':
        return {
          icon: <span className="text-4xl">✅</span>,
          bgColor: 'bg-green-500',
          title: 'Email verified successfully!',
          subtitle: 'Your account is now active and ready to use'
        };
      case 'error':
        return {
          icon: <span className="text-4xl">❌</span>,
          bgColor: 'bg-red-500',
          title: 'Verification failed',
          subtitle: 'There was a problem verifying your email'
        };
      default:
        return {
          icon: <span className="text-4xl">📬</span>,
          bgColor: 'bg-blue-500',
          title: 'Check your email',
          subtitle: 'We\'ve sent you a verification link'
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-20 h-20 ${statusConfig.bgColor} rounded-2xl mb-4 shadow-lg`}>
              {statusConfig.icon}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{statusConfig.title}</h1>
            <p className="text-gray-600">{statusConfig.subtitle}</p>
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            {verificationStatus === 'success' && (
              <div className="text-center space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-2xl mr-2">🎉</span>
                    <span className="font-semibold text-green-900">Welcome to BET-PREDICT-PRO!</span>
                  </div>
                  <p className="text-green-700 text-sm">
                    Your account is now verified and you can start making football predictions. 
                    Get ready to showcase your expertise!
                  </p>
                </div>

                <div className="space-y-3">
                  <Button 
                    onClick={() => window.location.href = '/login'}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-green-500/25"
                  >
                    Sign in to your account
                  </Button>
                  
                  <Button 
                    onClick={() => window.location.href = '/'}
                    variant="outline"
                    className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold py-3 rounded-xl transition-all duration-200"
                  >
                    Explore the platform
                  </Button>
                </div>
              </div>
            )}

            {verificationStatus === 'error' && (
              <div className="text-center space-y-6">
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-red-900 mb-2 flex items-center justify-center">
                    <span className="mr-2">⚠️</span>
                    Verification failed
                  </h4>
                  <div className="text-sm text-red-700 text-left space-y-1">
                    <p className="font-medium">This could happen because:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>The verification link has expired</li>
                      <li>The link has already been used</li>
                      <li>The link was corrupted or incomplete</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    onClick={handleResendVerification}
                    disabled={isResending || resendCooldown > 0}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isResending ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending new link...
                      </div>
                    ) : resendCooldown > 0 ? (
                      `Resend in ${resendCooldown}s`
                    ) : (
                      "Send new verification link"
                    )}
                  </Button>
                  
                  <Button 
                    onClick={() => window.location.href = '/signup'}
                    variant="outline"
                    className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold py-3 rounded-xl transition-all duration-200"
                  >
                    Back to sign up
                  </Button>
                </div>
              </div>
            )}

            {verificationStatus === 'pending' && (
              <div className="text-center space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-blue-900 mb-3 flex items-center justify-center">
                    <span className="mr-2">📋</span>
                    What to do next:
                  </h4>
                  <ol className="text-sm text-blue-700 text-left space-y-2 list-decimal list-inside">
                    <li>Check your email inbox{email && ` (${email})`}</li>
                    <li>Look for an email from BET-PREDICT-PRO</li>
                    <li>Click the verification link in the email</li>
                    <li>Return here to complete your registration</li>
                  </ol>
                  
                  {email && (
                    <div className="mt-3 p-2 bg-blue-100 border border-blue-300 rounded-lg">
                      <p className="text-blue-800 text-xs">
                        <strong>Email sent to:</strong> {email}
                      </p>
                    </div>
                  )}
                </div>

                <Button 
                  onClick={handleResendVerification}
                  disabled={isResending || resendCooldown > 0}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isResending ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Resending email...
                    </div>
                  ) : resendCooldown > 0 ? (
                    `Resend available in ${resendCooldown}s`
                  ) : (
                    "Resend verification email"
                  )}
                </Button>
              </div>
            )}

            {verificationStatus === 'loading' && (
              <div className="text-center space-y-6">
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                  <p className="text-purple-700 text-sm mb-4">
                    We're verifying your email address. This usually takes just a few seconds...
                  </p>
                  
                  {/* Loading Animation */}
                  <div className="flex justify-center space-x-1">
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Help Section */}
          <div className="mt-6 space-y-4">
            {/* Email Tips */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <span className="text-yellow-600 text-lg">💡</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-yellow-900 mb-1">Can't find the email?</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Check your spam or junk folder</li>
                    <li>• Make sure you entered the correct email</li>
                    <li>• Wait a few minutes for delivery</li>
                    <li>• Add our domain to your safe senders list</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="text-center">
              <p className="text-gray-500 text-sm">
                Still having trouble?{" "}
                <button 
                  onClick={() => window.location.href = '/support'}
                  className="text-purple-600 hover:text-purple-500 font-medium transition-colors underline"
                >
                  Contact our support team
                </button>
                {" "}for immediate assistance
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}