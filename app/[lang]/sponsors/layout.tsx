import type { Metadata } from "next";
import dictionaries from "@/app/dictionaries/all";

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
  return <>{children}</>;
}
