'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronDown, HelpCircle, Box, Cpu, Zap, CreditCard, Truck, Settings, Users } from 'lucide-react'

const faqCategories = [
  { id: 'general', name: 'General', icon: <Users className="w-5 h-5" /> },
  { id: 'fab', name: 'PCB Fabrication', icon: <Settings className="w-5 h-5" /> },
  { id: 'assembly', name: 'PCB Assembly', icon: <Cpu className="w-5 h-5" /> },
  { id: 'sourcing', name: 'Component Sourcing', icon: <Zap className="w-5 h-5" /> },
  { id: 'order', name: 'Ordering & Tracking', icon: <Box className="w-5 h-5" /> },
  { id: 'payment', name: 'Pricing & Payment', icon: <CreditCard className="w-5 h-5" /> },
  { id: 'shipping', name: 'Shipping & Delivery', icon: <Truck className="w-5 h-5" /> },
]

const faqs = [
  {
    category: 'general',
    q: 'Who is PCB GLOBE?',
    a: 'PCB GLOBE is a premier cloud-native PCB manufacturing and assembly platform based in India. We specialize in rapid prototyping and high-volume production with a focus on precision, speed, and industrial-grade quality.'
  },
  {
    category: 'general',
    q: 'Do you offer technical support for designs?',
    a: 'Yes! Our engineering team provides complimentary DFM (Design for Manufacturability) checks for all orders to ensure your boards are optimized for high-yield production.'
  },
  {
    category: 'fab',
    q: 'What are your standard manufacturing tolerances?',
    a: 'Our standard tolerances include a minimum trace/space of 3.5 mils, minimum hole size of 0.15mm, and an annular ring of 4 mils. Advanced specifications are available upon request.'
  },
  {
    category: 'fab',
    q: 'What materials do you support?',
    a: 'We support a wide range of substrates including standard FR4 (High TG170/180), Aluminum core, Rogers high-frequency materials, and flexible polyimide PI.'
  },
  {
    category: 'assembly',
    q: 'What assembly services do you provide?',
    a: 'We offer full Turnkey PCBA, Consigned/Kitted assembly, and Partial PCBA. Our capabilities include SMT, through-hole (THT), and manual soldering for complex prototypes.'
  },
  {
    category: 'sourcing',
    q: 'How do you ensure component authenticity?',
    a: 'We procure components exclusively from authorized distributors (DigiKey, Mouser, Avnet) and verified supply chain partners, ensuring 100% genuine parts for every build.'
  },
  {
    category: 'payment',
    q: 'What payment methods are accepted?',
    a: 'We accept all major credit/debit cards, Net Banking, UPI (via Razorpay), and Wire Transfers. GST invoices are provided for all corporate orders.'
  },
  {
    category: 'shipping',
    q: 'Do you ship internationally?',
    a: 'Yes, we ship globally via partner carriers like DHL, FedEx, and BlueDart. Lead times vary from 3 to 10 business days depending on the destination.'
  }
]

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('general')
  const [search, setSearch] = useState('')
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = faq.category === activeCategory
    const matchesSearch = faq.q.toLowerCase().includes(search.toLowerCase()) || 
                          faq.a.toLowerCase().includes(search.toLowerCase())
    return search ? matchesSearch : matchesCategory
  })

  return (
    <div className="min-h-screen bg-white">
      <main className="pb-20">
        {/* Hero Section */}
        <section className="bg-gray-900 pt-32 pb-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full" />
          <div className="container mx-auto px-6 relative z-10 text-center">
             <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">
                Frequently Asked <span className="text-primary italic">Questions</span>
             </h1>
             <p className="text-xl text-gray-400 font-medium mb-12 max-w-2xl mx-auto">
                Find instant answers to technical specifications, ordering workflows, and high-volume production logistics.
             </p>
             
             {/* Search Bar */}
             <div className="relative max-w-2xl mx-auto group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-primary transition-colors" />
                <input 
                  type="text"
                  placeholder="Ask a question (e.g. 'Lead time', 'Tolerances')..."
                  className="w-full pl-16 pr-6 py-6 bg-white/5 border border-white/10 rounded-3xl text-white text-lg font-medium focus:ring-4 focus:ring-primary/20 outline-none transition-all"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
             </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="container mx-auto px-6 mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Sidebar Categories */}
            {!search && (
              <div className="lg:col-span-4 space-y-2 sticky top-32 h-fit">
                {faqCategories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                        setActiveCategory(cat.id)
                        setOpenIndex(0)
                    }}
                    className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
                      activeCategory === cat.id 
                        ? 'bg-primary text-white shadow-xl shadow-orange-900/20 translate-x-2' 
                        : 'bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <span className={activeCategory === cat.id ? 'text-white' : 'text-gray-400'}>{cat.icon}</span>
                    {cat.name}
                  </button>
                ))}
                
                <div className="mt-12 p-8 bg-gray-50 rounded-3xl border border-gray-100">
                    <HelpCircle className="w-10 h-10 text-primary mb-4" />
                    <h4 className="text-lg font-black text-gray-900 mb-2">Need more help?</h4>
                    <p className="text-sm font-medium text-gray-500 mb-6 leading-relaxed">Our technical support team is available during business hours for complex engineering queries.</p>
                    <Link href="/contact" className="text-primary font-black text-sm uppercase tracking-widest hover:underline underline-offset-4 decoration-2">Contact Support →</Link>
                </div>
              </div>
            )}

            {/* Accordion Area */}
            <div className={`${search ? 'lg:col-span-12 max-w-4xl mx-auto w-full' : 'lg:col-span-8'} space-y-4`}>
              {search && (
                <p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-8">Search Results for "{search}"</p>
              )}
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory + search}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((faq, idx) => (
                      <div 
                        key={idx}
                        className="group bg-white rounded-[2rem] border border-gray-100 hover:border-primary/20 overflow-hidden transition-all duration-300"
                      >
                        <button
                          onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                          className="w-full flex items-center justify-between p-8 text-left"
                        >
                          <span className="text-xl font-black text-gray-900 tracking-tight group-hover:text-primary transition-colors pr-6">
                            {faq.q}
                          </span>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                            openIndex === idx ? 'bg-primary text-white rotate-180' : 'bg-gray-50 text-gray-400'
                          }`}>
                            <ChevronDown className="w-5 h-5" />
                          </div>
                        </button>
                        
                        <motion.div
                          initial={false}
                          animate={{ height: openIndex === idx ? 'auto' : 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-8 pb-8 text-gray-500 font-medium text-lg leading-relaxed max-w-3xl">
                             <div className="w-full h-[1px] bg-gray-50 mb-6" />
                             {faq.a}
                          </div>
                        </motion.div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-[3rem]">
                       <HelpCircle className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                       <p className="text-gray-400 font-bold">No answers found matching your query.</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
