import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Umami } from "@/components/umami";
import { facts } from "@/content/facts";
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
  title: "Vivary",
  description: facts.product.line,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
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
