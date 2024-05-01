import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import dictionaries from "./dictionaries/all";

const figtree = Figtree({ subsets: ["latin", "latin-ext"] });
export const metadata: Metadata = {
  title: "ROAST!",
  description: "Coffee roasters festival in Brno",
};

export async function generateStaticParams() {
  return Object.keys(dictionaries).map((lang: string) => ({ lang }));
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={figtree.className}>{children}</body>
    </html>
  );
}
