import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/context/AuthProvider";

const inter = Inter({ subsets: ["latin"], display:"swap" });

export const metadata: Metadata = {
  title: "UrlHub - The Best Free URL Shortner",
  description: "UrlHub is a powerful and easy-to-use URL shortener that helps you manage and track your links effortlessly. Simplify your URLs, share them with ease, and monitor their performance with our comprehensive analytics.",
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


