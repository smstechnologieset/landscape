import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Landscape Solution PLC",
    template: "%s | Landscape Solution PLC"
  },
  description:
    "Professional landscaping services in Addis Ababa — design, build and maintenance.",
  openGraph: {
    type: "website",
    siteName: "Landscape Solution PLC",
    url: siteUrl
  },
  twitter: { card: "summary_large_image" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
