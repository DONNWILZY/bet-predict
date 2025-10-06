"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowDownCircle, ArrowUpCircle, Activity, Calendar, Clock, CreditCard, FileText, CheckCircle, XCircle, AlertCircle, Copy, Check } from "lucide-react";
import { useState } from "react";

interface TransactionDetailsProps {
  params: { id: string };
}

export default function TransactionDetailsPage({ params }: TransactionDetailsProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  // Mock data - replace with API call using params.id
  const transaction = {
    id: "fc8430ac-a2f7-4087-94ce-19aa6bccac76",
    userId: "8f1d41fe-f3fe-421d-ba4e-8c909d6fb68c",
    type: "DEPOSIT",
    amount: "2000",
    status: "SUCCESS",
    method: "OFFLINE",
    reference: "BANK123456",
    note: "Manual bank transfer",
    proof: "https://cloudinary.com/proof.pdf",
    date: "2025-09-15T04:42:04.231Z",
    time: null,
    processedBy: "Admin User",
    processedAt: "2025-09-15T05:30:00.000Z"
  };

  const getStatusConfig = (status: string) => {
    const configs = {
      SUCCESS: {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
        icon: CheckCircle,
        label: "Successful"
      },
      PENDING: {
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-200",
        icon: AlertCircle,
        label: "Pending"
      },
      FAILED: {
        bg: "bg-red-50",
        text: "text-red-700",
        border: "border-red-200",
        icon: XCircle,
        label: "Failed"
      }
    };
    return configs[status as keyof typeof configs] || configs.PENDING;
  };

  const getTypeConfig = (type: string) => {
    const configs = {
      DEPOSIT: {
        bg: "bg-emerald-50",
        icon: ArrowDownCircle,
        color: "text-emerald-600",
        label: "Deposit"
      },
      WITHDRAWAL: {
        bg: "bg-red-50",
        icon: ArrowUpCircle,
        color: "text-red-600",
        label: "Withdrawal"
      },
      PREDICTION_WIN: {
        bg: "bg-purple-50",
        icon: Activity,
        color: "text-purple-600",
        label: "Prediction Win"
      },
      TICKET_PURCHASE: {
        bg: "bg-blue-50",
        icon: FileText,
        color: "text-blue-600",
        label: "Ticket Purchase"
      }
    };
    return configs[type as keyof typeof configs] || configs.DEPOSIT;
  };

  const statusConfig = getStatusConfig(transaction.status);
  const typeConfig = getTypeConfig(transaction.type);
  const StatusIcon = statusConfig.icon;
  const TypeIcon = typeConfig.icon;

  const copyReference = () => {
    if (transaction.reference) {
      navigator.clipboard.writeText(transaction.reference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto p-4 lg:p-8">
        {/* Header */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Transactions
        </button>

        {/* Transaction Header */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-8 shadow-lg mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Transaction Details</h1>
              <p className="text-purple-200">View complete transaction information</p>
            </div>
            <div className={`px-4 py-2 rounded-full border-2 ${statusConfig.bg} ${statusConfig.border} flex items-center gap-2`}>
              <StatusIcon className={`w-5 h-5 ${statusConfig.text}`} />
              <span className={`font-bold ${statusConfig.text}`}>{statusConfig.label}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className={`p-4 ${typeConfig.bg} rounded-xl`}>
              <TypeIcon className={`w-8 h-8 ${typeConfig.color}`} />
            </div>
            <div>
              <div className="text-purple-200 text-sm">Amount</div>
              <div className="text-4xl font-bold text-white">
                {parseInt(transaction.amount) > 0 ? '+' : ''}₦{Math.abs(parseInt(transaction.amount)).toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Information */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Transaction Information</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-4 border-b border-gray-200">
              <span className="text-gray-600">Transaction ID</span>
              <span className="font-mono text-sm text-gray-900">{transaction.id}</span>
            </div>

            <div className="flex items-center justify-between py-4 border-b border-gray-200">
              <span className="text-gray-600">Type</span>
              <span className={`font-semibold ${typeConfig.color} flex items-center gap-2`}>
                <TypeIcon className="w-4 h-4" />
                {typeConfig.label}
              </span>
            </div>

            <div className="flex items-center justify-between py-4 border-b border-gray-200">
              <span className="text-gray-600">Amount</span>
              <span className={`text-xl font-bold ${
                parseInt(transaction.amount) > 0 ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {parseInt(transaction.amount) > 0 ? '+' : ''}₦{Math.abs(parseInt(transaction.amount)).toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between py-4 border-b border-gray-200">
              <span className="text-gray-600">Status</span>
              <span className={`px-3 py-1 rounded-full border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} font-semibold`}>
                {statusConfig.label}
              </span>
            </div>

            <div className="flex items-center justify-between py-4 border-b border-gray-200">
              <span className="text-gray-600">Payment Method</span>
              <span className="font-semibold text-gray-900">
                {transaction.method === "OFFLINE" ? "Manual/Bank Transfer" : transaction.method}
              </span>
            </div>

            {transaction.reference && (
              <div className="flex items-center justify-between py-4 border-b border-gray-200">
                <span className="text-gray-600">Reference Number</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm text-gray-900">{transaction.reference}</span>
                  <button
                    onClick={copyReference}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between py-4 border-b border-gray-200">
              <span className="text-gray-600 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Date
              </span>
              <span className="font-semibold text-gray-900">
                {new Date(transaction.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>

            <div className="flex items-center justify-between py-4">
              <span className="text-gray-600 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Time
              </span>
              <span className="font-semibold text-gray-900">
                {new Date(transaction.date).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        {transaction.note && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Notes</h2>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-xl">{transaction.note}</p>
          </div>
        )}

        {/* Proof of Payment */}
        {transaction.proof && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Proof of Payment</h2>
            <a
              href={transaction.proof}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl transition-colors"
            >
              <FileText className="w-8 h-8 text-purple-600" />
              <div>
                <div className="font-semibold text-gray-900">View Proof Document</div>
                <div className="text-sm text-gray-600">Click to open in new tab</div>
              </div>
            </a>
          </div>
        )}

        {/* Processing Information */}
        {transaction.processedBy && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Processing Details</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Processed By</span>
                <span className="font-semibold text-gray-900">{transaction.processedBy}</span>
              </div>
              {transaction.processedAt && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Processed At</span>
                  <span className="font-semibold text-gray-900">
                    {new Date(transaction.processedAt).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Status Timeline */}
        {transaction.status === "SUCCESS" && (
          <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Transaction Timeline</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Transaction Completed</div>
                  <div className="text-sm text-gray-600">
                    {new Date(transaction.processedAt || transaction.date).toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Activity className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Transaction Initiated</div>
                  <div className="text-sm text-gray-600">
                    {new Date(transaction.date).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}