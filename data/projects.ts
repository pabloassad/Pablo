import type { Project, ProjectCategory, Localized } from "@/lib/content/types";

/**
 * The catalogue. Add a production = add an entry here + drop its media in
 * public/works/<slug>/ and set status to "published". See CONTENT.md.
 *
 * Entries mirror the real productions in Pablo's asset drive; they flip to
 * "published" the moment their cover image lands in public/works/.
 */

export const categoryLabels: Record<ProjectCategory, Localized> = {
  design: { fr: "Design & Direction artistique", en: "Design & Art direction" },
  video: { fr: "Vidéo & Brand content", en: "Video & Brand content" },
  sound: { fr: "Son & Composition", en: "Sound & Composition" },
};

export const projects: Project[] = [
  // ── Design & Direction artistique ──────────────────────────────────────
  {
    slug: "adonis",
    category: "design",
    title: { fr: "Adonis", en: "Adonis" },
    year: "2026",
    role: { fr: "Identité & direction artistique", en: "Identity & art direction" },
    blurb: {
      fr: "Identité complète d'un événement : affiche, costumes, teasers.",
      en: "Full event identity: poster, costumes, teasers.",
    },
    status: "placeholder",
  },
  {
    slug: "la-nuit-du-bac",
    category: "design",
    title: { fr: "La Nuit du Bac", en: "La Nuit du Bac" },
    year: "2026",
    role: { fr: "Direction artistique · Affiche & teaser", en: "Art direction · Poster & teaser" },
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
    role: { fr: "Fondateur · Marque & direction artistique", en: "Founder · Brand & art direction" },
    blurb: {
      fr: "Une marque événementielle créée de zéro : identité, campagnes, contenus.",
      en: "An events brand built from zero: identity, campaigns, content.",
    },
    status: "placeholder",
  },
  {
    slug: "boss-lady",
    category: "design",
    title: { fr: "Boss Lady", en: "Boss Lady" },
    year: "2026",
    role: { fr: "Direction artistique · Affiche", en: "Art direction · Poster" },
    status: "placeholder",
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
    role: { fr: "Conception & présentation de projet", en: "Project design & presentation" },
    status: "placeholder",
  },

  // ── Vidéo & Brand content ──────────────────────────────────────────────
  {
    slug: "ruby",
    category: "video",
    title: { fr: "Ruby", en: "Ruby" },
    year: "2026",
    role: { fr: "Montage · Teasers d'événement", en: "Editing · Event teasers" },
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
  {
    slug: "manifesto",
    category: "video",
    title: { fr: "Manifesto", en: "Manifesto" },
    role: { fr: "Réalisation & montage", en: "Direction & editing" },
    status: "placeholder",
  },

  // ── Son & Composition ──────────────────────────────────────────────────
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
    role: { fr: "Design sonore pour teasers & contenus", en: "Sound design for teasers & content" },
    status: "placeholder",
  },
];
