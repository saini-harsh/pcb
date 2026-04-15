'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Zap, ShieldCheck, Globe, Star, ShoppingBag,
  ArrowRight, CheckCircle2, Factory, Package,
  Search, Users, Code2, Cpu, Truck
} from 'lucide-react'

const MadeInIndiaPage = () => {
  const products = [
    {
      id: 'GLYPH-C3',
      name: 'GLYPH-C3-ESP32-IoT',
      desc: 'Ultra-compact IoT development board with ESP32-C3.',
      price: '₹434',
      rating: 4.8,
      img: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=200&h=200&auto=format&fit=crop'
    },
    {
      id: 'GLYPH-H2',
      name: 'GLYPH-H2-ESP32-Dev',
      desc: 'High-performance ESP32-H2 with Matter support.',
      price: '₹489',
      rating: 5.0,
      img: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=200&h=200&auto=format&fit=crop'
    },
    {
      id: 'GLYPH-C6',
      name: 'GLYPH-C6-IoT-Dev',
      desc: 'Next-gen ESP32-C6 for advanced wireless apps.',
      price: '₹522',
      rating: 5.0,
      img: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=200&h=200&auto=format&fit=crop'
    }
  ]

  const advantages = [
    {
      title: 'Zero Import Markups',
      desc: 'Avoid heavy customs and international shipping fees with locally manufactured hardware.',
      icon: <ShoppingBag className="w-6 h-6" />
    },
    {
      title: 'Days, Not Weeks',
      desc: 'Accelerate your development with 2-3 day domestic shipping across India.',
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: 'IPC-Grade Quality',
      desc: 'Domestic production following global IPC-A-610 Class II/III standards.',
      icon: <ShieldCheck className="w-6 h-6" />
    },
    {
      title: 'Prototype Faster',
      desc: 'Instant access to development kits and local engineering troubleshooting.',
      icon: <Cpu className="w-6 h-6" />
    }
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[600px] lg:h-[650px] flex items-center overflow-hidden py-20 lg:py-0">
        <Image
          src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop"
          alt="Made in India Electronics"
          fill
          className="object-cover brightness-[0.25]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full text-primary text-xs font-black uppercase tracking-[0.2em] mb-8">
              <Globe className="w-3 h-3" /> Empowering Domestic Hardware
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tighter">
              Premier <span className="text-primary italic">Made-in-India</span> <br />
              Hardware Ecosystem.
            </h1>
            <p className="text-xl text-gray-300 font-medium leading-relaxed mb-10 max-w-xl">
              From development boards to custom modules. High-performance electronics manufactured locally to global standards at affordable prices.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="#products" className="px-8 py-4 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                Shop Dev Boards
              </Link>
              <Link href="/contact" className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all">
                Partner With Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-24 bg-gray-50/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tighter">Development Boards For You</h2>
              <p className="text-gray-500 font-bold">Domestically engineered boards designed for reliability, scalability, and local support.</p>
            </div>
            <Link href="/components" className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest hover:underline">
              Browse full catalog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p) => (
              <div key={p.id} className="group bg-white rounded-[40px] border border-gray-100 p-8 hover:shadow-2xl hover:border-primary/20 transition-all">
                <div className="relative h-48 rounded-3xl bg-gray-50 flex items-center justify-center overflow-hidden mb-8">
                  <div className="absolute top-4 left-4 px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">In Stock</div>
                  <Image src={p.img} alt={p.name} width={150} height={150} className="object-contain group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-black text-gray-900 leading-tight">{p.name}</h3>
                  <div className="flex items-center gap-1 text-orange-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-xs font-black">{p.rating}</span>
                  </div>
                </div>
                <p className="text-sm font-bold text-gray-500 leading-relaxed mb-8">{p.desc}</p>
                <div className="flex items-center justify-between pt-8 border-t border-gray-50">
                  <span className="text-2xl font-black text-gray-900">{p.price}</span>
                  <button className="px-6 py-3 bg-gray-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary transition-all shadow-lg shadow-black/10">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantage Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center max-w-8xl">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tighter">Why <span className="text-primary italic">Made-in-India</span>?</h2>
          <p className="text-gray-500 font-bold mb-20 leading-relaxed text-lg">Local manufacturing isn't just about pride—it's a massive strategic advantage for your hardware delivery timeline and bottom line.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            {advantages.map((adv, i) => (
              <div key={i} className="p-8 bg-gray-50 rounded-[32px] border border-gray-100 hover:bg-white hover:border-primary/10 transition-all">
                <div className="w-12 h-12 bg-white text-primary rounded-xl flex items-center justify-center mb-6 shadow-sm border border-gray-100">
                  {adv.icon}
                </div>
                <h4 className="text-lg font-black text-gray-900 mb-4 tracking-tight">{adv.title}</h4>
                <p className="text-sm font-bold text-gray-500 leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sell Your Part CTA */}
      <section className="py-24 container mx-auto px-6">
        <div className="relative rounded-[50px] bg-gray-900 p-12 md:p-24 overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -ml-48 -mb-48" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight tracking-tighter">Got A Part To Sell?</h2>
            <p className="text-lg text-gray-400 font-bold mb-12">List your domestically manufactured hardware on the PCB GLOBE marketplace and reach thousands of engineers instantly.</p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/contact" className="px-10 py-5 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/20">
                List Your Hardware
              </Link>
              <button className="px-10 py-5 bg-white/10 text-white border border-white/20 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all">
                View Seller Guide
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="py-24 bg-white overflow-hidden border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <h2 className="text-4xl font-black text-gray-900 mb-6 tracking-tighter">India's Largest Dev-Board Ecosystem</h2>
            <p className="text-gray-500 font-bold leading-relaxed">Multi-brand hardware support, one standard search. Plug, play, and scale with confidence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              { t: 'Unified Catalog & Search', d: 'Find by MCU/SOC, wireless type, or IO requirements with ease through our search engine.', i: <Search className="w-8 h-8" /> },
              { t: 'Seamless Fabrication', d: 'Common pin naming and standard footprints mapped directly to our PCB fabrication service.', i: <Factory className="w-8 h-8" /> },
              { t: 'Accessories & Bundles', d: 'Sensors, power cables, and enclosures that "just work" with every listed dev board.', i: <Package className="w-8 h-8" /> },
              { t: 'Community & Support', d: 'Direct access to regional FAEs and local hardware workshops to troubleshoot your design.', i: <Users className="w-8 h-8" /> }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 p-10 bg-gray-50 rounded-[40px] border border-gray-100 hover:border-primary/10 transition-all group">
                <div className="w-20 h-20 bg-white text-gray-300 group-hover:text-primary rounded-3xl flex items-center justify-center flex-shrink-0 shadow-sm border border-gray-100 transition-colors">
                  {item.i}
                </div>
                <div>
                  <h4 className="text-xl font-black text-gray-900 mb-4">{item.t}</h4>
                  <p className="text-sm font-bold text-gray-500 leading-relaxed">{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logistics Banner */}
      <section className="py-12 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center">
                <Truck className="w-6 h-6 " />
              </div>
              <div>
                <p className="text-sm font-black text-gray-900">National Priority Logistics</p>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Next-Day Delivery to Tier 1 Cities</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-6 grayscale opacity-40">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-900">Delivery Partners:</span>
              <p className="text-sm font-black tracking-tighter">BlueDart</p>
              <p className="text-sm font-black tracking-tighter">Delhivery</p>
              <p className="text-sm font-black tracking-tighter">DTDC</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default MadeInIndiaPage
