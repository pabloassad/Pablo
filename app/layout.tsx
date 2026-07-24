import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SocialSidebar } from "@/components/layout/SocialSidebar";
import { MiniPlayer } from "@/components/player/MiniPlayer";
import { getServerLocale } from "@/lib/i18n/server";
import { rootMetadata } from "@/lib/i18n/metadata";
import { socials, contactEmail } from "@/lib/data";

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

export async function generateMetadata(): Promise<Metadata> {
  return rootMetadata(await getServerLocale());
}

// schema.org MusicGroup — lets search engines and rich results tie the name,
// socials and genre together as a single music act.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "Pablito",
  url: siteUrl,
  genre: ["Electronic", "House", "DJ"],
  email: contactEmail,
  address: { "@type": "PostalAddress", addressLocality: "Paris", addressCountry: "FR" },
  sameAs: [socials.spotify, socials.soundcloud, socials.youtube, socials.instagram],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getServerLocale();

  return (
    <html lang={locale} data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable} ${kiona.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers initialLocale={locale}>
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
