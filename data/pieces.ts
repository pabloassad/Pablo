import type { Piece } from "@/lib/content/types";

/**
 * Standalone productions — a tight best-of, ordered by impact (hero pieces
 * first, supporting work after), not by date. `feature` (>1) makes a tile
 * bigger; `pair` packs two entries into one campaign unit that never splits
 * (motion + key art side by side); `note` is the one-line context under each
 * unit. The hero units show on arrival, the rest sit behind "voir plus". Add a
 * piece = drop the file in public/works/<slug>/ and add an entry here.
 */

export const pieces: Piece[] = [
  // ── Heroes — the strongest, brand-forward work, shown bigger ──────────────
  {
    id: "le-light",
    title: { fr: "Le Light", en: "Le Light" },
    note: { fr: "Événement house phare à Paris, teaser d'annonce.", en: "Flagship Paris house event, launch teaser." },
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
    note: { fr: "Soirée privée sur invitation : affiche et carte cocktails.", en: "Private invite-only party: poster and cocktail menu." },
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
    note: { fr: "Carte cocktails de la soirée.", en: "The night's cocktail menu." },
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
    note: { fr: "Marque de clubbing, édition Halloween : teaser et affiche.", en: "Clubbing brand, Halloween edition: teaser and poster." },
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
    note: { fr: "Affiche de l'édition Halloween.", en: "Halloween edition poster." },
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
    note: { fr: "Film manifeste de marque.", en: "Brand manifesto film." },
    src: "/works/manifesto/film-01.mp4",
    type: "video",
    w: 1920,
    h: 1080,
    year: "2026",
  },
  {
    id: "fondamentall",
    title: { fr: "Fondament'All · logo animé", en: "Fondament'All · animated logo" },
    note: { fr: "Logo animé, association culturelle.", en: "Animated logo, cultural non-profit." },
    src: "/works/fondamentall/logo-01.mp4",
    type: "video",
    w: 1920,
    h: 1080,
    year: "2026",
    feature: 0.85,
  },
];
