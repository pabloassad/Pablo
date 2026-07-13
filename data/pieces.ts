import type { Piece } from "@/lib/content/types";

/**
 * Standalone productions — one strong visual each, no dedicated project.
 * Add a piece = drop the file in public/works/pieces/ (or reference any
 * existing path) and add an entry here. Entries without `src` render as
 * intentional placeholders.
 */

export const pieces: Piece[] = [
  {
    id: "boss-lady",
    title: { fr: "Boss Lady", en: "Boss Lady" },
    src: "/works/boss-lady/cover.webp",
    w: 1080,
    h: 1920,
    year: "2026",
  },
  {
    id: "rosa-summer-party",
    title: { fr: "Rosa Summer Party", en: "Rosa Summer Party" },
    src: "/works/rosa-summer-party/flyer.webp",
    w: 1600,
    h: 2242,
    year: "2024",
  },
  {
    id: "flashback",
    title: { fr: "Flashback", en: "Flashback" },
    src: "/works/flashback/flyer.webp",
    w: 1080,
    h: 1920,
    year: "2026",
  },
  {
    id: "la-nuit-du-bac",
    title: { fr: "La Nuit du Bac", en: "La Nuit du Bac" },
    src: "/works/la-nuit-du-bac/flyer.webp",
    w: 1080,
    h: 1920,
    year: "2026",
  },
  {
    id: "sunset",
    title: { fr: "Sunset", en: "Sunset" },
    src: "/works/pieces-sunset.webp",
    w: 1080,
    h: 1920,
    year: "2026",
  },
];
