import dictionaries, { SupportedLanguages, DayIds, DayIdsType } from "@/app/dictionaries/all";

export async function generateStaticParams() {
  return DayIds.map((d) => ({ day: d }));
}

export async function generateMetadata({ params }: { params: { lang: SupportedLanguages, day: DayIdsType  }}) {
  const lang = dictionaries[params.lang] || dictionaries.en
  return {
    title: `${lang.programTitle}: ${lang.programDays[params.day]?.name || '?'} - ${lang.programCategory.overview}`
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
