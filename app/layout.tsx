import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import dictionaries from "./dictionaries/all";


const figtree = Figtree({ subsets: ["latin", "latin-ext"] });
export const metadata: Metadata = {
  title: "Roast!",
  description: dictionaries.en.metadata.description,
  alternates: {
    canonical: 'https://roastfestival.eu/',
    languages: {
      'en-US': '/en',
      'cs-CZ': '/cz',
    },
  },
  manifest: "/manifest.webmanifest",
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '96x96',
      url: '/icon-light-96.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '192x192',
      url: '/icon-light-192.png',
    },
    {
      rel: 'shortcut icon',
      url: '/favicon.ico'
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
    {
      rel: 'apple-touch-icon',
      sizes: "180x180",
      url: '/apple-touch-icon.png'
    }
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
