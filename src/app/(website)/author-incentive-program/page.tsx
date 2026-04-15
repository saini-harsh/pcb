import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import LegalSidebar from '@/components/legal/LegalSidebar';

export default function AuthorIncentiveProgramPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 pt-28 pb-32">
      <div className="container mx-auto px-4 sm:px-6 max-w-[1400px]">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-[13px] font-bold text-gray-500 mb-8 max-w-6xl mx-auto">
          <Link href="/" className="hover:text-[#ff6b00] transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900">Author Incentive Program</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 max-w-6xl mx-auto">
          <LegalSidebar />
          <div className="flex-1 bg-white border border-gray-100 rounded-3xl p-8 md:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.04)] animate-in fade-in slide-in-from-bottom-8 duration-500">
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-10 pb-6 border-b border-gray-100">
              Author Incentive Program
            </h1>
            <div className="prose prose-gray max-w-none prose-p:text-[15px] prose-p:leading-[1.8] prose-p:font-medium prose-p:text-gray-600 prose-headings:text-gray-900 prose-headings:font-bold">
              <p>We at PCB GLOBE would love to engage with all our customers and we are creating a platform for tech enthusiasts who are interested in writing engineering articles/ blogs or share a DIY project that they have been working on with the community.</p>
              <p>If you are one of them then here is the right opportunity. To help all you enthusiasts PCB GLOBE has introduced a <strong>Author Incentive Program.</strong></p>
              
              <h3 className="text-lg mt-8">What is Author Incentive Program?</h3>
              <p>You can contribute engineering articles, tech blogs or DIY project related to electronics and you will be incentivised with coupons worth upto INR 3000 to order on PCB GLOBE Platform. Recognition on our blog & on social media platforms will be provided as well.</p>
              
              <p className="mt-8 mb-4 font-bold text-gray-900">Below are the categories in which you can submit an entry -</p>
              
              <div className="space-y-6">
                <div className="p-6 bg-gray-50 border border-gray-100 rounded-2xl">
                  <h4 className="font-bold text-gray-900 mb-2">Category-A: Tech Blog</h4>
                  <p className="text-sm">Here you can write on general technology topics related to electronics and the content should be unique and your own take on the subject( It should not be a copy of content from other articles) Example – "IOT in asset tracking simplified"</p>
                  <div className="mt-4 p-3 bg-white border border-orange-100 rounded-xl text-sm font-semibold text-gray-700">
                    <span className="text-[#ff6b00]">Incentive</span> - INR1500 worth Platform Coupons which can be used for any PCB Fabrication or Assembly Services. Minimum word count: 1000 words, Minimum Images: 2
                  </div>
                </div>

                <div className="p-6 bg-gray-50 border border-gray-100 rounded-2xl">
                  <h4 className="font-bold text-gray-900 mb-2">Category-B: Engineering Articles</h4>
                  <p className="text-sm">Here you can write on core electronics/ hardware/manufacturing related topics and the content should be your original take on the subject. Block diagrams/Custom architecture diagrams are a plus. These are typically detailed engineering topics for example- "Materials used in High Speed PCBs" Or "Teardown of xyz device" Or "Optimising Battery Management Systems for Thermal dissipation" are few.</p>
                  <div className="mt-4 p-3 bg-white border border-orange-100 rounded-xl text-sm font-semibold text-gray-700">
                    <span className="text-[#ff6b00]">Incentive</span> - INR2500 worth Platform Coupons which can be used for any PCB Fabrication or Assembly Services. Minimum word count: 1800 words, Minimum Images: 3
                  </div>
                </div>

                <div className="p-6 bg-gray-50 border border-gray-100 rounded-2xl">
                  <h4 className="font-bold text-gray-900 mb-2">Category-C: DIY projects</h4>
                  <p className="text-sm">Here you can share your own projects that you have built using our services and share with the community the detailed instructions on building it. We encourage you make the project open source so that interested members can build on their own as well. Details of the Project/Functionality, PCB schematics, Layout and Firmware (if needed) are to be explained in detail along with sourcing and build instructions if any.</p>
                  <div className="mt-4 p-3 bg-white border border-orange-100 rounded-xl text-sm font-semibold text-gray-700">
                    <span className="text-[#ff6b00]">Incentive</span> - INR3000 worth Platform Coupons which can be used for any PCB Fabrication or PCB Assembly Services. Minimum word count: 2000 words, Minimum Images: 3
                  </div>
                </div>
              </div>

              <p className="mt-10 font-bold text-gray-900 text-[16px]">You can email your articles to <a href="mailto:sales@pcbglobe.com" className="text-[#ff6b00] hover:underline">sales@pcbglobe.com</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
