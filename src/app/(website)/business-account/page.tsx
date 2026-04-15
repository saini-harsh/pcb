import Link from 'next/link';
import { ChevronRight, Check, X, Building2, SearchCode, PhoneCall } from 'lucide-react';
import LegalSidebar from '@/components/legal/LegalSidebar';

export default function BusinessAccountInfoPage() {
  const tiers = [
    {
      name: "Basic",
      price: "Free",
      features: ["DFM checks, post payment", "General e-mail support", "Dynamic Pricing"],
      button: "SIGN UP",
      href: "/sign-up"
    },
    {
      name: "Business",
      price: "Free",
      subtitle: "(Business proof Needed)",
      features: ["Call Support", "Priority e-mail support", "Credit Line Eligible"],
      button: "APPLY NOW",
      href: "/dashboard/business",
      featured: true
    },
    {
      name: "Enterprise",
      price: "Paid",
      subtitle: "(Contact us)",
      features: ["Unlimited DFM Checks", "Priority access to New features", "Assigned Account representative", "SLA based Support"],
      button: "CONTACT US",
      href: "/contact-us"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 pt-28 pb-32">
      <div className="container mx-auto px-4 sm:px-6 max-w-[1400px]">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-[13px] font-bold text-gray-500 mb-8 max-w-6xl mx-auto">
          <Link href="/" className="hover:text-[#ff6b00] transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900">Business Account Info</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 max-w-6xl mx-auto">
          <LegalSidebar />
          <div className="flex-1 bg-white border border-gray-100 rounded-3xl p-8 md:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.04)] animate-in fade-in slide-in-from-bottom-8 duration-500">
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-10 pb-6 border-b border-gray-100">
              Become a PCB GLOBE member today
            </h1>
            
            {/* Pricing Tiers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {tiers.map((tier) => (
                <div key={tier.name} className={`rounded-3xl p-8 flex flex-col ${tier.featured ? 'bg-orange-50 border-2 border-orange-200' : 'bg-gray-50 border border-gray-100'}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center border-2 ${tier.featured ? 'border-[#ff6b00]' : 'border-gray-400'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${tier.featured ? 'bg-[#ff6b00]' : 'bg-transparent'}`} />
                    </div>
                    <span className="text-[15px] font-bold text-gray-600 uppercase tracking-widest">{tier.name}</span>
                  </div>
                  <div className="mb-8 h-20">
                    <span className="text-3xl font-black text-gray-900 block">{tier.price}</span>
                    {tier.subtitle && <span className="text-[13px] font-semibold text-gray-500">{tier.subtitle}</span>}
                  </div>
                  <ul className="space-y-4 mb-10 flex-1">
                    {tier.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-green-600 font-bold" />
                        </div>
                        <span className="text-[14px] font-semibold text-gray-700 leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={tier.href} className={`h-12 rounded-xl flex items-center justify-center text-[13px] font-black uppercase tracking-widest transition-all ${tier.featured ? 'bg-[#ff6b00] text-white hover:bg-gray-900' : 'bg-white text-gray-900 border-2 border-gray-200 hover:border-gray-900'}`}>
                    {tier.button}
                  </Link>
                </div>
              ))}
            </div>

            <div className="prose prose-gray max-w-none prose-p:text-[15px] prose-p:leading-[1.8] prose-p:font-medium prose-p:text-gray-600">
              <p className="text-lg text-gray-900 font-bold mb-10 border-l-4 border-[#ff6b00] pl-4">Are you an Enterprise? We have got you covered too. <br/>Contact <a href="mailto:sales@pcbglobe.com" className="text-[#ff6b00] hover:underline">sales@pcbglobe.com</a> and request for pricing.</p>
              
              <div className="flex items-start gap-4 mt-12 mb-6">
                 <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center shrink-0">
                    <SearchCode className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 mt-0">24/7 Manufacturing Feedback</h3>
                    <p>Our InstaDFM system self learns based on previous manufacturing feedback and provides valuable manufacturing insights to prevent quality issues. You can update the design and it auto runs to verify the design updates, thus reducing the risk of manufacturing delays. You can now get DFM feedback before order is placed by subscribing to one of the paid plans.<br/><span className="text-xs text-gray-400 uppercase tracking-widest block mt-4">* Our DFM engineers will verify the instant feedback and validate it.</span></p>
                 </div>
              </div>

              <div className="flex items-start gap-4 mt-12 mb-10">
                 <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center shrink-0">
                    <PhoneCall className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 mt-0">Talk to PCB GLOBE experts</h3>
                    <p>Talk to our team for help with PCB GLOBE platform tools or services. Get priority support from dedicated experts on orders. We will be helping you with all your queries and doubts.</p>
                 </div>
              </div>

              {/* Service Feature Matrix */}
              <div className="overflow-x-auto mt-12">
                 <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="border-b-2 border-gray-200 text-[13px] font-black text-gray-900 uppercase tracking-widest">
                         <th className="py-4">Services</th>
                         <th className="py-4">Basic</th>
                         <th className="py-4">Business</th>
                         <th className="py-4">Enterprise</th>
                      </tr>
                    </thead>
                    <tbody className="text-[14px] font-semibold text-gray-600">
                      {[
                        { s: 'Upload Designs', b: '✓', bs: '✓', e: '✓' },
                        { s: 'Update Designs', b: '✓', bs: '✓', e: '✓' },
                        { s: 'Order Tracking', b: '✓', bs: '✓', e: '✓' },
                        { s: 'Free Shipping', b: '✓', bs: '✓', e: '✓' },
                        { s: 'Instant quote', b: '✓', bs: '✓', e: '✓' },
                        { s: 'DFM Checks before Order Placement', b: '✗', bs: '✗', e: 'Unlimited' },
                        { s: 'Turn-Key-Service', b: '✓', bs: '✓', e: '✓' },
                        { s: 'Email Support', b: 'General', bs: 'Priority', e: 'Dedicated' },
                        { s: 'Call Support', b: '✗', bs: '✓', e: '✓' },
                        { s: 'Credit Line Eligible', b: '✗', bs: '✓', e: '✓' },
                      ].map((row, i) => (
                        <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                           <td className="py-4 font-bold text-gray-900">{row.s}</td>
                           <td className="py-4">{row.b === '✓' ? <Check className="w-4 h-4 text-green-500" /> : row.b === '✗' ? <X className="w-4 h-4 text-gray-300" /> : row.b}</td>
                           <td className="py-4">{row.bs === '✓' ? <Check className="w-4 h-4 text-green-500" /> : row.bs === '✗' ? <X className="w-4 h-4 text-gray-300" /> : row.bs}</td>
                           <td className="py-4 font-bold text-[#ff6b00]">{row.e === '✓' ? <Check className="w-4 h-4 text-green-500" /> : row.e === '✗' ? <X className="w-4 h-4 text-gray-300" /> : row.e}</td>
                        </tr>
                      ))}
                    </tbody>
                 </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
