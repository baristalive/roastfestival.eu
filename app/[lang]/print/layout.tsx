import { AllDays } from "@/app/dictionaries/all";

export async function generateStaticParams() {
  return AllDays.map((d) => ({ day: d }));
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
