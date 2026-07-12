import type { Project, ProjectCategory, Localized } from "@/lib/content/types";

/**
 * The catalogue. Add a production = add an entry here + drop its media in
 * public/works/<slug>/ and set status to "published". See CONTENT.md.
 * Standalone one-shot visuals live in data/pieces.ts; sound in data/audio.ts.
 */

export const categoryLabels: Record<ProjectCategory, Localized> = {
  design: { fr: "Image", en: "Image" },
  video: { fr: "Vidéo", en: "Video" },
  sound: { fr: "Son", en: "Sound" },
};

export const projects: Project[] = [
  // ── Image ────────────────────────────────────────────────────────────────
  {
    slug: "adonis",
    category: "design",
    title: { fr: "Adonis", en: "Adonis" },
    year: "2026",
    role: { fr: "Identité et direction artistique", en: "Identity and art direction" },
    blurb: {
      fr: "Identité complète d'un événement : affiche, costumes, teasers.",
      en: "Full event identity: poster, costumes, teasers.",
    },
    cover: "/works/adonis/cover.webp",
    coverW: 1080,
    coverH: 1920,
    media: [
      { src: "/works/adonis/01.webp", w: 1080, h: 1440 },
      { src: "/works/adonis/teaser-01.mp4", type: "video" },
      { src: "/works/adonis/02.webp", w: 1080, h: 1440 },
      { src: "/works/adonis/teaser-02.mp4", type: "video" },
    ],
    status: "published",
  },
  {
    slug: "le-cercle",
    category: "design",
    title: { fr: "Le Cercle", en: "Le Cercle" },
    year: "2024—",
    role: { fr: "Fondateur · Marque et direction artistique", en: "Founder · Brand and art direction" },
    blurb: {
      fr: "Une marque événementielle créée de zéro : identité, campagnes, contenus.",
      en: "An events brand built from zero: identity, campaigns, content.",
    },
    media: [
      { src: "/works/le-cercle/02.webp", w: 1080, h: 1920 },
      { src: "/works/le-cercle/teaser-01.mp4", type: "video" },
      { src: "/works/le-cercle/03.webp", w: 1400, h: 1400 },
      { src: "/works/le-cercle/04.webp", w: 1400, h: 1400 },
      { src: "/works/le-cercle/teaser-02.mp4", type: "video" },
      { src: "/works/le-cercle/07.webp", w: 1080, h: 1920 },
      { src: "/works/le-cercle/teaser-04.mp4", type: "video" },
      { src: "/works/le-cercle/05.webp", w: 1400, h: 1400 },
      { src: "/works/le-cercle/teaser-03.mp4", type: "video" },
      { src: "/works/le-cercle/06.webp", w: 1400, h: 1400 },
      { src: "/works/le-cercle/teaser-05.mp4", type: "video" },
      { src: "/works/le-cercle/01.webp", w: 1600, h: 900 },
    ],
    status: "published",
  },
  {
    slug: "miami-game",
    category: "design",
    title: { fr: "Miami Game", en: "Miami Game" },
    year: "2026",
    role: { fr: "Conception et présentation de projet", en: "Project design and presentation" },
    status: "placeholder",
  },

  // ── Vidéo ────────────────────────────────────────────────────────────────
  {
    slug: "ruby",
    category: "video",
    title: { fr: "Ruby", en: "Ruby" },
    year: "2026",
    role: { fr: "Montage · Teasers d'événement", en: "Editing · Event teasers" },
    media: [
      { src: "/works/ruby/teaser-01.mp4", type: "video" },
      { src: "/works/ruby/teaser-02.mp4", type: "video" },
    ],
    status: "published",
  },
  {
    slug: "manifesto",
    category: "video",
    title: { fr: "Manifesto", en: "Manifesto" },
    role: { fr: "Réalisation et montage · POV Média", en: "Direction and editing · POV Média" },
    media: [{ src: "/works/manifesto/film-01.mp4", type: "video" }],
    status: "published",
  },
  // ── Son ──────────────────────────────────────────────────────────────────
  {
    slug: "bibliotheque-sonore",
    category: "sound",
    title: { fr: "Bibliothèque sonore", en: "Sound library" },
    role: { fr: "Compositions et commandes — lecteur en préparation", en: "Compositions and commissions — player in the making" },
    status: "placeholder",
  },
  {
    slug: "fondamentall",
    category: "video",
    title: { fr: "Fondament'All", en: "Fondament'All" },
    year: "2026",
    role: { fr: "Animation de logo · Motion design", en: "Logo animation · Motion design" },
    status: "placeholder",
  },
];
