import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import DashboardAuthGate from "@/components/dashboard/DashboardAuthGate";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

import { CartProvider } from "@/context/CartContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <CartProvider>
        <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
          <body className="min-h-full bg-background text-foreground selection:bg-primary/20">
            <DashboardAuthGate>{children}</DashboardAuthGate>
          </body>
        </html>
      </CartProvider>
    </ClerkProvider>
  );
}
