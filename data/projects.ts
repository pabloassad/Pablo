import type { Project, ProjectCategory, Localized } from "@/lib/content/types";

/**
 * The catalogue. Add a production = add an entry here + drop its media in
 * public/works/<slug>/ and set status to "published". See CONTENT.md.
 */

export const categoryLabels: Record<ProjectCategory, Localized> = {
  design: { fr: "Design et Direction artistique", en: "Design and Art direction" },
  video: { fr: "Vidéo et Brand content", en: "Video and Brand content" },
  sound: { fr: "Son et Composition", en: "Sound and Composition" },
};

export const projects: Project[] = [
  // ── Design et Direction artistique ──────────────────────────────────────
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
    media: [
      { src: "/works/adonis/01.webp" },
      { src: "/works/adonis/02.webp" },
      { src: "/works/adonis/teaser-01.mp4", type: "video" },
      { src: "/works/adonis/teaser-02.mp4", type: "video" },
    ],
    status: "published",
  },
  {
    slug: "la-nuit-du-bac",
    category: "design",
    title: { fr: "La Nuit du Bac", en: "La Nuit du Bac" },
    year: "2026",
    role: { fr: "Direction artistique · Affiche et teaser", en: "Art direction · Poster and teaser" },
    status: "placeholder",
  },
  {
    slug: "rosa-summer-party",
    category: "design",
    title: { fr: "Rosa Summer Party", en: "Rosa Summer Party" },
    client: "Rosa Paris",
    year: "2024",
    role: { fr: "Direction artistique · Identité d'événement", en: "Art direction · Event identity" },
    blurb: {
      fr: "Identité d'un événement interne d'agence, de l'invitation à la scénographie.",
      en: "Identity for an agency's internal event, from invitation to staging.",
    },
    status: "placeholder",
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
    cover: "/works/le-cercle/cover.webp",
    media: [
      { src: "/works/le-cercle/01.webp" },
      { src: "/works/le-cercle/02.webp" },
      { src: "/works/le-cercle/03.webp" },
      { src: "/works/le-cercle/04.webp" },
      { src: "/works/le-cercle/05.webp" },
      { src: "/works/le-cercle/06.webp" },
      { src: "/works/le-cercle/teaser-01.mp4", type: "video" },
      { src: "/works/le-cercle/teaser-02.mp4", type: "video" },
      { src: "/works/le-cercle/teaser-03.mp4", type: "video" },
    ],
    status: "published",
  },
  {
    slug: "boss-lady",
    category: "design",
    title: { fr: "Boss Lady", en: "Boss Lady" },
    year: "2026",
    role: { fr: "Direction artistique · Affiche", en: "Art direction · Poster" },
    cover: "/works/boss-lady/cover.webp",
    media: [{ src: "/works/boss-lady/01.webp" }],
    status: "published",
  },
  {
    slug: "flashback",
    category: "design",
    title: { fr: "Flashback", en: "Flashback" },
    year: "2026",
    role: { fr: "Design graphique · Affiche", en: "Graphic design · Poster" },
    status: "placeholder",
  },
  {
    slug: "miami-game",
    category: "design",
    title: { fr: "Miami Game", en: "Miami Game" },
    year: "2026",
    role: { fr: "Conception et présentation de projet", en: "Project design and presentation" },
    status: "placeholder",
  },

  // ── Vidéo et Brand content ──────────────────────────────────────────────
  {
    slug: "ruby",
    category: "video",
    title: { fr: "Ruby", en: "Ruby" },
    year: "2026",
    role: { fr: "Montage · Teasers d'événement", en: "Editing · Event teasers" },
    cover: "/works/ruby/cover.webp",
    media: [
      { src: "/works/ruby/teaser-01.mp4", type: "video" },
      { src: "/works/ruby/teaser-02.mp4", type: "video" },
    ],
    status: "published",
  },
  {
    slug: "fondamentall",
    category: "video",
    title: { fr: "Fondament'All", en: "Fondament'All" },
    year: "2026",
    role: { fr: "Animation de logo · Motion design", en: "Logo animation · Motion design" },
    status: "placeholder",
  },
  {
    slug: "manifesto",
    category: "video",
    title: { fr: "Manifesto", en: "Manifesto" },
    role: { fr: "Réalisation et montage", en: "Direction and editing" },
    status: "placeholder",
  },

  // ── Son et Composition ──────────────────────────────────────────────────
  {
    slug: "compositions",
    category: "sound",
    title: { fr: "Compositions originales", en: "Original compositions" },
    role: { fr: "Production musicale — FL Studio, piano", en: "Music production — FL Studio, piano" },
    status: "placeholder",
  },
  {
    slug: "sound-design",
    category: "sound",
    title: { fr: "Habillage sonore", en: "Sound design" },
    role: { fr: "Design sonore pour teasers et contenus", en: "Sound design for teasers and content" },
    status: "placeholder",
  },
];
