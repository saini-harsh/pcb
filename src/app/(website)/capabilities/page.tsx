'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings, Check, Zap, Cpu, Layers, ShieldCheck, Ruler, Clock, LayoutGrid, Database, ChevronRight } from 'lucide-react'

const specTiers = [
  { id: 'standard', name: 'Standard Fabrication', desc: 'Optimized for cost-effective rapid prototyping.' },
  { id: 'advanced', name: 'High-Precision (Advanced)', desc: 'Engineered for dense, high-frequency, and multi-layer designs.' }
]

const fabSpecs = [
  { label: 'Layer Count', standard: '1 - 8 Layers', advanced: 'Up to 32 Layers' },
  { label: 'Base Materials', standard: 'FR-4 (Standard TG)', advanced: 'FR-4 (High TG), Rogers, Aluminum, PI' },
  { label: 'Material Thickness', standard: '0.4mm - 2.0mm', advanced: '0.2mm - 3.2mm' },
  { label: 'Copper Weight', standard: '1 oz / 2 oz', advanced: '0.5 oz - 6 oz' },
  { label: 'Min. Trace / Space', standard: '5 / 5 mils', advanced: '3.5 / 3.5 mils' },
  { label: 'Min. Hole Size', standard: '0.25mm', advanced: '0.15mm' },
  { label: 'Surface Finish', standard: 'HASL (Lead-Free)', advanced: 'ENIG, Gold Finger, OSP, ENEPIG' },
  { label: 'Solder Mask Color', standard: 'Green, White, Black', advanced: 'Green, Red, Blue, Yellow, Custom' },
  { label: 'Min. Solder Mask Dam', standard: '4 mils', advanced: '3 mils' },
  { label: 'Impedance Control', standard: '± 10%', advanced: '± 5%' }
]

const assemblySpecs = [
  { label: 'Min. Component Size', value: '0201 (0.6mm x 0.3mm)' },
  { label: 'Min. Pitch (BGA)', value: '0.35mm' },
  { label: 'Board Sizes', value: '50mm x 50mm to 400mm x 500mm' },
  { label: 'Placement Accuracy', value: '± 0.05mm' },
  { label: 'Inspection Types', value: 'AOI, X-Ray (BGA), Visual' }
]

export default function CapabilitiesPage() {
  const [activeTier, setActiveTier] = useState('standard')

  return (
    <div className="min-h-screen bg-white">
      <main className="pb-20">
        {/* Hero Section */}
        <section className="bg-gray-900 pt-32 pb-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1591405351990-4726e33df58d?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10" />
          <div className="container mx-auto px-6 relative z-10 text-center">
             <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">
                Industrial <span className="text-primary italic">Limits</span> & Precision
             </h1>
             <p className="text-xl text-gray-400 font-medium mb-12 max-w-2xl mx-auto">
                Discover the technical boundaries of our state-of-the-art manufacturing facility. From rapid prototypes to high-density medical and aerospace designs.
             </p>
          </div>
        </section>

        {/* Tier Switcher & Main Comparison */}
        <section className="container mx-auto px-6 -mt-16 relative z-20">
           <div className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden">
              {/* Tab Header */}
              <div className="flex flex-col md:flex-row border-b border-gray-100 bg-gray-50/50">
                 {specTiers.map(tier => (
                   <button
                     key={tier.id}
                     onClick={() => setActiveTier(tier.id)}
                     className={`flex-1 p-8 text-left transition-all relative ${
                       activeTier === tier.id ? 'bg-white' : 'hover:bg-gray-100/50'
                     }`}
                   >
                      <div className="flex items-center justify-between mb-2">
                         <span className={`text-xs font-black uppercase tracking-widest ${
                           activeTier === tier.id ? 'text-primary' : 'text-gray-400'
                         }`}>{tier.name}</span>
                         {activeTier === tier.id && <div className="w-2 h-2 rounded-full bg-primary" />}
                      </div>
                      <p className={`text-lg font-black tracking-tight ${
                        activeTier === tier.id ? 'text-gray-900' : 'text-gray-400'
                      }`}>{tier.desc}</p>
                      {activeTier === tier.id && <div className="absolute bottom-0 left-0 w-full h-1 bg-primary" />}
                   </button>
                 ))}
              </div>

              {/* Table Body */}
              <div className="p-8 md:p-12 overflow-x-auto">
                 <table className="w-full text-left min-w-[600px]">
                    <thead>
                      <tr className="text-gray-400 text-xs font-black uppercase tracking-widest border-b border-gray-100">
                         <th className="pb-6">Parameter</th>
                         <th className="pb-6">Capability Limit</th>
                         <th className="pb-6 text-right">Verification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                       {fabSpecs.map((spec, idx) => (
                         <tr key={idx} className="group hover:bg-gray-50/50 transition-colors">
                            <td className="py-6 pr-8 font-black text-gray-900 flex items-center gap-3">
                               <div className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-primary transition-colors" />
                               {spec.label}
                            </td>
                            <td className="py-6 font-bold text-lg text-gray-700">
                               <AnimatePresence mode="wait">
                                 <motion.span
                                   key={activeTier}
                                   initial={{ opacity: 0, x: 5 }}
                                   animate={{ opacity: 1, x: 0 }}
                                   exit={{ opacity: 0, x: -5 }}
                                 >
                                    {activeTier === 'standard' ? spec.standard : spec.advanced}
                                 </motion.span>
                               </AnimatePresence>
                            </td>
                            <td className="py-6 text-right">
                               <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-tighter">CAM Verified</span>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </section>

        {/* Feature Grid */}
        <section className="container mx-auto px-6 mt-32">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              
              {/* Assembly Box */}
              <div className="bg-gray-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full" />
                 <Cpu className="w-12 h-12 text-primary mb-8" />
                 <h3 className="text-3xl font-black mb-6 tracking-tight">PCBA Capabilities</h3>
                 <div className="space-y-4">
                    {assemblySpecs.map((s, i) => (
                      <div key={i} className="flex flex-col border-b border-white/5 pb-4 group-hover:border-primary/20 transition-colors">
                         <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">{s.label}</span>
                         <span className="font-bold text-lg">{s.value}</span>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Material Science */}
              <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-xl flex flex-col justify-between">
                 <div>
                    <Layers className="w-12 h-12 text-primary mb-8" />
                    <h3 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">Material Diversity</h3>
                    <p className="text-gray-500 font-medium mb-8">We maintain high-TG and specialized substrates in permanent inventory for mission-critical engineering.</p>
                    <ul className="space-y-3">
                       {['Rogers RO4003C / RO4350B', 'Isola High-Speed Laminates', 'Thermal Clad Aluminum core', 'Polyimide (Flexible PCBs)'].map(m => (
                         <li key={m} className="flex items-center gap-3 font-bold text-gray-700">
                            <Check className="w-5 h-5 text-green-500" /> {m}
                         </li>
                       ))}
                    </ul>
                 </div>
                 <button className="mt-12 group flex items-center gap-2 text-primary font-black uppercase tracking-widest hover:translate-x-2 transition-transform">
                    View Material Specs <ChevronRight className="w-5 h-5" />
                 </button>
              </div>

              {/* Quality & Certs */}
              <div className="bg-primary rounded-[3rem] p-10 text-white shadow-2xl shadow-orange-900/20">
                 <ShieldCheck className="w-12 h-12 text-white mb-8" />
                 <h3 className="text-3xl font-black mb-6 tracking-tight">Industrial Standards</h3>
                 <p className="text-white/80 font-medium mb-12">Operating under strict IPC Class 2 & 3 standards to ensure consistent quality for medical and defense applications.</p>
                 <div className="grid grid-cols-2 gap-4">
                    {['ISO 9001:2015', 'IPC-A-600', 'IPC-A-610', 'RoHS / REACH'].map(c => (
                      <div key={c} className="px-4 py-3 bg-white/10 rounded-2xl text-center font-black text-sm border border-white/10">{c}</div>
                    ))}
                 </div>
              </div>

           </div>
        </section>

        {/* Turnaround Matrix */}
        <section className="container mx-auto px-6 mt-32 max-w-5xl">
           <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Production Lead Times</h2>
              <p className="text-lg text-gray-500 font-medium italic">Measured in business days from final CAM approval.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { t: 'Rapid Prototype', val: '24 Hours', c: 'bg-primary text-white' },
                { t: 'Standard Build', val: '3-5 Days', c: 'bg-gray-50 text-gray-900' },
                { t: 'Multi-layer (8+)', val: '7-10 Days', c: 'bg-gray-50 text-gray-900' },
                { t: 'Volume Production', val: '14+ Days', c: 'bg-gray-900 text-white' }
              ].map((m, i) => (
                <div key={i} className={`p-8 rounded-[2rem] text-center shadow-lg transition-transform hover:scale-105 ${m.c}`}>
                   <p className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-60">{m.t}</p>
                   <p className="text-2xl font-black">{m.val}</p>
                </div>
              ))}
           </div>
        </section>
      </main>
    </div>
  )
}
