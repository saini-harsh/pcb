import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import LegalSidebar from '@/components/legal/LegalSidebar';

export default function QualityAssurancePage() {
  return (
    <div className="min-h-screen bg-gray-50/50 pt-28 pb-32">
      <div className="container mx-auto px-4 sm:px-6 max-w-[1400px]">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-[13px] font-bold text-gray-500 mb-8 max-w-6xl mx-auto">
          <Link href="/" className="hover:text-[#ff6b00] transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900">Quality Assurance</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 max-w-6xl mx-auto">
          <LegalSidebar />
          <div className="flex-1 bg-white border border-gray-100 rounded-3xl p-8 md:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.04)] animate-in fade-in slide-in-from-bottom-8 duration-500">
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-10 pb-6 border-b border-gray-100">
              Quality Assurance
            </h1>
            <div className="prose prose-gray max-w-none prose-p:text-[15px] prose-p:leading-[1.8] prose-p:font-medium prose-p:text-gray-600">
              <p>PCB GLOBE approach to quality starts from the very beginning of our manufacturing process. We have quality checks in place at every single step of the process. We follow strict quality guidelines and comply with ISO9001:2015 standards and we enforce ISO standards through our technology platform.</p>
              <p>We also have an <strong>instaDFM</strong> engine that provides manufacturability feedback in real-time.</p>
              <p>You can check our DFM feedback on your project dashboard after you finish the payment.</p>
              
              <p className="mt-8">To know more about this feedback, please visit our <span className="text-[#ff6b00] font-bold cursor-pointer hover:underline">DFM Review section</span></p>
              
              <p className="mt-8">At PCB GLOBE our Assembled boards undergo inspection using the Advanced Intelligence-Driven visual inspection system for quality assurance and it learns with every test cycle.</p>
              <p>We abide by carrying out both Functional Testing and In-circuit Testing on your product.</p>
              
              <p className="mt-8 font-bold text-gray-900">To know more about our Test procedures, please <span className="text-[#ff6b00] cursor-pointer hover:underline">click here</span>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
