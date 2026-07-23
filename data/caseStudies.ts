import type { CaseStudy } from "@/lib/content/types";

/**
 * The case studies — projects told, not just shown. `featured` cases (with rich
 * media) lead the Répertoire as full visual blocks with their key figures
 * inline; the rest show as compact index rows. Order here drives both the page
 * order and prev/next. Copy stays essential: short sentences, the words that
 * matter in **bold**. No filler.
 */

export const caseStudies: CaseStudy[] = [
  // ── 01 · Le Cercle (featured) ─────────────────────────────────────────────
  {
    slug: "le-cercle",
    title: { fr: "Le Cercle", en: "Le Cercle" },
    year: "2024-2026",
    featured: true,
    role: {
      fr: "Fondateur · Direction artistique et coordination",
      en: "Founder · Art direction and coordination",
    },
    result: {
      fr: "Une marque née de zéro : **8 éditions**, **800 personnes** par soirée.",
      en: "A brand built from zero: **8 editions**, **800 people** a night.",
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
      en: "Keep a **recognisable identity** while reinventing the **theme every edition**.",
    },
    decisions: [
      { fr: "Un **thème inédit** à chaque édition.", en: "A **fresh theme** every edition." },
      { fr: "Une édition **tous les 6 mois** : rester un moment d'exception.", en: "One edition **every 6 months**: stay an exceptional moment." },
      { fr: "Une marque bâtie sur l'idée du **cercle** : on célèbre **ensemble**.", en: "A brand built on the **circle**: we celebrate **together**." },
    ],
    metrics: [
      { value: "8", label: { fr: "éditions", en: "editions" } },
      { value: "800", label: { fr: "par soirée", en: "per night" } },
      { value: "≈20k€", label: { fr: "CA moyen", en: "avg. revenue" } },
      { value: "500k", label: { fr: "vues / édition", en: "views / edition" } },
    ],
    media: [
      { src: "/works/le-cercle/01.webp", w: 1920, h: 1080 },
      { src: "/works/le-cercle/teaser-01.mp4", type: "video" },
      { src: "/works/le-cercle/02.webp", w: 1080, h: 1920 },
      { src: "/works/le-cercle/teaser-02.mp4", type: "video" },
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
  },

  // ── 02 · Adonis (featured) ────────────────────────────────────────────────
  {
    slug: "adonis",
    title: { fr: "Adonis", en: "Adonis" },
    client: "Adonis",
    year: "2026",
    featured: true,
    role: {
      fr: "Accompagnement stratégique · Direction artistique",
      en: "Strategic support · Art direction",
    },
    result: {
      fr: "**1000+ participants** par édition, **250k impressions** par campagne.",
      en: "**1000+ guests** per edition, **250k impressions** per campaign.",
    },
    cover: "/works/adonis/cover.webp",
    coverW: 1080,
    coverH: 1920,
    context: {
      fr: "**Accompagnement stratégique et direction artistique** d'une marque d'événement : supports, développement, suivi.",
      en: "**Strategic support and art direction** for an event brand: production, development, follow-up.",
    },
    challenge: {
      fr: "Proposer du **nouveau** en restant fidèle à la **DA initiale**. Continuité, pas rupture.",
      en: "Offer something **new** while staying true to the **original art direction**. Continuity, not rupture.",
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
      { src: "/works/adonis/teaser-01.mp4", type: "video" },
      { src: "/works/adonis/mockup.webp", w: 1080, h: 1440 },
      { src: "/works/adonis/teaser-03.mp4", type: "video" },
      { src: "/works/adonis/08.webp", w: 2000, h: 2828 },
      { src: "/works/adonis/teaser-02.mp4", type: "video" },
      { src: "/works/adonis/teaser-05.mp4", type: "video" },
    ],
  },

  // ── 03 · Riva Agency ──────────────────────────────────────────────────────
  {
    slug: "riva-agency",
    title: { fr: "Riva Agency", en: "Riva Agency" },
    year: "2025",
    logo: "/works/riva/logo.png",
    role: {
      fr: "Cofondateur · Production et développement",
      en: "Co-founder · Production and development",
    },
    result: {
      fr: "Agence événementielle B2B : **20+ événements**, **5 marques**, **70 collaborateurs** en un an.",
      en: "A B2B events agency: **20+ events**, **5 brands**, **70 collaborators** in a year.",
    },
    context: {
      fr: "**Cofondateur** d'une agence événementielle **B2B** : on crée des marques d'événement, on produit et on vend des services de production.",
      en: "**Co-founder** of a **B2B** events agency: we create event brands, produce and sell production services.",
    },
    challenge: {
      fr: "La **satisfaction** des clients et la **sécurité financière** d'une structure jeune.",
      en: "Client **satisfaction** and the **financial security** of a young structure.",
    },
    decisions: [
      { fr: "**Produire nos propres événements** pour bâtir notre crédibilité avant de la vendre.", en: "**Produce our own events** to build credibility before selling it." },
      { fr: "**Documenter chaque événement** sur les réseaux : prouver et entretenir le réseau.", en: "**Document every event** on social: prove it, keep the network warm." },
    ],
    metrics: [
      { value: "20+", label: { fr: "événements", en: "events" } },
      { value: "5", label: { fr: "marques", en: "brands" } },
      { value: "70+", label: { fr: "collaborateurs", en: "collaborators" } },
    ],
  },

  // ── 04 · Versatile ────────────────────────────────────────────────────────
  {
    slug: "versatile",
    title: { fr: "Versatile", en: "Versatile" },
    year: "2026",
    logo: "/works/versatile/logo.png",
    role: {
      fr: "Stratégie et création · Licence, Paris 8",
      en: "Strategy and creative · Bachelor, Paris 8",
    },
    result: {
      fr: "Un parfum de niche pour les fêtes, du concept au film. **19/20**.",
      en: "A niche perfume for the holidays, from concept to film. **19/20**.",
    },
    cover: "/works/versatile/teaser-01.mp4",
    coverType: "video",
    coverW: 720,
    coverH: 1280,
    context: {
      fr: "Exercice de licence : **stratégie et création** d'un parfum de niche. Des **notes de champagne** pour les fêtes, « **À ta sentez** ».",
      en: "A bachelor brief: **strategy and creative** for a niche perfume. **Champagne notes** for the holidays, « **À ta sentez** ».",
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

  // ── 05 · Teisseire ────────────────────────────────────────────────────────
  {
    slug: "teisseire",
    title: { fr: "Teisseire", en: "Teisseire" },
    year: "2026",
    logo: "/works/teisseire/logo.png",
    role: {
      fr: "Stratégie et création · Licence, Paris 8",
      en: "Strategy and creative · Bachelor, Paris 8",
    },
    result: {
      fr: "Une campagne sur le **plaisir de recevoir**, avec humour. **18/20**.",
      en: "A campaign on the **pleasure of hosting**, with humour. **18/20**.",
    },
    context: {
      fr: "Exercice de licence : **stratégie de campagne** pour les sirops Teisseire. Un **film publicitaire** sur le plaisir d'accueillir.",
      en: "A bachelor brief: **campaign strategy** for Teisseire syrups. An **ad film** on the pleasure of hosting.",
    },
    challenge: {
      fr: "Se démarquer sur un produit du quotidien, avec le **ton juste**.",
      en: "Stand out on an everyday product, with the **right tone**.",
    },
    decisions: [
      { fr: "Miser sur l'**humour** : se faire passer pour un expert des cocktails quand on utilise juste le **sirop**.", en: "Lean on **humour**: playing the cocktail expert while just using the **syrup**." },
    ],
    metrics: [{ value: "18/20", label: { fr: "note", en: "grade" } }],
  },
];
