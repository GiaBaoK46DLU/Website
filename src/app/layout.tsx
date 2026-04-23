import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Portfolio — Đinh Lâm Gia Bảo",
  description: "Website portfolio cá nhân — CTK46",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={cn("font-sans", geist.variable)}>
      <body className="cyber-grid min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1 px-4 py-8 md:px-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
