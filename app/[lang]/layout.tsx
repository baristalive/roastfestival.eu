import dictionaries, { SupportedLanguages } from "../dictionaries/all";

export async function generateStaticParams() {
  return Object.keys(dictionaries).map((lang: string) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: SupportedLanguages }}) {
  return {
    description: dictionaries[params.lang]?.metadata.description || dictionaries.en.metadata.description
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
