import type { Metadata } from "next";
import { Catalogue } from "@/components/chapters/Catalogue";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Répertoire",
  description:
    "Le répertoire de Pablo Assad : productions et réalisations. Design, direction artistique, vidéo, brand content et composition.",
  openGraph: {
    title: "Pablo Assad · Répertoire",
    description: "Productions et réalisations, en images.",
    url: `${siteUrl}/repertoire`,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Pablo Assad · Portfolio" }],
    siteName: "Pablo Assad",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pablo Assad · Répertoire",
    description: "Productions et réalisations, en images.",
    images: ["/og.jpg"],
  },
  alternates: { canonical: `${siteUrl}/repertoire` },
};

export default function RepertoirePage() {
  return (
    <>
      {/* The whole top zone shares the section ground (paper-2), so nothing
          draws a floating edge under the transparent nav at scroll 0. The
          spacer matches the transparent nav's full height (mobile 69px, desktop
          77px) so the dark hero starts exactly at its bottom and the nav items
          read as vertically centred on the light bar, not sunk toward it. */}
      <div className="bg-paper-2">
        <div className="pt-[4.4rem] sm:pt-20" aria-hidden />
        <Catalogue standalone />
      </div>
    </>
  );
}
