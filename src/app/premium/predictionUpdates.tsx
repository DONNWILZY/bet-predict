import React from 'react';
import { dummyPredictions } from '@/lib/premiumPredictionData';
import MobilePredictionCard from './MobilePredictionCard';
import { Prediction } from '@/lib/premiumTypes';

interface PredictionUpdatesProps {
  activeTab: string;
  activeFilter: string;
  setPredictions: React.Dispatch<React.SetStateAction<Prediction[]>>;
  searchQuery: string;
  premiumTicketsViewed: number;
  onPay: (ticketId: number) => void;
  onUserClick: (predictor: Prediction['predictor']) => void;
}

export default function PredictionUpdates({ activeTab, activeFilter, setPredictions, searchQuery, premiumTicketsViewed, onPay, onUserClick }: PredictionUpdatesProps) {
  const filteredPredictions = dummyPredictions
    .filter(prediction => {
      if (activeTab === 'following') {
        return prediction.predictor.followers > 10000;
      }
      if (activeTab === 'saved') {
        return prediction.likes > 100;
      }
      if (activeTab === 'profile') {
        return prediction.predictor.name === 'John Tips';
      }
      return true;
    })
    .filter(prediction => {
      if (activeFilter === 'free') {
        return !prediction.premium;
      }
      if (activeFilter === 'premium') {
        return prediction.premium;
      }
      if (activeFilter === 'verified') {
        return prediction.predictor.verified;
      }
      return true;
    })
    .filter(prediction =>
      prediction.predictor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prediction.games.some(game =>
        game.team1.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.team2.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

  return (
    <div className="space-y-4">
      {filteredPredictions.map(prediction => (
        <MobilePredictionCard
          key={prediction.id}
          {...prediction}
          premiumTicketsViewed={premiumTicketsViewed}
          onPay={onPay}
          onUserClick={onUserClick}
        />
      ))}
    </div>
  );
}