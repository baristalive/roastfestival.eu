import { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#f51978",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
