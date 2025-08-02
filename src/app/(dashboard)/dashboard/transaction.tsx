import React from 'react';
import { ArrowDownCircle, ArrowUpCircle, Activity } from 'lucide-react';
import type { Transaction, Status } from '@/lib/profileType';
import { transactions } from '@/lib/profileData';

interface TransactionProps {
  getStatusColor: (status: Status) => string;
}

export default function Transaction({ getStatusColor }: TransactionProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Transaction History</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors">
            Filter
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors">
            Export
          </button>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left p-6 text-gray-300 font-medium">Transaction</th>
                <th className="text-left p-6 text-gray-300 font-medium">Date & Time</th>
                <th className="text-left p-6 text-gray-300 font-medium">Amount</th>
                <th className="text-left p-6 text-gray-300 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, index) => (
                <tr
                  key={tx.id}
                  className={`${index !== transactions.length - 1 ? 'border-b border-white/5' : ''} hover:bg-white/5 transition-colors`}
                >
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-xl ${
                          tx.type === 'Deposit'
                            ? 'bg-emerald-500/20'
                            : tx.type === 'Withdrawal'
                            ? 'bg-red-500/20'
                            : 'bg-blue-500/20'
                        }`}
                      >
                        {tx.type === 'Deposit' ? (
                          <ArrowDownCircle className="w-4 h-4 text-emerald-400" />
                        ) : tx.type === 'Withdrawal' ? (
                          <ArrowUpCircle className="w-4 h-4 text-red-400" />
                        ) : (
                          <Activity className="w-4 h-4 text-blue-400" />
                        )}
                      </div>
                      <span className="text-white font-medium">{tx.type}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="text-white">{tx.date}</div>
                    <div className="text-gray-400 text-sm">{tx.time}</div>
                  </td>
                  <td className="p-6">
                    <span
                      className={`font-semibold ${tx.amount > 0 ? 'text-emerald-400' : 'text-red-400'}`}
                    >
                      {tx.amount > 0 ? '+' : ''}₦{Math.abs(tx.amount).toLocaleString()}
                    </span>
                  </td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(tx.status)}`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}