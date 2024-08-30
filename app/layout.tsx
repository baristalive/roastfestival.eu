import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import dictionaries from "./dictionaries/all";


const figtree = Figtree({ subsets: ["latin", "latin-ext"] });
export const metadata: Metadata = {
  title: "ROAST!",
  description: "Coffee roasters festival in Brno",
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '48x48',
      url: '/icon-light-48.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '192x192',
      url: '/icon-light-192.png',
    },
    {
      rel: 'icon',
      type: 'image/svg+xml',
      url: '/icon-light.svg',
      media: '(prefers-color-scheme: light)',
    },
    {
      rel: 'icon',
      type: 'image/svg+xml',
      url: '/icon-dark.svg',
      media: '(prefers-color-scheme: dark)',
    },
  ],
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
