import Hero from "@/components/layout/Hero";
import Link from "next/link";
import { Cpu, Zap, ShieldCheck, Globe, BarChart3, Clock, Box, ArrowRight } from "lucide-react";

export default function Home() {
  const solutions = [
    { title: "Fabrication", icon: <Zap className="w-8 h-8" />, desc: "Top-tier PCB manufacturing from 1 to 32 layers with precision." },
    { title: "Components", icon: <Box className="w-8 h-8" />, desc: "Sourcing of authentic electronic components from global vendors." }
  ]

  const products = [
    {
      id: 1,
      name: "ATMEGA328PB-ANR",
      specs: "AVR 32KBYTES Flash, 1KBYTES EEPROM, 2KBYTES Ram, W -...",
      price: "176.00",
      image: "/products/atmega.png"
    },
    {
      id: 2,
      name: "TAS2770RJQR",
      specs: "Audio Amplifier Speaker Mono 20W Class-D 26-Pin VQFN-HR T/R",
      price: "157.00",
      image: "/products/amplifier.png"
    },
    {
      id: 3,
      name: "GLYPH-C3-ESP32-IOT-Dev-Board",
      specs: "India's most affordable development board...",
      price: "434.00",
      image: "/products/esp32.png"
    },
    {
      id: 4,
      name: "STM32G030C8T6",
      specs: "MCU 32-Bit STM32G030 ARM Cortex-M0+ RISC 64K...",
      price: "100.00",
      image: "/products/stm32.png"
    }
  ]

  return (
    <div className="bg-white">
      <Hero />

      {/* Featured Products Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-2">Featured Products</h2>
              <p className="text-gray-500 font-medium">Precision components for your hardware innovations.</p>
            </div>
            <Link href="/products" className="hidden sm:flex items-center gap-2 text-primary font-bold hover:underline">
              Explore All <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm shadow-gray-200/50 hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden">
                <div className="absolute top-4 left-4 bg-orange-50 text-primary text-[10px] font-black px-2.5 py-1 rounded-full z-10 uppercase tracking-tighter border border-primary/10">
                  Same Day Shipping
                </div>
                <div className="relative aspect-square mb-6 bg-gray-50/50 rounded-2xl overflow-hidden flex items-center justify-center border border-gray-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 opacity-90"
                  />
                </div>
                <h4 className="text-gray-900 font-bold text-sm mb-2 hover:text-primary transition-colors cursor-pointer line-clamp-1">
                  {product.name}
                </h4>
                <p className="text-gray-500 text-[11px] leading-relaxed mb-4 line-clamp-2 h-8 font-medium">
                  {product.specs}
                </p>
                <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-gray-900 font-black text-lg">₹{product.price}</span>
                  <button className="w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center hover:bg-primary transition-all shadow-lg shadow-gray-900/10">
                    <Box className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 sm:hidden text-center">
            <Link href="/products" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
              Explore All Products <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* One-Stop Solution */}
      <section className="py-24 bg-gray-50/50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-black text-gray-900 mb-4">Your One-stop Solution!</h2>
          <p className="text-gray-500 mb-16 max-w-2xl mx-auto font-medium leading-relaxed">From design to delivery, we handle every step of your hardware journey with industrial precision.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {solutions.map((item, i) => (
              <div key={i} className="bg-white p-12 rounded-[2.5rem] shadow-sm shadow-gray-200/50 border border-gray-100 hover:shadow-xl transition-all text-left group">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-gray-900 mb-4 uppercase tracking-tight">Why Choose PCB GLOBE?</h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { label: "Price Transparency", icon: <BarChart3 className="w-10 h-10" /> },
              { label: "On-Time Delivery", icon: <Clock className="w-10 h-10" /> },
              { label: "Quality First", icon: <ShieldCheck className="w-10 h-10" /> },
              { label: "Global Reach", icon: <Globe className="w-10 h-10" /> }
            ].map((item, i) => (
              <div key={i} className="text-center space-y-6 group">
                <div className="w-24 h-24 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300 border border-gray-100">
                  {item.icon}
                </div>
                <h4 className="font-black text-gray-900 text-lg">{item.label}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto bg-gray-900 rounded-[3.5rem] p-12 md:p-24 relative overflow-hidden text-center md:text-left shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] pointer-events-none">
            <Globe className="w-full h-full text-white" />
          </div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                Made in India, <br />
                <span className="text-primary italic">Shipped Globally</span>
              </h2>
              <p className="text-gray-400 text-lg font-medium max-w-xl">
                Our advanced manufacturing facilities in India power innovations that travel across the globe.
              </p>
              <div className="flex flex-wrap gap-12 pt-4">
                <div>
                  <div className="text-5xl font-black text-white mb-2 tracking-tighter">50,000+</div>
                  <div className="text-primary text-xs font-black uppercase tracking-[0.2em]">Boards Delivered</div>
                </div>
                <div>
                  <div className="text-5xl font-black text-white mb-2 tracking-tighter">99.9%</div>
                  <div className="text-primary text-xs font-black uppercase tracking-[0.2em]">Quality Yield</div>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex justify-center relative">
              <div className="w-72 h-72 bg-primary/20 rounded-full blur-[120px] absolute" />
              <div className="relative w-full aspect-square bg-white/5 rounded-[4rem] border border-white/10 backdrop-blur-3xl flex items-center justify-center group overflow-hidden">
                <Zap className="w-32 h-32 text-primary group-hover:scale-125 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24 overflow-hidden bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-black text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-gray-500 mb-16 max-w-2xl mx-auto font-medium">Trusted by leading R&D labs and hardware startups across India.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              {
                name: "Rahul Sharma",
                role: "Senior Design Engineer, TechDrive",
                review: "The 24h rapid proto service is a game changer. The quality of the ENIG finish was superior to our previous vendor.",
                stars: 5,
                img: "https://i.pravatar.cc/150?u=1"
              },
              {
                name: "Ananya Iyer",
                role: "Founder, RoboQuest IoT",
                review: "PCB GLOBE's quote engine is the most transparent in the industry. No hidden costs, and the GST support is seamless.",
                stars: 5,
                img: "https://i.pravatar.cc/150?u=2"
              },
              {
                name: "Amit Patel",
                role: "R&D Head, SolarFlow",
                review: "Professional assembly and reliable component sourcing. They handles our complex 8-layer boards without issues.",
                stars: 5,
                img: "https://i.pravatar.cc/150?u=3"
              }
            ].map((review, i) => (
              <div key={i} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm shadow-gray-200/50 hover:shadow-xl transition-all group flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex gap-1.5">
                    {[...Array(review.stars)].map((_, i) => (
                      <span key={i} className="text-primary text-xl font-bold">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 font-bold leading-relaxed italic text-lg">"{review.review}"</p>
                </div>
                <div className="mt-10 flex items-center gap-5 border-t border-gray-50 pt-8">
                  <img src={review.img} className="w-14 h-14 rounded-full border-4 border-white shadow-md" alt={review.name} />
                  <div>
                    <h4 className="text-gray-900 font-black text-sm uppercase">{review.name}</h4>
                    <p className="text-primary text-[10px] font-black uppercase tracking-widest">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative bg-gray-50/50">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-[3.5rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-[0.4] pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(#f58220 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 relative z-10 leading-tight">
              Have an <span className="text-primary italic">Innovative Idea?</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto relative z-10 font-medium">
              Let's bring your hardware vision to life with India's most advanced manufacturing platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 relative z-10">
              <Link href="/quote" className="w-full sm:w-auto px-12 py-5 bg-primary hover:bg-orange-500 text-white rounded-2xl font-black text-xl transition-all shadow-xl shadow-orange-900/20 flex items-center justify-center gap-3">
                Get Started
                <ArrowRight className="w-6 h-6" />
              </Link>
              <Link href="/about" className="text-white font-black text-lg hover:text-primary transition-colors border-b-2 border-white/20 hover:border-primary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
