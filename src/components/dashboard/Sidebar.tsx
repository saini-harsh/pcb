"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useClerk } from "@clerk/nextjs";
import {
  User, Building2,
  FolderGit2, ShoppingCart, Cpu,
  FileText, HelpCircle, BookOpen, Info,
  LogOut, Globe, Camera, MessageSquare, Video, Mail, ChevronRight
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const { signOut } = useClerk();

  const navGroups = [
    {
      title: "My Account",
      items: [
        { label: "My Account", href: "/dashboard/account", icon: <User className="w-4 h-4" /> },
        { label: "Business Account", href: "/dashboard/business", icon: <Building2 className="w-4 h-4" /> },
      ]
    },
    {
      title: "Orders",
      items: [
        { label: "My Projects", href: "/dashboard/projects", icon: <FolderGit2 className="w-5 h-5" /> },
        { label: "My Cart", href: "/dashboard/cart", icon: <ShoppingCart className="w-5 h-5" /> },
        { label: "Buy Components", href: "/components", icon: <Cpu className="w-5 h-5" />, external: true },
      ]
    },
    {
      title: "Resources",
      items: [
        { label: "Capabilities", href: "/capabilities", icon: <FileText className="w-4 h-4" />, external: true },
        { label: "FAQs", href: "/faq", icon: <HelpCircle className="w-4 h-4" />, external: true },
        { label: "User Guides", href: "/guides", icon: <BookOpen className="w-4 h-4" />, external: true },
        { label: "About PCBCircuits", href: "/about", icon: <Info className="w-4 h-4" />, external: true },
      ]
    }
  ];

  return (
    <div className="w-72 bg-white h-[calc(100vh-80px)] sticky top-[80px] border-r border-gray-100 flex flex-col justify-between overflow-y-auto custom-scrollbar">

      {/* Navigation Groups */}
      <div className="py-6 flex flex-col gap-8">
        {navGroups.map((group, idx) => (
          <div key={idx} className="px-6 flex flex-col gap-3">
            <h3 className="text-[11px] font-black uppercase tracking-widest text-[#ff6b00]">{group.title}</h3>
            <div className="flex flex-col gap-1">
              {group.items.map((item, itemIdx) => {
                const isActive = pathname === item.href;
                // Special styling for primary "Orders" actions to match screenshot
                const isPrimaryAction = group.title === "Orders";

                return (
                  <Link
                    key={itemIdx}
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group
                      ${isActive
                        ? 'bg-[#ff6b00] text-white shadow-lg shadow-orange-500/20 font-bold'
                        : 'text-gray-700 hover:bg-orange-50 hover:text-[#ff6b00] font-semibold'
                      }
                      ${isPrimaryAction && !isActive ? 'px-4 py-3.5' : ''}
                    `}
                  >
                    <span className={`${isActive ? 'text-white' : 'text-gray-400 group-hover:text-[#ff6b00]'} transition-colors`}>
                      {item.icon}
                    </span>
                    <span className="text-sm tracking-tight">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Area */}
      <div className="p-6 border-t border-gray-100 mt-auto bg-gray-50/50">
        <div className="flex items-center gap-3 mb-6 text-orange-200">
          <Link href="#" className="p-2 hover:bg-orange-100 rounded-lg hover:text-[#ff6b00] transition-colors"><Globe className="w-5 h-5" /></Link>
          <Link href="#" className="p-2 hover:bg-orange-100 rounded-lg hover:text-[#ff6b00] transition-colors"><Camera className="w-5 h-5" /></Link>
          <Link href="#" className="p-2 hover:bg-orange-100 rounded-lg hover:text-[#ff6b00] transition-colors"><MessageSquare className="w-5 h-5" /></Link>
          <Link href="#" className="p-2 hover:bg-orange-100 rounded-lg hover:text-[#ff6b00] transition-colors"><Video className="w-5 h-5" /></Link>
          <Link href="#" className="p-2 hover:bg-orange-100 rounded-lg hover:text-[#ff6b00] transition-colors"><Mail className="w-5 h-5" /></Link>
        </div>

        <button
          onClick={() => signOut({ redirectUrl: '/' })}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-2xl text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors font-bold group"
        >
          <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-400" />
          <span className="text-sm">Logout</span>
        </button>
      </div>

    </div>
  );
}
