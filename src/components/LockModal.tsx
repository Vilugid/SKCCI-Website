import React from 'react';
import { X, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
  progressCount: number;
}

export default function LockModal({ isOpen, onClose, onContinue, progressCount }: LockModalProps) {
  if (!isOpen) return null;
  const daysLeft = Math.max(0, 100 - progressCount);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" 
            onClick={onClose} 
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
          >
            <div className="absolute top-4 right-4">
              <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8 text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-amber-50 mb-6">
                <BookOpen className="h-8 w-8 text-amber-600" />
              </div>
              
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                Unlock Your 365-Day Journey 📖
              </h3>
              
              <p className="text-gray-600 mb-8 leading-relaxed text-sm">
                Great effort on your daily quiet time! The 365-Day Bible Reading Guide unlocks automatically once you complete all 100 days of the foundation plan.
              </p>
              
              <div className="bg-[#FAFAFA] rounded-2xl p-5 mb-8 border border-gray-100 shadow-inner">
                <div className="flex justify-between text-sm font-medium mb-3">
                  <span className="text-gray-900">Day {progressCount} of 100</span>
                  <span className="text-amber-600">{daysLeft} days left!</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-amber-500 h-3 rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${progressCount}%` }}
                  />
                </div>
              </div>
              
              <button 
                onClick={onContinue}
                className="w-full inline-flex items-center justify-center px-6 py-3.5 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-[#C82323] hover:bg-[#a11b1b] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C82323]"
              >
                Continue 100-Day Plan
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
