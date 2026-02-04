import "./globals.css";
import type { Metadata, Viewport } from "next";
import dictionaries from "./dictionaries/all";

export const viewport: Viewport = {
  themeColor: "#9929ea",
};

export const metadata: Metadata = {
  alternates: {
    canonical: "https://roastfestival.eu/",
    languages: {
      "cs-CZ": "/cz",
      "en-US": "/en",
    },
  },
  description: dictionaries.en.metadata.description,
  icons: [
    {
      rel: "icon",
      sizes: "96x96",
      type: "image/png",
      url: "/icon-light-96.png",
    },
    {
      rel: "icon",
      sizes: "192x192",
      type: "image/png",
      url: "/icon-light-192.png",
    },
    {
      rel: "shortcut icon",
      url: "/favicon.ico",
    },
    {
      media: "(prefers-color-scheme: light)",
      rel: "icon",
      type: "image/svg+xml",
      url: "/icon-light.svg",
    },
    {
      media: "(prefers-color-scheme: dark)",
      rel: "icon",
      type: "image/svg+xml",
      url: "/icon-dark.svg",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/apple-touch-icon.png",
    },
  ],
  manifest: "/manifest.webmanifest",
  title: "Roast!",
};

export async function generateStaticParams() {
  return Object.keys(dictionaries).map((lang: string) => ({ lang }));
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
