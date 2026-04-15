'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Upload, CheckCircle, Search, Zap, ShieldCheck, Database, FileSpreadsheet, ArrowRight, Info, ChevronDown, Settings } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Upload Your BOM',
    description: 'Simply drag and drop your Excel or CSV file. Our engine supports all major CAD export formats.',
    icon: <FileSpreadsheet className="w-8 h-8" />
  },
  {
    number: '02',
    title: 'Validate & Match',
    description: 'We instantly match your MPNs with real-time stock from authorized global distributors.',
    icon: <Search className="w-8 h-8" />
  },
  {
    number: '03',
    title: 'Procure & Assemble',
    description: 'Approve the pricing and we handle the procurement, inspection, and assembly automatically.',
    icon: <Zap className="w-8 h-8" />
  }
]

const guidelines = [
  { field: 'Designator', required: 'Yes', description: 'Reference designators (e.g., C1, R1, U1).', example: 'C1, C2, R5' },
  { field: 'Quantity', required: 'Yes', description: 'Total count of the specific part per board.', example: '5' },
  { field: 'MPN', required: 'Recommended', description: 'Manufacturer Part Number for exact matching.', example: 'CC0603KRX7R9BB104' },
  { field: 'Footprint', required: 'Yes', description: 'Package size or landing pattern.', example: '0603, SOIC-8' },
  { field: 'Description', required: 'Optional', description: 'Brief part specs (Value, Voltage, etc.).', example: '100nF, 50V, X7R' },
  { field: 'Manufacturer', required: 'Optional', description: 'Brand name of the component.', example: 'Yageo, TI, Murata' },
]

export default function BOMToolPage() {
  const [isDragging, setIsDragging] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <main className="pb-20">
        {/* Hero Section */}
        <section className="bg-gray-900 pt-32 pb-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full" />
          <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left">
               <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight leading-tight">
                  Intelligent <span className="text-primary italic">BOM</span> Procurement
               </h1>
               <p className="text-xl text-gray-400 font-medium mb-12 max-w-2xl leading-relaxed">
                  Bridge the gap between design and production. Our automated tool synchronizes your part list with thousands of authorized distributors in real-time.
               </p>
               <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <div className="flex items-center gap-2 text-white/60 font-medium"><CheckCircle className="w-5 h-5 text-primary" /> Real-time Pricing</div>
                  <div className="flex items-center gap-2 text-white/60 font-medium"><CheckCircle className="w-5 h-5 text-primary" /> 100% Genuine Parts</div>
                  <div className="flex items-center gap-2 text-white/60 font-medium"><CheckCircle className="w-5 h-5 text-primary" /> Supply Chain Sync</div>
               </div>
            </div>

            {/* Upload Zone */}
            <div className="w-full max-w-xl">
               <div 
                 className={`relative p-10 md:p-16 border-4 border-dashed rounded-[3rem] transition-all duration-300 group ${
                   isDragging ? 'border-primary bg-primary/5 scale-105' : 'border-white/10 bg-white/5 hover:border-white/20'
                 }`}
                 onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                 onDragLeave={() => setIsDragging(false)}
                 onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
               >
                  <div className="absolute -top-6 -left-6 w-20 h-20 bg-primary/20 blur-[40px] rounded-full" />
                  <div className="text-center">
                    <div className="w-24 h-24 bg-primary rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-orange-500/20 group-hover:scale-110 transition-transform">
                       <Upload className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-4">Start Your Procurement</h3>
                    <p className="text-gray-400 font-medium mb-8">Drag & Drop your BOM (Excel, CSV) here</p>
                    <button className="px-10 py-5 bg-white text-gray-900 rounded-2xl font-black text-lg hover:bg-primary hover:text-white transition-all shadow-xl shadow-black/20">
                       Browse Files
                    </button>
                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mt-8">Max file size: 10MB | .xlsx, .xls, .csv</p>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* 3 Step Workflow */}
        <section className="container mx-auto px-6 mt-32 text-center">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">Sourcing Simplified</h2>
            <p className="text-xl text-gray-500 font-medium mb-16 max-w-2xl mx-auto">Three simple steps to move from your spreadsheet to a production-ready assembly line.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {steps.map((step, idx) => (
                 <div key={idx} className="relative p-10 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-500">
                    <span className="absolute top-8 right-8 text-6xl font-black text-gray-50">{step.number}</span>
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 mb-8 relative z-10">
                       {step.icon}
                    </div>
                    <h4 className="text-2xl font-black text-gray-900 mb-4 tracking-tight relative z-10">{step.title}</h4>
                    <p className="text-gray-500 font-medium leading-relaxed relative z-10">{step.description}</p>
                 </div>
               ))}
            </div>
        </section>

        {/* Features Split */}
        <section className="container mx-auto px-6 mt-32">
           <div className="bg-gray-900 rounded-[4rem] p-8 md:p-20 flex flex-col lg:flex-row items-center gap-16 overflow-hidden relative shadow-2xl">
              <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/10 blur-[100px] rounded-full" />
              
              <div className="flex-1">
                 <h2 className="text-4xl md:text-5xl font-black text-white mb-10 tracking-tight leading-tight">Efficient. Accurate. <span className="text-primary italic">Powerful.</span></h2>
                 <div className="space-y-6">
                    {[
                      { t: 'Smart MPN Normalization', d: 'Automatically fixes common part number formatting errors.', i: <Settings className="w-6 h-6" /> },
                      { t: 'Global Inventory Sync', d: 'Direct API integration with Mouser, DigiKey, and Avnet.', i: <Database className="w-6 h-6" /> },
                      { t: 'Lifecycle Risk Analysis', d: 'Detection of EOL (End of Life) and Obsolete components.', i: <ShieldCheck className="w-6 h-6" /> }
                    ].map((f, i) => (
                      <div key={i} className="flex gap-6 group">
                         <div className="w-12 h-12 rounded-xl bg-white/5 flex-shrink-0 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                            {f.i}
                         </div>
                         <div>
                            <h5 className="text-lg font-black text-white mb-1">{f.t}</h5>
                            <p className="text-gray-400 text-sm font-medium">{f.d}</p>
                         </div>
                      </div>
                    ))}
                 </div>
                 <button className="mt-12 px-10 py-5 bg-primary text-white rounded-2xl font-black text-lg hover:bg-orange-600 transition-all shadow-xl shadow-orange-900/20">
                    Learn More About PCBA
                 </button>
              </div>
              
              <div className="flex-1 w-full lg:w-auto">
                 <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
                    <pre className="text-xs text-primary/80 font-mono leading-relaxed">
                      {`{
  "project": "PCB_GLOBE_PRO_V1",
  "status": "ANALYZING_BOM",
  "matched_parts": 154,
  "stock_available": 152,
  "eol_warnings": 2,
  "currency": "INR",
  "est_procurement_time": "24h"
}`}
                    </pre>
                 </div>
              </div>
           </div>
        </section>

        {/* Guidelines Table */}
        <section className="container mx-auto px-6 mt-32">
           <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                 <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">BOM File Guidelines</h2>
                 <p className="text-lg text-gray-500 font-medium">Follow these standard fields to ensure 100% automated matching accuracy.</p>
              </div>
              
              <div className="overflow-hidden border border-gray-100 rounded-[2.5rem] bg-gray-50 shadow-sm">
                 <table className="w-full text-left border-collapse">
                    <thead>
                       <tr className="bg-white">
                          <th className="px-8 py-6 text-sm font-black text-gray-900 uppercase tracking-widest border-b border-gray-100">Field Name</th>
                          <th className="px-8 py-6 text-sm font-black text-gray-900 uppercase tracking-widest border-b border-gray-100">Required</th>
                          <th className="px-8 py-6 text-sm font-black text-gray-900 uppercase tracking-widest border-b border-gray-100">Example</th>
                       </tr>
                    </thead>
                    <tbody className="bg-white">
                       {guidelines.map((g, idx) => (
                         <tr key={idx} className="hover:bg-gray-50 transition-colors">
                            <td className="px-8 py-6 border-b border-gray-50">
                               <p className="font-black text-gray-900">{g.field}</p>
                               <p className="text-xs text-gray-400 font-medium mt-1">{g.description}</p>
                            </td>
                            <td className="px-8 py-6 border-b border-gray-50">
                               <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                                 g.required === 'Yes' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-400'
                               }`}>{g.required}</span>
                            </td>
                            <td className="px-8 py-6 border-b border-gray-50 font-mono text-sm text-gray-500">
                               {g.example}
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
              
              <div className="mt-8 flex items-center justify-between p-6 bg-primary/5 rounded-2xl border border-primary/10">
                 <div className="flex items-center gap-3">
                    <Info className="w-5 h-5 text-primary" />
                    <p className="text-sm font-bold text-gray-700 italic">Not sure about your format? Our tool auto-detects most standard CSV headers.</p>
                 </div>
                 <button className="text-primary font-black text-sm uppercase tracking-widest hover:underline">Download Template</button>
              </div>
           </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-6 mt-32 max-w-4xl">
           <h2 className="text-4xl font-black text-gray-900 mb-12 text-center tracking-tight">Sourcing FAQs</h2>
           <div className="space-y-4">
              {[
                { q: 'Is there a minimum order quantity for components?', a: 'No. Our BOM tool handles single prototypes as efficiently as high-volume production runs. However, some specialized parts may have manufacturer MOQs.' },
                { q: 'How do you handle hard-to-find components?', a: 'Our supply chain team maintains relationships with verified secondary markets to source critical obsolete parts while maintaining strict quality control.' },
                { q: 'Can I provide my own components?', a: 'Yes! We support partial turnkey (you provide critical ICs, we provide passives) or full consigned assembly workflows.' }
              ].map((faq, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-[2rem] p-8 hover:border-primary/20 transition-all cursor-pointer group">
                   <div className="flex items-center justify-between">
                      <h4 className="text-xl font-black text-gray-900 tracking-tight group-hover:text-primary transition-colors">{faq.q}</h4>
                      <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-primary transition-all" />
                   </div>
                   <p className="mt-6 text-gray-500 font-medium leading-relaxed hidden group-hover:block animate-in fade-in slide-in-from-top-2">
                      {faq.a}
                   </p>
                </div>
              ))}
           </div>
        </section>
      </main>
    </div>
  )
}
