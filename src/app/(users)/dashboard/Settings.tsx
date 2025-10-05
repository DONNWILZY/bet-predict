import React, { useState } from 'react';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { requireRole } from "@/lib/auth/checkAuth";
import { KeyRound, Shield, Paintbrush, Bell, Mail, Smartphone, Lock, Eye, EyeOff, Trash2, Globe, MessageSquare, Activity } from 'lucide-react';

export default function Settings() {
  // Security states
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [twoFactorType, setTwoFactorType] = useState<'email' | 'app' | null>(null);
  
  // 2FA Email states
  const [emailStep, setEmailStep] = useState<'activate' | 'verify' | 'complete'>('activate');
  const [otpCode, setOtpCode] = useState('');
  const [email2FAEnabled, setEmail2FAEnabled] = useState(false);
  
  // 2FA App states
  const [app2FAEnabled, setApp2FAEnabled] = useState(false);
  const [qrCodeShown, setQrCodeShown] = useState(false);
  
  // Notification toggles
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [weeklyReports, setWeeklyReports] = useState(true);
  
  // Privacy toggles
  const [showEarnings, setShowEarnings] = useState(false);
  const [allowMessages, setAllowMessages] = useState(true);
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);

  // Password change states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handle2FAEmailActivate = () => {
    // Simulate sending OTP
    setEmailStep('verify');
    alert('OTP sent to your email!');
  };

  const handleVerifyOTP = () => {
    if (otpCode.length === 6) {
      setEmailStep('complete');
      setEmail2FAEnabled(true);
      setTimeout(() => {
        setShow2FAModal(false);
        setEmailStep('activate');
        setOtpCode('');
      }, 2000);
    } else {
      alert('Please enter a valid 6-digit OTP');
    }
  };

  const handleApp2FASetup = () => {
    setQrCodeShown(true);
  };

  const handleApp2FAComplete = () => {
    setApp2FAEnabled(true);
    setShow2FAModal(false);
    setQrCodeShown(false);
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters!');
      return;
    }
    alert('Password changed successfully!');
    setShowPasswordModal(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleDeleteAccount = () => {
    const confirmed = confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (confirmed) {
      alert('Account deletion initiated. You will receive a confirmation email.');
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

      <div className="grid gap-6">
        {/* Security Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Security</h3>
          <div className="space-y-4">
            <button 
              onClick={() => setShowPasswordModal(true)}
              className="w-full flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-left"
            >
              <div className="p-2 bg-purple-50 rounded-xl">
                <KeyRound className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-900 font-medium">Change Password</p>
                <p className="text-gray-500 text-sm">Update your account password</p>
              </div>
            </button>

            <button 
              onClick={() => {
                setShow2FAModal(true);
                setTwoFactorType('email');
              }}
              className="w-full flex items-center justify-between gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-left"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-emerald-50 rounded-xl">
                  <Mail className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-gray-900 font-medium">Email 2FA</p>
                  <p className="text-gray-500 text-sm">Verify with email OTP</p>
                </div>
              </div>
              {email2FAEnabled && (
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-medium">
                  Active
                </span>
              )}
            </button>

            <button 
              onClick={() => {
                setShow2FAModal(true);
                setTwoFactorType('app');
              }}
              className="w-full flex items-center justify-between gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-left"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-50 rounded-xl">
                  <Smartphone className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-900 font-medium">Authenticator App 2FA</p>
                  <p className="text-gray-500 text-sm">Use Google Authenticator or similar</p>
                </div>
              </div>
              {app2FAEnabled && (
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-medium">
                  Active
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-50 rounded-xl">
              <Bell className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-gray-900 font-medium">Email notifications</p>
                <p className="text-gray-500 text-sm">Receive updates via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-gray-900 font-medium">Push notifications</p>
                <p className="text-gray-500 text-sm">Get push notifications on your device</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={pushNotifications}
                  onChange={(e) => setPushNotifications(e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-gray-900 font-medium">SMS alerts</p>
                <p className="text-gray-500 text-sm">Receive important alerts via SMS</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={smsAlerts}
                  onChange={(e) => setSmsAlerts(e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-gray-900 font-medium">Weekly reports</p>
                <p className="text-gray-500 text-sm">Get weekly performance summaries</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={weeklyReports}
                  onChange={(e) => setWeeklyReports(e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Privacy Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-xl">
              <Lock className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Privacy</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-gray-900 font-medium">Show earnings publicly</p>
                  <p className="text-gray-500 text-sm">Display your earnings on your profile</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={showEarnings}
                  onChange={(e) => setShowEarnings(e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-gray-900 font-medium">Allow direct messages</p>
                  <p className="text-gray-500 text-sm">Let other users send you messages</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={allowMessages}
                  onChange={(e) => setAllowMessages(e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-gray-900 font-medium">Show online status</p>
                  <p className="text-gray-500 text-sm">Let others see when you're online</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={showOnlineStatus}
                  onChange={(e) => setShowOnlineStatus(e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white border border-red-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-50 rounded-xl">
              <Trash2 className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Danger Zone</h3>
          </div>
          <button 
            onClick={handleDeleteAccount}
            className="w-full flex items-center gap-4 p-4 bg-red-50 hover:bg-red-100 rounded-xl transition-colors text-left border border-red-200"
          >
            <Trash2 className="w-5 h-5 text-red-600" />
            <div>
              <p className="text-red-700 font-medium">Delete Account</p>
              <p className="text-red-600 text-sm">Permanently delete your account and all data</p>
            </div>
          </button>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Change Password</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full p-4 pr-12 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-4 pr-12 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-4 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordChange}
                className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-colors shadow-sm"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2FA Modal */}
      {show2FAModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl">
            {twoFactorType === 'email' && (
              <>
                {emailStep === 'activate' && (
                  <>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-emerald-50 rounded-xl">
                        <Mail className="w-6 h-6 text-emerald-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">Email 2FA</h2>
                    </div>
                    <p className="text-gray-600 mb-6">We'll send a 6-digit verification code to your email address each time you log in.</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setShow2FAModal(false)}
                        className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handle2FAEmailActivate}
                        className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors shadow-sm"
                      >
                        Send OTP
                      </button>
                    </div>
                  </>
                )}

                {emailStep === 'verify' && (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Enter OTP</h2>
                    <p className="text-gray-600 mb-4">Enter the 6-digit code sent to your email</p>
                    <input
                      type="text"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      maxLength={6}
                      className="w-full p-4 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-center text-2xl tracking-widest font-mono mb-6"
                      placeholder="000000"
                    />
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setEmailStep('activate');
                          setOtpCode('');
                        }}
                        className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleVerifyOTP}
                        className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors shadow-sm"
                      >
                        Verify
                      </button>
                    </div>
                  </>
                )}

                {emailStep === 'complete' && (
                  <>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-8 h-8 text-emerald-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">2FA Activated!</h2>
                      <p className="text-gray-600">Email two-factor authentication is now active on your account.</p>
                    </div>
                  </>
                )}
              </>
            )}

            {twoFactorType === 'app' && (
              <>
                {!qrCodeShown ? (
                  <>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-blue-50 rounded-xl">
                        <Smartphone className="w-6 h-6 text-blue-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">Authenticator App</h2>
                    </div>
                    <p className="text-gray-600 mb-6">Use an authenticator app like Google Authenticator or Authy to generate verification codes.</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setShow2FAModal(false)}
                        className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleApp2FASetup}
                        className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-sm"
                      >
                        Setup
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Scan QR Code</h2>
                    <div className="bg-gray-100 rounded-xl p-8 mb-4 flex items-center justify-center">
                      <div className="w-48 h-48 bg-white rounded-lg flex items-center justify-center">
                        <p className="text-gray-400 text-sm text-center">QR Code<br/>Placeholder</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 text-center">Scan this code with your authenticator app</p>
                    <p className="text-gray-500 text-xs mb-6 text-center font-mono bg-gray-50 p-3 rounded-lg">
                      Manual key: ABCD-EFGH-IJKL-MNOP
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setQrCodeShown(false)}
                        className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleApp2FAComplete}
                        className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-sm"
                      >
                        Complete
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}