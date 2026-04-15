"use client";

import { ArrowRight, MapPin, Phone, Mail, Clock } from "lucide-react";
import Header from "@/components/layout/Header";

export default function ContactUsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen pt-32 pb-20 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="bg-gray-50/70 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row gap-12 lg:gap-20 border border-gray-100/50">

            {/* Left Column - Form */}
            <div className="flex-1">
              <h1 className="text-4xl md:text-[2.75rem] font-black text-gray-900 tracking-tight leading-tight mb-12">
                We'd Love To Hear<br />From You!
              </h1>

              <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input type="text" placeholder="Name" className="w-full h-14 bg-white border border-gray-200 rounded-2xl px-6 font-semibold text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary outline-none transition-colors shadow-sm" />
                  <input type="email" placeholder="E-mail" className="w-full h-14 bg-white border border-gray-200 rounded-2xl px-6 font-semibold text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary outline-none transition-colors shadow-sm" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
                  <div className="sm:col-span-6">
                    <input type="tel" placeholder="Mobile Number" className="w-full h-14 bg-white border border-gray-200 rounded-2xl px-6 font-semibold text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary outline-none transition-colors shadow-sm" />
                  </div>
                  <div className="sm:col-span-3">
                    <input type="text" placeholder="Organization" className="w-full h-14 bg-white border border-gray-200 rounded-2xl px-6 font-semibold text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary outline-none transition-colors shadow-sm" />
                  </div>
                  <div className="sm:col-span-3">
                    <input type="text" placeholder="Designation" className="w-full h-14 bg-white border border-gray-200 rounded-2xl px-6 font-semibold text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary outline-none transition-colors shadow-sm" />
                  </div>
                </div>

                <textarea
                  placeholder="Message"
                  rows={6}
                  className="w-full bg-white border border-gray-200 rounded-2xl p-6 font-semibold text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary outline-none transition-colors resize-none shadow-sm"
                />

                <div className="mt-4">
                  <button className="h-14 px-8 bg-primary rounded-full text-sm font-bold text-white shadow-xl shadow-primary/20 hover:bg-gray-900 hover:shadow-2xl transition-all active:scale-95 flex items-center gap-3 group cursor-pointer w-auto">
                    Submit
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-primary group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                </div>

              </form>
            </div>

            {/* Right Column - Contact Info */}
            <div className="w-full md:w-[400px] flex flex-col gap-10">

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-50 flex flex-shrink-0 items-center justify-center shadow-sm">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-[15px] font-bold text-gray-600 leading-relaxed mt-1">
                    21-D1, 11/1, 1st Main Road, NTTF Rd, opp. Prerana Motors, 2nd Phase, Peenya, Bengaluru, Karnataka 560058
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-50 flex flex-shrink-0 items-center justify-center shadow-sm">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-[15px] font-bold text-gray-600 leading-relaxed mt-3">
                    +91 080 4711 2351
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-50 flex flex-shrink-0 items-center justify-center shadow-sm">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-[15px] font-bold text-gray-600 leading-relaxed mt-1 flex flex-col gap-1">
                    <a href="mailto:sales@pcbglobe.com" className="hover:text-primary transition-colors">sales@pcbglobe.com</a>
                    <a href="mailto:support@pcbglobe.com" className="hover:text-primary transition-colors">support@pcbglobe.com</a>
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-50 flex flex-shrink-0 items-center justify-center shadow-sm">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-[15px] font-bold text-gray-600 leading-relaxed mt-3">
                    Mon - Sat (10am - 6pm)
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}
