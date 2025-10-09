import React from 'react';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { requireRole } from "@/lib/auth/checkAuth";
import { User, FileText, ShieldCheck, CreditCard, Loader2 } from 'lucide-react';
import { Bio, BankDetails, KycDetails, Status } from '@/lib/profileType';
import { handleApiResponse } from '../../../utils/apiHandler';
import { ApiError } from '../../../utils/ApiError';

const ACCESS_TOKEN_KEY = "accessToken";
const USER_KEY = "user";
const PROFILE_REMINDER_KEY = "lastProfileReminder";

interface ProfileProps {
  bio: Bio;
  setBio: React.Dispatch<React.SetStateAction<Bio>>;
  kycStatus: Status;
  setKycStatus: React.Dispatch<React.SetStateAction<Status>>;
  bankDetails: BankDetails;
  setBankDetails: React.Dispatch<React.SetStateAction<BankDetails>>;
  kycDetails: KycDetails;
  setKycDetails: React.Dispatch<React.SetStateAction<KycDetails>>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  getStatusColor: (status: Status) => string;
}

// Check if profile reminder should be shown (once per week)
function shouldShowProfileReminder(): boolean {
  if (typeof window === 'undefined') return false;
  
  const lastReminder = localStorage.getItem(PROFILE_REMINDER_KEY);
  if (!lastReminder) return true;
  
  const weekInMs = 7 * 24 * 60 * 60 * 1000;
  const now = Date.now();
  const lastReminderTime = parseInt(lastReminder, 10);
  
  return now - lastReminderTime > weekInMs;
}

function setProfileReminderShown(): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(PROFILE_REMINDER_KEY, Date.now().toString());
  }
}

async function fetchUserProfile() {
  try {
    const accessToken = typeof window !== 'undefined' ? sessionStorage.getItem(ACCESS_TOKEN_KEY) : null;

    if (!accessToken) {
      throw new ApiError("Access token not found", 401);
    }

    // FIX: Remove duplicate /api in URL
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await handleApiResponse<{ profile: any }>(response);
    return data.profile;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
}

async function updateUserBio(bio: Bio) {
  try {
    const accessToken = sessionStorage.getItem(ACCESS_TOKEN_KEY);
    const userData = JSON.parse(localStorage.getItem(USER_KEY) || "{}");

    if (!accessToken || !userData.id) {
      throw new ApiError("Access token or user ID not found", 401);
    }

    const userId = userData.id;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${userId}/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        name: bio.name || '',
        phone: bio.phone || '',
        dateOfBirth: bio.dateOfBirth || '',
        location: bio.location || '',
        bio: bio.bio || '',
        gender: bio.gender || '',
        occupation: bio.occupation || '',
        interests: bio.interests || [],
      }),
    });

    const data = await handleApiResponse<{ profile: any }>(response);
    return data.profile;
    console.log(data.profile)
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`API Error ${error.code}:`, error.message);
      throw error;
    }
    throw error;
  }
}

async function updateBankDetails(bankDetails: BankDetails) {
  try {
    const accessToken = sessionStorage.getItem(ACCESS_TOKEN_KEY);
    const userData = JSON.parse(localStorage.getItem(USER_KEY) || "{}");

    if (!accessToken || !userData.id) {
      throw new ApiError("Access token or user ID not found", 401);
    }

    const userId = userData.id;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${userId}/bank-details`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        bankName: bankDetails.bankName || '',
        accountName: bankDetails.accountName || '',
        accountNumber: bankDetails.accountNumber || '',
      }),
    });

    const data = await handleApiResponse<{ bankDetails: BankDetails }>(response);
    return data.bankDetails;
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`API Error ${error.code}:`, error.message);
      throw error;
    }
    throw error;
  }
}

async function updateKycDetails(kycDetails: KycDetails) {
  try {
    const accessToken = sessionStorage.getItem(ACCESS_TOKEN_KEY);
    const userData = JSON.parse(localStorage.getItem(USER_KEY) || "{}");

    if (!accessToken || !userData.id) {
      throw new ApiError("Access token or user ID not found", 401);
    }

    const userId = userData.id;

    const formData = new FormData();
    
    formData.append('kycDetails', JSON.stringify({
      type: kycDetails.type || '',
      number: kycDetails.number || '',
    }));
    
    if (kycDetails.document instanceof File) {
      formData.append('kycDocument', kycDetails.document);
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${userId}/kyc`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });
    
    const data = await handleApiResponse<{ profile: any }>(response);
    return data.profile;
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`API Error ${error.code}:`, error.message);
      throw error;
    }
    throw error;
  }
}

export default function Profile({
  bio,
  setBio,
  kycStatus,
  setKycStatus,
  bankDetails,
  setBankDetails,
  kycDetails,
  setKycDetails,
  isEditing,
  setIsEditing,
  getStatusColor,
}: ProfileProps) {
  const router = useRouter();
  const auth = requireRole(["USER", "ADMIN", "SUPERADMIN"], {
    name: '',
    email: '',
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingBank, setIsEditingBank] = useState(false);
  const [isEditingKyc, setIsEditingKyc] = useState(false);
  const [userRole, setUserRole] = useState('User');
  const [showProfileReminder, setShowProfileReminder] = useState(false);
  
  // Loading states for each section
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingBank, setSavingBank] = useState(false);
  const [savingKyc, setSavingKyc] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated && auth.redirect) router.push(auth.redirect);
    if (auth.unauthorized) router.push("/unauthorized");
  }, [auth, router]);

  if (auth.unauthorized || !auth.isAuthenticated) return null;

  // Check profile completeness and show reminder
  useEffect(() => {
    const isProfileIncomplete = !bio.phone || !bio.dateOfBirth || !bio.location || !bio.bio;
    const isBankIncomplete = !bankDetails.bankName || !bankDetails.accountNumber;
    
    if ((isProfileIncomplete || isBankIncomplete) && shouldShowProfileReminder()) {
      setShowProfileReminder(true);
    }
  }, [bio, bankDetails]);

  // Fetch profile data on mount
  useEffect(() => {
    async function loadProfile() {
      try {
        const profile = await fetchUserProfile();
        
        // Set bio with fallback to empty strings
        setBio({
          name: profile.name || '',
          email: profile.email || '',
          phone: profile.phone || '',
          dateOfBirth: profile.dateOfBirth || '',
          location: profile.location || '',
          bio: profile.bio || '',
          gender: profile.gender || '',
          occupation: profile.occupation || '',
          interests: profile.interests || profile.interest || [],
          interest: profile.interest || profile.interests || [],
          userName: profile.userName || '',
        });

        // Set bank details with fallback to empty strings
        setBankDetails({
          id: profile.bankDetails?.id || '',
          userId: profile.bankDetails?.userId || '',
          bankName: profile.bankDetails?.bankName || '',
          accountName: profile.bankDetails?.accountName || '',
          accountNumber: profile.bankDetails?.accountNumber || '',
        });

        // Set KYC details with fallback to empty strings
        setKycDetails({
          id: profile.kycDetails?.id || '',
          userId: profile.kycDetails?.userId || '',
          type: profile.kycDetails?.type || '',
          number: profile.kycDetails?.number || '',
          document: profile.kycDetails?.document || '',
          status: profile.kycDetails?.status || '',
          note: profile.kycDetails?.note || '',
        });

        setKycStatus(profile.kyc?.status || 'PENDING');
        setUserRole(profile.isCreator ? 'Creator' : (profile.role || 'User').charAt(0).toUpperCase() + (profile.role || 'User').slice(1));
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    }
    loadProfile();
  }, [setBio, setBankDetails, setKycDetails, setKycStatus]);

  const handleSaveProfile = async () => {
    setSavingProfile(true);
    try {
      const updatedProfile = await updateUserBio(bio);
      
      setBio({
        name: updatedProfile.name || bio.name,
        email: updatedProfile.email || bio.email,
        phone: updatedProfile.phone || bio.phone,
        dateOfBirth: updatedProfile.dateOfBirth || bio.dateOfBirth,
        location: updatedProfile.location || bio.location,
        bio: updatedProfile.bio || bio.bio,
        gender: updatedProfile.gender || bio.gender,
        occupation: updatedProfile.occupation || bio.occupation,
        interests: updatedProfile.interests || updatedProfile.interest || bio.interests,
        interest: updatedProfile.interest || updatedProfile.interests || bio.interest,
        userName: bio.userName,
      });
      
      setIsEditingProfile(false);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save profile:", error);
      alert(error instanceof ApiError ? error.message : "Failed to save profile");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleSaveBank = async () => {
    setSavingBank(true);
    try {
      const updatedBankDetails = await updateBankDetails(bankDetails);
      
      setBankDetails({
        id: updatedBankDetails.id || bankDetails.id,
        userId: updatedBankDetails.userId || bankDetails.userId,
        bankName: updatedBankDetails.bankName || bankDetails.bankName,
        accountName: updatedBankDetails.accountName || bankDetails.accountName,
        accountNumber: updatedBankDetails.accountNumber || bankDetails.accountNumber,
      });
      
      setIsEditingBank(false);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save bank details:", error);
      alert(error instanceof ApiError ? error.message : "Failed to save bank details");
    } finally {
      setSavingBank(false);
    }
  };

  const handleSaveKyc = async () => {
    setSavingKyc(true);
    try {
      const updatedProfile = await updateKycDetails(kycDetails);
      
      setKycDetails({
        id: updatedProfile.kycDetails?.id || kycDetails.id,
        userId: updatedProfile.kycDetails?.userId || kycDetails.userId,
        type: updatedProfile.kycDetails?.type || kycDetails.type,
        number: updatedProfile.kycDetails?.number || kycDetails.number,
        document: updatedProfile.kycDetails?.document || kycDetails.document,
        status: updatedProfile.kycDetails?.status || kycDetails.status,
        note: updatedProfile.kycDetails?.note || kycDetails.note,
      });
      
      setKycStatus(updatedProfile.kyc?.status || kycStatus);
      setIsEditingKyc(false);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save KYC details:", error);
      alert(error instanceof ApiError ? error.message : "Failed to save KYC details");
    } finally {
      setSavingKyc(false);
    }
  };

  const dismissProfileReminder = () => {
    setShowProfileReminder(false);
    setProfileReminderShown();
  };

  return (
    <div className="space-y-8">
      {/* Profile Reminder Banner */}
      {showProfileReminder && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-amber-100 rounded-xl">
                <User className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-amber-900 mb-1">Complete Your Profile</h3>
                <p className="text-amber-700 text-sm">
                  Keep your profile updated to enjoy the full benefits of our platform. 
                  Please add missing information below.
                </p>
              </div>
            </div>
            <button
              onClick={dismissProfileReminder}
              className="text-amber-600 hover:text-amber-700 font-medium text-sm"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Profile Header */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {auth.user?.name
                  ? auth.user.name
                      .split(' ')
                      .map((n: string) => n[0])
                      .join('')
                      .toUpperCase()
                  : 'U'}
              </div>
              <button className="absolute -bottom-2 -right-2 p-2 bg-purple-600 hover:bg-purple-700 rounded-xl text-white transition-colors shadow-sm">
                <User className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{bio.name || 'User'}</h2>
              <p className="text-gray-600 mb-2">{bio.email || 'No email'}</p>
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(kycStatus)}`}>
                  KYC {kycStatus}
                </span>
                <span className="px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-full text-sm">
                  {userRole}
                </span>
              </div>
              <p className="text-gray-600 text-sm max-w-md">
                {bio.bio || 'No bio provided. Click Edit to add your bio.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
          <button
            onClick={() => isEditingProfile ? handleSaveProfile() : setIsEditingProfile(true)}
            disabled={savingProfile}
            className={`px-6 py-3 rounded-xl font-medium transition-colors shadow-sm flex items-center gap-2 ${
              isEditingProfile
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {savingProfile ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              isEditingProfile ? 'Save Changes' : 'Edit'
            )}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              className={`w-full p-4 rounded-xl border text-gray-900 placeholder-gray-400 transition-all ${
                isEditingProfile
                  ? 'bg-white border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
                  : 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60'
              }`}
              value={bio.name}
              onChange={(e) => isEditingProfile && setBio({ ...bio, name: e.target.value })}
              disabled={!isEditingProfile}
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
              <span className="ml-2 text-xs text-gray-500">(Cannot be changed)</span>
            </label>
            <input
              className="w-full p-4 rounded-xl border bg-gray-50 border-gray-200 text-gray-900 cursor-not-allowed opacity-60"
              value={bio.email}
              disabled={true}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              className={`w-full p-4 rounded-xl border text-gray-900 placeholder-gray-400 transition-all ${
                isEditingProfile
                  ? 'bg-white border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
                  : 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60'
              }`}
              value={bio.phone}
              onChange={(e) => isEditingProfile && setBio({ ...bio, phone: e.target.value })}
              disabled={!isEditingProfile}
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
            <input
              type="date"
              className={`w-full p-4 rounded-xl border text-gray-900 placeholder-gray-400 transition-all ${
                isEditingProfile
                  ? 'bg-white border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
                  : 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60'
              }`}
              value={bio.dateOfBirth}
              onChange={(e) => isEditingProfile && setBio({ ...bio, dateOfBirth: e.target.value })}
              disabled={!isEditingProfile}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              className={`w-full p-4 rounded-xl border text-gray-900 placeholder-gray-400 transition-all ${
                isEditingProfile
                  ? 'bg-white border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
                  : 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60'
              }`}
              value={bio.location}
              onChange={(e) => isEditingProfile && setBio({ ...bio, location: e.target.value })}
              disabled={!isEditingProfile}
              placeholder="Enter your location"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <select
              className={`w-full p-4 rounded-xl border text-gray-900 transition-all ${
                isEditingProfile
                  ? 'bg-white border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
                  : 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60'
              }`}
              value={bio.gender}
              onChange={(e) => isEditingProfile && setBio({ ...bio, gender: e.target.value })}
              disabled={!isEditingProfile}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Occupation</label>
            <input
              className={`w-full p-4 rounded-xl border text-gray-900 placeholder-gray-400 transition-all ${
                isEditingProfile
                  ? 'bg-white border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
                  : 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60'
              }`}
              value={bio.occupation}
              onChange={(e) => isEditingProfile && setBio({ ...bio, occupation: e.target.value })}
              disabled={!isEditingProfile}
              placeholder="Enter your occupation"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            <textarea
              rows={4}
              className={`w-full p-4 rounded-xl border text-gray-900 placeholder-gray-400 transition-all resize-none ${
                isEditingProfile
                  ? 'bg-white border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
                  : 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60'
              }`}
              value={bio.bio}
              onChange={(e) => isEditingProfile && setBio({ ...bio, bio: e.target.value })}
              disabled={!isEditingProfile}
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>
      </div>

      {/* Bank Account Details */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-xl">
              <CreditCard className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Bank Account Details</h3>
          </div>
          <button
            onClick={() => isEditingBank ? handleSaveBank() : setIsEditingBank(true)}
            disabled={savingBank}
            className={`px-6 py-3 rounded-xl font-medium transition-colors shadow-sm flex items-center gap-2 ${
              isEditingBank
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {savingBank ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              isEditingBank ? 'Save Changes' : 'Edit'
            )}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
            <select
              className={`w-full p-4 rounded-xl border text-gray-900 transition-all ${
                isEditingBank
                  ? 'bg-white border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
                  : 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60'
              }`}
              value={bankDetails.bankName}
              onChange={(e) =>
                isEditingBank && setBankDetails({ ...bankDetails, bankName: e.target.value })
              }
              disabled={!isEditingBank}
            >
              <option value="">Select Bank</option>
              <option value="First Bank of Nigeria">First Bank of Nigeria</option>
              <option value="Access Bank">Access Bank</option>
              <option value="GTBank">GTBank</option>
              <option value="UBA">UBA</option>
              <option value="Zenith Bank">Zenith Bank</option>
              <option value="Sterling Bank">Sterling Bank</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Account Name</label>
            <input
              className={`w-full p-4 rounded-xl border text-gray-900 placeholder-gray-400 transition-all ${
                isEditingBank
                  ? 'bg-white border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
                  : 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60'
              }`}
              value={bankDetails.accountName}
              onChange={(e) =>
                isEditingBank && setBankDetails({ ...bankDetails, accountName: e.target.value })
              }
              disabled={!isEditingBank}
              placeholder="Account holder name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
            <input
              className={`w-full p-4 rounded-xl border text-gray-900 placeholder-gray-400 transition-all ${
                isEditingBank
                  ? 'bg-white border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
                  : 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60'
              }`}
              value={bankDetails.accountNumber}
              onChange={(e) =>
                isEditingBank && setBankDetails({ ...bankDetails, accountNumber: e.target.value })
              }
              disabled={!isEditingBank}
              placeholder="10-digit account number"
              maxLength={10}
            />
          </div>
          <div className="flex items-end">
            <button
              className={`w-full px-6 py-4 rounded-xl font-medium transition-colors ${
                isEditingBank && bankDetails.accountNumber.length === 10
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              disabled={!isEditingBank || bankDetails.accountNumber.length !== 10}
            >
              Verify Account
            </button>
          </div>
        </div>
      </div>

      {/* KYC Verification */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">KYC Verification</h3>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(kycStatus)}`}>
              {kycStatus}
            </span>
            {kycStatus !== 'APPROVED' && (
              <button
                onClick={() => isEditingKyc ? handleSaveKyc() : setIsEditingKyc(true)}
                disabled={savingKyc}
                className={`px-6 py-3 rounded-xl font-medium transition-colors shadow-sm flex items-center gap-2 ${
                  isEditingKyc
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {savingKyc ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  isEditingKyc ? 'Save Changes' : 'Edit'
                )}
              </button>
            )}
          </div>
        </div>

        {kycStatus !== 'APPROVED' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
              <select
                className={`w-full p-4 rounded-xl border text-gray-900 transition-all ${
                  isEditingKyc
                    ? 'bg-white border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
                    : 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60'
                }`}
                value={kycDetails.type}
                onChange={(e) => isEditingKyc && setKycDetails({ ...kycDetails, type: e.target.value })}
                disabled={!isEditingKyc}
              >
                <option value="">Select Document Type</option>
                <option value="national_id">National ID</option>
                <option value="drivers_license">Driver's License</option>
                <option value="passport">International Passport</option>
                <option value="voters_card">Voter's Card</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Document Number</label>
              <input
                className={`w-full p-4 rounded-xl border text-gray-900 placeholder-gray-400 transition-all ${
                  isEditingKyc
                    ? 'bg-white border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
                    : 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60'
                }`}
                value={kycDetails.number}
                onChange={(e) =>
                  isEditingKyc && setKycDetails({ ...kycDetails, number: e.target.value })
                }
                disabled={!isEditingKyc}
                placeholder="Enter document number"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Document
              </label>
              <div
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                  isEditingKyc
                    ? 'border-gray-300 hover:border-purple-400 cursor-pointer bg-gray-50'
                    : 'border-gray-200 cursor-not-allowed opacity-60 bg-gray-50'
                }`}
              >
                <FileText className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-2">
                  {kycDetails.document instanceof File 
                    ? kycDetails.document.name 
                    : kycDetails.document 
                    ? 'Document uploaded' 
                    : 'Click to upload or drag and drop'}
                </p>
                <p className="text-gray-500 text-sm">PNG, JPG, PDF up to 5MB</p>
                <input
                  type="file"
                  className="hidden"
                  id="kyc-upload"
                  disabled={!isEditingKyc}
                  accept=".png,.jpg,.jpeg,.pdf"
                  onChange={(e) =>
                    isEditingKyc &&
                    setKycDetails({
                      ...kycDetails,
                      document: e.target.files ? e.target.files[0] : '',
                    })
                  }
                />
                {isEditingKyc && (
                  <label
                    htmlFor="kyc-upload"
                    className="inline-block mt-3 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg cursor-pointer transition-colors"
                  >
                    Choose File
                  </label>
                )}
              </div>
            </div>
          </div>
        )}

        {kycStatus === 'APPROVED' && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8 text-emerald-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Verification Complete</h4>
            <p className="text-gray-600">Your identity has been verified successfully.</p>
          </div>
        )}

        {kycStatus === 'PENDING' && kycDetails.type && (
          <div className="mt-6 text-center p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-amber-800 text-sm">
              Your KYC documents are being reviewed. We'll notify you once verification is complete.
            </p>
          </div>
        )}

        {kycStatus === 'DECLINED' && kycDetails.note && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-800 font-medium mb-1">Verification Declined</p>
            <p className="text-red-700 text-sm">{kycDetails.note}</p>
            <p className="text-red-600 text-sm mt-2">Please update your documents and resubmit.</p>
          </div>
        )}
      </div>
    </div>
  );
}