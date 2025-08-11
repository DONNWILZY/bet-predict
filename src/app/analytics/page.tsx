//src\app\premium\analytics\page.tsx

"use client";

import React from 'react';
import UserAnalytics from './OverviewTab';
import { dummyAnalytics } from '@/lib/premiumPredictionData';

export default function AnalyticsPage() {
  return (
    <UserAnalytics analytics={dummyAnalytics} />
  );
}