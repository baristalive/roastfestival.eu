import { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#f7f7f7",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
