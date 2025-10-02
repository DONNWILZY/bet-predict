"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { Ticket, Status } from "@/lib/profileType";
import { myTickets, purchasedTickets } from "@/lib/profileData";

// ✅ import guards
import { requireAuth, requireRole } from "@/lib/auth-helpers";

interface TicketsProps {
  ticketTab: "my" | "purchased";
  setTicketTab: React.Dispatch<React.SetStateAction<"my" | "purchased">>;
  getStatusColor: (status: Status) => string;
}

export default function Tickets({ ticketTab, setTicketTab, getStatusColor }: TicketsProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    // 1️⃣ Authentication check → redirect if not logged in
    const auth = requireAuth();
    if (auth.redirect) {
      router.replace(auth.redirect);
      return;
    }

    // 2️⃣ Role check → only allow USERs to view tickets
    const roleCheck = requireRole(["USER"]);
    if (roleCheck.unauthorized) {
      alert("❌ You are not authorized to view tickets!");
      router.replace("/unauthorized");
      return;
    }
  }, [router]);

  // Reset to page 1 when switching tabs
  useEffect(() => {
    setCurrentPage(1);
  }, [ticketTab]);

  const currentTickets = ticketTab === "my" ? myTickets : purchasedTickets;
  const totalPages = Math.ceil(currentTickets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedTickets = currentTickets.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Tickets</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setTicketTab("my")}
            className={`px-4 py-2 rounded-xl font-medium transition-colors ${
              ticketTab === "my"
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            My Predictions
          </button>
          <button
            onClick={() => setTicketTab("purchased")}
            className={`px-4 py-2 rounded-xl font-medium transition-colors ${
              ticketTab === "purchased"
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Purchased
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {displayedTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-white border border-gray-200 rounded-2xl p-6 hover:bg-gray-50 transition-all shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 rounded-xl">
                  <FileText className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-mono text-purple-700 font-medium">{ticket.ticketNo}</p>
                  {ticketTab === "purchased" && (
                    <p className="text-gray-500 text-sm">by {ticket.predictor}</p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(ticket.status)}`}
                >
                  {ticket.status}
                </span>
                {ticketTab === "my" && (
                  <p className="text-gray-500 text-sm mt-1">Odds: {ticket.odds}</p>
                )}
              </div>
            </div>
            {ticket.amount !== 0 && (
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="text-gray-600">Amount</span>
                <span
                  className={`font-semibold ${
                    ticket.amount > 0 ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  {ticket.amount > 0 ? "+" : ""}₦{Math.abs(ticket.amount).toLocaleString()}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(endIndex, currentTickets.length)} of{" "}
            {currentTickets.length} tickets
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg transition-colors ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}