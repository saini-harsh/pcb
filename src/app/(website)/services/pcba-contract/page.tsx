'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ShieldCheck, Globe, Zap, Settings, 
  ArrowRight, CheckCircle2, Factory, Package, 
  Search, Cpu, HardDrive, Layout, Truck,
  Users, BarChart3, ClipboardCheck, Award
} from 'lucide-react'

const ContractManufacturingPage = () => {
  const serviceHighlights = [
    {
      title: 'Advanced SMT & THT Lines',
      desc: 'High-speed automated assembly for complex, high-density designs with precision component placement.',
      Icon: Cpu
    },
    {
      title: 'Global Supply Chain Mastery',
      desc: 'Direct relationships with top-tier silicon vendors and specialized material buffering for risk-free production.',
      Icon: Globe
    },
    {
      title: 'Rigorous Quality Compliance',
      desc: 'Maintained ISO 9001:2015 standards and IPC-A-610 Class II/III adherence for every production batch.',
      Icon: ClipboardCheck
    },
    {
      title: 'Scalable Mass Production',
      desc: 'Seamless transition from NPI (New Product Introduction) to high-volume commercial manufacturing.',
      Icon: Factory
    }
  ]

  const stats = [
    { label: 'Projects Delivered', val: '8,000+' },
    { label: 'Annual Throughput', val: '25,000+' },
    { label: 'Industry Expertise', val: '10+ Years' },
    { label: 'Quality Rating', val: '99.9%' }
  ]

  const industries = [
    { name: 'Medical Electronics', desc: 'Compliant with stringent healthcare safety and reliability standards.' },
    { name: 'Defense & Aerospace', desc: 'Ruggedized manufacturing for mission-critical hardware environments.' },
    { name: 'Industrial Automation', desc: 'Heavy-duty PCBA solutions for 24/7 industrial operational cycles.' },
    { name: 'Smart IoT Ecosystems', desc: 'Ultra-compact, low-power hardware optimized for global connectivity.' }
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[600px] lg:h-[700px] flex items-center overflow-hidden py-20 lg:py-0">
        <Image 
          src="https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=2070&auto=format&fit=crop"
          alt="Contract Manufacturing Floor"
          fill
          className="object-cover brightness-[0.2]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full text-primary text-xs font-black uppercase tracking-[0.2em] mb-8">
              <ShieldCheck className="w-4 h-4" /> Strategic Hardware Partnership
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white mb-8 leading-[1.05] tracking-tighter text-shadow-lg">
              High-Reliability <br/>
              <span className="text-primary italic">Contract</span> Manufacturing.
            </h1>
            <p className="text-lg md:text-2xl text-gray-300 font-medium leading-relaxed mb-12 max-w-2xl text-shadow">
              Scale your hardware vision with an industrial partner that understands the complexity of mass-market delivery and zero-defect quality standards.
            </p>
            <div className="flex flex-wrap gap-6">
               <Link href="/contact" className="px-10 py-5 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/20">
                  Discuss Partnership
               </Link>
               <button className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all">
                  View Quality Standards
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-gray-50 border-b border-gray-100">
         <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
               {stats.map((s, i) => (
                 <div key={i} className="text-center group">
                    <p className="text-3xl md:text-5xl font-black text-gray-900 mb-2 tracking-tighter italic group-hover:text-primary transition-colors">
                       {s.val}
                    </p>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{s.label}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Flagship Services */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-6xl font-black text-gray-900 mb-6 tracking-tighter">Manufacturing Without Compromise</h2>
            <p className="text-gray-500 font-bold text-lg leading-relaxed">Our contract manufacturing model is built on transparency, technical authority, and a commitment to long-term scalability for your hardware brand.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceHighlights.map((service, i) => (
              <div key={i} className="group p-12 bg-white rounded-[50px] border border-gray-100 hover:border-primary/20 hover:shadow-2xl transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                <div className="w-16 h-16 bg-gray-50 text-gray-400 group-hover:bg-primary/10 group-hover:text-primary rounded-[20px] flex items-center justify-center mb-10 transition-all">
                   <service.Icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-6 tracking-tight italic">{service.title}</h3>
                <p className="text-gray-500 font-bold leading-relaxed text-lg">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Slider/Grid */}
      <section className="py-24 bg-gray-900 text-white overflow-hidden">
         <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-20 items-end mb-24">
               <div className="flex-1">
                  <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 leading-[1.1]">Sector-Specific <br/> Expertise.</h2>
                  <p className="text-xl text-gray-400 font-bold leading-relaxed italic">Different industries require different reliability benchmarks. We specialize in sectors where failure is not an option.</p>
               </div>
               <div className="flex-1 lg:pb-4 flex flex-wrap gap-4 justify-end">
                  <Link href="/portfolio" className="px-8 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary-dark transition-all">
                     View Case Studies
                  </Link>
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {industries.map((ind, i) => (
                 <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-[40px] hover:bg-white/10 hover:border-primary/30 transition-all group">
                    <h4 className="text-xl font-black text-white mb-4 italic group-hover:text-primary transition-colors">{ind.name}</h4>
                    <p className="text-sm font-bold text-gray-500 leading-relaxed">{ind.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Compliance Section */}
      <section className="py-32 container mx-auto px-6">
         <div className="bg-gray-50 rounded-[60px] p-12 lg:p-24 flex flex-col lg:flex-row gap-20 items-center">
            <div className="flex-1 space-y-10">
               <h2 className="text-3xl md:text-6xl font-black text-gray-900 tracking-tighter">Global Compliance & Quality Assurance</h2>
               <p className="text-lg text-gray-500 font-bold leading-relaxed">Our facilities are audited for international compliance, ensuring your hardware meets the necessary standards for global market entry from day one.</p>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="flex gap-4 items-start group">
                     <div className="w-12 h-12 rounded-xl bg-white text-primary flex items-center justify-center shadow-sm flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                        <Award className="w-6 h-6" />
                     </div>
                     <div>
                        <h4 className="text-lg font-black text-gray-900 mb-2 italic">ISO 9001:2015</h4>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Quality Mgmt Systems</p>
                     </div>
                  </div>
                  <div className="flex gap-4 items-start group">
                     <div className="w-12 h-12 rounded-xl bg-white text-primary flex items-center justify-center shadow-sm flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                        <ShieldCheck className="w-6 h-6" />
                     </div>
                     <div>
                        <h4 className="text-lg font-black text-gray-900 mb-2 italic">UL Certified</h4>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Safety Standards</p>
                     </div>
                  </div>
               </div>
            </div>
            <div className="flex-1 relative w-full aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl skew-y-3 lg:skew-y-0 lg:rotate-3">
               <Image 
                 src="https://images.unsplash.com/photo-1591405351990-4726e33df48b?q=80&w=2070&auto=format&fit=crop"
                 alt="High-Precision Quality Inspection"
                 fill
                 unoptimized
                 className="object-cover"
               />
               <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <p className="text-white font-black text-xl tracking-widest uppercase italic">Verified Quality</p>
               </div>
            </div>
         </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 container mx-auto px-6">
         <div className="relative rounded-[70px] bg-primary p-12 md:p-24 overflow-hidden shadow-2xl shadow-primary/40">
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
               <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-16">
               <div className="max-w-xl">
                  <h2 className="text-4xl md:text-7xl font-black text-white mb-8 leading-[1] tracking-tighter text-shadow-lg">Scale Your Vision <br/> with Confidence.</h2>
                  <p className="text-xl text-primary-dark font-black opacity-80 italic">Let's build a reliable supply chain for your next mass-market hardware launch.</p>
               </div>
               <div className="flex flex-col gap-5 w-full md:w-auto">
                  <Link href="/contact" className="px-12 py-6 bg-gray-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-110 transition-all text-center">
                     Request Factory Audit
                  </Link>
                  <button className="px-12 py-6 bg-white/30 backdrop-blur-xl text-white border border-white/40 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/40 transition-all">
                     Download CM Guide
                  </button>
               </div>
            </div>
         </div>
      </section>

      {/* Logistics Banner */}
      <section className="py-10 bg-white border-t border-gray-100">
         <div className="container mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
               <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-900">Global Production Standards:</span>
               <p className="text-sm font-black tracking-tighter italic whitespace-nowrap">RoHS Compliant</p>
               <p className="text-sm font-black tracking-tighter italic whitespace-nowrap">REACH Compliant</p>
               <p className="text-sm font-black tracking-tighter italic whitespace-nowrap">Conflict-Free Materials</p>
               <p className="text-sm font-black tracking-tighter italic whitespace-nowrap">DDP Global Shipping</p>
            </div>
         </div>
      </section>
    </main>
  )
}

export default ContractManufacturingPage
