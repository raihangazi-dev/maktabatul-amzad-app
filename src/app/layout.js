import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/Providers";

const segoeUi = localFont({
  src: [
    { path: "../../public/fonts/segoe-ui/Segoe UI.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/segoe-ui/Segoe UI Italic.ttf", weight: "400", style: "italic" },
    { path: "../../public/fonts/segoe-ui/Segoe UI Bold.ttf", weight: "700", style: "normal" },
    { path: "../../public/fonts/segoe-ui/Segoe UI Bold Italic.ttf", weight: "700", style: "italic" },
  ],
  variable: "--font-segoe-ui",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Maktabatul Amzad",
  description: "Islamic books store - browse books, writers, and publishers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${segoeUi.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
