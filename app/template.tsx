"use client";

import { useParams } from "next/navigation";
import { Syne, Outfit } from "next/font/google";
import { usePageTracking } from "./hooks/usePageTracking";
import { CookieConsent } from "./components/CookieConsent";

const syne = Syne({
  subsets: ["latin", "latin-ext"],
  variable: "--font-family-display",
});

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-family-body",
});

export default function Template({ children }: { children: React.ReactNode }) {
  const params = useParams<{ lang: string }>();
  usePageTracking();
  return (
    <html lang={params.lang === "cz" ? "cs" : "en"} className="scroll-smooth">
      <head>
        {/* Preconnect to third-party origins for faster resource loading */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://graph.instagram.com" />
      </head>
      <body
        className={`${syne.variable} ${outfit.variable} font-body selection:bg-accent overflow-x-hidden bg-white text-black selection:text-black`}
      >
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
