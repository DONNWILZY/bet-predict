// src\lib\dashboardAdverts.ts

export type AdStatus = "Active" | "Paused" | "Pending | Rejected";

export interface AdData {
  id: number;
  title: string;
  description: string;
  budget: string;
  status: AdStatus;
  created: string;
  image?: File | null;
}

export interface AdFormState {
  title: string;
  description: string;
  budget: string;
  image: File | null;
}

export const initialAds: AdData[] = [
  {
    id: 1,
    title: "Super Odds Weekend!",
    description: "Promote your predictions and reach more users this weekend.",
    budget: "₦10,000",
    status: "Active",
    created: "2024-06-20",
  },
  {
    id: 2,
    title: "Champions League Final Promo",
    description: "Special ad for the Champions League final predictions.",
    budget: "₦5,000",
    status: "Paused",
    created: "2024-06-10",
  },
];