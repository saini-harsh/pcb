"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LegalSidebar() {
  const pathname = usePathname();

  const sidebarLinks = [
    { name: 'Terms Of Use', href: '/terms-and-conditions' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Design Confidentiality', href: '/design-confidentiality' },
    { name: 'Payment Information', href: '/payment-information' },
    { name: 'Shipping Information', href: '/shipping-information' },
    { name: 'Quality Assurance', href: '/quality-assurance' },
    { name: 'Author Incentive Program', href: '/author-incentive-program' },
    { name: 'ISO Certificate', href: '/iso-certificate' },
    { name: 'Business Account', href: '/business-account' },
    { name: 'PCB Manufacturing', href: '/pcb-manufacturing' },
  ];

  return (
    <div className="w-full lg:w-72 shrink-0">
      <div className="bg-[#fffdfa] border border-orange-100/50 rounded-3xl p-6 sticky top-32 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        <nav className="flex flex-col gap-2">
          {sidebarLinks.map((link, idx) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={idx} 
                href={link.href}
                className={`px-4 py-3 rounded-xl text-[14px] font-bold transition-all ${
                  isActive 
                    ? 'bg-orange-50 text-[#ff6b00] border border-orange-100' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
