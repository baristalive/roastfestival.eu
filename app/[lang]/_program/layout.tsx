import { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#9929ea",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
