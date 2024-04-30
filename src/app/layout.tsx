import type { Metadata } from "next";
import "./globals.css";
import { NetworkStatusProvider } from "@/providers/NetworkStatusProvider";

export const metadata: Metadata = {
  title: "Welcome",
  description: "Showcase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <NetworkStatusProvider>
    <html lang="en">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
    // </NetworkStatusProvider>
  );
}
