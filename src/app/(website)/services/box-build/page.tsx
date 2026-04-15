'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Box, Settings, Zap, ShieldCheck, 
  ArrowRight, CheckCircle2, Factory, Package, 
  Search, Cpu, HardDrive, Layout, Truck,
  Activity, Wrench, FileSearch
} from 'lucide-react'

const BoxBuildPage = () => {
  const steps = [
    {
      title: 'Electromechanical Assembly',
      desc: 'Precision integration of PCBs into custom enclosures with calibrated torque control.',
      Icon: Box
    },
    {
      title: 'Cable & Wire Harnessing',
      desc: 'Complex internal wiring, point-to-point connections, and professional cable management.',
      Icon: Activity
    },
    {
      title: 'Software & Firmware',
      desc: 'Automated flashing of firmware, OS installation, and initial boot-up verification.',
      Icon: HardDrive
    },
    {
      title: 'Functional Burn-in',
      desc: 'Extended stress testing and functional validation to ensure long-term field reliability.',
      Icon: Zap
    },
    {
      title: 'Potting & Coating',
      desc: 'Specialized encapsulation services for environmental protection and ruggedization.',
      Icon: Wrench
    },
    {
      title: 'Custom Packaging',
      desc: 'Retail-ready or industrial-grade packaging with custom labeling and documentation.',
      Icon: Package
    }
  ]

  const capabilities = [
    { label: 'Units Per Month', content: 'Up to 20,000 units' },
    { label: 'Integration Type', content: 'Full-System / Sub-Assembly' },
    { label: 'Testing Protocols', content: 'FCT, Burn-in, ICT, Safety Testing' },
    { label: 'Certifications', content: 'ISO 9001, UL, CE Compliance support' },
    { label: 'Traceability', content: 'Component-level barcode tracking' },
    { label: 'Fulfillment', content: 'Direct-to-customer global shipping' }
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[600px] lg:h-[700px] flex items-center overflow-hidden py-20 lg:py-0">
        <Image 
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
          alt="Box Build Assembly"
          fill
          className="object-cover brightness-[0.2]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        
        <div className="container mx-auto px-6 relative z-10 text-center md:text-left">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full text-primary text-xs font-black uppercase tracking-[0.2em] mb-8">
              <Factory className="w-3.5 h-3.5" /> Scalable Manufacturing Integration
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white mb-8 leading-[1.05] tracking-tighter">
              Turnkey <span className="text-primary italic">Box Build</span> <br/> 
              Systems Integration.
            </h1>
            <p className="text-lg md:text-2xl text-gray-300 font-medium leading-relaxed mb-12 max-w-2xl">
              From PCB assembly to final retail-ready product. We handle the complexity of electromechanical integration so you can focus on innovation.
            </p>
            <div className="flex flex-wrap gap-6 justify-center md:justify-start">
              <Link href="/contact" className="px-10 py-5 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary-dark transition-all shadow-xl shadow-primary/20">
                Start My Project
              </Link>
              <button className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all">
                Download Capability Deck
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Large Scale Manufacturing Section */}
      <section className="py-24 bg-gray-50/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-center mb-24">
             <div className="flex-1 relative w-full aspect-square rounded-[50px] overflow-hidden shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1565034946487-0d71f5696c0c?q=80&w=2070&auto=format&fit=crop"
                  alt="Manufacturing Line"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
             </div>
             <div className="flex-1 space-y-8 text-center lg:text-left">
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">Large Scale Manufacturing & Fulfillment</h2>
                <p className="text-lg text-gray-500 font-bold leading-relaxed">Our facility is engineered for high-volume throughput, providing a seamless transition from prototype sub-assemblies to full-scale commercial system integration.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                   {[
                     'Full System Testing', 
                     'Hardware Serialization', 
                     'Custom Label Printing', 
                     'Inventory Management',
                     'Drop-shipping Services',
                     'End-to-End Traceability'
                   ].map(item => (
                     <div key={item} className="flex items-center gap-3 p-4 bg-white rounded-2xl text-sm font-black text-gray-700 border border-gray-100 italic">
                        <CheckCircle2 className="w-5 h-5 text-primary" /> {item}
                     </div>
                   ))}
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="group p-10 bg-white rounded-[40px] border border-gray-100 hover:border-primary/20 hover:shadow-2xl transition-all">
                <div className="w-16 h-16 bg-gray-50 text-gray-400 group-hover:bg-primary/10 group-hover:text-primary rounded-2xl flex items-center justify-center mb-10 transition-all">
                   <step.Icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-6 tracking-tight">{step.title}</h3>
                <p className="text-gray-500 font-bold leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
         <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />
         </div>
         
         <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
               <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter">Engineered for Reliability</h2>
               <p className="text-gray-400 font-bold italic">Scale your hardware delivery with a partner that values precision as much as you do.</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
               {[
                 { label: 'Quality', val: 'IPC-A-610 Compliant' },
                 { label: 'Scalability', val: '20,000+ Units/Month' },
                 { label: 'Reliability', val: 'Burn-in Tested' },
                 { label: 'Traceability', val: 'Unit-Level Logging' }
               ].map((item, i) => (
                 <div key={i} className="text-center group">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4 group-hover:translate-y-[-4px] transition-transform">{item.label}</p>
                    <p className="text-xl md:text-2xl font-black text-white italic tracking-tighter">{item.val}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Advanced Capabilities List */}
      <section className="py-24 container mx-auto px-6">
         <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
            <div className="max-w-2xl">
               <h2 className="text-4xl font-black text-gray-900 mb-6 tracking-tighter">Technical Integration Matrix</h2>
               <p className="text-gray-500 font-bold leading-relaxed italic">Comprehensive electromechanical capabilities mapped to your production requirements.</p>
            </div>
            <Link href="/contact" className="flex items-center gap-3 px-8 py-4 bg-gray-50 text-gray-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all border border-gray-100">
               <FileSearch className="w-4 h-4" /> Custom Test Plan Query
            </Link>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {capabilities.map((cap, i) => (
               <div key={i} className="group p-8 border-b-2 border-gray-50 hover:border-primary transition-all">
                  <div className="w-12 h-12 mb-6 bg-gray-50 text-gray-300 group-hover:bg-primary/5 group-hover:text-primary rounded-xl flex items-center justify-center transition-all">
                     <Settings className="w-6 h-6" />
                  </div>
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">{cap.label}</h4>
                  <p className="text-lg font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors">{cap.content}</p>
               </div>
            ))}
         </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 container mx-auto px-6">
         <div className="relative rounded-[60px] bg-gray-900 p-12 md:p-24 overflow-hidden text-center shadow-2xl border border-white/5">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -ml-48 -mb-48" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
               <h2 className="text-4xl md:text-7xl font-black text-white mb-8 leading-[1.05] tracking-tighter">Ready for <span className="text-primary italic">Full-Scale</span> Production?</h2>
               <p className="text-xl text-gray-400 font-bold mb-12 italic">From enclosure mounting to global logistics — let PCB GLOBE handle your turnkey electromechanical supply chain.</p>
               <div className="flex flex-wrap justify-center gap-6">
                  <Link href="/contact" className="px-12 py-6 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/20">
                     Schedule Factory Call
                  </Link>
                  <Link href="/quote" className="px-12 py-6 bg-white/10 text-white border border-white/20 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all">
                     Request Quotation
                  </Link>
               </div>
            </div>
         </div>
      </section>

      {/* Logistics Banner */}
      <section className="py-8 bg-gray-50 border-y border-gray-100">
         <div className="container mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-12 grayscale opacity-40">
               <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-900">End-to-End Fulfillment:</span>
               <p className="text-sm font-black tracking-tighter flex items-center gap-2"><Truck className="w-4 h-4"/> Global DDP Shipping</p>
               <p className="text-sm font-black tracking-tighter flex items-center gap-2"><Box className="w-4 h-4"/> Managed Inventory</p>
               <p className="text-sm font-black tracking-tighter flex items-center gap-2"><ShieldCheck className="w-4 h-4"/> ISO 9001 Facility</p>
            </div>
         </div>
      </section>
    </main>
  )
}

export default BoxBuildPage
