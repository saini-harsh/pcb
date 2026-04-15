"use client";

import { SignIn, SignUp } from "@clerk/nextjs";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "sign-in" | "sign-up";
}

export default function AuthModal({ isOpen, onClose, initialMode = "sign-in" }: AuthModalProps) {
  const [mode, setMode] = useState<"sign-in" | "sign-up">(initialMode);
  const isPlaceholderKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.includes('...');

  useEffect(() => {
    if (isOpen) setMode(initialMode);
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-900/40 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="relative animate-in zoom-in-95 duration-300 origin-center w-full max-w-[420px]">
        {/* Close Button - Positioned relative to Clerk card */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-50 transition-colors text-gray-400 hover:text-gray-900 z-[1001]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Clerk Component Container */}
        <div className="relative w-full">
          {!isPlaceholderKey ? (
            mode === "sign-in" ? (
              <SignIn
                appearance={clerkAppearance}
                routing="hash"
              />
            ) : (
              <SignUp
                appearance={clerkAppearance}
                routing="hash"
              />
            )
          ) : (
            <div className="bg-white rounded-[2rem] shadow-2xl p-10 flex flex-col items-center gap-4 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl animate-pulse" />
              <div className="space-y-2 w-full">
                <div className="w-full h-10 bg-gray-50 rounded-xl animate-pulse" />
                <div className="w-full h-10 bg-gray-50 rounded-xl animate-pulse" />
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-2 italic">Credentials Pending in .env</p>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        /* Pinpoint High-Fidelity Style Core */
        .cl-rootBox { width: 100% !important; }
        .cl-card { 
          width: 100% !important; 
          max-width: 420px !important;
          background: white !important;
          box-shadow: 0 30px 100px rgba(0,0,0,0.2) !important;
          border-radius: 2rem !important;
          border: 1px solid #f3f4f6 !important;
          padding: 2.5rem !important;
          padding-top: 3.5rem !important;
        }
        .cl-main, .cl-scrollBox { background: transparent !important; padding: 0 !important; border: none !important; box-shadow: none !important; }
        
        /* Premium Pill Arrow Style */
        .cl-formButtonPrimary {
          background-color: #ff6b00 !important;
          height: 3.5rem !important;
          border-radius: 9999px !important;
          font-weight: 900 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.1em !important;
          position: relative !important;
          box-shadow: 0 10px 30px rgba(255, 107, 0, 0.2) !important;
          transition: all 0.2s ease !important;
          width: 100% !important;
        }
        .cl-formButtonPrimary:hover { background-color: #111827 !important; transform: scale(1.02); }
        .cl-formButtonPrimary:active { transform: scale(0.95); }
        .cl-formButtonPrimary::after {
          content: '→';
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          background: white;
          color: #ff6b00;
          border-radius: 50%;
          font-weight: 900;
          font-size: 14px;
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          transition: transform 0.2s ease;
        }
        .cl-formButtonPrimary:hover::after { transform: translateY(-50%) translateX(3px); }
        
        /* Typography Perfection */
        .cl-headerTitle { 
          font-weight: 950 !important; 
          font-size: 1.5rem !important;
          color: #111827 !important;
          text-transform: uppercase !important;
          font-style: italic !important;
          letter-spacing: -0.02em !important;
          margin-bottom: 0.25rem !important;
        }
        .cl-headerSubtitle { 
          font-weight: 700 !important; 
          font-size: 0.875rem !important;
          color: #9ca3af !important;
          margin-bottom: 2rem !important;
        }
        .cl-formFieldLabel {
          font-weight: 900 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.1em !important;
          color: #9ca3af !important;
          font-size: 0.625rem !important;
          margin-bottom: 0.5rem !important;
          margin-left: 0.25rem !important;
        }
        .cl-formFieldInput {
          height: 3rem !important;
          border-radius: 0.75rem !important;
          border: 2px solid #f3f4f6 !important;
          font-weight: 700 !important;
          padding: 0 1rem !important;
          transition: all 0.2s ease !important;
        }
        .cl-formFieldInput:focus { border-color: #ff6b0080 !important; ring-color: #ff6b000d !important; }
        .cl-socialButtonsBlockButton {
          height: 3.5rem !important;
          border-radius: 0.75rem !important;
          border: 2px solid #f3f4f6 !important;
          font-weight: 700 !important;
          transition: all 0.2s ease !important;
        }
        .cl-socialButtonsBlockButtonText { font-weight: 700 !important; color: #111827 !important; }
        .cl-footer { border-top: 1px solid #f9fafb !important; padding-top: 1.5rem !important; margin-top: 1.5rem !important; }
        .cl-footerActionLink { color: #ff6b00 !important; font-weight: 900 !important; }
        .cl-footerActionLink:hover { color: #111827 !important; }
      `}</style>
    </div>
  );
}

const clerkAppearance = {
  elements: {
    header: "block", // Using native header now but heavily styled
    footer: "block",
    rootBox: "w-full",
    card: "w-full",
  },
  layout: { socialButtonsPlacement: "bottom", showOptionalFields: false }
};
