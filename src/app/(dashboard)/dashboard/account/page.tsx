"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { User, FileText, PackageOpen, Briefcase, Mail } from "lucide-react";

export default function AccountHubPage() {
  const { user } = useUser();

  const accountCards = [
    {
      title: "My Profile",
      description: "Personal Information | Email | Phone Number | Business Account",
      icon: <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 overflow-hidden border-2 border-white shadow-sm ring-2 ring-gray-50"><User className="w-5 h-5" /></div>,
      href: "/dashboard/account/profile"
    },
    {
      title: "Billing and Shipping Details",
      description: "Billing id's | Addresses | Shipping Addresses",
      icon: <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 border-2 border-white shadow-sm ring-2 ring-gray-50"><FileText className="w-5 h-5" /></div>,
      href: "/dashboard/account/billing"
    },
    {
      title: "Your Orders",
      description: "Track Projects | Project list and details | Reorder",
      icon: <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600 border-2 border-white shadow-sm ring-2 ring-gray-50"><PackageOpen className="w-5 h-5" /></div>,
      href: "/dashboard/projects"
    },
    {
      title: "Business Account",
      description: "Create a business account if you represent a company or as a business",
      icon: <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 border-2 border-white shadow-sm ring-2 ring-gray-50"><Briefcase className="w-5 h-5" /></div>,
      href: "/dashboard/business"
    },
    {
      title: "Contact Us",
      description: "Contact our customer service or sales team via phone call or mail",
      icon: <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 border-2 border-white shadow-sm ring-2 ring-gray-50"><Mail className="w-5 h-5" /></div>,
      href: "/contact-us"
    }
  ];

  return (
    <div className="p-8 pt-4 max-w-6xl mx-auto animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">
          My Account
        </h1>
        <p className="text-gray-500 text-lg font-medium tracking-wide">
          Customer id: <span className="text-gray-900">10000{user?.id?.replace(/\D/g, '').substring(0, 4) || '48353'}</span>
        </p>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accountCards.map((card, idx) => (
          <Link 
            key={idx} 
            href={card.href}
            className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all group"
          >
            <div className="flex items-center gap-4 mb-4">
              {card.icon}
              <h2 className="text-xl font-bold text-gray-900 group-hover:text-[#ff6b00] transition-colors">{card.title}</h2>
            </div>
            
            <p className="text-sm font-medium text-gray-500 mb-6 flex-1 pr-4 leading-relaxed">
              {card.description}
            </p>
            
            <div className="flex justify-end w-full">
              <div className="w-8 h-8 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center group-hover:bg-[#ff6b00] group-hover:text-white transition-colors">
                <span className="text-lg font-bold leading-none translate-x-[1px]">&rarr;</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
