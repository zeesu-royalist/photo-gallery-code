import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], variable: "--font-playfair", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "Ethan Vale — I See Through the Wild",
  description: "Wildlife photography archive by Ethan Vale. Field notes from natural encounters, captured without intervention.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} locked`}>{children}</body>
    </html>
  );
}
