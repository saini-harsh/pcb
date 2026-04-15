'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Box, ShieldCheck, Settings, Ruler,
  ArrowRight, CheckCircle2, Factory, Package,
  Search, Info, PenTool, LayoutGrid, HelpCircle
} from 'lucide-react'

const EnclosuresPage = () => {
  const materials = [
    {
      title: 'High-Impact ABS',
      desc: 'Durable, lightweight, and easy to customize. Ideal for handheld and desktop devices.',
      Icon: Box
    },
    {
      title: 'Extruded Aluminum',
      desc: 'Superior heat dissipation and EMI shielding for industrial and high-power applications.',
      Icon: ShieldCheck
    },
    {
      title: 'Polycarbonate',
      desc: 'Transparent or opaque options with high thermal resistance and IP-rated sealing.',
      Icon: LayoutGrid
    }
  ]

  const customServices = [
    {
      title: 'CNC Precision Milling',
      desc: 'Custom cutouts for connectors, displays, and switches with sub-millimeter accuracy.',
      Icon: Settings
    },
    {
      title: 'Laser Engraving',
      desc: 'Permanent marking for logos, serial numbers, and connector labels on plastic or metal.',
      Icon: PenTool
    },
    {
      title: 'Digital Silk Screening',
      desc: 'High-resolution multi-color printing for branding and complex interface graphics.',
      Icon: Ruler
    }
  ]

  const enclosureTypes = [
    { name: 'DIN-Rail Mount', img: 'https://images.unsplash.com/photo-1591405351990-4726e33df48b?q=80&w=300&h=200&auto=format&fit=crop', type: 'Industrial' },
    { name: 'Handheld Ergonomic', img: 'https://images.unsplash.com/photo-1591405351990-4726e33df48b?q=80&w=300&h=200&auto=format&fit=crop', type: 'Portable' },
    { name: 'Desktop/Enclosure', img: 'https://images.unsplash.com/photo-1591405351990-4726e33df48b?q=80&w=300&h=200&auto=format&fit=crop', type: 'Standard' },
    { name: 'Wall-Mount IP65', img: 'https://images.unsplash.com/photo-1591405351990-4726e33df48b?q=80&w=300&h=200&auto=format&fit=crop', type: 'Outdoor' }
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[600px] lg:h-[650px] flex items-center overflow-hidden py-20 lg:py-0">
        <Image
          src="https://images.unsplash.com/photo-1588508065123-287b28e013da?q=80&w=2070&auto=format&fit=crop"
          alt="Electronic Enclosures"
          fill
          className="object-cover brightness-[0.25]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full text-primary text-xs font-black uppercase tracking-[0.2em] mb-8">
              <Box className="w-3 h-3" /> Professional Device Protection
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tighter">
              Precision Engineering <br />
              for <span className="text-primary italic">Device Protection</span>.
            </h1>
            <p className="text-xl text-gray-300 font-medium leading-relaxed mb-10 max-w-xl">
              Mount, protect, and scale your hardware with our industrial-grade enclosures. From standard ABS cases to custom CNC-milled aluminum solutions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="px-8 py-4 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                Get a Custom Quote
              </Link>
              <Link href="/enclosures" className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all">
                Browse Shop
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Material Showcase */}
      <section className="py-24 bg-gray-50/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tighter">Industrial Material Options</h2>
            <p className="text-gray-500 font-bold max-w-2xl mx-auto">We use high-grade materials optimized for weight, thermal conductivity, and environmental resistance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {materials.map((mat, i) => (
              <div key={i} className="group p-10 bg-white rounded-[40px] border border-gray-100 hover:border-primary/20 transition-all">
                <div className="w-16 h-16 bg-gray-50 text-gray-400 group-hover:bg-primary/10 group-hover:text-primary rounded-2xl flex items-center justify-center mb-8 transition-all">
                  <mat.Icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">{mat.title}</h3>
                <p className="text-gray-500 font-bold leading-relaxed">{mat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discovery Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter">Popular Form Factors</h2>
            <Link href="/enclosures" className="text-primary font-black text-xs uppercase tracking-widest hover:underline">View all styles</Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {enclosureTypes.map((type, i) => (
              <div key={i} className="group relative rounded-3xl overflow-hidden aspect-[4/5] bg-gray-100">
                <Image src={type.img} alt={type.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">{type.type}</p>
                  <p className="text-lg font-black text-white leading-tight">{type.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customization Services */}
      <section className="py-24 bg-gray-900 text-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="flex-1 space-y-8">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Custom Finishing & Modification</h2>
              <p className="text-lg text-gray-400 font-bold">Don't settle for "off-the-shelf". Our in-house workshop provides precision modification services to make any enclosure production-ready.</p>

              <div className="space-y-6">
                {customServices.map((service, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <service.Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black mb-2">{service.title}</h4>
                      <p className="text-sm font-bold text-gray-500">{service.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 relative w-full aspect-square rounded-[50px] overflow-hidden border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
                alt="Custom Enclosure Modification"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter mb-4">Selection Support</h2>
          <p className="text-gray-500 font-bold">Frequently asked questions about selection and customization.</p>
        </div>

        <div className="space-y-6">
          {[
            { q: 'What is the standard lead time for customized enclosures?', a: 'Standard customization like CNC cutouts typically takes 5-7 business days after design approval.' },
            { q: 'Can you provide IP65 or IP67 rated cases?', a: 'Yes, we offer a range of polycarbonate and aluminum cases with integrated gaskets for high environmental protection.' },
            { q: 'Do you offer custom colors or textures?', a: 'Standard colors are Black, Grey, and White. Custom colors are available for bulk orders via painting or powder coating.' }
          ].map((faq, i) => (
            <div key={i} className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
              <h4 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-primary" /> {faq.q}
              </h4>
              <p className="text-sm font-bold text-gray-500 leading-relaxed pl-8">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 container mx-auto px-6">
        <div className="relative rounded-[60px] bg-primary p-12 md:p-24 overflow-hidden shadow-2xl shadow-primary/30">
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-[120px] -mr-48 -mt-48" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tighter text-shadow-lg">Build the Perfect <br /> Housing Today.</h2>
              <p className="text-xl text-primary-dark font-black opacity-80">Professional engineering meets aesthetic design.</p>
            </div>
            <div className="flex flex-col gap-4 w-full md:w-auto">
              <Link href="/contact" className="px-12 py-6 bg-gray-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all text-center">
                Request Design Support
              </Link>
              <button className="px-12 py-6 bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/30 transition-all">
                View Technical Specs
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default EnclosuresPage
