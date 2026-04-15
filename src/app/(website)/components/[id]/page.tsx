'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
   ChevronRight, ShoppingCart, FileText, CheckCircle2, 
   Download, Search, LayoutGrid, ArrowRight, ChevronDown, Plus, ShoppingBag
} from 'lucide-react'
import { useCart } from '@/context/CartContext'

const DEFAULT_IMAGE_URL =
   'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop';

type MediaDoc = {
   url?: string;
   filename?: string;
   thumbnailURL?: string;
};

type ProductApiDoc = {
   id?: number | string;
   name?: string;
   brand?: string;
   price?: number;
   rating?: number;
   images?: MediaDoc[];
   image?: MediaDoc | null;
   category?: { id?: number | string; name?: string } | number | string | null;
   description?: string;
   basePartNumber?: string;
   stock?: number;
   mpn?: string;
   manufacturer?: string;
   pricingTiers?: Array<{
      qty?: number;
      unitPrice?: number;
      extPrice?: number;
   }>;
   specs?: Array<{
      label?: string;
      value?: string;
   }>;
   datasheet?: MediaDoc | null;
   pcbDetails?: {
      boardType?: string;
      layers?: number;
      material?: string;
      thickness?: string;
      copperWeight?: string;
      surfaceFinish?: string;
      soldermaskColor?: string;
      silkscreenColor?: string;
   };
};

type NormalizedProduct = {
   id?: number | string;
   mpn: string;
   manufacturer: string;
   description: string;
   basePartNumber: string;
   stock: number;
   category: string;
   images: string[];
   pricingTiers: Array<{ qty: string; unitPrice: string; extPrice: string }>;
   specs: Array<{ label: string; value: string }>;
   datasheetUrl: string | null;
   rawPrice: number;
   pcbDetails: any;
};

type RelatedProduct = {
   id?: number | string;
   name: string;
   brand: string;
   price: string;
   img: string;
};

const formatINR = (value: number): string => {
   const safe = Number(value);
   if (Number.isNaN(safe)) return '₹0.00';
   return `₹${safe.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const toMediaUrl = (media: unknown): string | null => {
   if (!media) return null;
   if (typeof media === 'string') return media;
   if (typeof media !== 'object') return null;

   const m = media as MediaDoc;
   if (m.url) return m.url;
   if (m.filename) return `/media/${m.filename}`;
   if (m.thumbnailURL) return m.thumbnailURL;
   return null;
};

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
   const { addItem } = useCart()
   const [activeImg, setActiveImg] = useState(0)
   const [product, setProduct] = useState<NormalizedProduct | null>(null)
   const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([])
   const [qty, setQty] = useState('1')
   const [showListPopup, setShowListPopup] = useState(false);
   const [lists, setLists] = useState<{id: number, name: string}[]>([{ id: 1, name: 'test' }]);
   const [selectedLists, setSelectedLists] = useState<number[]>([1]);
   const [newListName, setNewListName] = useState('');
   const [isAddedToList, setIsAddedToList] = useState(false);
   const [isCreatingList, setIsCreatingList] = useState(false);
   const [isAddedToCart, setIsAddedToCart] = useState(false);
   const [isLightboxOpen, setIsLightboxOpen] = useState(false);

   React.useEffect(() => {
      let cancelled = false;

      const load = async () => {
         try {
            setProduct(null);

            const resolvedParams = await params;
            const productId = resolvedParams.id;
            const productRes = await fetch(`/api/products/${productId}?depth=2`);
            const productDoc = await productRes.json() as ProductApiDoc;

            const imageDocs: MediaDoc[] =
               Array.isArray(productDoc?.images) && productDoc.images.length > 0
                  ? productDoc.images
                  : (productDoc?.image ? [productDoc.image] : []);

            const imageUrls = imageDocs
               .map(toMediaUrl)
               .filter((u): u is string => Boolean(u));

            const category = productDoc?.category;
            const categoryName =
               typeof category === 'object' && category && 'name' in category
                  ? String((category as { name?: string }).name ?? '')
                  : category != null
                    ? String(category)
                    : '';

            const basePartNumber = productDoc?.basePartNumber ?? productDoc?.name ?? '';
            const mpn = productDoc?.mpn ?? productDoc?.name ?? '';
            const manufacturer = productDoc?.manufacturer ?? productDoc?.brand ?? '';

            const pricingTiersRaw = Array.isArray(productDoc?.pricingTiers) ? productDoc.pricingTiers : [];
            const pricingTiers = pricingTiersRaw.length > 0
               ? pricingTiersRaw.map((t) => {
                  const qtyNum = Number(t?.qty ?? 1);
                  const unitPriceNum = Number(t?.unitPrice ?? 0);
                  const extPriceNum = t?.extPrice !== undefined && t?.extPrice !== null
                     ? Number(t.extPrice)
                     : qtyNum * unitPriceNum;
                  return {
                     qty: String(qtyNum),
                     unitPrice: formatINR(unitPriceNum),
                     extPrice: formatINR(extPriceNum),
                  };
               })
               : [{
                  qty: '1',
                  unitPrice: formatINR(productDoc?.price ?? 0),
                  extPrice: formatINR(productDoc?.price ?? 0),
               }];

            const specsRaw = Array.isArray(productDoc?.specs) ? productDoc.specs : [];
            const specs = specsRaw.map((s) => ({
               label: String(s?.label ?? ''),
               value: String(s?.value ?? ''),
            })).filter((s) => s.label && s.value);

            const datasheetUrl = toMediaUrl(productDoc?.datasheet ?? null) ?? null;

            const normalized = {
               id: productDoc?.id,
               mpn,
               manufacturer,
               description: productDoc?.description ?? '',
               basePartNumber,
               stock: Number(productDoc?.stock ?? 0),
               category: String(categoryName),
               images: imageUrls.length > 0 ? imageUrls : [DEFAULT_IMAGE_URL],
               pricingTiers,
               specs,
               datasheetUrl,
               rawPrice: Number(productDoc?.price ?? 0),
               pcbDetails: productDoc?.pcbDetails || null,
            };

            if (cancelled) return;
            setProduct(normalized);
            setActiveImg(0);

            const allRes = await fetch(`/api/products?depth=1&limit=50`);
            const allData = await allRes.json();
            const docs = (Array.isArray(allData?.docs) ? allData.docs : []) as ProductApiDoc[];

            const categoryId =
               typeof productDoc?.category === 'object' && productDoc?.category
                  ? (productDoc.category as { id?: number | string }).id
                  : (productDoc?.category as number | string | null | undefined);

            const related = docs
               .filter((p) => String(p?.id) !== String(productDoc?.id))
               .filter((p) => {
                  const pCat =
                     typeof p?.category === 'object' && p?.category
                        ? (p.category as { id?: number | string }).id
                        : (p?.category as number | string | null | undefined);
                  return categoryId ? String(pCat) === String(categoryId) : true;
               })
               .slice(0, 5)
               .map((p) => {
                  const pImageDocs: MediaDoc[] = (Array.isArray(p?.images) && p.images.length > 0)
                     ? p.images
                     : (p?.image ? [p.image] : []);
                  const img = toMediaUrl(pImageDocs?.[0]) ?? DEFAULT_IMAGE_URL;

                  return {
                     id: p?.id,
                     name: p?.name ?? p?.mpn ?? '',
                     brand: p?.brand ?? p?.manufacturer ?? '',
                     price: formatINR(Number(p?.price ?? 0)),
                     img,
                  };
               });

            if (cancelled) return;
            setRelatedProducts(related);
         } catch (e) {
            console.error('Error loading product detail:', e);
            if (!cancelled) {
               setProduct({
                  id: undefined,
                  images: [DEFAULT_IMAGE_URL],
                  specs: [],
                  pricingTiers: [],
                  category: '',
                  mpn: '',
                  manufacturer: '',
                  description: '',
                  basePartNumber: '',
                  stock: 0,
                  datasheetUrl: null,
                  rawPrice: 0,
                  pcbDetails: null,
               });
            }
         }
      };

      load();
      return () => { cancelled = true; };
   }, [params]);

   if (!product) {
      return (
         <main className="min-h-screen bg-white">
            <div className="container mx-auto px-6 py-24">
               <div className="text-center text-gray-600 font-bold">Loading product...</div>
            </div>
         </main>
      );
   }

   const handleCreateList = () => {
      if (newListName.trim()) {
         const newList = { id: Date.now(), name: newListName.trim() };
         setLists([...lists, newList]);
         setSelectedLists([...selectedLists, newList.id]);
         setNewListName('');
         setIsCreatingList(false);
      }
   };

   const handleAddToList = () => {
      if (selectedLists.length > 0) {
         setIsAddedToList(true);
         setShowListPopup(false);
      }
   };

   const handleAddToCart = () => {
      if (product) {
         addItem({
            id: product.id || product.mpn,
            name: product.mpn,
            price: product.rawPrice,
            quantity: Number(qty),
            image: product.images[0],
            manufacturer: product.manufacturer,
            description: product.description,
         });
         setIsAddedToCart(true);
         setTimeout(() => setIsAddedToCart(false), 2000);
      }
   };

   return (
      <main className="min-h-screen bg-white">
         <div className="fixed inset-0 pointer-events-none opacity-40">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] -mr-40 -mt-40" />
            <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-gray-100 rounded-full blur-[120px] -ml-40 -mt-40" />
         </div>

         <div className="relative z-10 container mx-auto px-6 py-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-10">
               <Link href="/" className="hover:text-primary transition-colors">Home</Link>
               <ChevronRight className="w-3 h-3" />
               <Link href="/components" className="hover:text-primary transition-colors">Components</Link>
               <ChevronRight className="w-3 h-3" />
               <span className="text-gray-900">{product.mpn}</span>
            </div>

            {/* Top Product Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
               {/* Gallery */}
               <div className="lg:col-span-4 space-y-4">
                  <div className="relative aspect-square w-full rounded-[40px] border border-gray-100 bg-white p-8 shadow-2xl flex items-center justify-center overflow-hidden group cursor-pointer" onClick={() => setIsLightboxOpen(true)}>
                     <Image src={product.images[activeImg]} alt={product.mpn} fill className="object-contain p-12 transition-transform duration-500 group-hover:scale-110" unoptimized />
                     <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">Click to Zoom</span>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     {product.images.map((img: string, i: number) => (
                        <button 
                           key={i} 
                           onClick={() => setActiveImg(i)}
                           className={`relative w-24 h-24 rounded-[20px] border-2 bg-white flex items-center justify-center overflow-hidden transition-all ${activeImg === i ? 'border-primary shadow-lg' : 'border-gray-100 hover:border-gray-300'}`}
                        >
                           <Image src={img} alt="" fill className="object-cover p-4 opacity-80" unoptimized />
                        </button>
                     ))}
                  </div>
               </div>

               {/* Info */}
               <div className="lg:col-span-5 flex flex-col justify-center">
                  <div className="mb-6">
                     <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter italic mb-4">{product.mpn}</h1>
                     <div className="flex items-center gap-3 mb-6">
                        <span className="px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] rounded-full">Active</span>
                        <span className="px-4 py-1.5 bg-gray-100 text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">{product.manufacturer}</span>
                     </div>
                     <p className="text-gray-500 font-bold leading-relaxed mb-8">{product.description}</p>
                     
                     <div className="space-y-4 mb-10">
                        <div className="flex gap-4">
                           <span className="w-32 text-xs font-black text-gray-400 uppercase tracking-widest shrink-0">Base Part No</span>
                           <span className="text-sm font-bold text-gray-900">{product.basePartNumber}</span>
                        </div>
                        <div className="flex gap-4">
                           <span className="w-32 text-xs font-black text-gray-400 uppercase tracking-widest shrink-0">Category</span>
                           <span className="text-sm font-bold text-gray-900">{product.category}</span>
                        </div>
                     </div>

                     {product.datasheetUrl ? (
                        <a
                           href={product.datasheetUrl}
                           className="inline-flex items-center gap-2 px-6 py-4 bg-gray-50 text-gray-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all border border-gray-200 shadow-sm"
                        >
                           <Download className="w-4 h-4" /> Download Datasheet
                        </a>
                     ) : (
                        <button
                           disabled
                           className="inline-flex items-center gap-2 px-6 py-4 bg-gray-50 text-gray-400 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border border-gray-200 shadow-sm opacity-70 cursor-not-allowed"
                        >
                           <Download className="w-4 h-4" /> Datasheet Unavailable
                        </button>
                     )}
                  </div>
               </div>

               {/* Pricing Cart Card */}
               <div className="lg:col-span-3">
                  <div className="bg-white rounded-[40px] border border-gray-100 shadow-2xl p-8 sticky top-10 flex flex-col">
                     {!isAddedToList ? (
                        <>
                           <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
                              <span className="text-xs font-black text-gray-900 uppercase tracking-widest">Availability</span>
                              <div className="flex items-center gap-2 text-primary">
                                 <CheckCircle2 className="w-5 h-5" />
                                 <span className="font-black italic">{product.stock.toLocaleString()} In Stock</span>
                              </div>
                           </div>

                           <div className="space-y-4 mb-8 relative">
                              <div>
                                 <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Order Quantity</label>
                                 <input 
                                    type="number" 
                                    value={qty}
                                    onChange={(e) => setQty(e.target.value)}
                                    min="1"
                                    className="w-full h-14 bg-gray-50 border border-transparent rounded-[16px] px-6 text-lg font-bold focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                 />
                              </div>
                              <button 
                                 onClick={handleAddToCart}
                                 className={`w-full h-14 rounded-[16px] font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 ${isAddedToCart ? 'bg-green-500 text-white' : 'bg-gray-900 text-white hover:bg-gray-800'}`}
                              >
                                 {isAddedToCart ? (
                                    <>
                                       <CheckCircle2 className="w-5 h-5" /> Added!
                                    </>
                                 ) : (
                                    <>
                                       <ShoppingCart className="w-5 h-5" /> Add to Cart
                                    </>
                                 )}
                              </button>
                              
                              <button 
                                 onClick={() => setShowListPopup(!showListPopup)}
                                 className="w-full h-14 bg-primary text-white rounded-[16px] font-black text-xs uppercase tracking-[0.2em] hover:bg-orange-600 active:scale-95 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
                              >
                                 Add to List <ChevronDown className={`w-4 h-4 transition-transform ${showListPopup ? 'rotate-180' : ''}`} />
                              </button>

                              {/* Popover */}
                              {showListPopup && (
                                 <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-[24px] border border-gray-100 shadow-2xl p-6 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                    {lists.length === 0 && !isCreatingList ? (
                                       <div className="text-center mb-4 text-xs font-bold text-gray-500">
                                          Oops. looks like you haven&apos;t created a list yet
                                       </div>
                                    ) : null}

                                    {!isCreatingList ? (
                                       <div className="space-y-2 max-h-48 overflow-y-auto mb-4 pr-1">
                                          {lists.map((list, idx) => (
                                             <label key={list.id} className="flex items-center gap-3 cursor-pointer group p-2 hover:bg-gray-50 rounded-xl transition-colors">
                                                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${selectedLists.includes(list.id) ? 'bg-primary border-primary' : 'border-gray-300 group-hover:border-primary'}`}>
                                                   {selectedLists.includes(list.id) && <CheckCircle2 className="w-3 h-3 text-white" />}
                                                </div>
                                                <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900">{idx + 1}. {list.name}</span>
                                                <input 
                                                   type="checkbox" 
                                                   className="hidden" 
                                                   checked={selectedLists.includes(list.id)}
                                                   onChange={(e) => {
                                                      if(e.target.checked) setSelectedLists([...selectedLists, list.id]);
                                                      else setSelectedLists(selectedLists.filter(id => id !== list.id));
                                                   }}
                                                />
                                             </label>
                                          ))}
                                       </div>
                                    ) : (
                                       <div className="mb-4">
                                          <input 
                                             type="text" 
                                             value={newListName}
                                             onChange={(e) => setNewListName(e.target.value)}
                                             placeholder="List Name"
                                             className="w-full h-12 bg-gray-50 border border-transparent rounded-[12px] px-4 text-sm font-bold focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                                             autoFocus
                                          />
                                       </div>
                                    )}

                                    <div className="space-y-3">
                                       {!isCreatingList ? (
                                          <button 
                                             onClick={() => setIsCreatingList(true)}
                                             className="w-full py-3 bg-white border-2 border-gray-100 text-gray-500 rounded-[12px] font-black text-[10px] uppercase tracking-widest hover:border-gray-300 hover:text-gray-900 transition-all"
                                          >
                                             Create list
                                          </button>
                                       ) : (
                                          <div className="flex gap-2">
                                             <button 
                                                onClick={() => setIsCreatingList(false)}
                                                className="flex-1 py-3 bg-gray-100 text-gray-500 rounded-[12px] font-black text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-all"
                                             >
                                                Cancel
                                             </button>
                                             <button 
                                                onClick={handleCreateList}
                                                className="flex-1 py-3 bg-primary text-white rounded-[12px] font-black text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-all shadow-md"
                                             >
                                                Create
                                             </button>
                                          </div>
                                       )}

                                       {!isCreatingList && (
                                          <button 
                                             onClick={handleAddToList}
                                             disabled={selectedLists.length === 0}
                                             className="w-full py-3 bg-gray-400 text-white rounded-[12px] font-black text-[10px] uppercase tracking-widest hover:bg-gray-900 disabled:opacity-50 disabled:hover:bg-gray-400 transition-all flex items-center justify-center gap-2"
                                          >
                                             Add to selected List(s) <ArrowRight className="w-3 h-3" />
                                          </button>
                                       )}
                                    </div>
                                 </div>
                              )}
                           </div>
                        </>
                     ) : (
                        <div className="flex flex-col items-center justify-center text-center py-4 mb-8 animate-in zoom-in-95 duration-500">
                           <h3 className="text-sm font-black text-gray-900 mb-6 italic">{product.mpn} is Added to List!</h3>
                           <div className="relative w-32 h-32 mb-8">
                              <div className="absolute inset-0 bg-yellow-100/50 rounded-full scale-125 -z-10 blur-xl" />
                              <div className="w-full h-full bg-yellow-400 rounded-[32px] flex items-center justify-center shadow-2xl relative overflow-hidden transform rotate-[-5deg]">
                                 <ShoppingBag className="w-16 h-16 text-white" />
                                 <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent" />
                              </div>
                              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg transform rotate-[5deg] animate-bounce">
                                 <CheckCircle2 className="w-6 h-6 text-white" />
                              </div>
                           </div>
                           <Link 
                              href="/my-lists" 
                              className="w-full py-4 bg-primary text-white rounded-[16px] font-black text-[10px] uppercase tracking-widest hover:bg-orange-600 active:scale-95 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
                           >
                              My Lists <ArrowRight className="w-4 h-4" />
                           </Link>
                        </div>
                     )}

                     <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 px-2">Pricing Tiers</h4>
                        <div className="bg-gray-50 rounded-[24px] p-6">
                           <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest pb-4 border-b border-gray-200 mb-4">
                              <span>Qty</span>
                              <span>Unit Price</span>
                              <span>Ext Price</span>
                           </div>
                           <div className="space-y-4">
                              {product.pricingTiers.map((tier, i) => (
                                 <div key={i} className="flex justify-between text-xs sm:text-sm font-bold text-gray-900">
                                    <span className="w-1/3">{tier.qty}</span>
                                    <span className="w-1/3 text-center">{tier.unitPrice}</span>
                                    <span className="w-1/3 text-right text-gray-500">{tier.extPrice}</span>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Specifications */}
            <div className="mb-32">
               <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                     <FileText className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 tracking-tighter italic">Product Specifications</h2>
               </div>
               <div className="bg-white border border-gray-100 rounded-[40px] shadow-2xl overflow-hidden pt-4">
                  {/* Table header */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 bg-gray-50 p-6 border-b border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-widest rounded-t-[40px]">
                     <div className="col-span-1 lg:col-span-1">Attribute</div>
                     <div className="col-span-1 lg:col-span-3">Value</div>
                  </div>
                  {/* Table body */}
                  <div className="">
                     {product.specs.map((spec, i) => (
                        <div key={i} className={`grid grid-cols-2 lg:grid-cols-4 p-6 border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${i === product.specs.length - 1 ? 'border-b-0' : ''}`}>
                           <div className="col-span-1 lg:col-span-1 text-[11px] sm:text-xs font-black text-gray-600 uppercase tracking-widest">{spec.label}</div>
                           <div className="col-span-1 lg:col-span-3 text-sm font-bold text-gray-900">{spec.value}</div>
                        </div>
                     ))}
                  </div>
               </div>

               {product.pcbDetails && (
                  <div className="bg-white border border-gray-100 rounded-[40px] shadow-2xl overflow-hidden mt-8 pt-4">
                     <div className="bg-gray-50 p-6 border-b border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-widest rounded-t-[40px]">
                        PCB Fabrication Details
                     </div>
                     <div className="">
                        {Object.entries(product.pcbDetails).filter(([_, v]) => v).map(([key, value], i) => (
                           <div key={key} className={`grid grid-cols-2 lg:grid-cols-4 p-6 border-b border-gray-50 hover:bg-gray-50/50 transition-colors`}>
                              <div className="col-span-1 lg:col-span-1 text-[11px] sm:text-xs font-black text-gray-600 uppercase tracking-widest">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                              <div className="col-span-1 lg:col-span-3 text-sm font-bold text-gray-900">{String(value)}</div>
                           </div>
                        ))}
                     </div>
                  </div>
               )}
            </div>

            {/* Other Parts in Same Category */}
            <div className="mb-32">
               <div className="flex items-center justify-between mb-10">
                  <h2 className="text-3xl font-black text-gray-900 tracking-tighter italic">Other Parts in the same category</h2>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {relatedProducts.map((p, i) => (
                     <Link href={`/components/${p.id}`} key={i} className="group bg-white border border-gray-100 rounded-[35px] p-5 hover:border-primary/20 hover:shadow-2xl transition-all shadow-sm flex flex-col h-full">
                        <div className="relative w-full aspect-square bg-gray-50 rounded-[24px] overflow-hidden mb-6 flex items-center justify-center p-4">
                           <Image src={p.img} alt={p.name} fill className="object-cover p-5 mix-blend-multiply opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500" unoptimized />
                        </div>
                        <div className="flex-1 flex flex-col">
                           <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">{p.brand}</span>
                           <h4 className="text-sm font-black text-gray-900 italic mb-4 line-clamp-2 leading-snug">{p.name}</h4>
                           <div className="mt-auto pt-6 border-t border-gray-50 border-dashed flex items-center justify-between">
                              <span className="text-xl font-black text-gray-900 italic tracking-tighter">{p.price}</span>
                              <div className="w-10 h-10 bg-primary/10 text-primary rounded-[16px] flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                 <ChevronRight className="w-4 h-4" />
                              </div>
                           </div>
                        </div>
                     </Link>
                  ))}
               </div>
            </div>

            {/* Promotional Banner */}
            <div className="relative rounded-[50px] overflow-hidden bg-gray-900 p-12 lg:p-20 shadow-2xl group border border-white/10 mb-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
               <div className="absolute inset-0 grayscale opacity-20 mix-blend-overlay group-hover:scale-[1.02] transition-transform duration-[5s]">
                  <Image src="https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=2070&auto=format&fit=crop" alt="Promo" fill className="object-cover" />
               </div>
               <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/40 rounded-full blur-[150px] -mr-40 -mt-40 pointer-events-none" />
               
               <div className="relative z-10 flex-1 text-center md:text-left">
                  <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter italic mb-4">
                     Prototype To Production: <br />
                     <span className="text-primary tracking-normal">With You At Every Step</span>
                  </h2>
                  <p className="text-gray-400 font-bold max-w-xl mx-auto md:mx-0">
                     Our automated facilities are ISO certified and can accommodate small batch prototyping to mass production lines.
                  </p>
               </div>
               
               <div className="relative z-10 flex-none scale-100 group-hover:scale-105 transition-transform">
                  <Link href="/quote" className="px-10 py-6 bg-primary text-white rounded-[28px] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:bg-orange-600 transition-colors flex items-center justify-center gap-3 active:scale-95">
                     Get A Quote <ArrowRight className="w-4 h-4" />
                  </Link>
               </div>
            </div>

         </div>

         {/* Lightbox Gallery */}
         {isLightboxOpen && (
            <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center backdrop-blur-sm animate-in fade-in duration-300">
               <button onClick={() => setIsLightboxOpen(false)} className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-50">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
                     <span className="text-2xl font-bold">×</span>
                  </div>
               </button>
               
               <button 
                  onClick={() => setActiveImg(prev => prev === 0 ? product.images.length - 1 : prev - 1)}
                  className="absolute left-8 lg:left-12 w-16 h-16 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-all backdrop-blur-md hidden sm:flex z-50"
               >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
               </button>
               
               <div className="relative w-full max-w-5xl aspect-square sm:aspect-video sm:h-[70vh] z-40">
                  <Image src={product.images[activeImg]} alt={product.mpn} fill className="object-contain" unoptimized />
               </div>

               <button 
                  onClick={() => setActiveImg(prev => prev === product.images.length - 1 ? 0 : prev + 1)}
                  className="absolute right-8 lg:right-12 w-16 h-16 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-all backdrop-blur-md hidden sm:flex z-50"
               >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
               </button>
               
               <div className="absolute bottom-8 flex gap-4 overflow-x-auto max-w-[90vw] p-4 z-50">
                  {product.images.map((img: string, i: number) => (
                     <button 
                        key={i} 
                        onClick={() => setActiveImg(i)}
                        className={`relative w-24 h-24 shrink-0 rounded-[20px] bg-white border-2 overflow-hidden transition-all ${activeImg === i ? 'border-primary ring-4 ring-primary/30' : 'border-transparent opacity-70 hover:opacity-100'}`}
                     >
                        <Image src={img} alt="" fill className="object-contain p-2" unoptimized />
                     </button>
                  ))}
               </div>
            </div>
         )}
      </main>
   )
}
