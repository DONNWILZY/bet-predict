//src\components\ui\UnauthorizedModal.tsx
"use client";

import React from "react";
import { ShieldAlert, X } from "lucide-react";

interface UnauthorizedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * 🚫 UnauthorizedModal:
 * - Appears when user is logged in but lacks required role
 * - Blocks sensitive actions with visual feedback
 */
export const UnauthorizedModal: React.FC<UnauthorizedModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center backdrop-blur-sm transition-opacity duration-300">
      {/* Modal */}
      <div className="bg-white/5 border border-red-500/20 rounded-xl p-8 max-w-sm w-full shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors p-1"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon + Title */}
        <div className="flex flex-col items-center text-center">
          <div className="p-3 mb-4 rounded-full bg-red-500/20">
            <ShieldAlert className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-gray-400 text-sm mb-6">
            You do not have the required permissions to view this content.
          </p>
        </div>

        {/* Acknowledge Button */}
        <button
          onClick={onClose}
          className="w-full py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
        >
          I Understand
        </button>
      </div>
    </div>
  );
};
