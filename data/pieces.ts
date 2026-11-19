import type { Piece } from "@/lib/content/types";

/**
 * Standalone productions — a tight best-of, ordered by impact (hero pieces
 * first, supporting work after), not by date. `feature` (>1) makes a tile
 * bigger; `pair` packs two entries into one campaign unit that never splits
 * (motion + key art side by side). Kept short on purpose: a few strong units
 * read premium where a long grid reads like a dump. Add a piece = drop the file
 * in public/works/<slug>/ and add an entry here. Video pieces autoplay muted.
 */

export const pieces: Piece[] = [
  // ── Heroes — the strongest, brand-forward work, shown bigger ──────────────
  {
    id: "le-light",
    title: { fr: "Le Light", en: "Le Light" },
    src: "/works/le-light/teaser.mp4",
    type: "video",
    w: 1080,
    h: 1920,
    year: "2026",
    feature: 1.5,
  },
  {
    id: "rosa-summer-party",
    title: { fr: "Rosa Summer Party", en: "Rosa Summer Party" },
    src: "/works/rosa-summer-party/flyer.webp",
    w: 1600,
    h: 2242,
    year: "2024",
    pair: "rosa",
    feature: 1.5,
  },
  {
    id: "rosa-cocktail",
    title: { fr: "Rosa Summer Party · carte cocktails", en: "Rosa Summer Party · cocktail menu" },
    src: "/works/rosa-summer-party/carte.webp",
    w: 1414,
    h: 2000,
    year: "2024",
    pair: "rosa",
    feature: 1.5,
  },

  // ── Ruby Halloween — motion + key art, grouped as one campaign unit ───────
  {
    id: "ruby-halloween",
    title: { fr: "Ruby · Halloween", en: "Ruby · Halloween" },
    src: "/works/ruby/halloween.mp4",
    type: "video",
    w: 1080,
    h: 1920,
    year: "2026",
    pair: "ruby",
    feature: 1.2,
  },
  {
    id: "ruby-halloween-flyer",
    title: { fr: "Ruby · Halloween, affiche", en: "Ruby · Halloween, poster" },
    src: "/works/ruby/halloween-banner.webp",
    w: 1414,
    h: 2000,
    year: "2026",
    pair: "ruby",
    feature: 1.2,
  },

  // ── Supporting — range (film, animated identity), shown smaller ───────────
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
    id: "fondamentall",
    title: { fr: "Fondament'All · logo animé", en: "Fondament'All · animated logo" },
    src: "/works/fondamentall/logo-01.mp4",
    type: "video",
    w: 1920,
    h: 1080,
    year: "2026",
    feature: 0.85,
  },
];
