import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "ROAST!",
  description: "Coffee roasters festival in Brno",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html><body>{children}</body></html>
  );
}
