"use client";
import React, { useState } from "react";
import { Plus, Target, Calendar, TrendingUp, Eye, MousePointer, DollarSign, Users, ChevronDown, ChevronUp, X } from "lucide-react";

// Mock data types (in a real app, these would be imported from your lib file)
type AdStatus = "Active" | "Paused" | "Pending" | "Rejected";
type CampaignObjective = "Brand_Awareness" | "Reach" | "Traffic" | "Engagement" | "App_Installs" | "Video_Views" | "Lead_Generation" | "Conversions";
type AdPlacement = "Facebook_Feed" | "Instagram_Feed" | "Instagram_Stories" | "Facebook_Stories" | "Messenger" | "Audience_Network" | "Google_Search" | "Google_Display" | "YouTube";
type BidStrategy = "Lowest_Cost" | "Cost_Cap" | "Bid_Cap" | "Target_Cost";
type Gender = "All" | "Male" | "Female" | "Non_Binary";
type AgeRange = "13-17" | "18-24" | "25-34" | "35-44" | "45-54" | "55-64" | "65+";

interface Location {
  type: "Country" | "State" | "City" | "Radius";
  name: string;
  radius?: number;
}

interface Demographics {
  gender: Gender;
  ageRanges: AgeRange[];
  locations: Location[];
  languages: string[];
}

interface Interests {
  categories: string[];
  keywords: string[];
  behaviors: string[];
}

interface Targeting {
  demographics: Demographics;
  interests: Interests;
  customAudiences: string[];
  lookalikePer: number;
}

interface AdSchedule {
  enabled: boolean;
  timezone: string;
  schedule: {
    [key: string]: {
      enabled: boolean;
      startTime: string;
      endTime: string;
    };
  };
}

interface AdData {
  id: number;
  title: string;
  description: string;
  budget: string;
  dailyBudget: string;
  totalBudget: string;
  status: AdStatus;
  created: string;
  startDate: string;
  endDate?: string;
  image?: File | null;
  objective: CampaignObjective;
  placements: AdPlacement[];
  bidStrategy: BidStrategy;
  bidAmount?: string;
  targeting: Targeting;
  schedule: AdSchedule;
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  spent: number;
  conversions: number;
}

interface AdFormState {
  title: string;
  description: string;
  dailyBudget: string;
  totalBudget: string;
  startDate: string;
  endDate: string;
  image: File | null;
  objective: CampaignObjective;
  placements: AdPlacement[];
  bidStrategy: BidStrategy;
  bidAmount: string;
  targeting: Targeting;
  schedule: AdSchedule;
}

// Mock data
const campaignObjectives = [
  { value: "Brand_Awareness", label: "Brand Awareness" },
  { value: "Reach", label: "Reach" },
  { value: "Traffic", label: "Traffic" },
  { value: "Engagement", label: "Engagement" },
  { value: "App_Installs", label: "App Installs" },
  { value: "Video_Views", label: "Video Views" },
  { value: "Lead_Generation", label: "Lead Generation" },
  { value: "Conversions", label: "Conversions" }
] as const;

const adPlacements = [
  { value: "Facebook_Feed", label: "Feed" },
  { value: "Instagram_Feed", label: "Ticket Feed" },
  { value: "Instagram_Stories", label: "Stories" },
  { value: "Facebook_Stories", label: "Community" },
  { value: "Messenger", label: "Messenges" },
  { value: "Audience_Network", label: "Audience Network" },
  { value: "Google_Search", label: "Search" },
  { value: "Google_Display", label: "Display Network" },
  { value: "YouTube", label: "pop up" }
] as const;

const bidStrategies = [
  { value: "Lowest_Cost", label: "Lowest Cost" },
  { value: "Cost_Cap", label: "Cost Cap" },
  { value: "Bid_Cap", label: "Bid Cap" },
  { value: "Target_Cost", label: "Target Cost" }
] as const;

const interestCategories = [
  "Sports", "Football", "Basketball", "Tennis", "Cricket", "Gaming", "Entertainment", 
  "Movies", "Music", "Technology", "Fashion", "Food", "Travel", "Business", "Finance",
  "Health", "Fitness", "Education", "Books", "Art", "Photography", "Cars", "Real Estate"
];

const behaviorCategories = [
  "Frequent Travelers", "Online Shoppers", "Mobile Game Players", "Sports Fans",
  "Tech Early Adopters", "Luxury Shoppers", "Small Business Owners", "New Parents",
  "College Students", "Recently Moved", "Anniversary", "Birthday"
];

const nigerianStates = [
  "Lagos", "Kano", "Kaduna", "Oyo", "Rivers", "Bayelsa", "Katsina", "Cross River",
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Benue", "Borno", "Delta",
  "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kebbi", "Kogi",
  "Kwara", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Plateau", "Sokoto",
  "Taraba", "Yobe", "Zamfara", "FCT"
];

const initialAds: AdData[] = [
  {
    id: 1,
    title: "Super Odds Weekend!",
    description: "Promote your predictions and reach more users this weekend.",
    budget: "₦10,000",
    dailyBudget: "₦1,000",
    totalBudget: "₦10,000",
    status: "Active",
    created: "2024-06-20",
    startDate: "2024-06-20",
    endDate: "2024-06-30",
    objective: "Traffic",
    placements: ["Facebook_Feed", "Instagram_Feed"],
    bidStrategy: "Lowest_Cost",
    targeting: {
      demographics: {
        gender: "All",
        ageRanges: ["18-24", "25-34", "35-44"],
        locations: [
          { type: "Country", name: "Nigeria" },
          { type: "State", name: "Lagos" }
        ],
        languages: ["English", "Yoruba", "Igbo", "Hausa"]
      },
      interests: {
        categories: ["Sports", "Football", "Gaming"],
        keywords: ["football predictions", "sports betting", "odds"],
        behaviors: ["Sports Fans", "Online Shoppers"]
      },
      customAudiences: ["Website Visitors", "App Users"],
      lookalikePer: 1
    },
    schedule: {
      enabled: true,
      timezone: "Africa/Lagos",
      schedule: {
        monday: { enabled: true, startTime: "09:00", endTime: "22:00" },
        tuesday: { enabled: true, startTime: "09:00", endTime: "22:00" },
        wednesday: { enabled: true, startTime: "09:00", endTime: "22:00" },
        thursday: { enabled: true, startTime: "09:00", endTime: "22:00" },
        friday: { enabled: true, startTime: "09:00", endTime: "23:00" },
        saturday: { enabled: true, startTime: "08:00", endTime: "23:00" },
        sunday: { enabled: true, startTime: "08:00", endTime: "22:00" }
      }
    },
    impressions: 15420,
    clicks: 892,
    ctr: 5.79,
    cpc: 11.21,
    spent: 8750,
    conversions: 45
  },
  {
    id: 2,
    title: "Champions League Final Promo",
    description: "Special ad for the Champions League final predictions.",
    budget: "₦5,000",
    dailyBudget: "₦500",
    totalBudget: "₦5,000",
    status: "Paused",
    created: "2024-06-10",
    startDate: "2024-06-10",
    endDate: "2024-06-15",
    objective: "Conversions",
    placements: ["Google_Search", "YouTube"],
    bidStrategy: "Target_Cost",
    bidAmount: "₦15",
    targeting: {
      demographics: {
        gender: "All",
        ageRanges: ["18-24", "25-34", "35-44", "45-54"],
        locations: [
          { type: "Country", name: "Nigeria" }
        ],
        languages: ["English"]
      },
      interests: {
        categories: ["Sports", "Football", "Entertainment"],
        keywords: ["champions league", "football final", "predictions"],
        behaviors: ["Sports Fans", "Tech Early Adopters"]
      },
      customAudiences: ["Past Customers"],
      lookalikePer: 2
    },
    schedule: {
      enabled: false,
      timezone: "Africa/Lagos",
      schedule: {
        monday: { enabled: true, startTime: "00:00", endTime: "23:59" },
        tuesday: { enabled: true, startTime: "00:00", endTime: "23:59" },
        wednesday: { enabled: true, startTime: "00:00", endTime: "23:59" },
        thursday: { enabled: true, startTime: "00:00", endTime: "23:59" },
        friday: { enabled: true, startTime: "00:00", endTime: "23:59" },
        saturday: { enabled: true, startTime: "00:00", endTime: "23:59" },
        sunday: { enabled: true, startTime: "00:00", endTime: "23:59" }
      }
    },
    impressions: 8340,
    clicks: 234,
    ctr: 2.81,
    cpc: 21.37,
    spent: 4200,
    conversions: 12
  }
];

const initialForm: AdFormState = {
  title: "",
  description: "",
  dailyBudget: "",
  totalBudget: "",
  startDate: "",
  endDate: "",
  image: null,
  objective: "Traffic",
  placements: [],
  bidStrategy: "Lowest_Cost",
  bidAmount: "",
  targeting: {
    demographics: {
      gender: "All",
      ageRanges: [],
      locations: [],
      languages: []
    },
    interests: {
      categories: [],
      keywords: [],
      behaviors: []
    },
    customAudiences: [],
    lookalikePer: 1
  },
  schedule: {
    enabled: false,
    timezone: "Africa/Lagos",
    schedule: {
      monday: { enabled: true, startTime: "09:00", endTime: "22:00" },
      tuesday: { enabled: true, startTime: "09:00", endTime: "22:00" },
      wednesday: { enabled: true, startTime: "09:00", endTime: "22:00" },
      thursday: { enabled: true, startTime: "09:00", endTime: "22:00" },
      friday: { enabled: true, startTime: "09:00", endTime: "22:00" },
      saturday: { enabled: true, startTime: "09:00", endTime: "22:00" },
      sunday: { enabled: true, startTime: "09:00", endTime: "22:00" }
    }
  }
};

export default function Adverts() {
  const [adForm, setAdForm] = useState<AdFormState>(initialForm);
  const [ads, setAds] = useState<AdData[]>(initialAds);
  const [showForm, setShowForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const handleFormChange = (field: string, value: any) => {
    setAdForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTargetingChange = (field: string, value: any) => {
    setAdForm(prev => ({
      ...prev,
      targeting: {
        ...prev.targeting,
        [field]: value
      }
    }));
  };

  const handleDemographicsChange = (field: string, value: any) => {
    setAdForm(prev => ({
      ...prev,
      targeting: {
        ...prev.targeting,
        demographics: {
          ...prev.targeting.demographics,
          [field]: value
        }
      }
    }));
  };

  const handleInterestsChange = (field: string, value: any) => {
    setAdForm(prev => ({
      ...prev,
      targeting: {
        ...prev.targeting,
        interests: {
          ...prev.targeting.interests,
          [field]: value
        }
      }
    }));
  };

  const handleScheduleChange = (field: string, value: any) => {
    setAdForm(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [field]: value
      }
    }));
  };

  const handleAdSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newAd: AdData = {
      id: ads.length + 1,
      title: adForm.title,
      description: adForm.description,
      budget: adForm.totalBudget ? `₦${parseInt(adForm.totalBudget).toLocaleString()}` : "₦0",
      dailyBudget: adForm.dailyBudget ? `₦${parseInt(adForm.dailyBudget).toLocaleString()}` : "₦0",
      totalBudget: adForm.totalBudget ? `₦${parseInt(adForm.totalBudget).toLocaleString()}` : "₦0",
      status: "Pending",
      created: new Date().toISOString().slice(0, 10),
      startDate: adForm.startDate,
      endDate: adForm.endDate,
      image: adForm.image,
      objective: adForm.objective,
      placements: adForm.placements,
      bidStrategy: adForm.bidStrategy,
      bidAmount: adForm.bidAmount,
      targeting: adForm.targeting,
      schedule: adForm.schedule,
      impressions: 0,
      clicks: 0,
      ctr: 0,
      cpc: 0,
      spent: 0,
      conversions: 0
    };
    
    setAds([newAd, ...ads]);
    setAdForm(initialForm);
    setShowForm(false);
    setCurrentStep(1);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white mb-4">Campaign Details</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Campaign Title</label>
          <input
            required
            className="w-full p-3 rounded-xl border bg-white/5 border-white/10 text-white placeholder-gray-400"
            placeholder="Enter campaign title"
            value={adForm.title}
            onChange={(e) => handleFormChange('title', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Campaign Objective</label>
          <select
            className="w-full p-3 rounded-xl border bg-white/5 border-white/10 text-white"
            value={adForm.objective}
            onChange={(e) => handleFormChange('objective', e.target.value)}
          >
            {campaignObjectives.map(obj => (
              <option key={obj.value} value={obj.value} className="bg-gray-800">
                {obj.label}
              </option>
            ))}
          </select>
        </div>
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
          <textarea
            required
            rows={3}
            className="w-full p-3 rounded-xl border bg-white/5 border-white/10 text-white placeholder-gray-400 resize-none"
            placeholder="Describe your campaign..."
            value={adForm.description}
            onChange={(e) => handleFormChange('description', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Daily Budget (₦)</label>
          <input
            type="number"
            min="0"
            required
            className="w-full p-3 rounded-xl border bg-white/5 border-white/10 text-white placeholder-gray-400"
            placeholder="e.g. 1000"
            value={adForm.dailyBudget}
            onChange={(e) => handleFormChange('dailyBudget', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Total Budget (₦)</label>
          <input
            type="number"
            min="0"
            required
            className="w-full p-3 rounded-xl border bg-white/5 border-white/10 text-white placeholder-gray-400"
            placeholder="e.g. 10000"
            value={adForm.totalBudget}
            onChange={(e) => handleFormChange('totalBudget', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
          <input
            type="date"
            required
            className="w-full p-3 rounded-xl border bg-white/5 border-white/10 text-white"
            value={adForm.startDate}
            onChange={(e) => handleFormChange('startDate', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">End Date (Optional)</label>
          <input
            type="date"
            className="w-full p-3 rounded-xl border bg-white/5 border-white/10 text-white"
            value={adForm.endDate}
            onChange={(e) => handleFormChange('endDate', e.target.value)}
          />
        </div>
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">Campaign Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            className="w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500"
            onChange={(e) => handleFormChange('image', e.target.files?.[0] || null)}
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white mb-4">Ad Placements & Bidding</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">Select Placements</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {adPlacements.map(placement => (
            <label key={placement.value} className="flex items-center p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
              <input
                type="checkbox"
                className="mr-3 w-4 h-4 text-blue-600 bg-transparent border-gray-300 rounded focus:ring-blue-500"
                checked={adForm.placements.includes(placement.value)}
                onChange={(e) => {
                  if (e.target.checked) {
                    handleFormChange('placements', [...adForm.placements, placement.value]);
                  } else {
                    handleFormChange('placements', adForm.placements.filter(p => p !== placement.value));
                  }
                }}
              />
              <span className="text-white text-sm">{placement.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Bid Strategy</label>
          <select
            className="w-full p-3 rounded-xl border bg-white/5 border-white/10 text-white"
            value={adForm.bidStrategy}
            onChange={(e) => handleFormChange('bidStrategy', e.target.value)}
          >
            {bidStrategies.map(strategy => (
              <option key={strategy.value} value={strategy.value} className="bg-gray-800">
                {strategy.label}
              </option>
            ))}
          </select>
        </div>
        {(adForm.bidStrategy === 'Cost_Cap' || adForm.bidStrategy === 'Bid_Cap' || adForm.bidStrategy === 'Target_Cost') && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Bid Amount (₦)</label>
            <input
              type="number"
              min="0"
              className="w-full p-3 rounded-xl border bg-white/5 border-white/10 text-white placeholder-gray-400"
              placeholder="e.g. 15"
              value={adForm.bidAmount}
              onChange={(e) => handleFormChange('bidAmount', e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white mb-4">Audience Targeting</h3>
      
      {/* Demographics */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <button
          type="button"
          onClick={() => toggleSection('demographics')}
          className="flex items-center justify-between w-full text-left"
        >
          <h4 className="text-white font-medium">Demographics</h4>
          {expandedSections.has('demographics') ? 
            <ChevronUp className="w-5 h-5 text-gray-400" /> : 
            <ChevronDown className="w-5 h-5 text-gray-400" />
          }
        </button>
        
        {expandedSections.has('demographics') && (
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
              <select
                className="w-full p-3 rounded-xl border bg-white/5 border-white/10 text-white"
                value={adForm.targeting.demographics.gender}
                onChange={(e) => handleDemographicsChange('gender', e.target.value)}
              >
                <option value="All" className="bg-gray-800">All</option>
                <option value="Male" className="bg-gray-800">Male</option>
                <option value="Female" className="bg-gray-800">Female</option>
                <option value="Non_Binary" className="bg-gray-800">Non-Binary</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Age Ranges</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {["13-17", "18-24", "25-34", "35-44", "45-54", "55-64", "65+"].map(age => (
                  <label key={age} className="flex items-center p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      className="mr-2 w-4 h-4 text-blue-600 bg-transparent border-gray-300 rounded focus:ring-blue-500"
                      checked={adForm.targeting.demographics.ageRanges.includes(age as AgeRange)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleDemographicsChange('ageRanges', [...adForm.targeting.demographics.ageRanges, age]);
                        } else {
                          handleDemographicsChange('ageRanges', adForm.targeting.demographics.ageRanges.filter(a => a !== age));
                        }
                      }}
                    />
                    <span className="text-white text-sm">{age}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Locations</label>
              <div className="space-y-2">
                <select
                  className="w-full p-3 rounded-xl border bg-white/5 border-white/10 text-white"
                  onChange={(e) => {
                    if (e.target.value) {
                      const newLocation = { type: "State" as const, name: e.target.value };
                      handleDemographicsChange('locations', [...adForm.targeting.demographics.locations, newLocation]);
                      e.target.value = '';
                    }
                  }}
                >
                  <option value="" className="bg-gray-800">Select a state...</option>
                  {nigerianStates.map(state => (
                    <option key={state} value={state} className="bg-gray-800">{state}</option>
                  ))}
                </select>
                <div className="flex flex-wrap gap-2">
                  {adForm.targeting.demographics.locations.map((location, index) => (
                    <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-600 text-white">
                      {location.name}
                      <button
                        type="button"
                        onClick={() => {
                          handleDemographicsChange('locations', adForm.targeting.demographics.locations.filter((_, i) => i !== index));
                        }}
                        className="ml-2 w-4 h-4 hover:bg-blue-700 rounded-full flex items-center justify-center"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Interests */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <button
          type="button"
          onClick={() => toggleSection('interests')}
          className="flex items-center justify-between w-full text-left"
        >
          <h4 className="text-white font-medium">Interests & Behaviors</h4>
          {expandedSections.has('interests') ? 
            <ChevronUp className="w-5 h-5 text-gray-400" /> : 
            <ChevronDown className="w-5 h-5 text-gray-400" />
          }
        </button>
        
        {expandedSections.has('interests') && (
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Interest Categories</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {interestCategories.map(category => (
                  <label key={category} className="flex items-center p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      className="mr-2 w-4 h-4 text-blue-600 bg-transparent border-gray-300 rounded focus:ring-blue-500"
                      checked={adForm.targeting.interests.categories.includes(category)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleInterestsChange('categories', [...adForm.targeting.interests.categories, category]);
                        } else {
                          handleInterestsChange('categories', adForm.targeting.interests.categories.filter(c => c !== category));
                        }
                      }}
                    />
                    <span className="text-white text-sm">{category}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Behaviors</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {behaviorCategories.map(behavior => (
                  <label key={behavior} className="flex items-center p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      className="mr-2 w-4 h-4 text-blue-600 bg-transparent border-gray-300 rounded focus:ring-blue-500"
                      checked={adForm.targeting.interests.behaviors.includes(behavior)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleInterestsChange('behaviors', [...adForm.targeting.interests.behaviors, behavior]);
                        } else {
                          handleInterestsChange('behaviors', adForm.targeting.interests.behaviors.filter(b => b !== behavior));
                        }
                      }}
                    />
                    <span className="text-white text-sm">{behavior}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom Audiences */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <button
          type="button"
          onClick={() => toggleSection('custom')}
          className="flex items-center justify-between w-full text-left"
        >
          <h4 className="text-white font-medium">Custom Audiences</h4>
          {expandedSections.has('custom') ? 
            <ChevronUp className="w-5 h-5 text-gray-400" /> : 
            <ChevronDown className="w-5 h-5 text-gray-400" />
          }
        </button>
        
        {expandedSections.has('custom') && (
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Select Custom Audiences</label>
              <div className="space-y-2">
                {["Website Visitors", "App Users", "Past Customers", "Email Subscribers", "Engaged Users"].map(audience => (
                  <label key={audience} className="flex items-center p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      className="mr-3 w-4 h-4 text-blue-600 bg-transparent border-gray-300 rounded focus:ring-blue-500"
                      checked={adForm.targeting.customAudiences.includes(audience)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleTargetingChange('customAudiences', [...adForm.targeting.customAudiences, audience]);
                        } else {
                          handleTargetingChange('customAudiences', adForm.targeting.customAudiences.filter(a => a !== audience));
                        }
                      }}
                    />
                    <span className="text-white">{audience}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Lookalike Percentage</label>
              <select
                className="w-full p-3 rounded-xl border bg-white/5 border-white/10 text-white"
                value={adForm.targeting.lookalikePer}
                onChange={(e) => handleTargetingChange('lookalikePer', parseInt(e.target.value))}
              >
                <option value={1} className="bg-gray-800">1% - Most Similar</option>
                <option value={2} className="bg-gray-800">2% - Similar</option>
                <option value={3} className="bg-gray-800">3% - Broader</option>
                <option value={5} className="bg-gray-800">5% - Broad</option>
                <option value={10} className="bg-gray-800">10% - Very Broad</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white mb-4">Schedule & Review</h3>
      
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-white font-medium">Ad Scheduling</h4>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="mr-2 w-4 h-4 text-blue-600 bg-transparent border-gray-300 rounded focus:ring-blue-500"
              checked={adForm.schedule.enabled}
              onChange={(e) => handleScheduleChange('enabled', e.target.checked)}
            />
            <span className="text-white text-sm">Enable Scheduling</span>
          </label>
        </div>
        
        {adForm.schedule.enabled && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Timezone</label>
              <select
                className="w-full p-3 rounded-xl border bg-white/5 border-white/10 text-white"
                value={adForm.schedule.timezone}
                onChange={(e) => handleScheduleChange('timezone', e.target.value)}
              >
                <option value="Africa/Lagos" className="bg-gray-800">Africa/Lagos (WAT)</option>
                <option value="UTC" className="bg-gray-800">UTC</option>
                <option value="America/New_York" className="bg-gray-800">America/New_York (EST)</option>
                <option value="Europe/London" className="bg-gray-800">Europe/London (GMT)</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {Object.entries(adForm.schedule.schedule).map(([day, schedule]) => (
                <div key={day} className="flex items-center space-x-3 p-3 rounded-lg border border-white/10 bg-white/5">
                  <label className="flex items-center cursor-pointer min-w-0 flex-1">
                    <input
                      type="checkbox"
                      className="mr-2 w-4 h-4 text-blue-600 bg-transparent border-gray-300 rounded focus:ring-blue-500"
                      checked={schedule.enabled}
                      onChange={(e) => {
                        handleScheduleChange('schedule', {
                          ...adForm.schedule.schedule,
                          [day]: { ...schedule, enabled: e.target.checked }
                        });
                      }}
                    />
                    <span className="text-white text-sm capitalize">{day}</span>
                  </label>
                  {schedule.enabled && (
                    <div className="flex space-x-2">
                      <input
                        type="time"
                        className="p-2 rounded-lg border bg-white/5 border-white/10 text-white text-sm"
                        value={schedule.startTime}
                        onChange={(e) => {
                          handleScheduleChange('schedule', {
                            ...adForm.schedule.schedule,
                            [day]: { ...schedule, startTime: e.target.value }
                          });
                        }}
                      />
                      <input
                        type="time"
                        className="p-2 rounded-lg border bg-white/5 border-white/10 text-white text-sm"
                        value={schedule.endTime}
                        onChange={(e) => {
                          handleScheduleChange('schedule', {
                            ...adForm.schedule.schedule,
                            [day]: { ...schedule, endTime: e.target.value }
                          });
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Campaign Summary */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <h4 className="text-white font-medium mb-4">Campaign Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Title:</span>
            <span className="text-white ml-2">{adForm.title || "Not set"}</span>
          </div>
          <div>
            <span className="text-gray-400">Objective:</span>
            <span className="text-white ml-2">{campaignObjectives.find(obj => obj.value === adForm.objective)?.label}</span>
          </div>
          <div>
            <span className="text-gray-400">Daily Budget:</span>
            <span className="text-white ml-2">₦{adForm.dailyBudget || "0"}</span>
          </div>
          <div>
            <span className="text-gray-400">Total Budget:</span>
            <span className="text-white ml-2">₦{adForm.totalBudget || "0"}</span>
          </div>
          <div>
            <span className="text-gray-400">Placements:</span>
            <span className="text-white ml-2">{adForm.placements.length} selected</span>
          </div>
          <div>
            <span className="text-gray-400">Target Locations:</span>
            <span className="text-white ml-2">{adForm.targeting.demographics.locations.length} selected</span>
          </div>
        </div>
      </div>
    </div>
  );

  function handlePauseToggle(id: number): void {
    throw new Error("Function not implemented.");
  }

  function handleDelete(id: number): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Campaign Manager</h1>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors w-full sm:w-auto justify-center"
            onClick={() => setShowForm(!showForm)}
          >
            <Plus className="w-4 h-4" />
            Create Campaign
          </button>
        </div>

        {/* Multi-step Form */}
        {showForm && (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-8">
            {/* Step Indicator */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-2 overflow-x-auto">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'
                    }`}>
                      {step}
                    </div>
                    {step < 4 && (
                      <div className={`w-8 h-0.5 mx-2 ${
                        currentStep > step ? 'bg-blue-600' : 'bg-gray-600'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-400">
                Step {currentStep} of 4
              </div>
            </div>

            <form onSubmit={handleAdSubmit} className="space-y-6">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}

              {/* Navigation */}
              <div className="flex flex-col sm:flex-row justify-between gap-3 pt-6 border-t border-white/10">
                <div className="flex gap-3">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-xl font-medium transition-colors"
                    >
                      Previous
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
                
                <div className="flex gap-3">
                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentStep(currentStep + 1)}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-medium transition-colors"
                    >
                      Launch Campaign
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Campaigns Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Campaigns</p>
                <p className="text-2xl font-bold text-white">{ads.length}</p>
              </div>
              <div className="p-3 bg-blue-600/20 rounded-xl">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Impressions</p>
                <p className="text-2xl font-bold text-white">{ads.reduce((sum, ad) => sum + ad.impressions, 0).toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-600/20 rounded-xl">
                <Eye className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Clicks</p>
                <p className="text-2xl font-bold text-white">{ads.reduce((sum, ad) => sum + ad.clicks, 0).toLocaleString()}</p>
              </div>
              <div className="p-3 bg-purple-600/20 rounded-xl">
                <MousePointer className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Spent</p>
                <p className="text-2xl font-bold text-white">₦{ads.reduce((sum, ad) => sum + ad.spent, 0).toLocaleString()}</p>
              </div>
              <div className="p-3 bg-orange-600/20 rounded-xl">
                <DollarSign className="w-6 h-6 text-orange-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Campaigns Table */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-semibold text-white">Your Campaigns</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="text-left p-4 text-gray-300 font-medium">Campaign</th>
                  <th className="text-left p-4 text-gray-300 font-medium hidden sm:table-cell">Budget</th>
                  <th className="text-left p-4 text-gray-300 font-medium hidden md:table-cell">Status</th>
                  <th className="text-left p-4 text-gray-300 font-medium hidden lg:table-cell">Performance</th>
                  <th className="text-left p-4 text-gray-300 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {ads.map((ad, idx) => (
                  <tr
                    key={ad.id}
                    className={`${
                      idx !== ads.length - 1 ? "border-b border-white/5" : ""
                    } hover:bg-white/5 transition-colors`}
                  >
                    <td className="p-4">
                      <div>
                        <div className="text-white font-medium">{ad.title}</div>
                        <div className="text-gray-400 text-sm mt-1 line-clamp-2">{ad.description}</div>
                        <div className="text-gray-500 text-xs mt-1">
                          Created: {ad.created}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      <div className="text-blue-400 font-semibold">{ad.dailyBudget}/day</div>
                      <div className="text-gray-400 text-sm">{ad.totalBudget} total</div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        ad.status === "Active" ? "bg-green-600/20 text-green-400" :
                        ad.status === "Paused" ? "bg-yellow-600/20 text-yellow-400" :
                        ad.status === "Pending" ? "bg-blue-600/20 text-blue-400" :
                        "bg-red-600/20 text-red-400"
                      }`}>
                        {ad.status}
                      </span>
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <div className="space-y-1">
                        <div className="text-gray-400 text-sm">
                          Impressions: {ad.impressions.toLocaleString()}
                        </div>
                        <div className="text-gray-400 text-sm">
                          Clicks: {ad.clicks.toLocaleString()}
                        </div>
                        <div className="text-gray-400 text-sm">
                          CTR: {ad.ctr.toFixed(2)}%
                        </div>
                        <div className="text-gray-400 text-sm">
                          CPC: ₦{ad.cpc.toFixed(2)}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handlePauseToggle(ad.id)}
                          className={`px-3 py-1 rounded-lg text-sm font-medium ${
                            ad.status === "Active"
                              ? "bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600/30"
                              : "bg-green-600/20 text-green-400 hover:bg-green-600/30"
                          }`}
                        >
                          {ad.status === "Active" ? "Pause" : "Resume"}
                        </button>
                        <button
                          onClick={() => handleDelete(ad.id)}
                          className="px-3 py-1 rounded-lg text-sm font-medium bg-red-600/20 text-red-400 hover:bg-red-600/30"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}