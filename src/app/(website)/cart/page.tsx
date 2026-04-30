"use client";

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
   ShoppingCart, AlertTriangle, Trash2
} from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@clerk/nextjs'

const formatINR = (value: number) => {
   return `₹${Math.round(value).toLocaleString('en-IN')}`;
}

export default function CartPage() {
   const [step, setStep] = useState<0 | 1 | 2>(0)
   const { cart, removeItem, updateQuantity, cartTotal, clearCart } = useCart()
   const { isLoaded: authLoaded, userId: authUserId, getToken } = useAuth()
   const [isCreatingOrder, setIsCreatingOrder] = useState(false)
   const [userDetails, setUserDetails] = useState<any>({
      name: "Guest User",
      email: "",
      phone: "",
      contactVal: "",
      shipping: { address1: "", address2: "", city: "", state: "", pincode: "" },
      billing: { address1: "", address2: "", city: "", state: "", pincode: "" }
   })

   useEffect(() => {
      const fetchUser = async () => {
         if (!authLoaded || !authUserId) return;
         try {
            const token = await getToken();
            const res = await fetch("/api/user/address", {
               headers: token ? { Authorization: `Bearer ${token}` } : undefined,
            });
            const json = await res.json();
            if (json.success && json.data) {
               const d = json.data;
               setUserDetails({
                  name: `${d.firstName || ''} ${d.lastName || ''}`.trim() || d.shippingAttentionTo || "User",
                  email: d.shippingEmail || d.email || "",
                  phone: d.shippingPhone || "",
                  contactVal: d.shippingPhone || "",
                  shipping: {
                     address1: d.shippingAddress1 || "",
                     address2: d.shippingAddress2 || "",
                     city: d.shippingCity || "",
                     state: d.shippingState || "",
                     pincode: d.shippingPincode || ""
                  },
                  billing: {
                     address1: d.billingAddress1 || "",
                     address2: d.billingAddress2 || "",
                     city: d.billingCity || "",
                     state: d.billingState || "",
                     pincode: d.billingPincode || ""
                  }
               });
            }
         } catch (error) {
            console.error("Failed to fetch address for cart", error);
         }
      };
      fetchUser();
   }, [authLoaded, authUserId, getToken]);

   useEffect(() => {
      // Load Razorpay checkout script
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
   }, []);

   const handleProceed = async () => {
      if (step === 0) setStep(1);
      else if (step === 1) setStep(2);
      else if (step === 2) {
         await createOrder();
      }
   };

   const createOrder = async () => {
      if (!authUserId) {
         alert("Please log in to place an order.");
         return;
      }
      setIsCreatingOrder(true);
      try {
         const token = await getToken();
         const res = await fetch("/api/orders", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
               items: cart.map(item => ({
                  productId: item.id,
                  name: item.name,
                  quantity: item.quantity,
                  price: item.price,
                  image: item.image,
                  specs: item.specs,
                  gerberFile: item.gerberFile?.id
               })),
               total: cartTotal + (cartTotal * 0.18),
               shippingAddress: {
                  name: userDetails.name,
                  address: userDetails.shippingAddress,
                  email: userDetails.email,
                  phone: userDetails.phone
               },
               billingAddress: {
                  name: userDetails.name,
                  address: userDetails.billingAddress,
                  email: userDetails.email,
                  phone: userDetails.contactVal
               },
               projectName: cart[0]?.name || "New Order",
               gerberFile: cart[0]?.gerberFile?.id,
               fullSpecs: cart[0]?.specs
            })
         });
         const data = await res.json();
         if (data.success) {
            handlePayment(data.orderId, data.razorpayOrderId);
         } else {
            alert("Failed to create order: " + (data.error || "Unknown error"));
         }
      } catch (error) {
         console.error("Order creation failed", error);
         alert("An error occurred while preparing your order.");
      } finally {
         setIsCreatingOrder(false);
      }
   };

   const handlePayment = (payloadOrderId: string, razorpayOrderId: string) => {
      const gst = cartTotal * 0.18;
      const total = cartTotal + gst;

      const options = {
         key: "rzp_test_SKKXmjhckTA1L8",
         amount: Math.round(total * 100),
         currency: "INR",
         name: "PCB GLOBE",
         description: "Component Procurement Payment",
         image: "https://pcbglobe.com/logo.png",
         order_id: razorpayOrderId,
         notes: {
            payload_order_id: payloadOrderId
         },
         handler: async function (response: any) {
            const token = await getToken();
            const verifyRes = await fetch("/api/payments/verify", {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`
               },
               body: JSON.stringify({
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id || "",
                  razorpay_signature: response.razorpay_signature || "",
                  payload_order_id: payloadOrderId,
                  amount: Math.round(total * 100)
               })
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
               clearCart();
               alert("Payment successful and verified!");
               window.location.href = "/dashboard/projects";
            } else {
               alert("Payment verification failed! Please contact support.");
            }
         },
         prefill: {
            name: userDetails.name,
            email: userDetails.email,
            contact: userDetails.contactVal
         },
         theme: {
            color: "#f97316" // primary orange
         }
      };

      const rzp1 = new (window as any).Razorpay(options);
      rzp1.open();
   };

   if (cart.length === 0) {
      return (
         <div className="p-8 max-w-[1400px] mx-auto h-[70vh] flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
            <div className="w-32 h-32 bg-gray-50 rounded-[40px] flex items-center justify-center mb-8 shadow-inner">
               <ShoppingCart className="w-12 h-12 text-gray-300" />
            </div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter italic mb-4">Your cart is empty</h1>
            <p className="text-gray-500 font-bold mb-8 max-w-md">Looks like you haven't added any components to your project yet. Start exploring our inventory!</p>
            <Link
               href="/components"
               className="px-10 py-5 bg-primary text-white rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[1.05] active:scale-95 transition-all"
            >
               Browse Components
            </Link>
         </div>
      )
   }

   const gstAmt = cartTotal * 0.18;
   const finalTotal = cartTotal + gstAmt;

   return (
      <div className="p-8 max-w-[1400px] mx-auto h-full min-h-[80vh] flex flex-col xl:flex-row gap-8 animate-in fade-in duration-500">

         {/* Left Column (Cart Items) */}
         <div className="flex-1 flex flex-col gap-6">

            {/* Warning Banner */}
            <div className="bg-orange-50/80 border border-orange-100 rounded-[24px] p-6 flex gap-4 text-orange-800 shadow-sm backdrop-blur-sm">
               <AlertTriangle className="w-6 h-6 shrink-0 text-orange-500 mt-1" />
               <p className="text-sm font-bold leading-relaxed">
                  <span className="text-orange-950">On account of upcoming holidays, our operations will be temporarily paused.</span> <br />
                  We wish you and your loved ones a joyful and prosperous time! However, feel free to place orders online — we will process them post-celebration. Happy festivities!
               </p>
            </div>

            {/* Header */}
            <div className="flex items-end gap-6 mb-4 mt-4">
               <div className="w-20 h-20 bg-gray-900 rounded-[28px] flex items-center justify-center shadow-xl shadow-gray-900/20 transform -rotate-3 hover:rotate-0 transition-transform">
                  <ShoppingCart className="w-8 h-8 text-white" />
               </div>
               <div>
                  <h1 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tighter italic leading-none">Your Cart</h1>
                  <p className="text-gray-500 font-bold mt-2 text-sm lg:text-base">All your project payments, at one place!</p>
               </div>
            </div>

            {/* Table Headers */}
            <div className="grid grid-cols-12 bg-white rounded-[24px] py-4 px-8 mt-4 shadow-sm border border-gray-100">
               <div className="col-span-6 text-[11px] font-black text-gray-400 uppercase tracking-widest">Your Projects</div>
               <div className="col-span-3 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Units</div>
               <div className="col-span-3 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Price</div>
            </div>

            {/* Cart Categories */}
            <div className="bg-white rounded-[32px] shadow-xl shadow-gray-200/50 border border-gray-100 p-8 hover:border-primary/20 transition-all group">
               <h2 className="text-xl font-black text-gray-900 italic tracking-tight mb-6">Component Procurement Projects</h2>

               <div className="space-y-4">
                  {cart.map((item) => (
                     <div key={item.id} className="grid grid-cols-12 items-center bg-gray-50/50 rounded-[24px] p-6 border border-gray-100 hover:bg-primary/5 transition-colors group/item">
                        <div className="col-span-6 flex gap-4 items-center">
                           <div className="w-20 h-20 bg-white rounded-2xl border border-gray-100 p-2 overflow-hidden shrink-0">
                              <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                           </div>
                           <div className="flex flex-col gap-1">
                               <h3 className="text-xl font-black text-gray-900">{item.name}</h3>
                               {item.manufacturer && <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{item.manufacturer}</span>}
                               {item.specs ? (
                                  <div className="flex flex-wrap gap-2 mt-1">
                                     <span className="text-[10px] font-bold bg-gray-100 px-2 py-0.5 rounded text-gray-600 uppercase tracking-wider">{item.specs.layers} Layers</span>
                                     <span className="text-[10px] font-bold bg-gray-100 px-2 py-0.5 rounded text-gray-600 uppercase tracking-wider">{item.specs.width}x{item.specs.height}mm</span>
                                     <span className="text-[10px] font-bold bg-gray-100 px-2 py-0.5 rounded text-gray-600 uppercase tracking-wider">{item.specs.material}</span>
                                  </div>
                               ) : (
                                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mt-1 line-clamp-1">{item.description}</p>
                               )}
                               {item.gerberFile && (
                                  <div className="flex items-center gap-1 mt-2 text-green-600 bg-green-50 w-fit px-2 py-1 rounded border border-green-100">
                                     <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                     <span className="text-[10px] font-bold uppercase tracking-wider">Gerber: {item.gerberFile.filename}</span>
                                  </div>
                               )}
                            </div>
                        </div>
                        <div className="col-span-3 flex items-center justify-center gap-4">
                           <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center font-bold hover:border-primary transition-colors">-</button>
                           <span className="text-xl font-black text-gray-900 w-8 text-center">{item.quantity}</span>
                           <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center font-bold hover:border-primary transition-colors">+</button>
                        </div>
                        <div className="col-span-3 flex items-center justify-end gap-6">
                           <span className="text-2xl font-black text-gray-900 tracking-tighter italic">{formatINR(item.price * item.quantity)}</span>
                           <div className="flex flex-col xl:flex-row gap-2">
                              <button
                                 onClick={() => removeItem(item.id)}
                                 className="w-10 h-10 rounded-full border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 flex items-center justify-center transition-all bg-white shadow-sm"
                              >
                                 <Trash2 className="w-4 h-4" />
                              </button>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

         </div>

         {/* Right Sidebar (Order Summary) */}
         <div className="w-full xl:w-96 shrink-0 z-10">
            <div className="bg-white rounded-[40px] shadow-2xl shadow-gray-200/50 border border-gray-100 p-8 sticky top-10">
               <h2 className="text-2xl font-black text-gray-900 tracking-tighter italic text-center mb-8">Order Summary</h2>

               {/* Stepper */}
               <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-center mb-10 relative">
                  <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-100 -z-10 -translate-y-1/2"></div>
                  <button onClick={() => setStep(0)} className={`w-1/3 bg-white transition-colors ${step >= 0 ? 'text-primary' : 'text-gray-300'}`}>Cart</button>
                  <button onClick={() => setStep(1)} className={`w-1/3 bg-white transition-colors ${step >= 1 ? 'text-primary' : 'text-gray-300'}`}>Delivery</button>
                  <button onClick={() => step === 2 && setStep(2)} className={`w-1/3 bg-white transition-colors ${step >= 2 ? 'text-primary' : 'text-gray-300'}`}>Payment</button>
               </div>

               {/* Step 0: Cart Summary */}
               {step === 0 && (
                  <div className="space-y-6 mb-8 animate-in fade-in slide-in-from-right-4 duration-300">
                     <div className="max-h-48 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                        {cart.map(item => (
                           <div key={item.id} className="flex items-center justify-between text-sm font-bold text-gray-900">
                              <span className="truncate max-w-[150px]">{item.name} x {item.quantity}</span>
                              <span>{formatINR(item.price * item.quantity)}</span>
                           </div>
                        ))}
                     </div>
                     <div className="border-t border-dashed border-gray-200 pt-6 flex items-center justify-between">
                        <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Sub Total</span>
                        <span className="text-2xl font-black text-gray-900 tracking-tighter italic">{formatINR(cartTotal)}</span>
                     </div>
                  </div>
               )}

               {/* Step 1: Delivery Information */}
               {step === 1 && (
                  <div className="space-y-8 mb-8 animate-in fade-in slide-in-from-right-4 duration-300">
                     <div className="space-y-3">
                        <h4 className="text-[13px] font-black text-gray-900 uppercase tracking-widest">Billing Address</h4>
                        <div className="bg-gray-50 p-5 rounded-[24px] text-sm font-bold text-gray-600 leading-relaxed border border-gray-100 whitespace-pre-line">
                           {userDetails.name}{"\n"}
                           {userDetails.billingAddress}{"\n"}
                           {userDetails.email}{"\n"}
                           {userDetails.contactVal}
                        </div>
                     </div>
                     <div className="space-y-3">
                        <div className="flex items-center justify-between">
                           <h4 className="text-[13px] font-black text-gray-900 uppercase tracking-widest">Shipping Address</h4>
                           <button className="text-[11px] font-black text-orange-400 hover:text-orange-500 uppercase tracking-widest">Change</button>
                        </div>
                        <div className="bg-gray-50 p-5 rounded-[24px] text-sm font-bold text-gray-600 leading-relaxed border border-gray-100 whitespace-pre-line">
                           {userDetails.name}{"\n"}
                           {userDetails.shippingAddress}{"\n"}
                           {userDetails.email}{"\n"}
                           {userDetails.phone}
                        </div>
                     </div>
                     <div className="border-t border-dashed border-gray-200 pt-6 flex items-center justify-between">
                        <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Sub Total</span>
                        <span className="text-2xl font-black text-gray-900 tracking-tighter italic">{formatINR(cartTotal)}</span>
                     </div>
                  </div>
               )}

               {/* Step 2: Payment Summary */}
               {step === 2 && (
                  <div className="space-y-5 mb-8 animate-in fade-in slide-in-from-right-4 duration-300">
                     <div className="flex items-center justify-between text-base font-bold text-gray-900">
                        <span className="text-gray-600">Sub Total</span>
                        <span>{formatINR(cartTotal)}</span>
                     </div>
                     <div className="flex items-center justify-between text-base font-bold text-gray-900">
                        <span className="text-gray-600">GST (18%)</span>
                        <span>{formatINR(gstAmt)}</span>
                     </div>
                     <div className="flex items-center justify-between text-base font-bold text-gray-900">
                        <span className="text-gray-600">Shipping Cost</span>
                        <span>₹0</span>
                     </div>
                     <div className="flex items-center justify-between text-base font-bold text-gray-900">
                        <span className="text-gray-600">Discount</span>
                        <span>- ₹0</span>
                     </div>

                     <div className="border-t border-gray-200 pt-5 flex items-center justify-between">
                        <span className="text-base font-black text-gray-900">Total</span>
                        <span className="text-3xl font-black text-gray-900 tracking-tighter italic">{formatINR(finalTotal)}</span>
                     </div>
                  </div>
               )}

               <button
                  onClick={handleProceed}
                  className="w-full py-5 bg-primary text-white rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center"
               >
                  {step === 2 ? `Pay ${formatINR(finalTotal)}` : 'Proceed'}
               </button>
            </div>
         </div>

      </div>
   )
}
