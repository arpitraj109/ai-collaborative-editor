import React from "react";
import { Dialog } from "@headlessui/react";

import { X, Check, XCircle } from "lucide-react";

export default function PreviewModal({ isOpen, onClose, originalText, aiText, onConfirm }) {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-4 sm:p-6 lg:p-8 relative z-10 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <Dialog.Title className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            AI Suggestion
          </Dialog.Title>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2 sm:mb-3 flex items-center gap-2">
              <XCircle size={16} className="text-orange-500" />
              Original Text
            </h3>
            <div className="border border-orange-200 rounded-xl p-3 sm:p-4 bg-gradient-to-r from-orange-50/50 to-red-50/50">
              <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">{originalText}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-2 sm:mb-3 flex items-center gap-2">
              <Check size={16} className="text-emerald-500" />
              AI Suggestion
            </h3>
            <div className="border border-emerald-200 rounded-xl p-3 sm:p-4 bg-gradient-to-r from-emerald-50/50 to-green-50/50">
              <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">{aiText}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-6 sm:mt-8">
          <button
            onClick={onClose}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium text-sm sm:text-base"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-xl hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-200 font-medium flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg"
          >
            <Check size={16} />
            Apply Changes
          </button>
        </div>
      </div>
    </Dialog>
  );
}
