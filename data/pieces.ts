import type { Piece } from "@/lib/content/types";

/**
 * The Sélection — a curated best-of shown up top. The strongest units (incl.
 * the best project teasers) lead and show on arrival; the rest fold behind
 * "voir plus" — a deeper gallery drawn from the projects and standalone work.
 * `feature` (>1) makes a tile bigger; `pair` packs two entries into one unit;
 * `note` is the one-line context under each unit.
 */

export const pieces: Piece[] = [
  // ── Shown on arrival — the best content (two rows) ────────────────────────
  {
    id: "adonis-bal-ombres",
    title: { fr: "Adonis · Le Bal des Ombres", en: "Adonis · Le Bal des Ombres" },
    note: { fr: "Teaser de lancement, dernière édition.", en: "Launch teaser, latest edition." },
    src: "/works/adonis/teaser-retour.mp4",
    type: "video",
    w: 1080,
    h: 1920,
    year: "2026",
  },
  {
    id: "le-light",
    title: { fr: "Le Light", en: "Le Light" },
    note: { fr: "Événement house phare à Paris, teaser d'annonce.", en: "Flagship Paris house event, launch teaser." },
    src: "/works/le-light/teaser.mp4",
    type: "video",
    w: 1080,
    h: 1920,
    year: "2026",
  },
  {
    id: "adonis-azur",
    title: { fr: "Adonis · Édition Azur", en: "Adonis · Azur Edition" },
    note: { fr: "Teaser de lancement de l'édition.", en: "Edition launch teaser." },
    src: "/works/adonis/teaser-01.mp4",
    type: "video",
    w: 1080,
    h: 1920,
    year: "2026",
  },
  {
    id: "rosa-summer-party",
    title: { fr: "Rosa Summer Party", en: "Rosa Summer Party" },
    note: { fr: "Soirée privée sur invitation, affiche.", en: "Private invite-only party, poster." },
    src: "/works/rosa-summer-party/flyer.webp",
    w: 1600,
    h: 2242,
    year: "2024",
  },
  {
    id: "ruby-halloween",
    title: { fr: "Ruby · Halloween", en: "Ruby · Halloween" },
    note: { fr: "Marque de clubbing, édition Halloween.", en: "Clubbing brand, Halloween edition." },
    src: "/works/ruby/halloween.mp4",
    type: "video",
    w: 1080,
    h: 1920,
    year: "2026",
  },
  {
    id: "le-cercle-vegas",
    title: { fr: "Le Cercle · Las Vegas", en: "Le Cercle · Las Vegas" },
    note: { fr: "Édition Las Vegas, affiche.", en: "Las Vegas edition, poster." },
    src: "/works/le-cercle/02.webp",
    w: 1080,
    h: 1920,
    year: "2025",
  },

  // ── Behind "voir plus" — a deeper gallery ─────────────────────────────────
  {
    id: "rosa-cocktail",
    title: { fr: "Rosa Summer Party · carte cocktails", en: "Rosa Summer Party · cocktail menu" },
    note: { fr: "Carte cocktails de la soirée.", en: "The night's cocktail menu." },
    src: "/works/rosa-summer-party/carte.webp",
    w: 1414,
    h: 2000,
    year: "2024",
  },
  {
    id: "ruby-halloween-flyer",
    title: { fr: "Ruby · Halloween, affiche", en: "Ruby · Halloween, poster" },
    note: { fr: "Affiche de l'édition Halloween.", en: "Halloween edition poster." },
    src: "/works/ruby/halloween-banner.webp",
    w: 1414,
    h: 2000,
    year: "2026",
  },
  {
    id: "le-cercle-metro",
    title: { fr: "Le Cercle · image", en: "Le Cercle · image" },
    note: { fr: "Direction artistique, éditorial.", en: "Art direction, editorial." },
    src: "/works/le-cercle/04.webp",
    w: 1400,
    h: 1400,
    year: "2025",
  },
  {
    id: "boss-lady",
    title: { fr: "Boss Lady", en: "Boss Lady" },
    note: { fr: "Affiche d'événement.", en: "Event poster." },
    src: "/works/boss-lady/cover.webp",
    w: 1080,
    h: 1920,
    year: "2026",
  },
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
  },
];
