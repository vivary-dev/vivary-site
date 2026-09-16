import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { Umami } from "@/components/umami";
import { facts } from "@/content/facts";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Vivary", template: "%s · Vivary" },
  description: facts.product.line,
  openGraph: {
    type: "website",
    siteName: "Vivary",
    title: "Vivary",
    description: facts.product.line,
    images: [
      {
        url: "/brand/vivary-social-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Vivary. It knows you. Because you wrote it down.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vivary",
    description: facts.product.line,
    images: ["/brand/vivary-social-1200x630.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Umami />
      </body>
    </html>
  );
}
