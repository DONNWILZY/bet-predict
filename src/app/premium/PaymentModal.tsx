import React, { useState } from 'react';
import { X, CreditCard } from 'lucide-react';
import { Subscription } from '@/lib/premiumTypes';

interface PaymentModalProps {
  ticketId: number;
  price: number;
  subscriptions: Subscription[];
  onClose: () => void;
  onPaymentSuccess: (ticketId: number, subscriptionId: string | null) => void;
}

export default function PaymentModal({ ticketId, price, subscriptions, onClose, onPaymentSuccess }: PaymentModalProps) {
  const [selectedSubscription, setSelectedSubscription] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'paystack' | 'stripe' | null>(null);
  const [processing, setProcessing] = useState(false);

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      // Simulate payment processing
      onPaymentSuccess(ticketId, selectedSubscription);
      setProcessing(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl w-full max-w-md mx-4 max-h-[80vh] flex flex-col">
        <div className="sticky top-0 bg-white rounded-t-2xl p-6 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">Unlock Premium Tip</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-slate-600 mb-2">Ticket Details</h3>
            <div className="bg-slate-50 p-4 rounded-xl">
              <p className="text-sm text-slate-800">Ticket ID: {ticketId}</p>
              <p className="text-sm text-slate-800">Price: ₦{price}</p>
            </div>
          </div>

          {subscriptions.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-slate-600 mb-2">Use Active Subscription</h3>
              <div className="space-y-2">
                {subscriptions.map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubscription(sub.id)}
                    className={`w-full p-3 rounded-xl text-left flex items-center justify-between ${
                      selectedSubscription === sub.id
                        ? 'bg-blue-50 border border-blue-500'
                        : 'bg-slate-50 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-800">{sub.name}</p>
                      <p className="text-xs text-slate-500">{sub.ticketsRemaining} tickets remaining</p>
                    </div>
                    {selectedSubscription === sub.id && (
                      <span className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-sm font-medium text-slate-600 mb-2">Pay Directly</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setPaymentMethod('paystack')}
                className={`p-3 rounded-xl flex items-center gap-2 ${
                  paymentMethod === 'paystack'
                    ? 'bg-blue-50 border border-blue-500'
                    : 'bg-slate-50 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <CreditCard size={16} className="text-slate-600" />
                <span className="text-sm text-slate-800">Paystack</span>
              </button>
              <button
                onClick={() => setPaymentMethod('stripe')}
                className={`p-3 rounded-xl flex items-center gap-2 ${
                  paymentMethod === 'stripe'
                    ? 'bg-blue-50 border border-blue-500'
                    : 'bg-slate-50 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <CreditCard size={16} className="text-slate-600" />
                <span className="text-sm text-slate-800">Stripe</span>
              </button>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white rounded-b-2xl p-6 border-t border-slate-200">
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 py-2 bg-slate-200 text-slate-700 rounded-lg"
              disabled={processing}
            >
              Cancel
            </button>
            <button
              onClick={handlePayment}
              className={`flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ${
                processing || (!selectedSubscription && !paymentMethod) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={processing || (!selectedSubscription && !paymentMethod)}
            >
              {processing ? 'Processing...' : 'Confirm Payment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}