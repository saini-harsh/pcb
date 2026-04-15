'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
   Search, ShoppingCart, ChevronRight, ChevronLeft, Star,
   Filter, LayoutGrid
} from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { ClientOnly } from '@/components/ClientOnly'

const ShopPage = () => {
   const { addItem, cartCount } = useCart()
   const [popularIndex, setPopularIndex] = useState(0)
   const [addedItems, setAddedItems] = useState<Record<string, boolean>>({})

   const [categories, setCategories] = useState([
      { name: 'Microcontrollers', count: 1240 },
      { name: 'Passive Components', count: 8500 },
      { name: 'Integrated Circuits', count: 4200 },
      { name: 'Modules & Boards', count: 960 },
      { name: 'Connectors & Cables', count: 2100 },
      { name: 'Power Management', count: 1800 },
      { name: 'Sensors & Wireless', count: 1100 },
      { name: 'Tools & Storage', count: 450 }
   ])

   React.useEffect(() => {
      fetch('/api/categories?limit=100')
         .then(res => res.json())
         .then(async data => {
            if (data.docs && data.docs.length > 0) {
               // Dynamically fetch the product count for each category
               const dynamicCategories = await Promise.all(data.docs.map(async (cat: any) => {
                  try {
                     const res = await fetch(`/api/products?where[category][equals]=${cat.id}&limit=0`);
                     const pData = await res.json();
                     return { ...cat, count: pData.totalDocs || 0 };
                  } catch (err) {
                     return cat;
                  }
               }));
               setCategories(dynamicCategories)
            }
         })
         .catch(err => console.error('Error fetching categories:', err))
   }, [])

   interface Product {
      id: string | number;
      name: string;
      brand: string;
      price: string;
      img: string;
      rating: number;
   }

   type MediaDoc = {
      url?: string;
      filename?: string;
      thumbnailURL?: string;
   };

   type ProductDoc = {
      id: string | number;
      name: string;
      brand: string;
      price: number;
      rating?: number;
      images?: MediaDoc[];
      image?: MediaDoc | null;
   };

   const [products, setProducts] = useState<Product[]>([])

   React.useEffect(() => {
      // Fetch Products
      fetch('/api/products?depth=1&limit=50')
         .then(res => res.json())
         .then(data => {
            if (data.docs && data.docs.length > 0) {
               const mapped = (data.docs as any[]).map((p) => {
                  const toMediaUrl = (media: any): string | null => {
                     if (!media) return null;
                     if (typeof media === 'string') return media;
                     if (media.url) return media.url;
                     if (media.filename) return `/media/${media.filename}`;
                     if (media.thumbnailURL) return media.thumbnailURL;
                     return null;
                  };

                  const images = (Array.isArray(p.images) && p.images.length > 0)
                     ? p.images
                     : (p.image ? [p.image] : []);

                  const firstImageUrl = toMediaUrl(images?.[0]);
                  const img = firstImageUrl || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop';

                  return {
                     id: p.id,
                     name: p.name || p.mpn || 'Unnamed Component',
                     brand: p.brand || p.manufacturer || 'Generic',
                     price: `₹${Number(p.price || 0).toLocaleString('en-IN')}.00`,
                     rawPrice: Number(p.price || 0),
                     img,
                     rating: p.rating ?? 0,
                     description: p.description || ''
                  };
               })
               setProducts(mapped)
            }
         })
         .catch(err => console.error('Error fetching products:', err))
   }, [])

   const handleAddToCart = (e: React.MouseEvent, p: any) => {
      e.preventDefault();
      e.stopPropagation();
      addItem({
         id: p.id,
         name: p.name,
         price: p.rawPrice,
         quantity: 1,
         image: p.img,
         manufacturer: p.brand,
         description: p.description
      });
      setAddedItems(prev => ({ ...prev, [p.id]: true }));
      setTimeout(() => {
         setAddedItems(prev => ({ ...prev, [p.id]: false }));
      }, 2000);
   };

   // UI layout for products is just a grid, removing slider logic.

   return (
      <main className="min-h-screen bg-white">
         <div className="fixed inset-0 pointer-events-none opacity-40">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] -mr-40 -mt-40" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gray-100 rounded-full blur-[120px] -ml-40 -mb-40" />
         </div>

         <div className="relative z-10">
            {/* Search Header */}
            <section className="pt-10 pb-6 container mx-auto px-6">
               <div className="p-2 bg-gray-50/50 backdrop-blur-2xl border border-gray-100 rounded-[35px] flex flex-col md:flex-row items-center gap-4">
                  <div className="relative flex-1 group w-full">
                     <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                     <input
                        type="text"
                        placeholder="Search 150,000+ Verified Components..."
                        className="w-full pl-16 pr-8 py-5 bg-white border-transparent focus:bg-white rounded-[28px] font-bold text-base focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
                     />
                  </div>
                  <div className="flex items-center gap-3 w-full md:w-auto px-2">
                     <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-5 bg-gray-900 text-white rounded-[28px] font-black text-xs uppercase tracking-widest hover:bg-primary transition-all shadow-xl">
                        <Filter className="w-4 h-4" /> Filter
                     </button>
                     <button className="flex-none p-5 bg-primary text-white rounded-[28px] shadow-xl shadow-primary/20 hover:scale-105 transition-all relative">
                        <ShoppingCart className="w-6 h-6" />
                        <span className="absolute -top-1 -right-1 w-6 h-6 bg-gray-900 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">0</span>
                     </button>
                  </div>
               </div>
            </section>

            <div className="container mx-auto px-6">

               {/* Categories Section */}
               <div className="mb-20 mt-8">
                  <div className="p-8 bg-white/40 backdrop-blur-xl border border-white/60 rounded-[45px] shadow-2xl shadow-gray-200/50">
                     <div className="flex items-center gap-3 mb-10">
                        <LayoutGrid className="w-8 h-8 text-primary" />
                        <h3 className="text-2xl font-black uppercase tracking-[0.2em] text-gray-950 italic">Product Categories</h3>
                     </div>
                     <nav className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {categories.map((cat, i) => (
                           <Link href={`/components/category/${cat.id}`} key={i} className="group flex items-center justify-between p-6 rounded-[24px] bg-white border border-gray-100 hover:border-primary/30 transition-all hover:shadow-xl hover:-translate-y-1 active:scale-95">
                              <div className="flex flex-col items-start gap-1">
                                 <span className="text-base font-bold text-gray-900 group-hover:text-primary transition-colors">{cat.name}</span>
                                 <span className="text-xs font-black text-gray-400">{cat.count} Items</span>
                              </div>
                              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                 <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-all group-hover:translate-x-1" />
                              </div>
                           </Link>
                        ))}
                     </nav>
                  </div>
               </div>

               {/* Products Grid Section */}
               <section className="space-y-12 mb-32">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-gray-100 pb-10">
                     <div className="flex-1">
                        <h2 className="text-4xl md:text-7xl font-black text-gray-900 tracking-tighter italic leading-none mb-4">All Products.</h2>
                     </div>
                     <div className="flex bg-gray-50 p-1.5 rounded-full border border-gray-200 shadow-inner">
                        <button className="px-6 py-3 bg-white text-gray-900 font-bold text-sm rounded-full shadow-sm">Grid View</button>
                        <button className="px-6 py-3 text-gray-400 font-bold text-sm rounded-full hover:text-gray-900 transition-colors">List View</button>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-4">
                     {products.map((p, pIdx) => (
                        <Link href={`/components/${p.id}`} key={pIdx} className="group flex flex-col items-center bg-white p-5 rounded-[35px] border border-gray-100 hover:border-primary/20 hover:shadow-2xl hover:-translate-y-1 transition-all flex-1 cursor-pointer">
                           <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden mb-6 bg-gray-50 flex items-center justify-center">
                              <Image
                                 src={p.img}
                                 alt={p.name}
                                 fill
                                 className="object-contain p-6 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                                 unoptimized
                              />
                              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase text-emerald-600 border border-emerald-100 shadow-sm flex items-center gap-1">
                                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> IN STOCK
                              </div>
                              <button
                                 className="absolute bottom-3 right-3 w-10 h-10 flex items-center justify-center bg-primary text-white rounded-[16px] shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:scale-110 active:scale-95 z-10"
                                 onClick={(e) => handleAddToCart(e, p)}
                              >
                                 {addedItems[p.id] ? <ShoppingCart className="w-4 h-4 fill-current" /> : <ShoppingCart className="w-4 h-4" />}
                              </button>
                           </div>
                           <div className="text-center w-full grow flex flex-col">
                              <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2 block">{p.brand}</span>
                              <h4 className="text-sm font-black text-gray-950 mb-3 truncate px-2 group-hover:text-primary transition-colors">{p.name}</h4>
                              <div className="flex items-center justify-center gap-1 mb-5">
                                 <div className="flex text-orange-400 gap-0.5">
                                    {[1,2,3,4,5].map(star => (
                                       <Star key={star} className={`w-3 h-3 ${p.rating >= star ? 'fill-current' : 'text-gray-200 fill-gray-200'}`} />
                                    ))}
                                 </div>
                                 <span className="text-[10px] font-black text-gray-400 ml-1">({p.rating})</span>
                              </div>
                              <div className="mt-auto">
                                 <p className="text-lg font-black text-gray-900 tracking-tighter mb-2">{p.price}</p>
                              </div>
                           </div>
                        </Link>
                     ))}
                  </div>
               </section>
            </div>
         </div>
      </main>
   )
}

export default ShopPage

