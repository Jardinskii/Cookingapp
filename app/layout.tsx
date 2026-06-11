import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DailyCook",
  description: "A prototype meal planner that helps you choose meals and estimate grocery costs.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
