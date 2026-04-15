'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Zap, ShieldCheck, Clock, CheckCircle2, 
  Layers, Ruler, Cpu, Box, Settings, 
  ArrowRight, Download, Share2, Globe, Microscope, Factory 
} from 'lucide-react'

const FabricationPage = () => {
  const tiers = [
    {
      name: 'Rapid Prototype',
      desc: 'Small batch fabrication for rapid iteration and testing.',
      turnaround: '24-48 Hours',
      features: ['1-2 Layers only', 'Green Mask / White Silk', 'Standard FR4 Material', 'Standard Lead-free Finish'],
      price: 'Low Volume',
      color: 'bg-blue-50 text-blue-600 border-blue-100'
    },
    {
      name: 'Standard Production',
      desc: 'Commercial grade manufacturing for industrial applications.',
      turnaround: '5-7 Days',
      features: ['Up to 12 Layers', 'Custom Mask Colors', 'Multiple Material Thickness', 'Gold / Silver Finishes'],
      price: 'High Consistency',
      color: 'bg-primary/5 text-primary border-primary/20',
      popular: true
    },
    {
      name: 'Elite Advanced',
      desc: 'High-density interconnects and specialized materials.',
      turnaround: 'Custom Schedule',
      features: ['Up to 32 Layers', 'Blind & Buried Vias', 'High-TG / Rogers / Polyimide', 'Controlled Impedance'],
      price: 'Military Grade',
      color: 'bg-gray-900 text-white border-gray-800'
    }
  ]

  const specs = [
    { label: 'Layer Count', proto: '1-2 Layers', standard: '1-12 Layers', elite: 'Up to 32 Layers' },
    { label: 'Min Trace/Space', proto: '6/6 mil', standard: '4/4 mil', elite: '2.5/2.5 mil' },
    { label: 'Min Hole Size', proto: '0.3mm', standard: '0.2mm', elite: '0.1mm (Laser)' },
    { label: 'Materials', proto: 'FR4 Standard', standard: 'FR4, Aluminum', elite: 'Rogers, Polyimide, PTFE' },
    { label: 'Board Thickness', proto: '1.6mm', standard: '0.4mm - 2.4mm', elite: '0.2mm - 6.0mm' },
    { label: 'Copper Weight', proto: '1oz', standard: '1-3oz', elite: 'Up to 12oz' },
    { label: 'Surface Finish', proto: 'HASL', standard: 'HASL, ENIG, OSP', elite: 'Hard Gold, ENEPIG, Silver' }
  ]

  const tools = [
    { name: 'Altium Designer', logo: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=100&h=100&auto=format&fit=crop' },
    { name: 'KiCAD', logo: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=100&h=100&auto=format&fit=crop' },
    { name: 'Eagle PCB', logo: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=100&h=100&auto=format&fit=crop' },
    { name: 'Cadence Allegro', logo: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=100&h=100&auto=format&fit=crop' },
    { name: 'OrCAD', logo: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=100&h=100&auto=format&fit=crop' }
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[600px] lg:h-[600px] flex items-center overflow-hidden py-20 lg:py-0">
        <Image 
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
          alt="PCB Fabrication"
          fill
          className="object-cover brightness-[0.2]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full text-primary text-xs font-black uppercase tracking-[0.2em] mb-6">
              <Factory className="w-3 h-3" /> Industrial Scale Manufacturing
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tighter">
              Precision <span className="text-primary italic">PCB Fabrication</span> <br/> 
              at Global Scale.
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-medium leading-relaxed mb-8 max-w-xl">
              From rapid prototypes to high-yield industrial production, we deliver aerospace-grade PCB fabrication quality with cloud-monitored reliability.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/quote" className="px-8 py-4 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                Start Instant Quote
              </Link>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all">
                Download Specs Guide
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tiers Section */}
      <section className="py-24 bg-gray-50/50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tighter">Choose Your Service Level</h2>
            <p className="text-gray-500 font-bold">Technically optimized workflows tailored to your project phase and volume requirements.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <div key={tier.name} className={`relative p-8 rounded-3xl border-2 transition-all hover:shadow-2xl hover:-translate-y-2 ${tier.color}`}>
                {tier.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-md">
                    Most Popular
                  </span>
                )}
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">{tier.name}</h3>
                <p className="text-sm font-bold opacity-80 mb-8 leading-relaxed">{tier.desc}</p>
                
                <div className="flex items-center gap-3 mb-8 pb-8 border-b border-current/10">
                   <Clock className="w-5 h-5" />
                   <span className="text-lg font-black">{tier.turnaround}</span>
                </div>

                <ul className="space-y-4 mb-10">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm font-bold">
                       <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>

                <div className="text-center">
                  <p className="text-xs font-black uppercase tracking-widest opacity-60 mb-2">{tier.price}</p>
                  <Link href="/quote" className={`block w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all ${tier.name.includes('Elite') ? 'bg-primary text-white' : 'bg-white border text-gray-900 border-gray-200 hover:border-primary'}`}>
                    Select Category
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-24 border-y border-gray-100">
        <div className="container mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { Icon: ShieldCheck, t: 'Quality Guaranteed', d: 'ISO 9001:2015 certified manufacturing with 100% E-test on every board.' },
                { Icon: Layers, t: 'Advanced Stackups', d: 'Custom multilayer configurations up to 32 layers with controlled impedance.' },
                { Icon: Zap, t: 'Rapid Delivery', d: 'Express 24-hour turnaround available for time-sensitive prototyping needs.' },
                { Icon: Microscope, t: 'DFM Inspection', d: 'Professional engineering review of every Gerber file before fabrication starts.' }
              ].map((item, i) => (
                <div key={i} className="group">
                   <div className="w-14 h-14 bg-gray-50 text-gray-400 group-hover:bg-primary/10 group-hover:text-primary rounded-2xl flex items-center justify-center mb-6 transition-all">
                      <item.Icon className="w-7 h-7" />
                   </div>
                   <h4 className="text-lg font-black text-gray-900 mb-3">{item.t}</h4>
                   <p className="text-sm font-bold text-gray-500 leading-relaxed">{item.d}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Specs Table */}
      <section className="py-24 bg-white overflow-x-auto">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div className="max-w-xl">
               <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tighter">Manufacturing Limits at a Glance</h2>
               <p className="text-sm font-bold text-gray-500">Compare our standard and high-performance capabilities side-by-side.</p>
            </div>
            <button className="flex items-center gap-2 text-primary font-black text-sm uppercase tracking-widest hover:underline">
               <Download className="w-4 h-4" /> Comprehensive PDF Specs
            </button>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-6 px-8 text-xs font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Property</th>
                <th className="text-left py-6 px-8 text-xs font-black text-primary uppercase tracking-widest border-b border-gray-100 bg-primary/5">Prototype</th>
                <th className="text-left py-6 px-8 text-xs font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Standard</th>
                <th className="text-left py-6 px-8 text-xs font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Advanced Elite</th>
              </tr>
            </thead>
            <tbody>
              {specs.map((spec, i) => (
                <tr key={i} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="py-6 px-8 text-sm font-black text-gray-900 border-b border-gray-50">{spec.label}</td>
                  <td className="py-6 px-8 text-sm font-bold text-primary border-b border-gray-50 bg-primary/5">{spec.proto}</td>
                  <td className="py-6 px-8 text-sm font-bold text-gray-600 border-b border-gray-50 uppercase tracking-tight">{spec.standard}</td>
                  <td className="py-6 px-8 text-sm font-bold text-gray-400 border-b border-gray-50 uppercase tracking-tight italic">{spec.elite}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Design Tools */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-6">
           <div className="text-center mb-16">
              <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tighter">Design for Excellence (DFX) Support</h2>
              <p className="text-sm font-bold text-gray-500">We support native and exported files from all major industrial EDA tools.</p>
           </div>
           <div className="flex flex-wrap justify-center gap-12">
              {tools.map(tool => (
                <div key={tool.name} className="flex flex-col items-center gap-4 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-default scale-90 hover:scale-100">
                   <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-white flex items-center justify-center overflow-hidden">
                      <Zap className="w-8 h-8 text-gray-300" />
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-[0.2em]">{tool.name}</span>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 container mx-auto px-6">
         <div className="relative rounded-[40px] bg-gray-900 p-12 md:p-24 overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -ml-48 -mb-48" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
               <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight tracking-tighter">Ready to Fabricate Your Vision?</h2>
               <p className="text-lg text-gray-400 font-bold mb-12">Upload your Gerber files and get an instant quote in less than 60 seconds.</p>
               <div className="flex flex-wrap justify-center gap-6">
                  <Link href="/quote" className="px-10 py-5 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/20">
                     Upload Gerber Now
                  </Link>
                  <Link href="/contact" className="px-10 py-5 bg-white/10 text-white border border-white/20 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all">
                     Consult our Engineers
                  </Link>
               </div>
            </div>
         </div>
      </section>
    </main>
  )
}

export default FabricationPage
