import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import LegalSidebar from '@/components/legal/LegalSidebar';

export default function ShippingInformationPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 pt-28 pb-32">
      <div className="container mx-auto px-4 sm:px-6 max-w-[1400px]">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-[13px] font-bold text-gray-500 mb-8 max-w-6xl mx-auto">
          <Link href="/" className="hover:text-[#ff6b00] transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900">Shipping Information</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 max-w-6xl mx-auto">
          <LegalSidebar />
          <div className="flex-1 bg-white border border-gray-100 rounded-3xl p-8 md:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.04)] animate-in fade-in slide-in-from-bottom-8 duration-500">
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-10 pb-6 border-b border-gray-100">
              Shipping Information
            </h1>
            <div className="prose prose-gray max-w-none prose-p:text-[15px] prose-p:leading-[1.8] prose-p:font-medium prose-p:text-gray-600 prose-headings:text-gray-900 prose-headings:font-bold prose-ul:font-medium prose-ul:text-gray-600 prose-li:marker:text-orange-500">
              <p>Please provide us with the correct Shipping Details in your project dashboard.</p>
              <p>This is a sample of a Fabrication Order Summary. Please provide all the necessary order details on our platform for the desired service (Fabrication/Assembly) and click the "Order now" button. You will be re-directed to the Order summary page which prompts you to enter the Billing and Shipping information.</p>
              <p>If you have any address changes, please notify us via mail at <strong>sales@pcbglobe.com</strong>.</p>
              
              <h3 className="text-xl mt-10">Shipment Date Information:</h3>
              <p>Once the payment is completed, the <strong>Ship By Date</strong> option dashboard under Project Details Tab will be reflected with your shipment date.</p>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                <li>PCBs will be shipped on or before the Ship-by-Date.</li>
                <li>An email will be sent with Shipping Details along with Product tracking information after fabrication is complete.</li>
                <li>Please watch our YouTube channel video to know the step-by-step procedure to place an order with PCB GLOBE.</li>
              </ul>

              <h3 className="text-xl mt-10">Shipping Methods:</h3>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                 <li>For International Orders - We use DHL Worldwide Express Shipping.</li>
                 <li>For Standard and Custom Service - We use DTDC.</li>
                 <li>For Rush Service in India - We use DTDC Premium.</li>
              </ul>
              
              <p>For any other special Shipping requests please intimate us (at sales@pcbglobe.com) at the earliest and we will communicate if there are any additional costs involved.</p>
              <p>For any other special Shipping requests please intimate us at the earliest (please provide with the mailing address) and we will communicate if there are any additional costs involved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
