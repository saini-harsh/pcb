'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  CheckCircle2, Zap, ShieldCheck, Globe, 
  ArrowRight, Factory, Package, Search, 
  Info, LayoutGrid, MousePointer2, Truck,
  Smartphone, Rocket, Heart
} from 'lucide-react'

const MIIServicePage = () => {
  const specs = [
    { label: 'Maximum Layers', val: '1 - 2 Layers' },
    { label: 'Material Type', val: 'FR-4 Standard' },
    { label: 'Board Thickness', val: '1.6mm' },
    { label: 'Copper Weight', val: '1 oz (35μm)' },
    { label: 'Surface Finish', val: 'HASL / Lead-Free HASL' },
    { label: 'Solder Mask', val: 'Green (Standard) / Multi-color' },
    { label: 'Silkscreen', val: 'White / Black' },
    { label: 'Min Trace/Width', val: '6/6 mil' },
    { label: 'Min Hole Size', val: '0.3mm' },
    { label: 'Lead Time', val: '5 - 8 Business Days' }
  ]

  const benefits = [
    {
      title: 'Vocal for Local',
      desc: 'Support domestic manufacturing and strengthen the regional electronics ecosystem.',
      Icon: Heart
    },
    {
      title: 'Economic Prototype',
      desc: 'Exclusive ₹799 offer for 5 boards, designed specifically for students and startups.',
      Icon: Zap
    },
    {
      title: 'Zero Import Duties',
      desc: 'Bypass complex customs and heavy import taxes with locally shipped hardware.',
      Icon: ShieldCheck
    },
    {
      title: 'Regional Support',
      desc: 'Direct access to local engineering support in your timezone and language.',
      Icon: Globe
    }
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[600px] lg:h-[650px] flex items-center overflow-hidden py-20 lg:py-0">
        <Image 
          src="https://images.unsplash.com/photo-1591405351990-4726e33df48b?q=80&w=2070&auto=format&fit=crop"
          alt="Make in India PCB Manufacturing"
          fill
          className="object-cover brightness-[0.2]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-transparent to-green-500/20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full text-primary text-xs font-black uppercase tracking-[0.2em] mb-8">
              <Rocket className="w-3 h-3" /> Empowering Indian Innovation
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tighter">
              Premium <span className="text-primary italic">Make in India</span> <br/>
              PCB Fabrication.
            </h1>
            <p className="text-xl text-gray-300 font-medium leading-relaxed mb-10 max-w-xl">
              Get 5 Boards for just <span className="text-white font-black">₹799</span>. High-quality domestic manufacturing with 5-8 day delivery to your doorstep.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="px-8 py-4 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                Order Now - ₹799
              </Link>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all">
                View MII Guidelines
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications Table */}
      <section className="py-24 bg-gray-50/50">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tighter">Technical Specifications under MII</h2>
            <p className="text-gray-500 font-bold max-w-2xl mx-auto italic">Optimized parameters for cost-effective domestic prototyping and small-batch production.</p>
          </div>

          <div className="bg-white rounded-[40px] border border-gray-100 overflow-hidden shadow-xl">
             <div className="grid grid-cols-1 md:grid-cols-2">
                {specs.map((spec, i) => (
                  <div key={i} className={`flex items-center justify-between p-8 border-gray-50 ${i % 2 === 0 ? 'bg-gray-50/30' : 'bg-white'} ${i < specs.length - 2 ? 'border-b md:border-b-0' : ''} ${i % 2 === 0 ? 'md:border-r' : ''} ${i < specs.length - 2 ? 'md:border-b' : ''}`}>
                     <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{spec.label}</span>
                     <span className="text-lg font-black text-gray-900 italic tracking-tight">{spec.val}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* Why Choose MII */}
      <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
         <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-[120px] -ml-40 -mt-40" />
         </div>
         
         <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
               <h2 className="text-3xl md:text-6xl font-black mb-6 tracking-tighter italic">Why Choose MII Service?</h2>
               <p className="text-gray-400 font-bold max-w-2xl mx-auto uppercase text-xs tracking-[0.3em]">Building a Strategic Hardware Advantage</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {benefits.map((benefit, i) => (
                 <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-[40px] hover:bg-white/10 hover:border-primary/20 transition-all group">
                    <div className="w-14 h-14 bg-white/5 text-primary rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all">
                       <benefit.Icon className="w-7 h-7" />
                    </div>
                    <h4 className="text-xl font-black mb-4 tracking-tighter italic">{benefit.title}</h4>
                    <p className="text-sm font-bold text-gray-500 leading-relaxed">{benefit.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 3 Steps Ordering */}
      <section className="py-24">
         <div className="container mx-auto px-6 max-w-6xl">
            <div className="flex flex-col lg:flex-row items-center gap-20">
               <div className="flex-1">
                  <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 tracking-tighter">Get Started in <br/> 3 Easy Steps</h2>
                  <div className="space-y-10">
                     {[
                       { t: 'Upload Gerber Data', d: 'Securely upload your board design in standard RS-274X format.' },
                       { t: 'Pre-Production QC', d: 'Our engineers perform a free DFM check to ensure manufacturability.' },
                       { t: 'Express Delivery', d: 'Local manufacturing ensures 5-8 day lead times directly to your desk.' }
                     ].map((step, i) => (
                       <div key={i} className="flex gap-6 items-start group">
                          <div className="w-12 h-12 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center font-black italic text-xl group-hover:bg-primary/10 group-hover:text-primary transition-all flex-shrink-0">
                             0{i+1}
                          </div>
                          <div>
                             <h4 className="text-xl font-black text-gray-900 mb-2">{step.t}</h4>
                             <p className="text-sm font-bold text-gray-500 leading-relaxed">{step.d}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
               <div className="flex-1 relative w-full aspect-square rounded-[60px] overflow-hidden shadow-2xl border border-gray-100">
                  <Image 
                    src="https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=2070&auto=format&fit=crop"
                    alt="PCB Stacking"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-10 right-10 px-6 py-3 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl rotate-12">
                     ₹799 Only
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 container mx-auto px-6">
         <div className="relative rounded-[70px] bg-primary p-12 md:p-24 overflow-hidden text-center shadow-2xl shadow-primary/30">
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20">
               <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-[100px] -mr-48 -mt-48" />
            </div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
               <h2 className="text-4xl md:text-7xl font-black text-white mb-8 leading-[1] tracking-tighter text-shadow-lg">Regional Tech <br/> Starts Here.</h2>
               <p className="text-xl text-primary-dark font-black mb-12 italic opacity-80">Support the Make in India initiative with reliable, high-speed PCB fabrication.</p>
               <div className="flex flex-wrap justify-center gap-6">
                  <Link href="/contact" className="px-12 py-6 bg-gray-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all">
                     Order Your First Batch
                  </Link>
                  <button className="px-12 py-6 bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/30 transition-all">
                     Download Design Guide
                  </button>
               </div>
            </div>
         </div>
      </section>

      {/* Logistics Banner */}
      <section className="py-10 bg-gray-50 border-y border-gray-100 overflow-hidden">
         <div className="container mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
               <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-900">National Priority Partners:</span>
               <p className="text-sm font-black tracking-tighter flex items-center gap-2 italic"><Truck className="w-4 h-4"/> BlueDart Express</p>
               <p className="text-sm font-black tracking-tighter flex items-center gap-2 italic"><Truck className="w-4 h-4"/> Delhivery Supply</p>
               <p className="text-sm font-black tracking-tighter flex items-center gap-2 italic"><Truck className="w-4 h-4"/> DTDC Strategic</p>
            </div>
         </div>
      </section>
    </main>
  )
}

export default MIIServicePage
