"use client";

import { X, Mail, MessageSquare, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AssemblyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AssemblyModal({ isOpen, onClose }: AssemblyModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/60 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-[500px] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100"
          >
            {/* Design Gradient Header */}
            <div className="h-2 bg-gradient-to-r from-primary via-orange-500 to-yellow-500" />

            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2.5 rounded-2xl hover:bg-gray-100 transition-all text-gray-400 hover:text-gray-900 z-10 hover:rotate-90"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-10 text-center">
              <div className="w-20 h-20 bg-orange-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-orange-100 shadow-inner">
                <Mail className="w-10 h-10 text-primary" />
              </div>

              <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight leading-tight uppercase italic">
                Get Your Assembly <br />
                <span className="text-primary">Started Today!</span>
              </h2>

              <p className="text-gray-500 font-medium leading-relaxed mb-10 text-lg">
                For precision assembly services and custom quotations, please reach out to our dedicated team via email.
              </p>

              <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100 group hover:border-primary/20 transition-all">
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Direct Contact</div>
                <a 
                  href="mailto:info@pcbglobe.com" 
                  className="text-2xl font-black text-gray-900 hover:text-primary transition-colors flex items-center justify-center gap-3 decoration-primary/20 hover:decoration-primary underline underline-offset-8 decoration-4"
                >
                  info@pcbglobe.com
                </a>
              </div>

              <div className="mt-10 pt-8 border-t border-gray-50 flex items-center justify-center gap-8">
                <div className="flex items-center gap-2 text-gray-400 font-black text-[10px] uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Fast Response
                </div>
                <div className="flex items-center gap-2 text-gray-400 font-black text-[10px] uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Expert Support
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-gray-900 text-center">
                <button 
                    onClick={onClose}
                    className="text-white font-black text-xs uppercase tracking-widest hover:text-primary transition-colors"
                >
                    Back to Homepage
                </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
