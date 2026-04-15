'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Code2, Cpu, Zap, ShieldCheck, Layers,
  Ruler, Settings, ArrowRight, Download,
  Search, Microscope, Box, Factory, FileCode, CheckCircle2,
  Activity, Thermometer, Radio
} from 'lucide-react'

const DesignPage = () => {
  const stats = [
    { label: 'Designs Delivered', value: '8,000+' },
    { label: 'Component Library', value: '25,000+' },
    { label: 'Layer Capability', value: 'Up to 32' },
    { label: 'Engineering Team', value: '24/7' }
  ]

  const capabilities = [
    {
      title: 'Schematic Engineering',
      desc: 'Expert schematic capture and hierarchical design for complex system architectures.',
      Icon: FileCode
    },
    {
      title: 'High-Speed Layout',
      desc: 'Precision routing for DDR4/5, PCIe Gen 4/5, and ultra-high-speed differential pairs.',
      Icon: Activity
    },
    {
      title: 'SI/PI Simulation',
      desc: 'Pre and post-layout Signal & Power Integrity analysis to ensure robust performance.',
      Icon: Zap
    },
    {
      title: 'RF & Wireless',
      desc: 'Specialized layout for antenna integration, RF matching, and EMI/EMC compliance.',
      Icon: Radio
    },
    {
      title: 'Thermal Management',
      desc: 'Computational Fluid Dynamics (CFD) and thermal modeling for high-power electronics.',
      Icon: Thermometer
    },
    {
      title: 'Library Services',
      desc: 'IPC-7351 compliant footprint creation and centralized component management.',
      Icon: Box
    }
  ]

  const technicalSpecs = [
    { label: 'Layer Counts', content: '1 to 32 layers (Rigid, Flex, and Rigid-Flex)' },
    { label: 'Board Complexity', content: 'Blind & Buried Vias, Microvias, HDI Any-layer' },
    { label: 'High Speed', content: 'Controlled Impedance, Length Matching, Signal integrity' },
    { label: 'Software Stack', content: 'Altium Designer, Cadence Allegro, KiCAD, Mentor Graphics' },
    { label: 'Design Standards', content: 'IPC-2221, IPC-7351, Mil-STD compliance' },
    { label: 'Deliverables', content: 'Gerbers (X2), BOM, Pick-and-Place, Step files, Project Source' }
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Perfectly Responsive */}
      <section className="relative min-h-[600px] lg:h-[700px] flex items-center overflow-hidden py-20 lg:py-0">
        <Image
          src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop"
          alt="PCB Design Engineering"
          fill
          className="object-cover brightness-[0.25]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-8xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full text-primary text-xs font-black uppercase tracking-[0.2em] mb-8">
              <Code2 className="w-3.5 h-3.5" /> High-Fidelity Engineering
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white mb-8 leading-[1.05] tracking-tighter">
              Precision <span className="text-primary italic">PCB Design</span> <br />
              Without Compromise.
            </h1>
            <p className="text-lg md:text-2xl text-gray-300 font-medium leading-relaxed mb-12 max-w-2xl mx-auto">
              Expert engineering for mission-critical electronics. We transform your concepts into production-ready designs with 100% DFM-guaranteed reliability.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/contact" className="px-10 py-5 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary-dark transition-all shadow-xl shadow-primary/20">
                Talk to an Engineer
              </Link>
              <button className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all">
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gray-900 py-12 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="text-center md:text-left">
                <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2">{stat.label}</p>
                <p className="text-3xl md:text-4xl font-black text-white tracking-tighter">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Capabilities Grid */}
      <section className="py-24 bg-gray-50/50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tighter">End-to-End Design Services</h2>
            <p className="text-gray-500 font-bold leading-relaxed">From initial schematic capture to comprehensive SI/PI simulation, our engineering team ensures your project is ready for professional manufacturing.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((cap, i) => (
              <div key={i} className="group p-10 bg-white rounded-[40px] border border-gray-100 hover:border-primary/20 hover:shadow-2xl hover:-translate-y-2 transition-all">
                <div className="w-16 h-16 bg-gray-50 text-gray-400 group-hover:bg-primary/10 group-hover:text-primary rounded-2xl flex items-center justify-center mb-10 transition-all">
                  <cap.Icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-6 tracking-tight">{cap.title}</h3>
                <p className="text-gray-500 font-bold leading-relaxed mb-8">{cap.desc}</p>
                <Link href="/contact" className="inline-flex items-center gap-2 text-primary text-xs font-black uppercase tracking-widest group-hover:translate-x-2 transition-all">
                  Explore capability <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Focus Section */}
      <section className="py-24 overflow-hidden border-y border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="flex-1 space-y-8">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-4">Supporting Mission-Critical Industries</h2>
              <p className="text-lg text-gray-500 font-bold max-w-xl">Our designs are trusted by industry leaders in sectors where failure is not an option.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Medical Grade Devices', 'Aerospace & Aviation', 'Industrial IoT Networks', 'Automotive Systems', 'High-Speed Computing', 'Consumer Wearables'].map(item => (
                  <div key={item} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl text-sm font-black text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-primary" /> {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 relative w-full aspect-video rounded-[40px] overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
                alt="Industrial Electronics"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Technical Specs Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-black text-gray-900 mb-6 tracking-tighter">Design Capabilities & Deliverables</h2>
              <p className="text-gray-500 font-bold leading-relaxed">Comprehensive manufacturing packages and technical specifications included with every design project.</p>
            </div>
            <button className="flex items-center gap-3 px-8 py-4 bg-gray-50 text-gray-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all border border-gray-100">
              <Download className="w-4 h-4" /> Technical Specs PDF
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {technicalSpecs.map((spec, i) => (
              <div key={i} className="group p-8 border-b-2 border-gray-50 hover:border-primary transition-all">
                <div className="w-12 h-12 mb-6 bg-gray-50 text-gray-300 group-hover:bg-primary/5 group-hover:text-primary rounded-xl flex items-center justify-center transition-all">
                  <Settings className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">{spec.label}</h4>
                <p className="text-lg font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors">{spec.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 container mx-auto px-6">
        <div className="relative rounded-[50px] bg-gray-900 p-12 md:p-24 overflow-hidden text-center shadow-2xl">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/30 rounded-full blur-[120px]" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-7xl font-black text-white mb-8 leading-[1.05] tracking-tighter">Have an Innovation Idea?</h2>
            <p className="text-xl text-gray-400 font-bold mb-12">Let's turn your concept into a production-ready reality. Consult with our expert engineering team today.</p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/contact" className="px-10 py-5 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/20">
                Schedule Consultation
              </Link>
              <Link href="/quote" className="px-10 py-5 bg-white/10 text-white border border-white/20 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all">
                Launch Quotation Engine
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default DesignPage
