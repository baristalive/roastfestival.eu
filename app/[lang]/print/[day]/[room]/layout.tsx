import dictionaries, { Day, SupportedLanguages } from "@/app/dictionaries/all";
import React from "react";
import { getRoomCategory } from "./utils";

export async function generateStaticParams() {
  return ["stolarna", "kaple"].map((room) => ({ room }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    lang: SupportedLanguages;
    day: Day;
    room: "kaple" | "stolarna";
  }>;
}) {
  const resolvedParams = await params;
  const lang = dictionaries[resolvedParams.lang] || dictionaries.en;

  return {
    title: `${lang.programTile.title}: ${lang.programDays[resolvedParams.day]?.name || "?"} - ${lang.programCategory[getRoomCategory(resolvedParams.room)]}`,
  };
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
