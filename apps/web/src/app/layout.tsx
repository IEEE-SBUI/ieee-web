import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    template: "%s | IEEE Student Branch Universitas Indonesia",
    default: "IEEE Student Branch Universitas Indonesia",
  },
  description:
    "The official web portal of the first IEEE Student Branch in Indonesia. Discover our active student divisions, technology seminars, competitions, workshops, and engineering innovations.",
  keywords: [
    "IEEE",
    "Universitas Indonesia",
    "IEEE Student Branch",
    "IEEE SBUI",
    "IEEE Indonesia Section",
    "Engineering",
    "Electrical Engineering",
    "Computer Science",
    "Technology",
    "Workshops",
    "Competitions"
  ],
  authors: [{ name: "IEEE SBUI Dev Team" }],
  openGraph: {
    title: "IEEE Student Branch Universitas Indonesia",
    description:
      "The official web portal of the first IEEE Student Branch in Indonesia. Discover our active student divisions, technology seminars, competitions, workshops, and engineering innovations.",
    url: "https://ieee.ui.ac.id",
    siteName: "IEEE SBUI",
    images: [
      {
        url: "/logo-ieee-sbui.png",
        width: 800,
        height: 800,
        alt: "IEEE SBUI Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IEEE Student Branch Universitas Indonesia",
    description:
      "The official web portal of the first IEEE Student Branch in Indonesia. Discover our active student divisions, technology seminars, competitions, workshops, and engineering innovations.",
    images: ["/logo-ieee-sbui.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Navbar />
        <main className="pt-[95px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
