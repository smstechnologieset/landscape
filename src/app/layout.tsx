import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap"
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Landscape Solution PLC | Professional Landscape & Environmental Solutions",
    template: "%s | Landscape Solution PLC"
  },
  description:
    "Landscape Solution PLC is an Ethiopian professional landscaping and environmental services company specializing in landscape planning, urban greening, nursery development, botanical gardens, and sustainable environmental restoration.",
  openGraph: {
    type: "website",
    siteName: "Landscape Solution PLC",
    url: siteUrl
  },
  twitter: { card: "summary_large_image" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
