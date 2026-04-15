import Link from 'next/link';
import { ChevronRight, Award } from 'lucide-react';
import LegalSidebar from '@/components/legal/LegalSidebar';

export default function ISOCertificatePage() {
  return (
    <div className="min-h-screen bg-gray-50/50 pt-28 pb-32">
      <div className="container mx-auto px-4 sm:px-6 max-w-[1400px]">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-[13px] font-bold text-gray-500 mb-8 max-w-6xl mx-auto">
          <Link href="/" className="hover:text-[#ff6b00] transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900">ISO Certificate</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 max-w-6xl mx-auto">
          <LegalSidebar />
          <div className="flex-1 bg-white border border-gray-100 rounded-3xl p-8 md:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.04)] animate-in fade-in slide-in-from-bottom-8 duration-500">
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-10 pb-6 border-b border-gray-100">
              ISO9001:2015 Certified
            </h1>
            <div className="prose prose-gray max-w-none prose-p:text-[15px] prose-p:leading-[1.8] prose-p:font-medium prose-p:text-gray-600">
              <p>PCB GLOBE is ISO 9001:2015 Certified for its high standard, affordable online pcb manufacturing and assembly services. PCB GLOBE commits to produce the best pcb fabrication, smt and through-hole assembly, and component sourcing services to customers.</p>
              
              <div className="mt-12 flex items-center justify-center p-12 bg-gray-50 border border-gray-100 rounded-[2rem]">
                <div className="text-center">
                  <Award className="w-24 h-24 text-[#ff6b00] mx-auto mb-6 opacity-90" />
                  <h3 className="text-3xl font-black text-gray-900 tracking-widest uppercase mb-2">CERTIFICATE</h3>
                  <p className="text-[15px] font-bold text-gray-500 mb-8 uppercase tracking-widest">Quality Management System Standard</p>
                  <p className="text-[17px] font-bold text-gray-700 max-w-md mx-auto leading-relaxed border-t border-gray-200 pt-8">
                    The Certification Body certifies that <span className="text-[#ff6b00]">PCB GLOBE</span> has implemented a Quality Management System in accordance with ISO 9001:2015.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
