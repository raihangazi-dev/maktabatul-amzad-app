import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Newsreader, Work_Sans } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-newsreader",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: "Maktabatul Amzad Bookstore",
  description: "Full-stack ecommerce bookstore built with Next.js.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${workSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
