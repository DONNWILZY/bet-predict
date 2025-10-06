import React from 'react';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { requireRole } from "@/lib/auth/checkAuth";
import { User, FileText, ShieldCheck, CreditCard, Eye, EyeOff } from 'lucide-react';
import { Bio, BankDetails, KycDetails, Status } from '@/lib/profileType';

// Constants for storage keys
const ACCESS_TOKEN_KEY = "accessToken";
const USER_KEY = "user";

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

// Function to fetch user profile
async function fetchUserProfile() {
  try {
    const accessToken = typeof window !== 'undefined' ? sessionStorage.getItem(ACCESS_TOKEN_KEY) : null;
    const userData = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(USER_KEY) || "{}") : {};

    if (!accessToken || !userData.id) {
      throw new Error("Access token or user ID not found");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (data.success && data.code === 200) {
      return data.profile;
    } else {
      throw new Error(data.message || "Failed to fetch profile");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching user profile:", error.message);
    } else {
      console.error("Error fetching user profile:", error);
    }
    throw error;
  }
}

// Function to update personal information (bio)
async function updateUserBio(bio: Bio) {
  try {
    const accessToken = sessionStorage.getItem(ACCESS_TOKEN_KEY);
    const userData = JSON.parse(localStorage.getItem(USER_KEY) || "{}");

    if (!accessToken || !userData.id) {
      throw new Error("Access token or user ID not found");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        name: bio.name,
        email: bio.email,
        phone: bio.phone,
        dateOfBirth: bio.dateOfBirth,
        location: bio.location,
        bio: bio.bio,
        gender: bio.gender,
        occupation: bio.occupation,
        interests: bio.interests,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (data.success && data.code === 200) {
      return data.profile;
    } else {
      throw new Error(data.message || "Failed to update profile");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error updating user bio:", error.message);
    } else {
      console.error("Error updating user bio:", error);
    }
    throw error;
  }
}

// Function to update bank details
async function updateBankDetails(bankDetails: BankDetails) {
  try {
    const accessToken = sessionStorage.getItem(ACCESS_TOKEN_KEY);
    const userData = JSON.parse(localStorage.getItem(USER_KEY) || "{}");

    if (!accessToken || !userData.id) {
      throw new Error("Access token or user ID not found");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/bank`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        id: bankDetails.id,
        userId: bankDetails.userId,
        bankName: bankDetails.bankName,
        accountName: bankDetails.accountName,
        accountNumber: bankDetails.accountNumber,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (data.success && data.code === 200) {
      return data.bankDetails;
    } else {
      throw new Error(data.message || "Failed to update bank details");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error updating bank details:", error.message);
    } else {
      console.error("Error updating bank details:", error);
    }
    throw error;
  }
}

// Function to update KYC details
async function updateKycDetails(kycDetails: KycDetails) {
  try {
    const accessToken = sessionStorage.getItem(ACCESS_TOKEN_KEY);
    const userData = JSON.parse(localStorage.getItem(USER_KEY) || "{}");

    if (!accessToken || !userData.id) {
      throw new Error("Access token or user ID not found");
    }

    const formData = new FormData();
    formData.append('kycDetails', JSON.stringify({
      id: kycDetails.id,
      userId: kycDetails.userId,
      type: kycDetails.type,
      number: kycDetails.number,
      status: kycDetails.status,
      note: kycDetails.note,
    }));
    if (kycDetails.document instanceof File) {
      formData.append('kycDocument', kycDetails.document);
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/kyc`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (data.success && data.code === 200) {
      return data.profile;
    } else {
      throw new Error(data.message || "Failed to update KYC details");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error updating KYC details:", error.message);
    } else {
      console.error("Error updating KYC details:", error);
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

  useEffect(() => {
    if (!auth.isAuthenticated && auth.redirect) router.push(auth.redirect);
    if (auth.unauthorized) router.push("/unauthorized");
  }, [auth, router]);

  if (auth.unauthorized || !auth.isAuthenticated) return null;

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingBank, setIsEditingBank] = useState(false);
  const [isEditingKyc, setIsEditingKyc] = useState(false);
  const [userRole, setUserRole] = useState('User');

  // Fetch profile data on mount
  useEffect(() => {
    async function loadProfile() {
      try {
        const profile = await fetchUserProfile();
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
          // 💥 FIX: ADD userName from the fetched profile
          userName: profile.userName || '', 
        });


        setBankDetails({
          id: profile.bankDetails.id || '',
          userId: profile.bankDetails.userId || '',
          bankName: profile.bankDetails.bankName || '',
          accountName: profile.bankDetails.accountName || '',
          accountNumber: profile.bankDetails.accountNumber || '',
        });
        setKycDetails({
          id: profile.kycDetails.id || '',
          userId: profile.kycDetails.userId || '',
          type: profile.kycDetails.type || '',
          number: profile.kycDetails.number || '',
          document: profile.kycDetails.document || '',
          status: profile.kycDetails.status || '',
          note: profile.kycDetails.note || '',
        });
        setKycStatus(profile.kyc.status);
        setUserRole(profile.isCreator ? 'Creator' : (profile.role).charAt(0).toUpperCase() + (profile.role || 'User').slice(1));
        console.log("Profile loaded:", profile.isCreator);
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    }
    loadProfile();
  }, [setBio, setBankDetails, setKycDetails, setKycStatus]);

const handleSaveProfile = async () => {
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
        // 💥 FIX: ADD userName from the current state (it shouldn't be null)
        userName: bio.userName, 
      });
      setIsEditingProfile(false);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save profile:", error);
    }
  };

  const handleSaveBank = async () => {
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
    }
  };

  const handleSaveKyc = async () => {
    try {
      const updatedProfile = await updateKycDetails(kycDetails);
      setKycDetails({
        id: updatedProfile.kycDetails.id || kycDetails.id,
        userId: updatedProfile.kycDetails.userId || kycDetails.userId,
        type: updatedProfile.kycDetails.type || kycDetails.type,
        number: updatedProfile.kycDetails.number || kycDetails.number,
        document: updatedProfile.kycDetails.document || kycDetails.document,
        status: updatedProfile.kycDetails.status || kycDetails.status,
        note: updatedProfile.kycDetails.note || kycDetails.note,
      });
      setKycStatus(updatedProfile.kyc.status || kycStatus);
      setIsEditingKyc(false);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save KYC details:", error);
    }
  };

  return (
    <div className="space-y-8">
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
                  : 'NN'}
              </div>
              <button className="absolute -bottom-2 -right-2 p-2 bg-purple-600 hover:bg-purple-700 rounded-xl text-white transition-colors shadow-sm">
                <User className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{auth.user.name || 'Unknown'}</h2>
              <p className="text-gray-600 mb-2">{auth.user.email || 'No email'}</p>
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(kycStatus)}`}>
                  KYC {kycStatus}
                </span>
                <span className="px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-full text-sm">
                  {userRole}
                </span>
              </div>
              <p className="text-gray-600 text-sm max-w-md">{bio.bio || 'No bio provided'}</p>
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
            className={`px-6 py-3 rounded-xl font-medium transition-colors shadow-sm ${
              isEditingProfile
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
          >
            {isEditingProfile ? 'Save Changes' : 'Edit'}
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
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              className={`w-full p-4 rounded-xl border text-gray-900 placeholder-gray-400 transition-all ${
                isEditingProfile
                  ? 'bg-white border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
                  : 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60'
              }`}
              value={bio.email}
              onChange={(e) => isEditingProfile && setBio({ ...bio, email: e.target.value })}
              disabled={!isEditingProfile}
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
            className={`px-6 py-3 rounded-xl font-medium transition-colors shadow-sm ${
              isEditingBank
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
          >
            {isEditingBank ? 'Save Changes' : 'Edit'}
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
                isEditingBank
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              disabled={!isEditingBank}
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
                className={`px-6 py-3 rounded-xl font-medium transition-colors shadow-sm ${
                  isEditingKyc
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                {isEditingKyc ? 'Save Changes' : 'Edit'}
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
                <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                <p className="text-gray-500 text-sm">PNG, JPG, PDF up to 5MB</p>
                <input
                  type="file"
                  className="hidden"
                  disabled={!isEditingKyc}
                  accept=".png,.jpg,.jpeg,.pdf"
                  onChange={(e) =>
                    isEditingKyc &&
                    setKycDetails({
                      ...kycDetails,
                      document: e.target.files ? e.target.files[0] : null,
                    })
                  }
                />
              </div>
            </div>
            {isEditingKyc && (
              <div className="md:col-span-2">
                <button
                  onClick={handleSaveKyc}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white px-6 py-4 rounded-xl font-medium transition-colors shadow-sm"
                >
                  Submit KYC Documents
                </button>
              </div>
            )}
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
      </div>
    </div>
  );
}