'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronRight, Zap, ShieldCheck, Clock, Box, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import AuthModal from '../auth/AuthModal'


const Hero = () => {
  const [activeTab, setActiveTab] = useState<'fabrication' | 'products'>('fabrication')
  const { userId } = useAuth()
  const router = useRouter()
  const [authModalOpen, setAuthModalOpen] = useState(false)

  const [fabData, setFabData] = useState({
    layers: '2',
    quantity: 5,
    width: 50,
    height: 40
  })



  return (
    <>
      <section className="relative min-h-[95vh] flex items-center pt-32 pb-20 overflow-hidden bg-[#fafafa]">
        {/* Dynamic Background Effects */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -mr-40 -mt-20 animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-200/40 rounded-full blur-[150px] -ml-20 -mb-20" />
        </div>

        {/* Tech Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.2]"
          style={{ backgroundImage: 'radial-gradient(#9ca3af 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-7 pr-0 lg:pr-12"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-gray-100 shadow-sm text-gray-800 text-xs font-black tracking-[0.2em] uppercase mb-8"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
                Trusted by 50,000+ Engineers
              </motion.div>

              <h1 className="text-5xl md:text-7xl lg:text-[4.5rem] font-black leading-[1.05] mb-8 text-gray-900 tracking-[-0.03em]">
                India's Best <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-500 to-yellow-500 italic pb-2 block">
                  PCB Manufacturer.
                </span>
              </h1>

              <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed mb-10 max-w-xl">
                Upload your Gerber files and get instant quotes for high-quality PCB manufacturing,
                precision assembly, and rapid prototyping with 24h express delivery.
              </p>

              <div className="flex flex-wrap items-center gap-8 mb-12 bg-white/50 backdrop-blur-md p-6 rounded-[2rem] border border-gray-100/50 shadow-sm w-max pr-12">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center border border-emerald-100">
                    <ShieldCheck className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-gray-900 uppercase tracking-widest">ISO 9001</span>
                    <span className="text-xs font-medium text-gray-500 mt-1">Certified Facility</span>
                  </div>
                </div>
                <div className="w-px h-10 bg-gray-200 hidden sm:block" />
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center border border-orange-100">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-gray-900 uppercase tracking-widest">24h Rapid</span>
                    <span className="text-xs font-medium text-gray-500 mt-1">Prototyping</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/services"
                  className="w-full sm:w-auto px-10 py-5 bg-gray-900 hover:bg-black text-white rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center shadow-xl shadow-gray-900/20 gap-3 hover:scale-105 active:scale-95"
                >
                  Our Capabilities <ArrowRight className="w-4 h-4" />
                </Link>
                <div className="w-full sm:w-auto px-10 py-5 bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300 rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center cursor-pointer hover:shadow-lg active:scale-95">
                  Talk to an Expert
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative mt-16 lg:mt-0"
            >
              {/* Quick Quote Card with Tabs */}
              <div className="relative z-10 bg-white/80 backdrop-blur-2xl rounded-[3rem] shadow-[0_20px_80px_rgb(0,0,0,0.08)] border border-white overflow-hidden">

                {/* Glowing top edge */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

                <div className="p-4 sm:p-6 border-b border-gray-100">
                  <div className="flex p-1.5 bg-gray-50/80 rounded-2xl border border-gray-100 relative">
                    {['fabrication', 'products'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`flex-1 py-4 text-[11px] font-black uppercase tracking-widest transition-all rounded-xl relative z-10 ${activeTab === tab ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
                          }`}
                      >
                        {activeTab === tab && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-white rounded-xl shadow-md border border-gray-100 -z-10"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-8 sm:p-10 min-h-[480px] bg-gradient-to-b from-white to-gray-50/50">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {activeTab === 'fabrication' && (
                      <motion.div
                        key="fabrication"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6 flex flex-col h-full"
                      >
                        <div className="space-y-6 flex-1">
                          <div className="group">
                            <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3 group-hover:text-primary transition-colors">Layers</label>
                            <select 
                              value={fabData.layers + ' Layers'} 
                              onChange={(e) => setFabData(prev => ({ ...prev, layers: e.target.value.split(' ')[0] }))}
                              className="w-full bg-white border border-gray-200 rounded-[24px] px-6 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none text-gray-900 font-bold transition-all shadow-sm cursor-pointer appearance-none text-sm"
                            >
                              <option>1 Layer</option>
                              <option>2 Layers</option>
                              <option>4 Layers</option>
                              <option>6 Layers</option>
                              <option>8 Layers</option>
                            </select>
                          </div>
                          <div className="group">
                            <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3 group-hover:text-primary transition-colors">Quantity (Boards)</label>
                            <input 
                              type="number" 
                              value={fabData.quantity} 
                              onChange={(e) => setFabData(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
                              className="w-full bg-white border border-gray-200 rounded-[24px] px-6 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none text-gray-900 font-bold transition-all shadow-sm text-sm" 
                            />
                          </div>
                          <div className="group">
                            <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-3 group-hover:text-primary transition-colors">Dimensions (mm)</label>
                            <div className="flex gap-4 items-center">
                              <input 
                                type="number" 
                                value={fabData.width} 
                                onChange={(e) => setFabData(prev => ({ ...prev, width: parseInt(e.target.value) }))}
                                className="w-full bg-white border border-gray-200 rounded-[24px] px-6 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none text-gray-900 font-bold transition-all shadow-sm text-center text-sm" 
                              />
                              <span className="text-gray-300 font-black">×</span>
                              <input 
                                type="number" 
                                value={fabData.height} 
                                onChange={(e) => setFabData(prev => ({ ...prev, height: parseInt(e.target.value) }))}
                                className="w-full bg-white border border-gray-200 rounded-[24px] px-6 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none text-gray-900 font-bold transition-all shadow-sm text-center text-sm" 
                              />
                            </div>
                          </div>
                        </div>

                        <div className="pt-6 mt-auto">
                          <Link
                            href={`/quote?layers=${fabData.layers}&quantity=${fabData.quantity}&width=${fabData.width}&height=${fabData.height}`}
                            className="w-full py-5 bg-primary text-white rounded-[24px] font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 group hover:scale-[1.02] active:scale-95 hover:bg-orange-600"
                          >
                            Instant Quote
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </Link>
                        </div>
                      </motion.div>
                    )}



                    {activeTab === 'products' && (
                      <motion.div
                        key="products"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col items-center justify-center text-center py-6 h-full mt-4"
                      >
                        <div className="w-24 h-24 bg-blue-50 rounded-[2rem] flex items-center justify-center text-blue-500 shadow-inner border border-blue-100 mb-8 hover:scale-110 transition-transform">
                          <Box className="w-10 h-10" />
                        </div>
                        <div className="space-y-4 mb-10 px-4">
                          <h4 className="text-2xl font-black text-gray-900 leading-tight tracking-tight">Procure Authentic Components</h4>
                          <p className="text-sm font-medium text-gray-500">Browse over 150,000+ certified components with live stock and pricing data.</p>
                        </div>
                        <div className="space-y-4 w-full mt-2">
                          <Link href="/components" className="w-full py-5 bg-primary text-white rounded-[24px] font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 group hover:scale-[1.02] active:scale-95">
                            Explore Products
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Decorative Floating Elements */}
              <div className="absolute top-1/2 -right-12 w-24 h-24 bg-white rounded-[2rem] border border-gray-100 shadow-2xl flex items-center justify-center transform rotate-12 -z-10 animate-bounce" style={{ animationDuration: '6s' }}>
                <Zap className="w-8 h-8 text-yellow-400" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode="sign-in"
      />


    </>
  )
}

export default Hero
