import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/context/AuthProvider";

const inter = Inter({ subsets: ["latin"], display:"swap" });

export const metadata: Metadata = {
  title: "UrlHub",
  description: "A Url shortening service",
  icons: [
    {
      url: "/login.png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <AuthProvider>
        <body className={inter.className}>{children}</body>
        <Toaster />
      </AuthProvider>
    </html>
  );
}


