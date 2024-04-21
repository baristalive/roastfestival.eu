"use client";

import { useParams } from "next/navigation";
import "@/app/globals.css";
import { Figtree } from "next/font/google";

const figtree = Figtree({ subsets: ["latin", "latin-ext"] });

export default function Template({ children }: { children: React.ReactNode }) {
  const params = useParams<{ lang: string }>();
  return (
    <html lang={params.lang}>
      <body className={figtree.className}>{children}</body>
    </html>
  );
}
