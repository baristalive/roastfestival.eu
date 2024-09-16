import dictionaries, { SupportedLanguages, DayIds, DayIdsType } from "@/app/dictionaries/all";

export async function generateStaticParams() {
  return DayIds.map((d) => ({ day: d }));
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
