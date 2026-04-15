"use client";

import { motion } from "framer-motion";
import { ChevronRight, Info, Plus, Minus, Check, Clock, Zap } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function QuotationPage({ params }: { params: { id: string } }) {
  const [qty, setQty] = useState(5);
  const [activeTab, setActiveTab] = useState("fabrication");

  const steps = [
    { id: "fabrication", label: "Fabrication", num: 1 },
    { id: "assembly", label: "Assembly", num: 2 },
    { id: "procurement", label: "Procurement", num: 3 },
    { id: "summary", label: "Summary", num: 4 },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] p-8">
      {/* Header Info */}
      <div className="max-w-[1400px] mx-auto mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Project Name : <span className="text-orange-500">test</span></h1>
          <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-widest">PID : 214091</p>
        </div>
      </div>

      {/* Navigation Steps */}
      <div className="max-w-[1400px] mx-auto mb-10">
        <div className="flex items-center justify-center gap-4 bg-white p-4 rounded-full shadow-sm border border-gray-100">
          {steps.map((step, idx) => (
            <div key={step.id} className="flex items-center gap-4">
              <button
                onClick={() => setActiveTab(step.id)}
                className={`flex items-center gap-3 px-6 py-2 rounded-full transition-all ${activeTab === step.id
                    ? "bg-orange-50 text-orange-600 font-black"
                    : "text-gray-400 font-bold hover:text-gray-600"
                  }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${activeTab === step.id ? "bg-orange-500 text-white" : "bg-gray-100"
                  }`}>
                  {step.num}
                </div>
                {step.label}
              </button>
              {idx < steps.length - 1 && <ChevronRight className="w-4 h-4 text-gray-200" />}
            </div>
          ))}
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            <button className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 px-4">Skip Fabrication</button>
            <button className="bg-orange-500 text-white px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest shadow-lg shadow-orange-500/30 flex items-center gap-2 hover:bg-gray-900 transition-all">
              Add & Proceed
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8">
        {/* Main Configuration */}
        <div className="flex-1 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {/* Layers */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-gray-900 uppercase tracking-widest">Layers</span>
                  <Info className="w-4 h-4 text-gray-300" />
                </div>
                <div className="flex gap-2">
                  <div className="px-6 py-3 bg-white border-2 border-orange-500 text-orange-600 rounded-xl font-bold text-sm">2</div>
                </div>
              </div>

              {/* PCB Qty */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-gray-900 uppercase tracking-widest">PCB Qty</span>
                  <Info className="w-4 h-4 text-gray-300" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-gray-50 border border-gray-100 rounded-xl p-1">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors">
                      <Minus className="w-4 h-4" />
                    </button>
                    <input type="number" value={qty} onChange={(e) => setQty(parseInt(e.target.value) || 1)} className="w-16 text-center bg-transparent font-bold text-sm outline-none" />
                    <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Board Dimension */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-gray-900 uppercase tracking-widest">Board Dimension</span>
                  <Info className="w-4 h-4 text-gray-300" />
                </div>
                <div className="flex gap-3">
                  <div className="flex-1 h-12 px-6 bg-gray-50 border-2 border-gray-100 rounded-xl flex items-center text-sm font-bold text-gray-400">
                    X = 66.5480MM
                  </div>
                  <div className="flex-1 h-12 px-6 bg-gray-50 border-2 border-gray-100 rounded-xl flex items-center text-sm font-bold text-gray-400">
                    Y = 93.2180MM
                  </div>
                </div>
              </div>

              {/* Discrete Design */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-gray-900 uppercase tracking-widest">Discrete Design</span>
                  <Info className="w-4 h-4 text-gray-300" />
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button key={val} className={`w-12 h-12 rounded-xl font-bold text-sm transition-all ${val === 1 ? "bg-white border-2 border-orange-500 text-orange-600" : "bg-white border-2 border-gray-100 text-gray-400 hover:border-gray-200"
                      }`}>
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Board Type */}
              <div className="space-y-4 col-span-full">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-gray-900 uppercase tracking-widest">Board Type</span>
                  <Info className="w-4 h-4 text-gray-300" />
                </div>
                <div className="flex gap-3">
                  {["Single PCB", "Panel By Customer", "Panel By LionCircuits"].map((type) => (
                    <button key={type} className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${type === "Single PCB" ? "bg-white border-2 border-orange-500 text-orange-600" : "bg-white border-2 border-gray-100 text-gray-400 hover:border-gray-200"
                      }`}>
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* PCB Thickness */}
              <div className="space-y-4 col-span-full">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-gray-900 uppercase tracking-widest">PCB Thickness</span>
                  <Info className="w-4 h-4 text-gray-300" />
                </div>
                <div className="flex gap-3 flex-wrap">
                  {["0.4 mm", "0.8 mm", "1.2 mm", "1.6 mm", "2.0 mm", "2.4 mm"].map((t) => (
                    <button key={t} className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${t === "1.6 mm" ? "bg-white border-2 border-orange-500 text-orange-600" : "bg-white border-2 border-gray-100 text-gray-400 hover:border-gray-200"
                      }`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Copper Thickness */}
              <div className="space-y-4 col-span-full">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-gray-900 uppercase tracking-widest">Copper Thickness</span>
                  <Info className="w-4 h-4 text-gray-300" />
                </div>
                <div className="flex gap-3">
                  {["1 oz (35 um)", "2 oz (70 um)", "3 oz (105 um)"].map((t) => (
                    <button key={t} className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${t === "1 oz (35 um)" ? "bg-white border-2 border-orange-500 text-orange-600" : "bg-white border-2 border-gray-100 text-gray-400 hover:border-gray-200"
                      }`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* PCB Finish */}
              <div className="space-y-4 col-span-full">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-gray-900 uppercase tracking-widest">PCB Finish</span>
                  <Info className="w-4 h-4 text-gray-300" />
                </div>
                <div className="flex gap-3">
                  {["HASL Finish", "Lead Free HASL", "ENIG"].map((f) => (
                    <button key={f} className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${f === "HASL Finish" ? "bg-white border-2 border-orange-500 text-orange-600" : "bg-white border-2 border-gray-100 text-gray-400 hover:border-gray-200"
                      }`}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mask Color */}
              <div className="space-y-4 col-span-full">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-gray-900 uppercase tracking-widest">Mask Color</span>
                  <Info className="w-4 h-4 text-gray-300" />
                </div>
                <div className="flex gap-3">
                  {[
                    { name: "Green", color: "bg-green-500" },
                    { name: "Blue", color: "bg-blue-500" },
                    { name: "Black", color: "bg-black" },
                    { name: "White", color: "bg-white border border-gray-200" },
                    { name: "Red", color: "bg-red-500" }
                  ].map((c) => (
                    <button key={c.name} className={`flex items-center gap-3 px-6 py-3 rounded-xl font-bold text-sm transition-all ${c.name === "Green" ? "bg-white border-2 border-orange-500 text-orange-600" : "bg-white border-2 border-gray-100 text-gray-400 hover:border-gray-200"
                      }`}>
                      <div className={`w-4 h-4 rounded-full ${c.color}`} />
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar: Charge Details */}
        <div className="w-full lg:w-[400px] space-y-6">
          <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
            <h3 className="text-sm font-black text-orange-500 uppercase tracking-widest mb-8">Charge Details</h3>

            <div className="space-y-6">
              <div className="p-6 bg-orange-50/50 rounded-2xl border border-orange-100 flex items-center justify-between">
                <span className="text-sm font-bold text-gray-900">Fabrication Price</span>
                <span className="text-xl font-black text-orange-600">\u20B91220</span>
              </div>

              <div className="flex items-center justify-between px-2">
                <span className="text-sm font-bold text-gray-900">Make in India</span>
                <Check className="w-5 h-5 text-green-500" />
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-50">
                <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Price Estimate</span>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-gray-500">Per Unit Cost</span>
                    <span className="text-gray-900">\u20B9244.00 x {qty}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-gray-500">NRE Cost</span>
                    <span className="text-gray-900">\u20B90</span>
                  </div>
                  <div className="flex justify-between text-lg font-black pt-2 border-t border-gray-50">
                    <span className="text-gray-900">Sub total</span>
                    <span className="text-orange-600">\u20B9{qty * 244}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6 pt-8 border-t border-gray-50">
                <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Build Time</span>
                <div className="space-y-4">
                  <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl flex items-center gap-4 cursor-pointer">
                    <div className="w-5 h-5 rounded-full border-2 border-orange-500 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-bold text-orange-900">5-6 Days</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl flex items-center gap-4 cursor-pointer hover:border-gray-200 transition-all">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-200" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-bold text-gray-500">2-3 Days</span>
                        <span className="text-[10px] font-black text-white bg-orange-500 px-2 py-0.5 rounded-full uppercase tracking-widest">Flash Speed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 space-y-4">
                <div className="flex gap-2">
                  <input type="text" placeholder="Apply Coupon" className="flex-1 h-12 px-6 bg-gray-50 border-2 border-gray-100 rounded-xl text-sm font-bold outline-none focus:border-orange-200 transition-all" />
                  <button className="px-6 h-12 text-orange-500 font-black text-xs uppercase tracking-widest">Apply</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
