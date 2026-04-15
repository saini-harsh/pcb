"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, ArrowRight, Banknote, ChevronRight } from "lucide-react";

export default function SubmitFeedbackPage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  return (
    <div className="min-h-screen bg-gray-50/50 pt-32 pb-32 relative overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-orange-200/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-300/10 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

      {/* Decorative Dot Grid */}
      <div className="absolute top-20 right-20 w-32 h-32 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #9ca3af 2px, transparent 2px)', backgroundSize: '16px 16px' }} />
      <div className="absolute bottom-20 left-20 w-32 h-32 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #9ca3af 2px, transparent 2px)', backgroundSize: '16px 16px' }} />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="max-w-2xl mx-auto">
          {/* Main Card */}
          <div className="bg-white rounded-[2rem] shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-gray-100 p-8 md:p-14 animate-in fade-in slide-in-from-bottom-8 duration-700">
            
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4">We'd Love Your Feedback</h1>
              <p className="text-[15px] font-medium text-gray-500 leading-relaxed max-w-md mx-auto">
                Help us improve by sharing your honest thoughts. We value every suggestion, issue, or compliment.
              </p>
            </div>

            {/* Star Rating Tracker */}
            <div className="flex justify-center gap-2 sm:gap-4 mb-10 group/stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="focus:outline-none transition-transform hover:scale-[1.15] active:scale-95 p-2"
                >
                  <Star 
                    className={`w-10 h-10 sm:w-12 sm:h-12 transition-colors duration-200 ${
                      star <= (hoverRating || rating) 
                        ? 'fill-orange-400 text-orange-400' 
                        : 'fill-gray-100 text-gray-200'
                    }`} 
                  />
                </button>
              ))}
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <div className="relative">
                  <textarea 
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    maxLength={2000}
                    placeholder="Type your feedback..."
                    className="w-full h-40 px-6 py-5 bg-white border-2 border-gray-100 rounded-2xl text-[15px] font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-orange-200 focus:ring-4 focus:ring-orange-50 transition-all resize-none shadow-sm"
                  />
                  <div className="absolute bottom-4 right-4 text-xs font-bold text-gray-400">
                    {feedback.length}/2000
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[13px] font-bold text-gray-700 text-center mb-2">Order ID/PID (Optional)</p>
                <input 
                  type="text"
                  placeholder="123456"
                  className="w-full h-14 px-6 bg-white border-2 border-gray-100 rounded-xl text-[15px] font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-orange-200 focus:ring-4 focus:ring-orange-50 transition-all text-center tracking-widest shadow-sm"
                />
                <p className="text-[11px] font-bold text-gray-400 text-center mt-3 uppercase tracking-widest">
                  Helps us trace and understand the context better.
                </p>
              </div>

              <div className="pt-6 flex justify-center">
                <button className="h-14 px-8 bg-gradient-to-r from-[#ff6b00] to-orange-500 text-white rounded-full font-black text-[15px] tracking-widest uppercase hover:shadow-lg hover:shadow-orange-500/30 transition-all active:scale-95 flex items-center justify-between w-full max-w-[280px]">
                  <span className="flex-1 text-center pr-2">Submit</span>
                  <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shrink-0">
                    <ArrowRight className="w-5 h-5 text-[#ff6b00]" />
                  </div>
                </button>
              </div>
            </form>

            <Link href="/refund-request" className="mt-12 block bg-[#fffdfa] border border-orange-100 rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:bg-orange-50 transition-colors group shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Banknote className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-[13px] font-black text-orange-600 group-hover:text-[#ff6b00] transition-colors uppercase tracking-wide">
                  Get Refund/Re-Fabrication for your Boards
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-orange-400" />
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}
