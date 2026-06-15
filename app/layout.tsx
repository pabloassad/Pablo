import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Intro } from "@/components/ui/Intro";

// Display — a contemporary, expressive serif (optical sizing on by default).
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

// Body — neutral, highly legible.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Accent — mono for kickers and section numbers (the "studio timecode" nod).
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://pabloassad.vercel.app";
const ogImageUrl = `${siteUrl}/images/og-image.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Pablo Assad — Chef de projet communication",
    template: "%s · Pablo Assad",
  },
  description:
    "Pablo Assad, chef de projet communication. Un regard de créatif, la rigueur d'un stratège. Création de marque, direction artistique et pilotage de projets.",
  keywords: [
    "Pablo Assad",
    "chef de projet communication",
    "stratégie de communication",
    "direction artistique",
    "création de marque",
    "branding",
    "alternance communication",
  ],
  authors: [{ name: "Pablo Assad" }],
  openGraph: {
    title: "Pablo Assad — Chef de projet communication",
    description:
      "Un regard de créatif, la rigueur d'un stratège. Je ne fais pas de la communication — je compose des marques.",
    url: siteUrl,
    siteName: "Pablo Assad",
    locale: "fr_FR",
    type: "website",
    images: [{ url: ogImageUrl, width: 1200, height: 630, alt: "Pablo Assad" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pablo Assad — Chef de projet communication",
    description: "Je ne fais pas de la communication — je compose des marques.",
    images: [ogImageUrl],
  },
  alternates: { canonical: siteUrl },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="bg-paper text-ink min-h-screen">
        <Providers>
          <Intro />
          <div className="grain" aria-hidden />
          <Nav />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
