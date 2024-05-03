import type { Metadata } from "next";
import "./globals.css";
import { NetworkStatusProvider } from "@/providers/NetworkStatusProvider";
import { cookieToInitialState } from "wagmi";
import { headers } from "next/headers";
import Web3ModalProvider from "@/providers/Web3ModalProvider";
import AuthProvider from "@/providers/AuthProvider";
import { config } from "../../config";
import React from "react";

export const metadata: Metadata = {
  title: "Hi There",
  description: "Showcase",
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));
  return (
    // <NetworkStatusProvider>
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning={false}>
        <Web3ModalProvider initialState={initialState}>
          <AuthProvider>
             {children}
          </AuthProvider>
        </Web3ModalProvider>
      </body>
    </html>
    // </NetworkStatusProvider>
  );
}
