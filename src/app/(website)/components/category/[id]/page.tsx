'use client'

import React, { useState, useEffect, use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
   Search, ShoppingCart, ChevronLeft, Star,
   LayoutGrid, ArrowLeft
} from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
   const { id } = use(params)
   const { addItem } = useCart()
   const router = useRouter()
   const [categoryData, setCategoryData] = useState<any>(null)
   const [products, setProducts] = useState<any[]>([])
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      // Fetch category details
      fetch(`/api/categories/${id}`)
         .then(res => res.json())
         .then(data => {
            if (data?.id) setCategoryData(data)
         })
         .catch(err => console.error('Error fetching category:', err))

      // Fetch Products for this category
      fetch(`/api/products?where[category][equals]=${id}&depth=1&limit=50`)
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
            setLoading(false)
         })
         .catch(err => {
            console.error('Error fetching products:', err)
            setLoading(false)
         })
   }, [id])

   return (
      <main className="min-h-screen bg-white">
         <div className="fixed inset-0 pointer-events-none opacity-40">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] -mr-40 -mt-40" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gray-100 rounded-full blur-[120px] -ml-40 -mb-40" />
         </div>

         <div className="relative z-10">
            <div className="container mx-auto px-6 pt-10 pb-6">
               <button onClick={() => router.push('/components')} className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors mb-6 uppercase tracking-widest">
                  <ArrowLeft className="w-4 h-4" /> Back to Categories
               </button>
               
               <div className="flex items-center justify-between border-b border-gray-100 pb-10">
                  <div className="flex-1">
                     <h2 className="text-4xl md:text-7xl font-black text-gray-900 tracking-tighter italic leading-none mb-4">
                        {categoryData ? categoryData.name : 'Category'} Products.
                     </h2>
                     <p className="text-gray-500 font-medium text-lg max-w-2xl">
                        Explore all the products specifically curated under this selected category. Need specific filters? Use the directory tools below.
                     </p>
                  </div>
               </div>
            </div>

            <div className="container mx-auto px-6 pb-32">
               {loading ? (
                  <div className="py-20 text-center text-gray-400 font-bold uppercase tracking-widest animate-pulse">Loading products...</div>
               ) : products.length === 0 ? (
                  <div className="py-20 text-center text-gray-400 font-bold uppercase tracking-widest">No products found in this category.</div>
               ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-12">
                     {products.map((p, pIdx) => (
                        <Link href={`/components/${p.id}`} key={pIdx} className="group flex flex-col items-center bg-white p-5 rounded-[35px] border border-gray-100 hover:border-primary/20 hover:shadow-2xl transition-all flex-1 cursor-pointer">
                           <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden mb-6 bg-gray-50 shadow-inner group-hover:scale-[1.02] transition-transform">
                              <Image
                                 src={p.img}
                                 alt={p.name}
                                 fill
                                 className="object-cover p-4 opacity-80 group-hover:opacity-100 transition-all"
                                 unoptimized
                              />
                              <div
                                 className="absolute bottom-3 right-3 p-3 bg-primary text-white rounded-[16px] shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:scale-110 active:scale-95 z-10"
                                 onClick={(e) => {
                                    e.preventDefault();
                                    addItem({
                                       id: p.id,
                                       name: p.name,
                                       price: p.rawPrice,
                                       quantity: 1,
                                       image: p.img,
                                       manufacturer: p.brand,
                                       description: p.description
                                    });
                                 }}
                              >
                                 <ShoppingCart className="w-4 h-4" />
                              </div>
                           </div>
                           <div className="text-center w-full grow flex flex-col">
                              <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1 block">{p.brand}</span>
                              <h4 className="text-base font-black text-gray-950 mb-2 italic truncate px-2 group-hover:text-primary transition-colors">{p.name}</h4>
                              <div className="flex items-center justify-center gap-1 mb-4">
                                 <div className="flex text-orange-400"><Star className="w-3 h-3 fill-current" /></div>
                                 <span className="text-[10px] font-black text-gray-400">{p.rating}</span>
                              </div>
                              <div className="mt-auto">
                                 <p className="text-xl font-black text-gray-900 tracking-tighter italic mb-4">{p.price}</p>
                              </div>
                           </div>
                        </Link>
                     ))}
                  </div>
               )}
            </div>
         </div>
      </main>
   )
}
