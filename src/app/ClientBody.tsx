"use client";

import { useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function ClientBody({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Apply dark theme for Hackathon Twin
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <>
      <head>
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
        />
      </head>
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900`}>
        {children}
      </body>
    </>
  );
}
