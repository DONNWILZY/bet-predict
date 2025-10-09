//src\app\(users)\dashboard\Transaction.tsx

import React, { useState } from 'react';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { requireRole } from "@/lib/auth/checkAuth";
import { ArrowDownCircle, ArrowUpCircle, Activity, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Transaction, Status } from '@/lib/profileType';
import { transactions } from '@/lib/profileData';

interface TransactionProps {
  getStatusColor: (status: Status) => string;
}

export default function Transaction({ getStatusColor }: TransactionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedTransactions = transactions.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors">
            Filter
          </button>
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors shadow-sm">
            Export
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-6 text-gray-700 font-semibold">Transaction</th>
                <th className="text-left p-6 text-gray-700 font-semibold">Date & Time</th>
                <th className="text-left p-6 text-gray-700 font-semibold">Amount</th>
                <th className="text-left p-6 text-gray-700 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {displayedTransactions.map((tx, index) => (
                <tr
                  key={tx.id}
                  className={`${index !== displayedTransactions.length - 1 ? 'border-b border-gray-200' : ''} hover:bg-gray-50 transition-colors`}
                >
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-xl ${
                          tx.type === 'Deposit'
                            ? 'bg-emerald-50'
                            : tx.type === 'Withdrawal'
                            ? 'bg-red-50'
                            : 'bg-purple-50'
                        }`}
                      >
                        {tx.type === 'Deposit' ? (
                          <ArrowDownCircle className="w-4 h-4 text-emerald-600" />
                        ) : tx.type === 'Withdrawal' ? (
                          <ArrowUpCircle className="w-4 h-4 text-red-600" />
                        ) : (
                          <Activity className="w-4 h-4 text-purple-600" />
                        )}
                      </div>
                      <span className="text-gray-900 font-medium">{tx.type}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="text-gray-900">{tx.date}</div>
                    <div className="text-gray-500 text-sm">{tx.time}</div>
                  </td>
                  <td className="p-6">
                    <span
                      className={`font-semibold ${tx.amount > 0 ? 'text-emerald-600' : 'text-red-600'}`}
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

        {/* Pagination inside table footer */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 p-4">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(endIndex, transactions.length)} of{" "}
              {transactions.length} transactions
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg transition-colors ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === page
                      ? "bg-purple-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg transition-colors ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}