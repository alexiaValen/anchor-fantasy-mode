import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anchor · Fantasy Mode",
  description: "UI-first personal operating system for focus and follow-through",
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
