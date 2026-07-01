import type { JourneyMilestone } from "@/lib/content/types";

/**
 * The path — chronological, curated. `emphasis: 3` milestones get the most
 * visual weight on the timeline (the headline signals for recruiters & schools).
 * Add a milestone = add an entry; the scrollytelling layout adapts on its own.
 */

export const journey: JourneyMilestone[] = [
  {
    id: "std2a",
    year: "2021",
    title: { fr: "Bac STD2A — Arts appliqués", en: "Baccalauréat STD2A — Applied Arts" },
    place: { fr: "Design, esthétique & fonction", en: "Design, aesthetics & function" },
    kind: "school",
    blurb: {
      fr: "La forme au service du fond. L'œil se forme ici.",
      en: "Form in service of substance. The eye is trained here.",
    },
    emphasis: 1,
  },
  {
    id: "bts-com",
    year: "2021—23",
    title: { fr: "BTS Communication", en: "BTS Communication" },
    place: { fr: "Lycée Samuel de Champlain", en: "Lycée Samuel de Champlain" },
    kind: "school",
    emphasis: 1,
  },
  {
    id: "but-infocom",
    year: "2023—26",
    title: { fr: "BUT Information-Communication", en: "BUT Information-Communication" },
    place: { fr: "Université Paris 8", en: "Université Paris 8" },
    kind: "school",
    blurb: {
      fr: "Major de promotion — moyenne supérieure à 15/20.",
      en: "Top of class — overall average above 15/20.",
    },
    emphasis: 3,
  },
  {
    id: "rosa-paris",
    year: "2024",
    title: { fr: "Rosa Paris", en: "Rosa Paris" },
    place: { fr: "Direction artistique & événementiel", en: "Art direction & events" },
    kind: "agency",
    emphasis: 2,
  },
  {
    id: "volange",
    year: "2024",
    title: { fr: "Volange", en: "Volange" },
    place: { fr: "Branding & production de contenus", en: "Branding & content production" },
    kind: "agency",
    emphasis: 2,
  },
  {
    id: "riva",
    year: "2025",
    title: { fr: "Riva Agency", en: "Riva Agency" },
    place: { fr: "Pilotage de missions clients (ESCE, ISG)", en: "Client project leadership (ESCE, ISG)" },
    kind: "agency",
    emphasis: 1,
  },
  {
    id: "fondamentall",
    year: "2023",
    title: { fr: "Fondament'All", en: "Fondament'All" },
    place: { fr: "Communication — marque en transformation", en: "Communications — brand in transition" },
    kind: "venture",
    emphasis: 1,
  },
  {
    id: "le-cercle",
    year: "2023—",
    title: { fr: "Le Cercle", en: "Le Cercle" },
    place: { fr: "Création de marque — projet entrepreneurial", en: "Brand building — entrepreneurial venture" },
    kind: "venture",
    blurb: {
      fr: "Une marque créée de zéro, pilotée comme une entreprise.",
      en: "A brand built from zero, run like a business.",
    },
    emphasis: 2,
  },
  {
    id: "master",
    year: "2026",
    title: { fr: "Master Stratégie de communication", en: "MSc Communication Strategy" },
    place: { fr: "Objectif — en recherche d'alternance", en: "Target intake — seeking a work-study placement" },
    kind: "goal",
    blurb: {
      fr: "La prochaine étape. En recherche d'une alternance en agence.",
      en: "The next step. Seeking a work-study placement in an agency.",
    },
    emphasis: 3,
  },
];
