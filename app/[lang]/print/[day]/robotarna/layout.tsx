import dictionaries, { SupportedLanguages, DayIds, DayIdsType } from "@/app/dictionaries/all";

export async function generateStaticParams() {
  return DayIds.map((d) => ({ day: d }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: SupportedLanguages, day: DayIdsType  }>}) {
  const resolvedParams = await params;
  const lang = dictionaries[resolvedParams.lang] || dictionaries.en;

  return {
    title: `${lang.programTitle}: ${lang.programDays[resolvedParams.day]?.name || '?'} - ${lang.programCategory.robotarna}`
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
