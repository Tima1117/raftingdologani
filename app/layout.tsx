import type { Metadata } from "next";
import { Inter_Tight, Manrope, Noto_Sans_Georgian } from "next/font/google";
import "./globals.css";

const display = Inter_Tight({ subsets: ["latin", "cyrillic"], weight: ["600", "700", "800"], variable: "--font-display", display: "swap" });
const body = Manrope({ subsets: ["latin", "cyrillic"], weight: ["400", "500", "600", "700", "800"], variable: "--font-body", display: "swap" });
const georgian = Noto_Sans_Georgian({ subsets: ["georgian"], weight: ["400", "600", "800"], variable: "--font-georgian", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://raftingdologani.vercel.app"),
  title: "Rafting Tour in Dologani — whitewater rafting 40 minutes from Batumi",
  description: "Rafting on the Acharistskali river from a family base in Dologani, Adjara: 8 km classic route, family rafting for kids from 6, horse rides to the waterfalls and buggies. Rated 4.9 by 114 guests on Google.",
  openGraph: {
    title: "Rafting Tour in Dologani — rafting near Batumi",
    description: "Whitewater rafting, horses and buggies in the Adjara mountains, 40 minutes from Batumi. Rated 4.9 on Google.",
    url: "https://raftingdologani.vercel.app",
    siteName: "Rafting Tour in Dologani",
    locale: "en_US",
    type: "website",
    images: [{ url: "/images/raft-guests.webp", width: 1400, height: 788 }],
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${georgian.variable}`}>{children}</body>
    </html>
  );
}
