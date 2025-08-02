import React from 'react';
import { User, FileText, ShieldCheck, CreditCard, Eye, EyeOff } from 'lucide-react';
import { Bio, BankDetails, KycDetails, Status } from '@/lib/profileType';

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
  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
                {bio.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
              <button className="absolute -bottom-2 -right-2 p-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-white transition-colors">
                <User className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{bio.name}</h2>
              <p className="text-gray-400 mb-2">{bio.email}</p>
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(kycStatus)}`}>
                  KYC {kycStatus}
                </span>
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-sm">
                  Premium Members
                </span>
              </div>
              <p className="text-gray-300 text-sm max-w-md">{bio.bio}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-6 py-3 rounded-xl font-medium transition-colors ${
              isEditing
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-blue-600 hover:bg-blue-500 text-white'
            }`}
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
        <h3 className="text-xl font-semibold text-white mb-6">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
            <input
              className={`w-full p-4 rounded-xl border text-white placeholder-gray-400 transition-all ${
                isEditing
                  ? 'bg-white/5 border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20'
                  : 'bg-white/5 border-white/5 cursor-not-allowed opacity-60'
              }`}
              value={bio.name}
              onChange={(e) => isEditing && setBio({ ...bio, name: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <input
              className={`w-full p-4 rounded-xl border text-white placeholder-gray-400 transition-all ${
                isEditing
                  ? 'bg-white/5 border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20'
                  : 'bg-white/5 border-white/5 cursor-not-allowed opacity-60'
              }`}
              value={bio.email}
              onChange={(e) => isEditing && setBio({ ...bio, email: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
            <input
              className={`w-full p-4 rounded-xl border text-white placeholder-gray-400 transition-all ${
                isEditing
                  ? 'bg-white/5 border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20'
                  : 'bg-white/5 border-white/5 cursor-not-allowed opacity-60'
              }`}
              value={bio.phone}
              onChange={(e) => isEditing && setBio({ ...bio, phone: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Date of Birth</label>
            <input
              type="date"
              className={`w-full p-4 rounded-xl border text-white placeholder-gray-400 transition-all ${
                isEditing
                  ? 'bg-white/5 border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20'
                  : 'bg-white/5 border-white/5 cursor-not-allowed opacity-60'
              }`}
              value={bio.dateOfBirth}
              onChange={(e) => isEditing && setBio({ ...bio, dateOfBirth: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
            <input
              className={`w-full p-4 rounded-xl border text-white placeholder-gray-400 transition-all ${
                isEditing
                  ? 'bg-white/5 border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20'
                  : 'bg-white/5 border-white/5 cursor-not-allowed opacity-60'
              }`}
              value={bio.location}
              onChange={(e) => isEditing && setBio({ ...bio, location: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
            <select
              className={`w-full p-4 rounded-xl border text-white transition-all ${
                isEditing
                  ? 'bg-white/5 border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20'
                  : 'bg-white/5 border-white/5 cursor-not-allowed opacity-60'
              }`}
              value={bio.gender}
              onChange={(e) => isEditing && setBio({ ...bio, gender: e.target.value })}
              disabled={!isEditing}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Occupation</label>
            <input
              className={`w-full p-4 rounded-xl border text-white placeholder-gray-400 transition-all ${
                isEditing
                  ? 'bg-white/5 border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20'
                  : 'bg-white/5 border-white/5 cursor-not-allowed opacity-60'
              }`}
              value={bio.occupation}
              onChange={(e) => isEditing && setBio({ ...bio, occupation: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
            <textarea
              rows={4}
              className={`w-full p-4 rounded-xl border text-white placeholder-gray-400 transition-all resize-none ${
                isEditing
                  ? 'bg-white/5 border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20'
                  : 'bg-white/5 border-white/5 cursor-not-allowed opacity-60'
              }`}
              value={bio.bio}
              onChange={(e) => isEditing && setBio({ ...bio, bio: e.target.value })}
              disabled={!isEditing}
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>
      </div>

      {/* Bank Account Details */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-emerald-500/20 rounded-xl">
            <CreditCard className="w-5 h-5 text-emerald-400" />
          </div>
          <h3 className="text-xl font-semibold text-white">Bank Account Details</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Bank Name</label>
            <select
              className={`w-full p-4 rounded-xl border text-white transition-all ${
                isEditing
                  ? 'bg-white/5 border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20'
                  : 'bg-white/5 border-white/5 cursor-not-allowed opacity-60'
              }`}
              value={bankDetails.bankName}
              onChange={(e) =>
                isEditing && setBankDetails({ ...bankDetails, bankName: e.target.value })
              }
              disabled={!isEditing}
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
            <label className="block text-sm font-medium text-gray-300 mb-2">Account Name</label>
            <input
              className={`w-full p-4 rounded-xl border text-white placeholder-gray-400 transition-all ${
                isEditing
                  ? 'bg-white/5 border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20'
                  : 'bg-white/5 border-white/5 cursor-not-allowed opacity-60'
              }`}
              value={bankDetails.accountName}
              onChange={(e) =>
                isEditing && setBankDetails({ ...bankDetails, accountName: e.target.value })
              }
              disabled={!isEditing}
              placeholder="Account holder name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Account Number</label>
            <input
              className={`w-full p-4 rounded-xl border text-white placeholder-gray-400 transition-all ${
                isEditing
                  ? 'bg-white/5 border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20'
                  : 'bg-white/5 border-white/5 cursor-not-allowed opacity-60'
              }`}
              value={bankDetails.accountNumber}
              onChange={(e) =>
                isEditing && setBankDetails({ ...bankDetails, accountNumber: e.target.value })
              }
              disabled={!isEditing}
              placeholder="10-digit account number"
              maxLength={10}
            />
          </div>
          <div className="flex items-end">
            <button
              className={`w-full px-6 py-4 rounded-xl font-medium transition-colors ${
                isEditing
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-white/5 text-gray-400 cursor-not-allowed'
              }`}
              disabled={!isEditing}
            >
              Verify Account
            </button>
          </div>
        </div>
      </div>

      {/* KYC Verification */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">KYC Verification</h3>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(kycStatus)}`}>
            {kycStatus}
          </span>
        </div>

        {kycStatus !== 'Verified' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Document Type</label>
              <select
                className={`w-full p-4 rounded-xl border text-white transition-all ${
                  isEditing
                    ? 'bg-white/5 border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20'
                    : 'bg-white/5 border-white/5 cursor-not-allowed opacity-60'
                }`}
                value={kycDetails.type}
                onChange={(e) => isEditing && setKycDetails({ ...kycDetails, type: e.target.value })}
                disabled={!isEditing}
              >
                <option value="">Select Document Type</option>
                <option value="national_id">National ID</option>
                <option value="drivers_license">Driver's License</option>
                <option value="passport">International Passport</option>
                <option value="voters_card">Voter's Card</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Document Number</label>
              <input
                className={`w-full p-4 rounded-xl border text-white placeholder-gray-400 transition-all ${
                  isEditing
                    ? 'bg-white/5 border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20'
                  : 'bg-white/5 border-white/5 cursor-not-allowed opacity-60'
                }`}
                value={kycDetails.number}
                onChange={(e) =>
                  isEditing && setKycDetails({ ...kycDetails, number: e.target.value })
                }
                disabled={!isEditing}
                placeholder="Enter document number"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Upload Document
              </label>
              <div
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                  isEditing
                    ? 'border-white/20 hover:border-blue-500/50 cursor-pointer'
                    : 'border-white/10 cursor-not-allowed opacity-60'
                }`}
              >
                <FileText className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-300 mb-2">Click to upload or drag and drop</p>
                <p className="text-gray-400 text-sm">PNG, JPG, PDF up to 5MB</p>
                <input
                  type="file"
                  className="hidden"
                  disabled={!isEditing}
                  accept=".png,.jpg,.jpeg,.pdf"
                  onChange={(e) =>
                    isEditing &&
                    setKycDetails({
                      ...kycDetails,
                      document: e.target.files ? e.target.files[0] : null,
                    })
                  }
                />
              </div>
            </div>
            {isEditing && (
              <div className="md:col-span-2">
                <button className="w-full bg-amber-600 hover:bg-amber-500 text-white px-6 py-4 rounded-xl font-medium transition-colors">
                  Submit KYC Documents
                </button>
              </div>
            )}
          </div>
        )}

        {kycStatus === 'Verified' && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Verification Complete</h4>
            <p className="text-gray-400">Your identity has been verified successfully.</p>
          </div>
        )}
      </div>
    </div>
  );
}