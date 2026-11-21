import type { JourneyMilestone } from "@/lib/content/types";

/**
 * The markers — sourced from Pablo's CV (2026). Two registers of one block:
 * kind "school" | "goal" → Formation column; everything else → Expériences.
 * Ordered most-recent → oldest in each register. Titles + structure + year;
 * the layout stays deliberately quiet.
 */

export const journey: JourneyMilestone[] = [
  // ── Formation (plus récent → plus ancien) ─────────────────────────────────
  {
    id: "master",
    year: "Sept. 2026",
    title: { fr: "Master Communication des organisations", en: "Master's in Organizational Communication" },
    place: { fr: "Sorbonne Paris Nord", en: "Sorbonne Paris Nord" },
    kind: "school",
    emphasis: 3,
  },
  {
    id: "but-infocom",
    year: "2025-26",
    title: { fr: "BUT Information-Communication", en: "BUT Information-Communication" },
    place: { fr: "Université Paris 8 · Major de promotion", en: "Université Paris 8 · Top of class" },
    kind: "school",
    emphasis: 3,
  },
  {
    id: "bts-com",
    year: "2023-25",
    title: { fr: "BTS Communication", en: "BTS Communication" },
    place: { fr: "Lycée Samuel de Champlain", en: "Lycée Samuel de Champlain" },
    kind: "school",
    emphasis: 1,
  },
  {
    id: "std2a",
    year: "2020-23",
    title: { fr: "Bac STD2A, Arts appliqués", en: "Baccalauréat STD2A, Applied Arts" },
    place: { fr: "Lycée Nicolas Ledoux, Vincennes", en: "Lycée Nicolas Ledoux, Vincennes" },
    kind: "school",
    emphasis: 1,
  },

  // ── Expériences (plus récent → plus ancien) ───────────────────────────────
  {
    id: "riva",
    year: "2025-26",
    title: { fr: "Riva Agency", en: "Riva Agency" },
    place: { fr: "Projet entrepreneurial", en: "Entrepreneurial venture" },
    kind: "venture",
    emphasis: 2,
  },
  {
    id: "fondamentall",
    year: "Mars-Juil. 2026",
    title: { fr: "Fondament'All", en: "Fondament'All" },
    place: { fr: "Responsable communication · Association solidaire", en: "Communications lead · Non-profit" },
    kind: "agency",
    emphasis: 2,
  },
  {
    id: "le-cercle",
    year: "2024-26",
    title: { fr: "Le Cercle", en: "Le Cercle" },
    place: { fr: "Auto-entrepreneur · Marque événementielle", en: "Founder · Events brand" },
    kind: "venture",
    emphasis: 2,
  },
  {
    id: "volange",
    year: "Nov-Déc 2024",
    title: { fr: "Volange", en: "Volange" },
    place: { fr: "Stage · Direction artistique", en: "Internship · Art direction" },
    kind: "agency",
    emphasis: 1,
  },
  {
    id: "rosa-paris",
    year: "Juin 2024",
    title: { fr: "Rosa Paris", en: "Rosa Paris" },
    place: { fr: "Stage · Direction artistique", en: "Internship · Art direction" },
    kind: "agency",
    emphasis: 2,
  },
  {
    id: "fscf",
    year: "2023",
    title: { fr: "FSCF", en: "FSCF" },
    place: { fr: "Formateur BAFA", en: "BAFA trainer" },
    kind: "agency",
    emphasis: 1,
  },
  {
    id: "philharmonie",
    year: "2020",
    title: { fr: "Philharmonie de Paris", en: "Philharmonie de Paris" },
    place: { fr: "Stage", en: "Internship" },
    kind: "agency",
    emphasis: 1,
  },
  {
    id: "benzene",
    year: "2020",
    title: { fr: "Benzene", en: "Benzene" },
    place: { fr: "Stage · Sound design et musique", en: "Internship · Sound design and music" },
    kind: "agency",
    emphasis: 1,
  },
];
