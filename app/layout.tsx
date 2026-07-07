import type { Metadata } from "next";
import { Inter, Archivo } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Intro } from "@/components/ui/Intro";

// Libre fallback for the Helvetica stack — neutral grotesque, close metrics.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Condensed display fallback (Swiss poster feel) where Helvetica Neue is absent.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700", "800", "900"],
});

const siteUrl = "https://pablo-portfolio-alpha.vercel.app";
const ogImageUrl = `${siteUrl}/images/og-image.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Pablo Assad — Communication et direction de projet",
    template: "%s · Pablo Assad",
  },
  description:
    "Pablo Assad — communication et direction de projet. Design graphique, direction artistique, brand content et production. Un catalogue visuel et un parcours.",
  keywords: [
    "Pablo Assad",
    "communication",
    "direction artistique",
    "design graphique",
    "brand content",
    "chef de projet communication",
  ],
  authors: [{ name: "Pablo Assad" }],
  openGraph: {
    title: "Pablo Assad — Communication et direction de projet",
    description:
      "Un regard de créatif, la rigueur d'un stratège. Design, direction artistique et production de contenus.",
    url: siteUrl,
    siteName: "Pablo Assad",
    locale: "fr_FR",
    type: "website",
    images: [{ url: ogImageUrl, width: 1200, height: 630, alt: "Pablo Assad" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pablo Assad — Communication et direction de projet",
    description: "Un regard de créatif, la rigueur d'un stratège.",
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
      className={`${inter.variable} ${archivo.variable} antialiased`}
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
