import dictionaries, {
  SupportedLanguages,
  AllDays,
  Day,
} from "@/app/dictionaries/all";

export async function generateStaticParams() {
  return AllDays.map((d) => ({ day: d }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: SupportedLanguages; day: Day }>;
}) {
  const resolvedParams = await params;
  const lang = dictionaries[resolvedParams.lang] || dictionaries.en;

  return {
    title: `${lang.programTile.title}: ${lang.programDays[resolvedParams.day]?.name || "?"} - ${lang.programCategory.robotarna}`,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
