"use client";

import { useParams } from "next/navigation";
import { Syne, Outfit } from "next/font/google";

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
  return (
    <html lang={params.lang === "cz" ? "cs" : "en"} className="scroll-smooth">
      <body
        className={`${syne.variable} ${outfit.variable} font-body bg-cream text-midnight selection:bg-orange selection:text-cream overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
