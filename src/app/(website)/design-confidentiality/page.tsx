import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import LegalSidebar from '@/components/legal/LegalSidebar';

export default function DesignConfidentialityPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 pt-28 pb-32">
      <div className="container mx-auto px-4 sm:px-6 max-w-[1400px]">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-[13px] font-bold text-gray-500 mb-8 max-w-6xl mx-auto">
          <Link href="/" className="hover:text-[#ff6b00] transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900">Design Confidentiality</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 max-w-6xl mx-auto">
          <LegalSidebar />
          <div className="flex-1 bg-white border border-gray-100 rounded-3xl p-8 md:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.04)] animate-in fade-in slide-in-from-bottom-8 duration-500">
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-10 pb-6 border-b border-gray-100">
              Design Confidentiality
            </h1>
            <div className="prose prose-gray max-w-none prose-p:text-[15px] prose-p:leading-[1.8] prose-p:font-medium prose-p:text-gray-600 text-gray-600">
              <p>Your Designs uploaded on the platform are secure with a legally binding NDA. In addition to NDA, we have developed a state-of-the-art technology which minimizes the data shared within our connected factory, only on a need to know basis.</p>
              <p>We also use order abstraction to keep your information confidential on the factory floor.</p>
              <p>Your designs uploaded are sent to our secure servers via encrypted channel. We take your data security as top priority and is safe with us.</p>
              <p className="mt-8 text-gray-900 font-bold">For more information, write to us - <a href="mailto:support@pcbglobe.com" className="text-[#ff6b00] hover:underline">support@pcbglobe.com</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
