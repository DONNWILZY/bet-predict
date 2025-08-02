import React from 'react';
import { FileText } from 'lucide-react';
import { Ticket, Status } from '@/lib/profileType';
import { myTickets, purchasedTickets } from '@/lib/profileData';

interface TicketsProps {
  ticketTab: 'my' | 'purchased';
  setTicketTab: React.Dispatch<React.SetStateAction<'my' | 'purchased'>>;
  getStatusColor: (status: Status) => string;
}

export default function Tickets({ ticketTab, setTicketTab, getStatusColor }: TicketsProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">My Tickets</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setTicketTab('my')}
            className={`px-4 py-2 rounded-xl font-medium transition-colors ${
              ticketTab === 'my'
                ? 'bg-blue-600 text-white'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            My Predictions
          </button>
          <button
            onClick={() => setTicketTab('purchased')}
            className={`px-4 py-2 rounded-xl font-medium transition-colors ${
              ticketTab === 'purchased'
                ? 'bg-blue-600 text-white'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            Purchased
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {(ticketTab === 'my' ? myTickets : purchasedTickets).map((ticket) => (
          <div
            key={ticket.id}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-xl">
                  <FileText className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="font-mono text-blue-300 font-medium">{ticket.ticketNo}</p>
                  {ticketTab === 'purchased' && (
                    <p className="text-gray-400 text-sm">by {ticket.predictor}</p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(ticket.status)}`}
                >
                  {ticket.status}
                </span>
                {ticketTab === 'my' && (
                  <p className="text-gray-400 text-sm mt-1">Odds: {ticket.odds}</p>
                )}
              </div>
            </div>
            {ticket.amount !== 0 && (
              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <span className="text-gray-300">Amount</span>
                <span
                  className={`font-semibold ${ticket.amount > 0 ? 'text-emerald-400' : 'text-red-400'}`}
                >
                  {ticket.amount > 0 ? '+' : ''}₦{Math.abs(ticket.amount).toLocaleString()}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}