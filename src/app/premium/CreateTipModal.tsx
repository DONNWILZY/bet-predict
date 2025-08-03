import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Prediction, Game } from '@/lib/premiumTypes';

interface CreateTipModalProps {
  onClose: () => void;
  onSubmit: (prediction: Omit<Prediction, 'id' | 'timestamp' | 'views' | 'likes'>) => void;
}

export default function CreateTipModal({ onClose, onSubmit }: CreateTipModalProps) {
  const [games, setGames] = useState<Game[]>([{ team1: '', team2: '', logo1: '', logo2: '', prediction: '', odds: '', status: null, date: '', time: '', stadium: '', league: '' }]);
  const [premium, setPremium] = useState(false);
  const [price, setPrice] = useState(0);
  const [confidence, setConfidence] = useState(50);

  const handleAddGame = () => {
    setGames([...games, { team1: '', team2: '', logo1: '', logo2: '', prediction: '', odds: '', status: null, date: '', time: '', stadium: '', league: '' }]);
  };

  const handleGameChange = (index: number, field: keyof Game, value: string) => {
    const updatedGames = games.map((game, i) => 
      i === index ? { ...game, [field]: value } : game
    );
    setGames(updatedGames);
  };

  const handleSubmit = () => {
    onSubmit({
      predictor: {
        name: "John Doe",
        avatar: "/john.jpg",
        rating: 4.8,
        followers: 8200,
        verified: false,
        winStreak: 3
      },
      premium,
      price,
      confidence,
      games,
      premiumTicketsViewed: 0,
      paid: false,
      subscriptionId: null,
      isSubscribed: false,
      onPay: function (ticketId: number): void {
        throw new Error('Function not implemented.');
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl w-full max-w-lg mx-4 max-h-[80vh] flex flex-col">
        <div className="sticky top-0 bg-white rounded-t-2xl p-6 border-b border-slate-200 z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">Create New Tip</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
              <X size={20} />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {games.map((game, index) => (
            <div key={index} className="space-y-2 border-b border-slate-200 pb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-600">Team 1</label>
                  <input
                    type="text"
                    value={game.team1}
                    onChange={(e) => handleGameChange(index, 'team1', e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg text-sm"
                    placeholder="Team 1"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-600">Team 2</label>
                  <input
                    type="text"
                    value={game.team2}
                    onChange={(e) => handleGameChange(index, 'team2', e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg text-sm"
                    placeholder="Team 2"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-600">Prediction</label>
                  <input
                    type="text"
                    value={game.prediction}
                    onChange={(e) => handleGameChange(index, 'prediction', e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg text-sm"
                    placeholder="e.g., 1X, GG, Over 2.5"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-600">Odds</label>
                  <input
                    type="text"
                    value={game.odds}
                    onChange={(e) => handleGameChange(index, 'odds', e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg text-sm"
                    placeholder="e.g., 1.85"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-600">Date</label>
                  <input
                    type="date"
                    value={game.date}
                    onChange={(e) => handleGameChange(index, 'date', e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-600">Time</label>
                  <input
                    type="time"
                    value={game.time}
                    onChange={(e) => handleGameChange(index, 'time', e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-600">Stadium</label>
                  <input
                    type="text"
                    value={game.stadium}
                    onChange={(e) => handleGameChange(index, 'stadium', e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg text-sm"
                    placeholder="Stadium"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-600">League</label>
                  <input
                    type="text"
                    value={game.league}
                    onChange={(e) => handleGameChange(index, 'league', e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg text-sm"
                    placeholder="League"
                  />
                </div>
              </div>
            </div>
          ))}
          
          <button
            onClick={handleAddGame}
            className="w-full py-2 bg-slate-100 text-slate-700 rounded-lg flex items-center justify-center gap-2 hover:bg-slate-200"
          >
            <Plus size={16} />
            Add Another Game
          </button>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={premium}
                onChange={(e) => setPremium(e.target.checked)}
                className="w-4 h-4"
              />
              <label className="text-sm text-slate-600">Premium Tip</label>
            </div>
            {premium && (
              <div>
                <label className="text-sm text-slate-600">Price (₦)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full p-2 border border-slate-200 rounded-lg text-sm"
                  placeholder="Price"
                />
              </div>
            )}
            <div>
              <label className="text-sm text-slate-600">Confidence (%)</label>
              <input
                type="number"
                value={confidence}
                onChange={(e) => setConfidence(Number(e.target.value))}
                className="w-full p-2 border border-slate-200 rounded-lg text-sm"
                min="0"
                max="100"
              />
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white rounded-b-2xl p-6 border-t border-slate-200">
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 py-2 bg-slate-200 text-slate-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Submit Tip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}