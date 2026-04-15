'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
   ShoppingBag, Edit2, ArrowRight, ChevronDown, CheckCircle2 
} from 'lucide-react'

export default function MyListsPage() {
   const currentList = {
      name: 'test',
      boardCount: 1,
      items: [
         {
            id: 1,
            mpn: 'STM32F103C8T6',
            description: 'ARM® Cortex®-M3 STM32F1 Microcontroller IC 32-Bit 72MHz 64KB FLASH 48-LQFP',
            unitQty: 1,
            orderQty: 1,
            price: '₹733.16',
            img: 'https://images.unsplash.com/photo-1591405351990-4726e33df48b?q=80&w=2070&auto=format&fit=crop'
         }
      ],
      totals: {
         perBoard: '₹733',
         totalKit: '₹733',
         shipping: '₹100',
         subTotal: '₹833',
         gst: '₹150',
         total: '₹983'
      }
   }

   return (
      <main className="min-h-screen bg-gray-50/50 pt-32 pb-24 relative overflow-hidden">
         {/* Decorative Blur Orbs */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] -mr-40 -mt-40 pointer-events-none" />
         <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-gray-100 rounded-full blur-[120px] -ml-40 -mt-40 pointer-events-none" />

         <div className="container mx-auto px-6 max-w-6xl relative z-10">
            {/* Header section */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="flex items-center gap-4">
                  <div className="relative transform rotate-[-5deg] hover:rotate-0 transition-transform">
                     <div className="w-14 h-16 bg-yellow-400 rounded-[14px] flex items-center justify-center relative shadow-lg">
                        <ShoppingBag className="w-6 h-6 text-white absolute bottom-3" strokeWidth={2.5} />
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 border-[3px] border-yellow-400 rounded-t-full border-b-0" />
                     </div>
                     <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-[3px] border-white flex items-center justify-center shadow-md">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                     </div>
                  </div>
                  <h1 className="text-4xl font-black text-gray-900 tracking-tighter italic">Your list items:</h1>
               </div>

               <div className="flex flex-col sm:flex-row items-center gap-4 text-sm bg-white p-2 pl-6 rounded-full border border-orange-100 shadow-xl shadow-orange-50/50">
                  <span className="text-orange-600 font-bold hidden sm:block">You need to have a billing account to add items to cart</span>
                  <button className="w-full sm:w-auto px-6 py-3 bg-primary text-white rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
                     Create Billing Address <ArrowRight className="w-4 h-4" />
                  </button>
               </div>
            </div>

            {/* List Selector */}
            <div className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
               <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Choose the list you want to view</label>
               <div className="relative w-full sm:w-72">
                  <select className="w-full appearance-none bg-white border border-gray-100 rounded-[20px] px-6 py-4 pr-12 text-sm font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary cursor-pointer shadow-lg hover:border-gray-200 transition-all">
                     <option value="test">test</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center pointer-events-none">
                     <ChevronDown className="w-4 h-4 text-gray-500" />
                  </div>
               </div>
            </div>

            {/* List Content */}
            <div className="bg-white rounded-[45px] shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-gray-100 p-8 sm:p-12 relative overflow-hidden animate-in fade-in slide-in-from-bottom-12 duration-1000">
               {/* List Header */}
               <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-gray-100 pb-8 mb-8 gap-6">
                  <h2 className="text-3xl font-black text-gray-900 tracking-tight">{currentList.name}</h2>
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                     <div className="px-6 py-3 bg-gray-50 rounded-[20px] text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-3">
                        No. of Boards <span className="text-base font-black text-gray-900">{currentList.boardCount}</span>
                     </div>
                     <button className="px-6 py-3.5 rounded-[20px] border-2 border-gray-100 text-gray-900 text-[10px] font-black uppercase tracking-widest hover:border-gray-300 transition-all flex items-center gap-2 active:scale-95">
                        Edit <Edit2 className="w-3.5 h-3.5" />
                     </button>
                     <Link href="/dashboard/cart" className="px-8 py-3.5 rounded-[20px] bg-gray-300 text-white text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all shadow-md flex items-center gap-2 active:scale-95">
                        Add To Cart <ArrowRight className="w-4 h-4" />
                     </Link>
                  </div>
               </div>

               {/* Table */}
               <div className="overflow-x-auto mb-12 rounded-[24px] border border-gray-100">
                  <table className="w-full min-w-[800px]">
                     <thead className="bg-gray-50">
                        <tr>
                           <th className="py-5 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-left">#</th>
                           <th className="py-5 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-left">MPN</th>
                           <th className="py-5 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Unit Quantity</th>
                           <th className="py-5 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Order Quantity</th>
                           <th className="py-5 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Price</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-100">
                        {currentList.items.map((item, i) => (
                           <tr key={i} className="group hover:bg-gray-50 transition-colors">
                              <td className="py-8 px-6 text-sm font-black text-gray-400 w-16">{item.id}</td>
                              <td className="py-8 px-6">
                                 <div className="flex items-center gap-6">
                                    <div className="relative w-20 h-20 bg-white border border-gray-100 rounded-[20px] overflow-hidden shadow-sm shrink-0 group-hover:scale-110 transition-transform">
                                       <Image src={item.img} alt={item.mpn} fill className="object-cover p-2 unoptimized opacity-90 group-hover:opacity-100 transition-all" />
                                    </div>
                                    <div className="max-w-md">
                                       <Link href={`/components/102`} className="text-base font-black text-gray-900 group-hover:text-primary transition-colors mb-2 block italic tracking-tight">
                                          {item.mpn}
                                       </Link>
                                       <p className="text-[11px] font-bold text-gray-400 leading-relaxed uppercase">{item.description}</p>
                                    </div>
                                 </div>
                              </td>
                              <td className="py-8 px-6 text-lg font-black text-gray-900 text-center">{item.unitQty}</td>
                              <td className="py-8 px-6 text-lg font-black text-gray-900 text-center">{item.orderQty}</td>
                              <td className="py-8 px-6 text-xl font-black text-gray-900 text-right italic tracking-tighter">{item.price}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>

               {/* Totals Box */}
               <div className="flex justify-end lg:pr-6">
                  <div className="w-full sm:w-96 bg-gray-50 p-8 rounded-[32px] space-y-4 shadow-inner">
                     <div className="flex justify-between text-[11px] font-black text-gray-500 uppercase tracking-widest">
                        <span>Per Board Cost</span><span className="text-gray-900">{currentList.totals.perBoard}</span>
                     </div>
                     <div className="flex justify-between text-[11px] font-black text-gray-500 uppercase tracking-widest">
                        <span>Total Kit Cost</span><span className="text-gray-900">{currentList.totals.totalKit}</span>
                     </div>
                     <div className="flex justify-between text-[11px] font-black text-gray-500 uppercase tracking-widest">
                        <span>Shipping Charge</span><span className="text-gray-900">{currentList.totals.shipping}</span>
                     </div>
                     <div className="flex justify-between text-[11px] font-black text-gray-500 uppercase tracking-widest pt-4 border-t border-gray-200 border-dashed">
                        <span>Sub Total</span><span className="text-sm text-gray-900">{currentList.totals.subTotal}</span>
                     </div>
                     <div className="flex justify-between text-[11px] font-black text-gray-500 uppercase tracking-widest">
                        <span>GST</span><span className="text-gray-900">{currentList.totals.gst}</span>
                     </div>
                     <div className="flex justify-between items-center pt-4 border-t border-gray-200 border-dashed mt-4">
                        <span className="text-xs font-black text-gray-900 uppercase tracking-widest">Total Cost</span>
                        <span className="text-3xl font-black text-primary italic tracking-tighter">{currentList.totals.total}</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </main>
   )
}
