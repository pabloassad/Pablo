import type { CaseStudy } from "@/lib/content/types";

/**
 * The case studies — projects told, not just shown. `featured` cases (with rich
 * media) lead the Répertoire as full visual blocks with their key figures
 * inline; the rest show as compact index rows. Order here drives both the page
 * order and prev/next. Copy stays essential: short sentences, the words that
 * matter in **bold**. No filler.
 */

export const caseStudies: CaseStudy[] = [
  // ── 01 · Adonis (featured) ────────────────────────────────────────────────
  {
    slug: "adonis",
    title: { fr: "Adonis", en: "Adonis" },
    client: "Adonis",
    year: "2026",
    role: {
      fr: "Accompagnement stratégique · Direction artistique",
      en: "Strategic support · Art direction",
    },
    result: {
      fr: "**1000+ participants** par édition, **250k impressions** par campagne.",
      en: "**1000+ guests** per edition, **250k impressions** per campaign.",
    },
    cover: "/works/adonis/event-06.webp",
    coverW: 1080,
    coverH: 1920,
    context: {
      fr: "**Accompagnement stratégique et direction artistique** d'une marque d'événement : supports, développement, suivi.",
      en: "**Strategic support and art direction** for an event brand: production, development, follow-up.",
    },
    challenge: {
      fr: "Proposer du **nouveau** en restant fidèle à la **DA initiale**. Continuité, pas rupture.",
      en: "Offer something **new** while staying true to the **original art direction**. Continuity, not a break.",
    },
    decisions: [
      { fr: "Capitaliser sur l'**ADN de la marque** : le lustre, le nom Adonis comme symbole de beauté.", en: "Lean on the **brand's DNA**: the chandelier, the name Adonis as a symbol of beauty." },
      { fr: "La **lumière du lustre** révèle la beauté des participants.", en: "The **chandelier's light** reveals the guests' beauty." },
    ],
    metrics: [
      { value: "1000+", label: { fr: "participants", en: "guests" } },
      { value: "250k", label: { fr: "impressions", en: "impressions" } },
    ],
    media: [
      { src: "/works/adonis/teaser-retour.mp4", type: "video" },
      { src: "/works/adonis/bal-des-ombres-banner.webp", w: 1920, h: 1080 },
      { src: "/works/adonis/event-01.webp", w: 1600, h: 1066 },
      { src: "/works/adonis/ecran.mp4", type: "video" },
      { src: "/works/adonis/event-02.webp", w: 1600, h: 1067 },
      { src: "/works/adonis/teaser-01.mp4", type: "video" },
      { src: "/works/adonis/event-03.webp", w: 1600, h: 1066 },
      { src: "/works/adonis/event-05.webp", w: 1600, h: 1066 },
      { src: "/works/adonis/cover.webp", w: 1080, h: 1920 },
      { src: "/works/adonis/event-04.webp", w: 1600, h: 1066 },
      { src: "/works/adonis/teaser-03.mp4", type: "video" },
      { src: "/works/adonis/08.webp", w: 2000, h: 2828 },
      { src: "/works/adonis/teaser-05.mp4", type: "video" },
      { src: "/works/adonis/hero.mp4", type: "video" },
    ],
  },

  // ── 02 · Le Cercle (featured) ─────────────────────────────────────────────
  {
    slug: "le-cercle",
    title: { fr: "Le Cercle", en: "Le Cercle" },
    year: "2024-2026",
    role: {
      fr: "Fondateur · Direction artistique et coordination",
      en: "Founder · Art direction and coordination",
    },
    result: {
      fr: "Une marque née de zéro : \n**8 éditions**, **800 personnes** par soirée.",
      en: "A brand built from zero: \n**8 editions**, **800 people** a night.",
    },
    cover: "/works/le-cercle/03.webp",
    coverW: 1400,
    coverH: 1400,
    context: {
      fr: "**Fondateur.** Marque, direction artistique, production et stratégie : tout, de zéro, en **autofinancement**.",
      en: "**Founder.** Brand, art direction, production and strategy: all of it, from zero, **self-funded**.",
    },
    challenge: {
      fr: "Garder une **identité reconnaissable** en réinventant le **thème à chaque édition**.",
      en: "Keep a **recognizable identity** while reinventing the **theme every edition**.",
    },
    decisions: [
      { fr: "Un **thème inédit** à chaque édition.", en: "A **fresh theme** every edition." },
      { fr: "Une édition **tous les 6 mois** : rester un moment d'exception.", en: "One edition **every 6 months**: keep it exceptional." },
      { fr: "Une marque bâtie sur l'idée du **cercle** : on célèbre **ensemble**.", en: "A brand built on the **circle**: we celebrate **together**." },
    ],
    metrics: [
      { value: "8", label: { fr: "éditions", en: "editions" } },
      { value: "800", label: { fr: "par soirée", en: "per night" } },
      { value: "≈20k€", label: { fr: "CA moyen", en: "avg. revenue" } },
      { value: "500k", label: { fr: "vues / édition", en: "views / edition" } },
    ],
    media: [
      { src: "/works/le-cercle/live-03.webp", w: 1600, h: 1066 },
      { src: "/works/le-cercle/01.webp", w: 1920, h: 1080 },
      { src: "/works/le-cercle/teaser-01.mp4", type: "video" },
      { src: "/works/le-cercle/live-01.webp", w: 1600, h: 1068 },
      { src: "/works/le-cercle/02.webp", w: 1080, h: 1920 },
      { src: "/works/le-cercle/teaser-02.mp4", type: "video" },
      { src: "/works/le-cercle/live-04.webp", w: 1600, h: 1066 },
      { src: "/works/le-cercle/04.webp", w: 1400, h: 1400 },
      { src: "/works/le-cercle/teaser-07.mp4", type: "video" },
      { src: "/works/le-cercle/07.webp", w: 1080, h: 1920 },
      { src: "/works/le-cercle/live-02.webp", w: 1600, h: 1066 },
      { src: "/works/le-cercle/08.webp", w: 1080, h: 1920 },
      { src: "/works/le-cercle/teaser-03.mp4", type: "video" },
      { src: "/works/le-cercle/06.webp", w: 1400, h: 1400 },
      { src: "/works/le-cercle/10.webp", w: 1920, h: 1080 },
      { src: "/works/le-cercle/teaser-04.mp4", type: "video" },
      { src: "/works/le-cercle/teaser-05.mp4", type: "video" },
      { src: "/works/le-cercle/logo.webp", w: 2000, h: 2000 },
    ],
  },

  // ── 03 · Riva Agency ──────────────────────────────────────────────────────
  {
    slug: "riva-agency",
    title: { fr: "Riva Agency", en: "Riva Agency" },
    year: "2025",
    logo: "/works/riva/logo.png",
    cover: "/works/riva/equipe.webp",
    coverW: 1200,
    coverH: 1600,
    role: {
      fr: "Cofondateur · Développement et production",
      en: "Co-founder · Growth and production",
    },
    result: {
      fr: "Agence événementielle B2B montée de zéro.",
      en: "A B2B events agency built from zero.",
    },
    context: {
      fr: "**Cofondateur** d'une agence événementielle **B2B** montée de zéro : on crée des marques d'événement, on **produit** et on **vend** des prestations à des **écoles** et à des **marques**.",
      en: "**Co-founder** of a **B2B** events agency built from zero: we create event brands, **produce** and **sell** services to **schools** and **brands**.",
    },
    challenge: {
      fr: "Crédibiliser une structure jeune et **sécuriser son modèle** : convaincre écoles et grandes marques de nous confier leurs événements.",
      en: "Give a young structure credibility and **secure its model**: get schools and major brands to trust us with their events.",
    },
    decisions: [
      { fr: "**Produire nos propres événements** pour prouver avant de vendre.", en: "**Produce our own events** to prove it before selling." },
      { fr: "Nouer des **partenariats de marque** — Durex, Jägermeister, Red Bull, Heetch — pour financer et crédibiliser.", en: "Build **brand partnerships** — Durex, Jägermeister, Red Bull, Heetch — to fund and legitimise." },
      { fr: "Devenir le **prestataire de référence** des écoles : 30+ nous choisissent et nous suivent.", en: "Become schools' **go-to provider**: 30+ choose and follow us." },
    ],
    metrics: [
      { value: "30+", label: { fr: "écoles clientes", en: "schools" } },
      { value: "4", label: { fr: "marques partenaires", en: "brand partners" } },
      { value: "20+", label: { fr: "événements", en: "events" } },
      { value: "70+", label: { fr: "collaborateurs", en: "collaborators" } },
    ],
  },

  // ── 04 · Versatile (école, fictif) ────────────────────────────────────────
  {
    slug: "versatile",
    title: { fr: "Versatile", en: "Versatile" },
    year: "2026",
    logo: "/works/versatile/logo.png",
    role: {
      fr: "Stratégie et création · Cas d'école, Paris 8",
      en: "Strategy and creative · School project, Paris 8",
    },
    result: {
      fr: "Cas d'école : un parfum de niche imaginé pour les fêtes, du concept au film. **19/20**.",
      en: "A school project: a niche perfume imagined for the holidays, concept to film. **19/20**.",
    },
    cover: "/works/versatile/teaser-01.mp4",
    coverType: "video",
    coverW: 720,
    coverH: 1280,
    context: {
      fr: "Exercice de licence à Paris 8 (marque fictive) : **stratégie et création** d'un parfum de niche. Des **notes de champagne** pour les fêtes, « **À ta sentez** ».",
      en: "An undergraduate brief at Paris 8 (fictional brand): **strategy and creative** for a niche perfume. **Champagne notes** for the holidays, “**À ta sentez**”.",
    },
    challenge: {
      fr: "Convaincre par la **pertinence stratégique** et l'exécution.",
      en: "Convince through **strategic relevance** and execution.",
    },
    decisions: [
      { fr: "Jouer sur les **fêtes de fin d'année** pour ancrer le parfum et renforcer le **capital sympathie** de la marque.", en: "Play on the **holiday season** to ground the perfume and grow the brand's **likeability**." },
    ],
    metrics: [{ value: "19/20", label: { fr: "note", en: "grade" } }],
  },
];
