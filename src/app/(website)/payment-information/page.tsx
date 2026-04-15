import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import LegalSidebar from '@/components/legal/LegalSidebar';

export default function PaymentInformationPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 pt-28 pb-32">
      <div className="container mx-auto px-4 sm:px-6 max-w-[1400px]">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-[13px] font-bold text-gray-500 mb-8 max-w-6xl mx-auto">
          <Link href="/" className="hover:text-[#ff6b00] transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900">Payment Information</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 max-w-6xl mx-auto">
          <LegalSidebar />
          <div className="flex-1 bg-white border border-gray-100 rounded-3xl p-8 md:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.04)] animate-in fade-in slide-in-from-bottom-8 duration-500">
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-10 pb-6 border-b border-gray-100">
              Payment Information
            </h1>
            <div className="prose prose-gray max-w-none prose-p:text-[15px] prose-p:leading-[1.8] prose-p:font-medium prose-p:text-gray-600 prose-headings:text-gray-900 prose-headings:font-bold">
              <p>Order will be processed only after Payment is made. For Enterprise Customers we have Purchase Order(PO) option.</p>
              <p>We accept payments in <strong>INR/USD</strong>.</p>
              <p>Available Payment Methods for International Orders - Credit Card, Debit Card.</p>
              <p>Available Payment Methods for Indian Orders - Credit Card, Debit Card, Net Banking, Digital Wallets, UPI.</p>
              <p className="mb-8">NEFT/Cheque option for Enterprise Customers along with above Payment Methods.</p>
              
              <h3 className="text-lg">Credit Card</h3>
              <p>Transaction can be made through CREDIT CARD by entering your CREDIT CARD number, name, expiry date. We accept both VISA and MASTERCARD.</p>
              
              <h3 className="text-lg mt-6">Debit Card</h3>
              <p>Transaction can be made through DEBIT CARD by entering your DEBIT CARD number, name, expiry date. We accept both VISA and MASTERCARD.</p>
              
              <h3 className="text-lg mt-6">Net Banking</h3>
              <p>Transaction can be made through your banking portal. We support all major banks in INDIA.</p>
              
              <h3 className="text-lg mt-6">UPI</h3>
              <p>Transaction can be made using Unified Payments Interface (UPI) by entering your Virtual Payment Address.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
