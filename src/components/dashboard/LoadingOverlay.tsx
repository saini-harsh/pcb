"use client";

import { motion } from "framer-motion";

interface LoadingOverlayProps {
  message: string;
}

export default function LoadingOverlay({ message }: LoadingOverlayProps) {
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-gray-900/10 backdrop-blur-[2px]">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="bg-white px-12 py-8 rounded-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] flex items-center gap-10 min-w-[400px] border border-gray-50"
      >
        <h3 className="text-[22px] font-black text-gray-900 flex-1 tracking-tight">{message}</h3>
        <div className="relative w-10 h-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-full h-full border-[3px] border-blue-600 border-t-transparent rounded-full"
          />
        </div>
      </motion.div>
    </div>
  );
}
