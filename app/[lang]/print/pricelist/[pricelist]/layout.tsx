import dictionaries, { SupportedLanguages } from "@/app/dictionaries/all";
import React from "react";

export async function generateStaticParams() {
  return ["drinks", "rental", "tickets", "merch"].map((pricelist) => ({
    pricelist,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    lang: SupportedLanguages;
    pricelist: "drinks" | "rental" | "tickets" | "merch";
  }>;
}) {
  const resolvedParams = await params;
  const lang = dictionaries[resolvedParams.lang] || dictionaries.en;

  return {
    title: `${lang.print.categories[resolvedParams.pricelist as keyof typeof lang.print.categories]}`,
  };
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
