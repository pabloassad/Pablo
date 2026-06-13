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

const siteUrl = "https://djpablito.vercel.app";
const ogImageUrl = `${siteUrl}/images/og-image.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Pablito",
    template: "%s · Pablito",
  },
  description: "DJ • Producteur • Paris",
  openGraph: {
    title: "Pablito",
    description: "DJ • Producteur • Paris",
    url: siteUrl,
    type: "website",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Pablito",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pablito",
    description: "DJ • Producteur • Paris",
    images: [ogImageUrl],
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
