import dictionaries, { DayIdsType, SupportedLanguages } from "@/app/dictionaries/all";
import React from "react";

export async function generateStaticParams() {
  return ["drinks", "rental", "tickets", "merch"].map((pricelist) => ({ pricelist }));
}

export async function generateMetadata({ params }: { params: { lang: SupportedLanguages, pricelist: "drinks" | "rental" | "tickets" | "merch"  }}) {
  const lang = dictionaries[params.lang] || dictionaries.en
  return {
    title: `${lang.print.categories[params.pricelist as keyof typeof lang.print.categories]}`
  }
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
