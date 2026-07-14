import type { Piece } from "@/lib/content/types";

/**
 * Standalone productions — one strong visual each (image or video), no
 * dedicated project. Images and moving pieces alternate so the wall keeps a
 * rhythm. Add a piece = drop the file in public/works/<slug>/ (or reference
 * any existing path) and add an entry here. Entries without `src` render as
 * intentional placeholders. Video pieces autoplay muted while on screen.
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
    id: "ruby",
    title: { fr: "Ruby", en: "Ruby" },
    src: "/works/ruby/teaser-01.mp4",
    type: "video",
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
    id: "rosa-cocktail",
    title: { fr: "Rosa Summer Party — carte cocktails", en: "Rosa Summer Party — cocktail menu" },
    src: "/works/rosa-summer-party/carte.webp",
    w: 1414,
    h: 2000,
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
    id: "manifesto",
    title: { fr: "Manifesto", en: "Manifesto" },
    src: "/works/manifesto/film-01.mp4",
    type: "video",
    w: 1920,
    h: 1080,
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
  {
    id: "showcase-la-chine",
    title: { fr: "Showcase · La Chine", en: "Showcase · La Chine" },
    src: "/works/showcase-la-chine.webp",
    w: 1080,
    h: 1920,
    year: "2026",
  },
];
