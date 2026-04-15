'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Cpu, Zap, ShieldCheck, Clock, CheckCircle2, 
  Layers, Ruler, Settings, ArrowRight, Download, 
  Search, Microscope, Box, Factory, HardDrive, LayoutGrid
} from 'lucide-react'

const AssemblyPage = () => {
  const steps = [
    {
      title: 'BOM Sourcing',
      desc: 'Smart procurement of components from global authorized distributors with real-time inventory tracking.',
      icon: <Search className="w-6 h-6" />
    },
    {
      title: 'SMT Placement',
      desc: 'High-speed pick and place for components as small as 01005 with micron-level precision and repeatability.',
      icon: <Cpu className="w-6 h-6" />
    },
    {
      title: 'THT & Soldering',
      desc: 'Professional through-hole assembly and wave soldering for mechanical components and high-power connectors.',
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: 'Testing & QC',
      desc: 'Multi-stage automated optical inspection (AOI), X-ray for BGAs, and final functional verification.',
      icon: <ShieldCheck className="w-6 h-6" />
    }
  ]

  const specs = [
    { label: 'Assembly Types', content: 'SMT, Through-Hole (THT), Mixed Technology, BGA/QFN' },
    { label: 'Component Size', content: 'Passive as small as 01005, BGA Pitch as fine as 0.35mm' },
    { label: 'Solder Chemistry', content: 'Lead-Free (RoHS), Leaded, No-Clean, Water Washable' },
    { label: 'Board Shapes', content: 'Rectangular, Circular, Complex Polygons, Rigid & Flex' },
    { label: 'Test Methods', content: 'AOI, X-Ray, In-Circuit Testing (ICT), Functional Test (FCT)' },
    { label: 'Turnkey Options', content: 'Full Turnkey, Partial Turnkey, Consigned/Kitted' }
  ]

  const capabilities = [
    {
      name: 'SMT Assembly',
      items: ['01005 placement support', 'BGA & Micro-BGA assembly', 'Double-sided SMT', 'Odd-form components']
    },
    {
      name: 'Through-Hole',
      items: ['Manual & Wave soldering', 'Hand assembly experts', 'Press-fit connectors', 'Mechanical mounting']
    },
    {
      name: 'Quality Assurance',
      items: ['AOI for every board', 'X-Ray for hidden joints', 'First article inspection', 'IPC-A-610 Class II/III']
    }
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[600px] lg:h-[600px] flex items-center overflow-hidden py-20 lg:py-0">
        <Image 
          src="https://images.unsplash.com/photo-1591405351990-4726e33df48b?q=80&w=2070&auto=format&fit=crop"
          alt="PCB Assembly"
          fill
          className="object-cover brightness-[0.2]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full text-primary text-xs font-black uppercase tracking-[0.2em] mb-6">
              <Cpu className="w-3 h-3" /> Turnkey Production Excellence
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tighter">
              Simplified <span className="text-primary italic">PCB Assembly</span> <br/> 
              Engineered for Quality.
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-medium leading-relaxed mb-8 max-w-xl">
              From prototype runs to high-volume commercial assembly. We handle component procurement, placement, and functional testing with industrial-grade precision.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/bom-tool" className="px-8 py-4 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                Start with BOM Upload
              </Link>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all">
                View Sample Reports
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-24 bg-gray-50/50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tighter hover:text-primary transition-colors cursor-default">Prototype to Production</h2>
            <p className="text-gray-500 font-bold">A streamlined, cloud-native workflow designed to reduce errors and accelerate your time to market.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="group p-8 bg-white rounded-[32px] border border-gray-100 hover:border-primary/20 hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-gray-50 text-gray-400 group-hover:bg-primary/10 group-hover:text-primary rounded-2xl flex items-center justify-center mb-8 transition-all">
                   {step.icon}
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-4">{step.title}</h3>
                <p className="text-sm font-bold text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mixed Capabilities Section */}
      <section className="py-24 overflow-hidden">
         <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
               <div className="flex-1 w-full">
                  <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-8 tracking-tighter">Comprehensive Assembly Solutions</h2>
                  <div className="space-y-8">
                     {capabilities.map((cap, i) => (
                       <div key={i} className="p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:border-primary/10 transition-colors">
                          <h4 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-3">
                             <div className="w-2 h-8 bg-primary rounded-full" /> {cap.name}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                             {cap.items.map(item => (
                               <div key={item} className="flex items-center gap-2 text-sm font-bold text-gray-500">
                                  <CheckCircle2 className="w-4 h-4 text-primary" /> {item}
                               </div>
                             ))}
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
               <div className="flex-1 relative w-full aspect-square max-w-lg lg:max-w-none">
                  <div className="absolute inset-0 bg-primary/5 rounded-[40px] transform rotate-3" />
                  <div className="relative h-full rounded-[40px] overflow-hidden shadow-2xl">
                     <Image 
                       src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=2069&auto=format&fit=crop"
                       alt="SMT Machinery"
                       fill
                       className="object-cover"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                     <div className="absolute bottom-8 left-8 right-8 text-white">
                        <p className="text-sm font-black uppercase tracking-widest mb-2">High Efficiency</p>
                        <h4 className="text-2xl font-black">Industrial SMT Excellence</h4>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Technical Specs Hub */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter">Technical Capabilities Overview</h2>
            <p className="text-gray-400 font-bold leading-relaxed">Precision manufacturing limits and process controls for high-reliability assembly.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {specs.map((spec, i) => (
              <div key={i} className="flex items-start gap-6 group py-6 border-b border-white/5 last:border-0">
                 <div className="p-3 bg-white/5 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <Settings className="w-5 h-5" />
                 </div>
                 <div>
                    <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-2">{spec.label}</h4>
                    <p className="text-lg font-bold group-hover:text-primary transition-colors">{spec.content}</p>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assembly Types Image Grid */}
      <section className="py-24 container mx-auto px-6">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { t: 'SMT Assembly', i: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=2070&auto=format&fit=crop' },
              { t: 'Through-Hole (THT)', i: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop' },
              { t: 'Turnkey Solutions', i: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop' }
            ].map((type, i) => (
              <div key={i} className="relative h-80 rounded-3xl overflow-hidden group">
                 <Image src={type.i} alt={type.t} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                 <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                 <div className="absolute bottom-6 left-6 right-6">
                    <h4 className="text-xl font-black text-white">{type.t}</h4>
                    <button className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest mt-2 hover:translate-x-2 transition-transform">
                       View Details <ArrowRight className="w-3 h-3" />
                    </button>
                 </div>
              </div>
            ))}
         </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gray-50">
         <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto rounded-[50px] bg-white border border-gray-100 p-12 md:p-24 shadow-2xl relative overflow-hidden text-center">
               <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
               <div className="relative z-10">
                  <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 leading-tight tracking-tighter">Ready to Assemble Your Boards?</h2>
                  <p className="text-lg text-gray-500 font-bold mb-12 max-w-2xl mx-auto">Get an instant quote for your PCB assembly by uploading your BOM and Gerber files today.</p>
                  <div className="flex flex-wrap justify-center gap-6">
                     <Link href="/bom-tool" className="px-10 py-5 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/20">
                        Launch BOM Sourcing
                     </Link>
                     <Link href="/contact" className="px-10 py-5 bg-gray-50 text-gray-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-100 transition-all">
                        Consult Our Engineers
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </main>
  )
}

export default AssemblyPage
