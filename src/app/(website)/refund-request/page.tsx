"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function RefundRequestPage() {
  const [pid, setPid] = useState("");
  const [missedCount, setMissedCount] = useState("");
  const [resolution, setResolution] = useState<"refabricate" | "refund" | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ pid, missedCount, resolution });
  };

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
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4">
                Would you like to Refund or Re-fabricate your Boards?
              </h1>
              <p className="text-[15px] font-medium text-gray-500 leading-relaxed max-w-lg mx-auto">
                Looks like your order shipped without all of your PCBs. We've got you covered. Fill in a couple of details below, and we'll either re-fab or refund your boards!
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              
              {/* PID / Project ID */}
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">
                  PID / Project ID <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text"
                  required
                  value={pid}
                  onChange={(e) => setPid(e.target.value)}
                  placeholder="eg- 12345"
                  className="w-full h-14 px-6 bg-white border border-gray-200 rounded-xl text-[15px] font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#ff6b00] focus:ring-4 focus:ring-orange-50 transition-all shadow-sm"
                />
              </div>

              {/* Number of Boards Missed */}
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">
                  Number of Boards Missed <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text"
                  required
                  value={missedCount}
                  onChange={(e) => setMissedCount(e.target.value)}
                  placeholder="eg- 2"
                  className="w-full h-14 px-6 bg-white border border-gray-200 rounded-xl text-[15px] font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#ff6b00] focus:ring-4 focus:ring-orange-50 transition-all shadow-sm"
                />
              </div>

              {/* Resolution Options */}
              <div className="pt-2">
                <label className="block text-[13px] font-bold text-gray-700 mb-4">
                  Please choose how you want it to be resolved <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3 pl-1">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${resolution === 'refabricate' ? 'border-[#ff6b00]' : 'border-gray-300 group-hover:border-[#ff6b00]'}`}>
                      <div className={`w-2.5 h-2.5 rounded-full transition-transform ${resolution === 'refabricate' ? 'scale-100 bg-[#ff6b00]' : 'scale-0 bg-transparent'}`} />
                    </div>
                    <span className="text-[15px] font-medium text-gray-700 group-hover:text-gray-900">Re-fabricate the remaining boards</span>
                    <input 
                      type="radio" 
                      name="resolution" 
                      value="refabricate" 
                      className="hidden"
                      onChange={() => setResolution("refabricate")}
                      required
                    />
                  </label>
                  
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${resolution === 'refund' ? 'border-[#ff6b00]' : 'border-gray-300 group-hover:border-[#ff6b00]'}`}>
                      <div className={`w-2.5 h-2.5 rounded-full transition-transform ${resolution === 'refund' ? 'scale-100 bg-[#ff6b00]' : 'scale-0 bg-transparent'}`} />
                    </div>
                    <span className="text-[15px] font-medium text-gray-700 group-hover:text-gray-900">Receive a refund for the remaining boards</span>
                    <input 
                      type="radio" 
                      name="resolution" 
                      value="refund" 
                      className="hidden"
                      onChange={() => setResolution("refund")}
                      required
                    />
                  </label>
                </div>
              </div>

              <div className="pt-6">
                <button 
                  type="submit"
                  className="w-full h-14 bg-[#f89531] text-white rounded-xl font-bold text-[15px] hover:bg-[#eb8420] transition-colors shadow-sm focus:outline-none focus:ring-4 focus:ring-orange-50 flex items-center justify-center gap-2"
                >
                  Submit Request
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
