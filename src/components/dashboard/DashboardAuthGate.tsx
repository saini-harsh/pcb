"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "@/components/layout/Header";

export default function DashboardAuthGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/");
    }
  }, [isLoaded, userId, router]);

  if (!isLoaded || !userId) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="w-12 h-12 border-4 border-gray-100 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-gray-50/50 pt-20">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block z-40">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 w-full max-w-[1600px] mx-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </>
  );
}
