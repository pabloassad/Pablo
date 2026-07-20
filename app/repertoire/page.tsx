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
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Pablo Assad · Portfolio" }],
  },
  alternates: { canonical: `${siteUrl}/repertoire` },
};

export default function RepertoirePage() {
  return (
    <>
      {/* The whole top zone shares the section ground (paper-2), so nothing
          draws a floating edge under the transparent nav at scroll 0. The
          header line then appears with the navbar's own scrolled state. */}
      <div className="bg-paper-2">
        <div className="pt-14 sm:pt-16" aria-hidden />
        <Catalogue standalone />
      </div>
    </>
  );
}
