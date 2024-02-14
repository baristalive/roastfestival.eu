'use client'
 
import { useParams } from 'next/navigation'
import "../globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import dictionaries from "../dictionaries/all";

const figtree = Figtree({ subsets: ["latin", "latin-ext"] });
export const metadata: Metadata = {
  title: "ROAST!",
  description: "Coffee roasters festival in Brno",
};

export default function Template ({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams<{ lang: string }>()
  return (
    <html lang={params.lang}>
      <body className={figtree.className}>{children}</body>
    </html>
  );
}
