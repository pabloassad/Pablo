import type { JourneyMilestone } from "@/lib/content/types";

/**
 * The path — chronological, sourced from Pablo's CV (2026). `emphasis: 3`
 * milestones get the most visual weight (headline signals for recruiters &
 * schools). Add a milestone = add an entry; the layout adapts on its own.
 */

export const journey: JourneyMilestone[] = [
  {
    id: "std2a",
    year: "2020—23",
    title: { fr: "Bac STD2A — Arts appliqués", en: "Baccalauréat STD2A — Applied Arts" },
    place: { fr: "Lycée Nicolas Ledoux, Vincennes", en: "Lycée Nicolas Ledoux, Vincennes" },
    kind: "school",
    blurb: {
      fr: "La forme au service du fond. L'œil se forme ici.",
      en: "Form in service of substance. The eye is trained here.",
    },
    emphasis: 1,
  },
  {
    id: "bts-com",
    year: "2023—25",
    title: { fr: "BTS Communication", en: "BTS Communication" },
    place: { fr: "Lycée Samuel de Champlain", en: "Lycée Samuel de Champlain" },
    kind: "school",
    emphasis: 1,
  },
  {
    id: "rosa-paris",
    year: "Juin 2024",
    title: { fr: "Rosa Paris — Stage", en: "Rosa Paris — Internship" },
    place: { fr: "Direction artistique, maquettes et exécution clients", en: "Art direction, client layouts and production" },
    kind: "agency",
    emphasis: 2,
  },
  {
    id: "le-cercle",
    year: "2024—",
    title: { fr: "Le Cercle — Auto-entrepreneur", en: "Le Cercle — Founder" },
    place: { fr: "Création de marque et pilotage artistique d'événements", en: "Brand building and artistic direction of events" },
    kind: "venture",
    blurb: {
      fr: "Une marque créée de zéro et pilotée comme une entreprise, en parallèle des études.",
      en: "A brand built from zero and run like a business, alongside my studies.",
    },
    emphasis: 2,
  },
  {
    id: "volange",
    year: "Nov—Déc 2024",
    title: { fr: "Volange — Stage", en: "Volange — Internship" },
    place: { fr: "Direction artistique et événementiel", en: "Art direction and events" },
    kind: "agency",
    emphasis: 2,
  },
  {
    id: "riva",
    year: "2025—",
    title: { fr: "Riva", en: "Riva" },
    place: { fr: "Projet entrepreneurial — en parallèle des études", en: "Entrepreneurial venture — alongside my studies" },
    kind: "venture",
    emphasis: 1,
  },
  {
    id: "but-infocom",
    year: "2025—26",
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
    id: "master",
    year: "Sept. 2026",
    title: { fr: "Master Stratégie de communication", en: "MSc Communication Strategy" },
    place: { fr: "La Sorbonne", en: "La Sorbonne" },
    kind: "goal",
    blurb: {
      fr: "La prochaine étape.",
      en: "The next step.",
    },
    emphasis: 3,
  },
];
