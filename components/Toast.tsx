'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  isVisible: boolean;
  onClose: () => void;
}

export default function Toast({ message, type, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto-close after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const colors = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-500',
      text: 'text-green-800',
      icon: '✓',
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-500',
      text: 'text-red-800',
      icon: '✕',
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-500',
      text: 'text-blue-800',
      icon: 'ℹ',
    },
  };

  const style = colors[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className="fixed top-4 right-4 z-[9999] min-w-[300px] max-w-md"
        >
          <div
            className={`${style.bg} ${style.text} px-6 py-4 rounded-lg border-l-4 ${style.border} shadow-lg flex items-center gap-3`}
          >
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white flex items-center justify-center font-bold">
              {style.icon}
            </div>
            <div className="flex-1">
              <p className="font-medium">{message}</p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 text-current opacity-50 hover:opacity-100 transition-opacity"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
