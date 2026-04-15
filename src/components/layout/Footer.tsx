"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Globe, Send, Code, Share2, ExternalLink,
  Phone, Mail, Clock, Calendar, CreditCard, Banknote, Wallet, Truck, Ship,
  ShieldCheck, HelpCircle, FileText, Settings, Factory, Layout, Zap, Cpu, Box
} from 'lucide-react'

const Footer = () => {  
  const pathname = usePathname()
  const currentYear = new Date().getFullYear()

  if (pathname?.startsWith('/dashboard')) return null;

  const sections = [
    {
      title: 'Services',
      links: [
        { name: 'PCB Fabrication', href: '/services/pcb-fabrication' },
        { name: 'PCB Assembly', href: '/services/pcb-assembly' },
        { name: 'PCB Enclosures', href: '/services/pcb-enclosures' },
        { name: 'Contract Manufacturing', href: '/services/pcba-contract' },
        { name: 'PCB Design', href: '/services/pcb-design' },
      ]
    },
    {
      title: 'Tech & Trends',
      links: [
        { name: 'High-Density PCBs', href: '/capabilities' },
        { name: 'Advanced Materials', href: '/capabilities' },
        { name: 'Aerospace & Med', href: '#' },
        { name: 'Industrial IoT', href: '#' },
        { name: 'Component Sourcing', href: '/components' },
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Made in India', href: '/services/made-in-india' },
        { name: 'Parts Lib', href: '/parts-directory' },
        { name: 'Submit Feedback', href: '/submit-feedback' },
        { name: 'Technical Blogs', href: '/blog' },
        { name: 'FAQs Hub', href: '/faq' },
      ]
    }
  ]

  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="container mx-auto px-6 text-gray-600">
        
        {/* Main Footer Grid - Balanced 5-Column Industrial Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">
          
          {/* Company Info */}
          <div>
            <Link href="/" className="inline-block text-2xl font-black text-gray-900 mb-6 tracking-tighter">
              PCB <span className="text-primary italic">GLOBE</span>
            </Link>
            <p className="text-sm font-medium leading-relaxed mb-6">
              Empowering innovators with cloud-native PCB manufacturing. From rapid prototyping to high-yield industrial production.
            </p>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all mb-6 shadow-sm whitespace-nowrap">
               <Calendar className="w-3.5 h-3.5" /> Schedule 1:1
            </button>
            <div className="flex items-center gap-2">
               {[Globe, Share2, Send, Code, ExternalLink].map((Icon, i) => (
                 <Link key={i} href="#" className="p-2.5 bg-gray-50 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
                   <Icon className="w-3.5 h-3.5" />
                 </Link>
               ))}
            </div>
          </div>

          {/* Navigation Columns */}
          {sections.map(section => (
            <div key={section.title}>
              <h4 className="text-[11px] font-black text-gray-900 uppercase tracking-[0.15em] mb-8">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map(link => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-[13px] font-bold text-gray-500 hover:text-primary transition-colors block">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div>
             <h4 className="text-[11px] font-black text-gray-900 uppercase tracking-[0.15em] mb-8">Get In Touch</h4>
             <ul className="space-y-5">
                <li className="flex items-start gap-3">
                   <div className="p-2 bg-gray-50 rounded-lg text-primary flex-shrink-0"><Phone className="w-3.5 h-3.5" /></div>
                   <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Call</p>
                      <p className="text-[13px] font-bold text-gray-900">+91 080 4711 2351</p>
                   </div>
                </li>
                <li className="flex items-start gap-3">
                   <div className="p-2 bg-gray-50 rounded-lg text-primary flex-shrink-0"><Mail className="w-3.5 h-3.5" /></div>
                   <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Email</p>
                      <p className="text-[13px] font-bold text-gray-900">support@pcbglobe.com</p>
                   </div>
                </li>
                <li className="flex items-start gap-3">
                   <div className="p-2 bg-gray-50 rounded-lg text-primary flex-shrink-0"><Clock className="w-3.5 h-3.5" /></div>
                   <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Hours</p>
                      <p className="text-[13px] font-bold text-gray-900 leading-tight">M-F: 10AM-7PM<br/>S: 10AM-5PM</p>
                   </div>
                </li>
             </ul>
          </div>
        </div>

        {/* Methods Bar */}
        <div className="border-y border-gray-50 py-12 mb-12 flex flex-col xl:flex-row items-center justify-between gap-12">
           <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <div className="flex flex-col items-center md:items-start">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Payment Methods</p>
                 <div className="flex flex-wrap items-center gap-4">
                    {[
                      { l: 'UPI/QR', i: <Zap className="w-3.5 h-3.5" /> },
                      { l: 'Cards', i: <CreditCard className="w-3.5 h-3.5" /> },
                      { l: 'Net Banking', i: <Banknote className="w-3.5 h-3.5" /> },
                      { l: 'Wallet', i: <Wallet className="w-3.5 h-3.5" /> }
                    ].map(m => (
                      <div key={m.l} className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100 text-[11px] font-black text-gray-700">
                         {m.i} {m.l}
                      </div>
                    ))}
                 </div>
              </div>
              <div className="flex flex-col items-center md:items-start">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Delivery Partners</p>
                 <div className="flex items-center gap-4">
                    {[
                      { l: 'DHL', i: <Truck className="w-3.5 h-3.5" /> },
                      { l: 'BlueDart', i: <Ship className="w-3.5 h-3.5" /> },
                      { l: 'DTDC', i: <Truck className="w-3.5 h-3.5" /> }
                    ].map(m => (
                      <div key={m.l} className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100 text-[11px] font-black text-gray-700">
                         {m.i} {m.l}
                      </div>
                    ))}
                 </div>
              </div>
           </div>
           
           <div className="text-center xl:text-right">
              <div className="flex items-center justify-center xl:justify-end gap-3 text-primary mb-2">
                 <ShieldCheck className="w-5 h-5" />
                 <span className="text-sm font-black uppercase tracking-widest">ISO 9001:2015 Certified</span>
              </div>
              <p className="text-xs font-bold text-gray-400">Quality Management System Standard</p>
           </div>
        </div>

        {/* Legal Bottom Bar */}
        <div className="flex flex-col xl:flex-row justify-between items-center gap-8 border-t border-gray-50 pt-8">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">
            <span>Copyright © {currentYear} PCB GLOBE</span>
            <span className="hidden sm:inline w-1 h-1 bg-gray-300 rounded-full" />
            <span>
              Design and promoted by <a href="https://www.24digitalindia.com/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors underline decoration-gray-300 hover:decoration-primary/30 underline-offset-4">24Digitalindia</a>
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-primary transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
