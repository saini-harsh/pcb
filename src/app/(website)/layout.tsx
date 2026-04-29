import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PCB GLOBE | Next-Gen PCB Manufacturing",
  description: "Instant quotes, cloud-native manufacturing, and precision assembly services.",
  icons: {
    icon: [
      { url: '/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon_io/favicon-16x16.png', sizes: '16x11', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon_io/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/favicon_io/site.webmanifest',
};

import { CartProvider } from "@/context/CartContext";

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <CartProvider>
        <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
          <body className="min-h-full bg-background text-foreground selection:bg-primary/20" suppressHydrationWarning>
            <div className="min-h-full flex flex-col">
              <Header />
              <main className="flex-grow pt-20">
                {children}
              </main>
              <Footer />
            </div>
          </body>
        </html>
      </CartProvider>
    </ClerkProvider>
  );
}
