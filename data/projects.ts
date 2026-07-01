import type { Project, ProjectCategory, Localized } from "@/lib/content/types";

/**
 * The catalogue. Add a production = add an entry here + drop its media in
 * public/works/<slug>/ and set status to "published". See CONTENT.md.
 *
 * Seeded from Pablo's real experiences as `placeholder` slots — the frames are
 * intentional and the grid stays beautiful while they fill in.
 */

export const categoryLabels: Record<ProjectCategory, Localized> = {
  design: { fr: "Design & Direction artistique", en: "Design & Art direction" },
  video: { fr: "Vidéo & Brand content", en: "Video & Brand content" },
  sound: { fr: "Son & Composition", en: "Sound & Composition" },
};

export const projects: Project[] = [
  // ── Design & Direction artistique ──────────────────────────────────────
  {
    slug: "rosa-summer-party",
    category: "design",
    title: { fr: "Rosa Summer Party", en: "Rosa Summer Party" },
    client: "Rosa Paris",
    year: "2024",
    role: {
      fr: "Direction artistique · Identité d'événement",
      en: "Art direction · Event identity",
    },
    blurb: {
      fr: "Identité complète d'un événement interne, de l'invitation à la scénographie.",
      en: "Full identity for an internal event, from invitation to staging.",
    },
    status: "placeholder",
  },
  {
    slug: "aguila-branding",
    category: "design",
    title: { fr: "Aguila — Branding", en: "Aguila — Branding" },
    client: "Volange",
    year: "2024",
    role: { fr: "Branding · Direction artistique", en: "Branding · Art direction" },
    blurb: {
      fr: "Montée en notoriété et cohérence visuelle d'une marque événementielle.",
      en: "Awareness lift and visual coherence for an events brand.",
    },
    status: "placeholder",
  },
  {
    slug: "fondamentall-identite",
    category: "design",
    title: { fr: "Fondament'All — Évolution de marque", en: "Fondament'All — Brand evolution" },
    client: "Fondament'All",
    year: "2023",
    role: { fr: "Communication · Diagnostic de marque", en: "Communications · Brand audit" },
    blurb: {
      fr: "Faire évoluer l'identité d'une association culturelle sans trahir son ADN.",
      en: "Evolving a cultural non-profit's identity without betraying its DNA.",
    },
    status: "placeholder",
  },
  {
    slug: "design-graphique-01",
    category: "design",
    title: { fr: "Affiche & édition", en: "Poster & editorial" },
    role: { fr: "Design graphique", en: "Graphic design" },
    status: "placeholder",
  },

  // ── Vidéo & Brand content ──────────────────────────────────────────────
  {
    slug: "le-cercle-brand-content",
    category: "video",
    title: { fr: "Le Cercle — Brand content", en: "Le Cercle — Brand content" },
    client: "Le Cercle",
    year: "2023—",
    role: { fr: "Fondateur · Contenu & montage", en: "Founder · Content & editing" },
    blurb: {
      fr: "Une ligne éditoriale vidéo constante, portée sur plusieurs éditions.",
      en: "A steady video editorial line, carried across several editions.",
    },
    status: "placeholder",
  },
  {
    slug: "montage-video-01",
    category: "video",
    title: { fr: "Aftermovie", en: "Aftermovie" },
    role: { fr: "Montage vidéo", en: "Video editing" },
    status: "placeholder",
  },
  {
    slug: "montage-video-02",
    category: "video",
    title: { fr: "Contenu social", en: "Social content" },
    role: { fr: "Montage · Motion", en: "Editing · Motion" },
    status: "placeholder",
  },

  // ── Son & Composition ──────────────────────────────────────────────────
  {
    slug: "composition-01",
    category: "sound",
    title: { fr: "Composition originale", en: "Original composition" },
    role: { fr: "Production musicale", en: "Music production" },
    status: "placeholder",
  },
  {
    slug: "composition-02",
    category: "sound",
    title: { fr: "Sound design", en: "Sound design" },
    role: { fr: "Production · Design sonore", en: "Production · Sound design" },
    status: "placeholder",
  },
];
