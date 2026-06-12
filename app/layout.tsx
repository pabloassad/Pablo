import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SocialSidebar } from "@/components/layout/SocialSidebar";
import { MiniPlayer } from "@/components/player/MiniPlayer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Brand display font — the same typeface the Pablito logo was traced from
const kiona = localFont({
  src: [
    { path: "./fonts/Kiona-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Kiona-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-kiona",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pablito.world"),
  title: {
    default: "Pablito · Creating connection through sound",
    template: "%s · Pablito",
  },
  description:
    "Pablito is a DJ, artist and music producer creating social connection through music: club nights, festival stages and premium events.",
  openGraph: {
    title: "Pablito · Creating connection through sound",
    description:
      "DJ, artist and music producer. Club and festival sets, original productions, and bespoke musical direction for premium events.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable} ${kiona.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>
          <div className="grain" />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <SocialSidebar />
          <MiniPlayer />
        </Providers>
      </body>
    </html>
  );
}
