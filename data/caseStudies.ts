import type { CaseStudy } from "@/lib/content/types";

/**
 * The case studies — the projects that carry a real story. Order here is the
 * order shown in the "Études" index (most telling first). Add a study =
 * add an entry; the layout never changes. Keep the copy essential.
 */

export const caseStudies: CaseStudy[] = [
  // ── 01 · Le Cercle ────────────────────────────────────────────────────────
  {
    slug: "le-cercle",
    title: { fr: "Le Cercle", en: "Le Cercle" },
    year: "2024-2026",
    role: {
      fr: "Fondateur · Direction artistique et coordination",
      en: "Founder · Art direction and coordination",
    },
    result: {
      fr: "Une marque événementielle née de zéro : 8 éditions, 800 personnes par soirée.",
      en: "An events brand built from zero: 8 editions, 800 people a night.",
    },
    cover: "/works/le-cercle/03.webp",
    coverW: 1400,
    coverH: 1400,
    context: {
      fr: "Le Cercle, je l'ai fondé de zéro. Marque, direction artistique, production des supports, stratégie de communication et gestion des équipes : de l'entrepreneuriat de bout en bout, en autofinancement complet.",
      en: "I founded Le Cercle from zero. Brand, art direction, production, communication strategy and team management: entrepreneurship end to end, fully self-funded.",
    },
    challenge: {
      fr: "Le plus dur : garder une identité forte et reconnaissable tout en réinventant le thème à chaque édition. Le tout sous un triple enjeu — financier (autofinancé), réputationnel, et la satisfaction de chaque participant.",
      en: "The hard part: keep a strong, recognisable identity while reinventing the theme every edition. All under a triple stake — financial (self-funded), reputational, and every guest's experience.",
    },
    decisions: [
      { fr: "Un thème différent à chaque édition, pour que chaque soirée reste inédite.", en: "A new theme each edition, so every night feels unseen." },
      { fr: "Une édition tous les six mois, pour que l'événement reste un moment d'exception.", en: "One edition every six months, to keep it an exceptional moment." },
      { fr: "Une marque bâtie sur l'idée du cercle : la fête ne se vit pas seul, on la célèbre ensemble.", en: "A brand built on the idea of the circle: you never celebrate alone, you celebrate together." },
    ],
    metrics: [
      { value: "8", label: { fr: "éditions produites", en: "editions produced" } },
      { value: "800", label: { fr: "personnes par soirée", en: "people per night" } },
      { value: "≈20k€", label: { fr: "chiffre d'affaires moyen", en: "average revenue" } },
      { value: "500k", label: { fr: "vues par édition", en: "views per edition" } },
    ],
    media: [
      { src: "/works/le-cercle/10.webp", w: 1920, h: 1080 },
      { src: "/works/le-cercle/06.webp", w: 1400, h: 1400 },
      { src: "/works/le-cercle/08.webp", w: 1080, h: 1920 },
      { src: "/works/le-cercle/logo.webp", w: 2000, h: 2000 },
    ],
  },

  // ── 02 · Riva Agency ──────────────────────────────────────────────────────
  {
    slug: "riva-agency",
    title: { fr: "Riva Agency", en: "Riva Agency" },
    year: "2025",
    role: {
      fr: "Cofondateur · Production et développement",
      en: "Co-founder · Production and development",
    },
    result: {
      fr: "Une agence événementielle B2B montée en un an : 20+ événements, 5 marques, 70 collaborateurs.",
      en: "A B2B events agency built in a year: 20+ events, 5 brands, 70 collaborators.",
    },
    context: {
      fr: "Avec mes associés, nous avons monté Riva : une agence événementielle qui accompagne d'autres organisateurs, écoles et entreprises. Nous créons des marques d'événement et nous les propulsons ; nous produisons, coproduisons et commercialisons des services de production. Majoritairement du B2B.",
      en: "With my partners I built Riva: an events agency that supports other organisers, schools and companies. We create event brands and drive them; we produce, co-produce and sell production services. Mostly B2B.",
    },
    challenge: {
      fr: "La satisfaction de nos clients organisateurs et de nos collaborateurs, et la sécurité financière d'une structure encore jeune.",
      en: "The satisfaction of our organiser clients and collaborators, and the financial security of a young structure.",
    },
    decisions: [
      { fr: "Produire nos propres événements via nos propres marques, pour bâtir notre crédibilité avant de la vendre.", en: "Produce our own events under our own brands, to build credibility before selling it." },
      { fr: "Documenter chaque événement précisément sur les réseaux, pour prouver notre travail aux prochains prospects et entretenir le réseau.", en: "Document every event precisely on social, to prove the work to the next prospects and keep the network warm." },
    ],
    metrics: [
      { value: "20+", label: { fr: "événements produits", en: "events produced" } },
      { value: "5", label: { fr: "marques", en: "brands" } },
      { value: "70+", label: { fr: "collaborateurs", en: "collaborators" } },
    ],
  },

  // ── 03 · Adonis ───────────────────────────────────────────────────────────
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
      fr: "Une marque d'événement rendue identifiable : 1000+ participants par édition, 250k impressions.",
      en: "An event brand made recognisable: 1000+ guests per edition, 250k impressions.",
    },
    cover: "/works/adonis/cover.webp",
    coverW: 1080,
    coverH: 1920,
    context: {
      fr: "Adonis, marque d'événement. J'accompagne le client sur la stratégie, la gestion de projet et la communication : production des supports, services de développement et suivi.",
      en: "Adonis, an event brand. I support the client on strategy, project management and communication: production, development services and follow-up.",
    },
    challenge: {
      fr: "Tenir notre promesse d'agence — la satisfaction du client organisateur et la réussite de l'événement. Et trouver un positionnement clair : proposer du nouveau tout en restant fidèle à la direction artistique initiale, dans une continuité logique.",
      en: "Keep our agency promise — the organiser's satisfaction and the event's success. And find a clear position: offer something new while staying true to the original art direction, in a logical continuity.",
    },
    decisions: [
      { fr: "Miser sur les éléments forts de l'ADN de la marque pour la rendre identifiable et mémorable : le lustre, le nom Adonis comme symbole de beauté.", en: "Lean on the brand's strongest DNA to make it recognisable and memorable: the chandelier, the name Adonis as a symbol of beauty." },
      { fr: "Lier les deux : la lumière du lustre, présente pendant l'événement, révèle la beauté des participants.", en: "Tie the two together: the chandelier's light, present through the event, reveals the guests' beauty." },
    ],
    metrics: [
      { value: "1000+", label: { fr: "participants par édition", en: "guests per edition" } },
      { value: "250k", label: { fr: "impressions Instagram", en: "Instagram impressions" } },
    ],
    media: [
      { src: "/works/adonis/teaser-01.mp4", type: "video" },
      { src: "/works/adonis/mockup.webp", w: 1080, h: 1440 },
      { src: "/works/adonis/08.webp", w: 2000, h: 2828 },
      { src: "/works/adonis/teaser-02.mp4", type: "video" },
    ],
  },

  // ── 04 · Versatile ────────────────────────────────────────────────────────
  {
    slug: "versatile",
    title: { fr: "Versatile", en: "Versatile" },
    year: "2026",
    role: {
      fr: "Stratégie et création · Licence, Paris 8",
      en: "Strategy and creative · Bachelor, Paris 8",
    },
    result: {
      fr: "Un parfum de niche imaginé pour les fêtes, du concept au film. Noté 19/20.",
      en: "A niche perfume imagined for the holidays, from concept to film. Graded 19/20.",
    },
    cover: "/works/versatile/teaser-01.mp4",
    coverType: "video",
    coverW: 720,
    coverH: 1280,
    context: {
      fr: "Exercice de licence à Paris 8 : imaginer un nouveau produit et sa campagne pour une marque de parfum de niche, Versatile. En charge de la stratégie, j'ai conçu un parfum aux notes de champagne lancé pour les fêtes de fin d'année, dans la continuité des parfums liés à un moment. Il s'appelle « À ta senteur », un jeu de mots sur le toast que l'on porte. J'ai aussi produit le film qui annonce sa sortie.",
      en: "A bachelor brief at Paris 8: imagine a new product and its campaign for niche perfume brand Versatile. Leading the strategy, I designed a champagne-noted scent launched for the holidays, in the tradition of perfumes tied to a moment. It is called « À ta senteur », a play on the toast we raise. I also produced the film announcing its release.",
    },
    challenge: {
      fr: "Un exercice noté : convaincre par la pertinence stratégique et la justesse de l'exécution.",
      en: "A graded brief: convince through strategic relevance and the precision of the execution.",
    },
    decisions: [
      { fr: "Jouer sur les insights et l'univers des fêtes de fin d'année, pour ancrer le parfum dans le réel et renforcer le capital sympathie de la marque.", en: "Play on end-of-year insights and imagery, to ground the perfume in real life and grow the brand's likeability." },
    ],
    metrics: [{ value: "19/20", label: { fr: "note du projet", en: "project grade" } }],
  },
];
