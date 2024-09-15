import dictionaries, { DayIdsType, SupportedLanguages } from "@/app/dictionaries/all";
import React from "react";
import { getRoomCategory } from "./utils";

export async function generateStaticParams() {
  return ["stolarna", "kaple"].map((room) => ({ room }));
}

export async function generateMetadata({ params }: { params: { lang: SupportedLanguages, day: DayIdsType, room: "kaple" | "stolarna"  }}) {
  const lang = dictionaries[params.lang] || dictionaries.en
  return {
    title: `${lang.programTitle}: ${lang.programDays[params.day]?.name || '?'} (${lang.programCategory[getRoomCategory(params.room)]})`
  }
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
