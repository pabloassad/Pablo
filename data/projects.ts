import type { Project, ProjectCategory, Localized } from "@/lib/content/types";

/**
 * The catalogue. Add a production = add an entry here + drop its media in
 * public/works/<slug>/ and set status to "published". See CONTENT.md.
 * Media render in data order (the author controls the sequence).
 * Standalone one-shot visuals live in data/pieces.ts; sound in data/audio.ts.
 */

export const categoryLabels: Record<ProjectCategory, Localized> = {
  design: { fr: "Image", en: "Image" },
  video: { fr: "Vidéo", en: "Video" },
  sound: { fr: "Son", en: "Sound" },
};

export const projects: Project[] = [
  {
    slug: "adonis",
    category: "design",
    title: { fr: "Adonis", en: "Adonis" },
    client: "Adonis",
    year: "2026",
    role: { fr: "Identité et direction artistique", en: "Identity and art direction" },
    descriptor: { fr: "Marque événementielle · client", en: "Events brand · client" },
    blurb: {
      fr: "Identité complète d'un événement : affiche, costumes, teasers.",
      en: "Full event identity: poster, costumes, teasers.",
    },
    cover: "/works/adonis/cover.webp",
    coverW: 1080,
    coverH: 1920,
    media: [
      // The screen video (V3) leads the block — a strong moving accroche.
      { src: "/works/adonis/ecran.mp4", type: "video" },
      { src: "/works/adonis/mockup.webp", w: 1080, h: 1440 },
      { src: "/works/adonis/teaser-03.mp4", type: "video" },
      { src: "/works/adonis/08.webp", w: 2000, h: 2828 },
      { src: "/works/adonis/teaser-01.mp4", type: "video" },
      { src: "/works/adonis/teaser-02.mp4", type: "video" },
      { src: "/works/adonis/teaser-05.mp4", type: "video" },
    ],
    status: "published",
  },
  {
    slug: "le-cercle",
    category: "design",
    title: { fr: "Le Cercle", en: "Le Cercle" },
    year: "2024—",
    role: {
      fr: "Fondateur · Marque événementielle et direction artistique",
      en: "Founder · Events brand and art direction",
    },
    descriptor: { fr: "Marque événementielle", en: "Events brand" },
    blurb: {
      fr: "Une marque événementielle créée de zéro : identité, campagnes, contenus.",
      en: "An events brand built from zero: identity, campaigns, content.",
    },
    media: [
      { src: "/works/le-cercle/01.webp", w: 1920, h: 1080 },
      { src: "/works/le-cercle/teaser-01.mp4", type: "video" },
      { src: "/works/le-cercle/02.webp", w: 1080, h: 1920 },
      { src: "/works/le-cercle/09.webp", w: 1920, h: 1080 },
      { src: "/works/le-cercle/teaser-02.mp4", type: "video" },
      { src: "/works/le-cercle/03.webp", w: 1400, h: 1400 },
      { src: "/works/le-cercle/04.webp", w: 1400, h: 1400 },
      { src: "/works/le-cercle/teaser-07.mp4", type: "video" },
      { src: "/works/le-cercle/07.webp", w: 1080, h: 1920 },
      { src: "/works/le-cercle/08.webp", w: 1080, h: 1920 },
      { src: "/works/le-cercle/teaser-03.mp4", type: "video" },
      { src: "/works/le-cercle/06.webp", w: 1400, h: 1400 },
      { src: "/works/le-cercle/10.webp", w: 1920, h: 1080 },
      { src: "/works/le-cercle/teaser-04.mp4", type: "video" },
      { src: "/works/le-cercle/teaser-05.mp4", type: "video" },
      { src: "/works/le-cercle/logo.webp", w: 2000, h: 2000 },
    ],
    status: "published",
  },
];
