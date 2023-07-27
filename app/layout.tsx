import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "ROAST!",
  description: "The first coffee roasters festival in Brno",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
