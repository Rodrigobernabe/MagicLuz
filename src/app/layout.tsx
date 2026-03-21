import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MAGIC LUZ | Premium Disney Travel Experiences",
  description: "Discover the magic of Disney with our curated luxury travel experiences. From enchanting castle views to VIP park tours, create memories that last forever.",
  keywords: ["Disney Travel", "Luxury Vacations", "Disney World", "VIP Tours", "Magic Kingdom", "Premium Travel"],
  authors: [{ name: "Magic Luz" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "MAGIC LUZ | Premium Disney Travel Experiences",
    description: "Discover the magic of Disney with curated luxury travel experiences",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MAGIC LUZ | Premium Disney Travel",
    description: "Premium Disney Travel Experiences",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased bg-background text-foreground overflow-x-hidden`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
