import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { House } from "lucide-react";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "React Query Tutorial",
  description:
    "Learn how to use TanStack React Query effectively with this tutorial by Coding in Flow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <Link href={'/'}>
            <div className="flex flex-row p-4 items-center">
              <House className="text-muted-foreground" />
              <h1 className="text-md font-bold text-muted-foreground ms-2">Home Page </h1>
            </div>
          </Link>
          {children}
          <Toaster richColors position="top-right" />
        </ReactQueryProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
