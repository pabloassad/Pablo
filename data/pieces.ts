import type { Piece } from "@/lib/content/types";

/**
 * Standalone productions — one strong visual each (image or video), no
 * dedicated project. The featured pieces lead as an accroche (Rosa's flyer +
 * cocktail menu paired and large, then Boss Lady, Flashback, Miami Game), then
 * the rest keeps a portrait/landscape rhythm. Add a piece = drop the file in
 * public/works/<slug>/ (or reference any existing path) and add an entry here.
 * Entries without `src` render as intentional placeholders. Video pieces
 * autoplay muted while on screen.
 */

export const pieces: Piece[] = [
  // ── Accroche — featured, larger row ──────────────────────────────────────
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
    title: { fr: "Rosa Summer Party — carte cocktails", en: "Rosa Summer Party — cocktail menu" },
    src: "/works/rosa-summer-party/carte.webp",
    w: 1414,
    h: 2000,
    year: "2024",
    pair: "rosa",
    feature: 1.5,
  },
  {
    id: "boss-lady",
    title: { fr: "Boss Lady", en: "Boss Lady" },
    src: "/works/boss-lady/cover.webp",
    w: 1080,
    h: 1920,
    year: "2026",
    feature: 1.35,
  },
  {
    id: "flashback",
    title: { fr: "Flashback", en: "Flashback" },
    src: "/works/flashback/flyer.webp",
    w: 1080,
    h: 1920,
    year: "2026",
    feature: 1.35,
  },
  {
    id: "miami-game",
    title: { fr: "Miami Game", en: "Miami Game" },
    src: "/works/miami-game/flyer-01.mp4",
    type: "video",
    w: 1080,
    h: 1920,
    year: "2026",
    feature: 1.35,
  },

  // ── The rest — portrait / landscape rhythm ───────────────────────────────
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
    id: "manifesto",
    title: { fr: "Manifesto", en: "Manifesto" },
    src: "/works/manifesto/film-01.mp4",
    type: "video",
    w: 1920,
    h: 1080,
    year: "2026",
  },
  {
    id: "paradise",
    title: { fr: "Paradise — identité", en: "Paradise — identity" },
    src: "/works/paradise.webp",
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
    id: "fondamentall",
    title: { fr: "Fondament'All — logo animé", en: "Fondament'All — animated logo" },
    src: "/works/fondamentall/logo-01.mp4",
    type: "video",
    w: 1920,
    h: 1080,
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
