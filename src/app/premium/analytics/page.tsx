//src\app\analytics\page.tsx

"use client";

import React from 'react';
import UserAnalytics from '../UserAnalytics';
import { dummyAnalytics } from '@/lib/premiumPredictionData';

export default function AnalyticsPage() {
  return (
    <UserAnalytics analytics={dummyAnalytics} />
  );
}