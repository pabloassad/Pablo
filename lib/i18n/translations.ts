// Bilingual content for the Pablo Assad portfolio.
// The English is an *adaptation* for an international audience, not a literal
// mirror of the French — the premium register has to hold in both languages.

export type Locale = "fr" | "en";

export interface NavItem {
  id: string;
  label: string;
}

export interface Movement {
  index: string;
  title: string;
  body: string;
}

export interface CaseStudy {
  index: string;
  client: string;
  discipline: string;
  title: string;
  context: string;
  role: string;
  action: string;
  result: string;
  image: string;
}

export interface TimelineEntry {
  year: string;
  title: string;
  place: string;
  note?: string;
}

export interface Translations {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    items: NavItem[];
    cta: string;
    langLabel: string;
  };
  hero: {
    kicker: string;
    name: string;
    lineOne: string;
    lineTwo: string;
    intro: string;
    scroll: string;
  };
  manifesto: {
    label: string;
    lead: string;
    body: string[];
    pull: string;
    pillars: { title: string; text: string }[];
  };
  method: {
    label: string;
    title: string;
    intro: string;
    movements: Movement[];
  };
  work: {
    label: string;
    title: string;
    intro: string;
    cases: CaseStudy[];
    contextLabel: string;
    roleLabel: string;
    actionLabel: string;
    resultLabel: string;
  };
  craft: {
    label: string;
    title: string;
    body: string[];
    aside: string;
  };
  path: {
    label: string;
    title: string;
    educationLabel: string;
    education: TimelineEntry[];
    experienceLabel: string;
    experience: TimelineEntry[];
    toolsLabel: string;
    tools: string[];
    signalLabel: string;
    signal: string;
  };
  contact: {
    label: string;
    title: string;
    lead: string;
    emailLabel: string;
    phoneLabel: string;
    linkedinLabel: string;
    email: string;
    phone: string;
    phoneHref: string;
    linkedin: string;
    linkedinHandle: string;
    pdf: string;
  };
  footer: {
    note: string;
    rights: string;
  };
}

const fr: Translations = {
  meta: {
    title: "Pablo Assad — Chef de projet communication",
    description:
      "Pablo Assad, chef de projet communication. Un regard de créatif, la rigueur d'un stratège. Création de marque, direction artistique et pilotage de projets.",
  },
  nav: {
    items: [
      { id: "manifeste", label: "Manifeste" },
      { id: "methode", label: "Méthode" },
      { id: "projets", label: "Projets" },
      { id: "creation", label: "Création" },
      { id: "parcours", label: "Parcours" },
      { id: "contact", label: "Contact" },
    ],
    cta: "Me contacter",
    langLabel: "EN",
  },
  hero: {
    kicker: "Communication · direction de projet",
    name: "Pablo Assad",
    lineOne: "Je ne fais pas",
    lineTwo: "de la communication.",
    intro:
      "Chef de projet communication. Un regard de créatif, la rigueur d'un stratège — et l'oreille d'un compositeur pour trouver le tempo d'une marque.",
    scroll: "Faire défiler",
  },
  manifesto: {
    label: "Manifeste",
    lead: "Je compose des marques.",
    body: [
      "Une marque, c'est une partition. Des idées qui doivent tenir ensemble, un tempo à trouver, une intensité à doser. Mon métier consiste à transformer une intention floue en un récit qui se voit, s'entend et se retient.",
      "J'ai grandi entre deux disciplines — la création et la stratégie — et j'ai fini par refuser de choisir. Je conçois comme un artiste, je pilote comme un chef de projet. Tout le reste n'est que mise en œuvre.",
    ],
    pull: "Le créatif imagine, le stratège tranche. Je préfère faire les deux dans la même phrase.",
    pillars: [
      {
        title: "Un regard d'artiste",
        text: "Formé aux arts appliqués, je pense la forme autant que le fond. L'esthétique n'est jamais décorative : elle porte le message.",
      },
      {
        title: "Une posture de communicant",
        text: "Positionnement, ton, audience. Je construis des marques qui savent à qui elles parlent et pourquoi on devrait les écouter.",
      },
      {
        title: "Une énergie d'entrepreneur",
        text: "J'ai créé et piloté mes propres projets de bout en bout. Je sais ce que coûte une idée et ce que rapporte une exécution juste.",
      },
    ],
  },
  method: {
    label: "Méthode",
    title: "La partition",
    intro:
      "Quatre mouvements. De l'écoute d'une marque à sa mise en scène, une même logique : comprendre avant de produire, doser avant de diffuser.",
    movements: [
      {
        index: "01",
        title: "Écouter",
        body: "Comprendre la marque, son marché et ses publics avant de la faire parler. Veille, diagnostic, intuition. C'est là que se décide tout le reste.",
      },
      {
        index: "02",
        title: "Composer",
        body: "Donner une direction : un positionnement, un ton, une identité visuelle. Transformer une stratégie en une forme désirable et cohérente.",
      },
      {
        index: "03",
        title: "Orchestrer",
        body: "Piloter les équipes, les budgets, les délais et les prestataires. Tenir le tempo du projet sans jamais perdre l'intention de départ.",
      },
      {
        index: "04",
        title: "Diffuser",
        body: "Mettre en scène, lancer, mesurer, ajuster. Une marque ne vaut que par ce qu'elle laisse dans la tête des gens.",
      },
    ],
  },
  work: {
    label: "Projets",
    title: "Le répertoire",
    intro:
      "Cinq contextes, un même fil : prendre une marque là où elle est et l'amener un cran plus loin. Agences, association, projet entrepreneurial.",
    contextLabel: "Contexte",
    roleLabel: "Rôle",
    actionLabel: "Action",
    resultLabel: "Résultat",
    cases: [
      {
        index: "01",
        client: "Rosa Paris",
        discipline: "Direction artistique & événementiel",
        title: "Donner un visage à la cohésion",
        context:
          "Agence de communication. Mission de direction artistique et coordination d'un grand événement interne de cohésion (la Rosa Summer Party).",
        role: "Direction artistique, conception des supports, coordination logistique.",
        action:
          "Conception de l'identité visuelle de l'événement et de l'ensemble de ses supports, puis pilotage de la production et de la logistique jusqu'au jour J.",
        result:
          "Un événement maîtrisé de bout en bout, une identité cohérente de l'invitation à la scénographie, et une expérience interne qui a renforcé le sentiment d'appartenance.",
        image: "/images/premium-portrait.jpg",
      },
      {
        index: "02",
        client: "Le Cercle",
        discipline: "Création de marque & brand content",
        title: "Construire une marque de zéro",
        context:
          "Projet entrepreneurial. Une marque créée de toutes pièces, à piloter comme une entreprise : audience, contenu, fidélisation.",
        role: "Fondateur, stratégie de marque et de contenu, pilotage opérationnel.",
        action:
          "Définition du positionnement et de l'univers de marque, production d'un brand content régulier, animation et fidélisation d'une communauté sur plusieurs éditions successives.",
        result:
          "Une marque devenue un repère pour son public, portée par une ligne éditoriale constante et une communauté qui revient — la preuve concrète d'un savoir-faire de bout en bout.",
        image: "/images/pablito-amber.jpg",
      },
      {
        index: "03",
        client: "Riva Agency",
        discipline: "Pilotage de missions clients",
        title: "Tenir le cap, le budget et l'équipe",
        context:
          "Junior-agency du BUT Information-Communication. Missions réelles pour des clients (ESCE, ISG), avec budgets et équipe à gérer.",
        role: "Pilotage de projet, relation client, gestion d'équipe et de budget.",
        action:
          "Cadrage des besoins clients, répartition du travail, suivi des budgets et des échéances, garantie de la cohérence entre la commande et le livrable.",
        result:
          "Des missions livrées dans les délais et le cadre fixé, et l'apprentissage décisif du métier : transformer une demande en résultat, avec une équipe et des contraintes réelles.",
        image: "/images/pablito-beige.jpg",
      },
      {
        index: "04",
        client: "Volange",
        discipline: "Branding & production de contenus",
        title: "Faire monter une marque en notoriété",
        context:
          "Agence événementielle. Travail sur le branding et la notoriété de la marque Aguila.",
        role: "Branding, réponse aux briefs créatifs, production de contenus.",
        action:
          "Traduction des briefs en partis pris créatifs, production de contenus alignés sur la marque et contribution à la cohérence de son image sur ses prises de parole.",
        result:
          "Une marque plus lisible et mieux incarnée, des contenus qui servent un même récit plutôt que de s'empiler au gré des opportunités.",
        image: "/images/studio-composition.jpg",
      },
      {
        index: "05",
        client: "Fondament'All",
        discipline: "Marque en transformation",
        title: "Faire évoluer sans trahir",
        context:
          "Association culturelle (Champigny) en pleine transformation identitaire. Enjeu : faire évoluer la communication sans perdre la cohérence de marque.",
        role: "Chargé de communication, accompagnement de la transition de marque.",
        action:
          "Diagnostic de l'identité existante au prisme des modèles de Kapferer et Aaker, puis recommandations pour faire évoluer le discours et les supports en préservant l'ADN de la structure.",
        result:
          "Une trajectoire de marque claire pour une association en mutation : du changement assumé, mais une cohérence préservée à chaque étape.",
        image: "/images/extra/pablito-denim.jpg",
      },
    ],
  },
  craft: {
    label: "Création",
    title: "Avant la stratégie, il y a l'oreille",
    body: [
      "Je compose, je joue du piano, j'écris. Cette pratique n'est pas un à-côté : c'est elle qui aiguise mon métier.",
      "La musique m'a appris ce qu'aucun manuel de marketing n'enseigne vraiment — sentir un rythme, lire une émotion dans une salle, savoir quand poser un silence. C'est exactement ce qu'on demande à une marque : entrer juste, au bon moment, avec la bonne intensité.",
    ],
    aside: "Une intuition créative qui se met au service de la stratégie, jamais l'inverse.",
  },
  path: {
    label: "Parcours",
    title: "Parcours & signaux",
    educationLabel: "Formation",
    education: [
      { year: "2026", title: "Master Stratégie de communication", place: "Objectif rentrée — en recherche d'alternance" },
      { year: "2023–26", title: "BUT Information-Communication", place: "Université Paris 8", note: "Major de promotion" },
      { year: "2021–23", title: "BTS Communication", place: "Lycée Samuel de Champlain" },
      { year: "—", title: "Bac STD2A — Arts appliqués", place: "Design, esthétique & fonction" },
    ],
    experienceLabel: "Expériences",
    experience: [
      { year: "", title: "Rosa Paris", place: "Direction artistique & événementiel" },
      { year: "", title: "Volange", place: "Branding & contenus" },
      { year: "", title: "Riva Agency", place: "Pilotage de missions clients" },
      { year: "", title: "Fondament'All", place: "Communication — marque en transformation" },
      { year: "", title: "Le Cercle", place: "Création de marque (projet entrepreneurial)" },
    ],
    toolsLabel: "Outils",
    tools: ["Photoshop", "Illustrator", "Premiere Pro", "Figma", "FL Studio", "IA générative", "Firefly"],
    signalLabel: "Distinction",
    signal: "Major de promotion — moyenne supérieure à 15/20.",
  },
  contact: {
    label: "Contact",
    title: "Construisons quelque chose qui s'entend.",
    lead:
      "Recrutement, alternance, ou une marque à faire grandir ? Écrivez-moi — je réponds vite, et toujours par une vraie idée.",
    emailLabel: "Email",
    phoneLabel: "Téléphone",
    linkedinLabel: "LinkedIn",
    email: "pabloassad14@gmail.com",
    phone: "06 15 64 85 28",
    phoneHref: "+33615648528",
    linkedin: "https://www.linkedin.com/in/pablo-assad-40bb75189/",
    linkedinHandle: "in/pablo-assad",
    pdf: "Télécharger en PDF",
  },
  footer: {
    note: "Composé à Paris.",
    rights: "Tous droits réservés.",
  },
};

const en: Translations = {
  meta: {
    title: "Pablo Assad — Communications Project Manager",
    description:
      "Pablo Assad, communications project manager. A creative's eye, a strategist's discipline. Brand building, art direction and project leadership.",
  },
  nav: {
    items: [
      { id: "manifeste", label: "Manifesto" },
      { id: "methode", label: "Method" },
      { id: "projets", label: "Work" },
      { id: "creation", label: "Craft" },
      { id: "parcours", label: "Path" },
      { id: "contact", label: "Contact" },
    ],
    cta: "Get in touch",
    langLabel: "FR",
  },
  hero: {
    kicker: "Communications · project leadership",
    name: "Pablo Assad",
    lineOne: "I don't run",
    lineTwo: "communications.",
    intro:
      "Communications project manager. A creative's eye, a strategist's discipline — and a composer's ear for finding a brand's tempo.",
    scroll: "Scroll",
  },
  manifesto: {
    label: "Manifesto",
    lead: "I compose brands.",
    body: [
      "A brand is a score. Ideas that have to hold together, a tempo to find, an intensity to dose. My job is to turn a blurry intention into a story you can see, hear and remember.",
      "I grew up between two disciplines — creation and strategy — and eventually refused to choose. I design like an artist and run projects like a manager. Everything else is just execution.",
    ],
    pull: "The creative imagines, the strategist decides. I'd rather do both in the same sentence.",
    pillars: [
      {
        title: "An artist's eye",
        text: "Trained in applied arts, I think about form as much as substance. Aesthetics are never decorative here — they carry the message.",
      },
      {
        title: "A communicator's stance",
        text: "Positioning, tone, audience. I build brands that know who they're talking to, and why anyone should listen.",
      },
      {
        title: "A founder's drive",
        text: "I've created and run my own projects end to end. I know what an idea costs — and what the right execution returns.",
      },
    ],
  },
  method: {
    label: "Method",
    title: "The score",
    intro:
      "Four movements. From listening to a brand to staging it, one logic throughout: understand before producing, dose before releasing.",
    movements: [
      {
        index: "01",
        title: "Listen",
        body: "Understand the brand, its market and its audiences before making it speak. Research, diagnosis, instinct. Everything else is decided here.",
      },
      {
        index: "02",
        title: "Compose",
        body: "Set a direction: a positioning, a tone, a visual identity. Turn a strategy into a form that is both desirable and coherent.",
      },
      {
        index: "03",
        title: "Orchestrate",
        body: "Lead the teams, budgets, deadlines and partners. Hold the project's tempo without ever losing the original intent.",
      },
      {
        index: "04",
        title: "Release",
        body: "Stage it, launch, measure, adjust. A brand is only worth what it leaves in people's minds.",
      },
    ],
  },
  work: {
    label: "Work",
    title: "The repertoire",
    intro:
      "Five contexts, one thread: take a brand where it stands and move it a notch further. Agencies, a cultural non-profit, an entrepreneurial venture.",
    contextLabel: "Context",
    roleLabel: "Role",
    actionLabel: "Action",
    resultLabel: "Result",
    cases: [
      {
        index: "01",
        client: "Rosa Paris",
        discipline: "Art direction & events",
        title: "Giving cohesion a face",
        context:
          "Communications agency. Art direction and coordination of a major internal cohesion event (the Rosa Summer Party).",
        role: "Art direction, collateral design, logistics coordination.",
        action:
          "Designed the event's visual identity and full set of materials, then drove production and logistics all the way to the day itself.",
        result:
          "An event controlled end to end, a coherent identity from invitation to staging, and an internal experience that strengthened a sense of belonging.",
        image: "/images/premium-portrait.jpg",
      },
      {
        index: "02",
        client: "Le Cercle",
        discipline: "Brand building & content",
        title: "Building a brand from zero",
        context:
          "Entrepreneurial venture. A brand built from scratch and run like a business: audience, content, loyalty.",
        role: "Founder, brand & content strategy, hands-on operations.",
        action:
          "Defined the positioning and brand world, produced consistent brand content, and grew and retained a community across several successive editions.",
        result:
          "A brand that became a landmark for its audience — carried by a steady editorial line and a community that keeps coming back. End-to-end proof of craft.",
        image: "/images/pablito-amber.jpg",
      },
      {
        index: "03",
        client: "Riva Agency",
        discipline: "Client project leadership",
        title: "Holding the course, the budget and the team",
        context:
          "The junior agency of the Information-Communication degree. Real client work (ESCE, ISG), with budgets and a team to manage.",
        role: "Project leadership, client relations, team and budget management.",
        action:
          "Framed client needs, distributed the work, tracked budgets and deadlines, and kept the deliverable true to the brief.",
        result:
          "Projects delivered on time and on scope — and the decisive lesson of the craft: turning a request into a result, with a real team and real constraints.",
        image: "/images/pablito-beige.jpg",
      },
      {
        index: "04",
        client: "Volange",
        discipline: "Branding & content production",
        title: "Lifting a brand's profile",
        context: "Events agency. Branding and awareness work for the Aguila brand.",
        role: "Branding, creative-brief response, content production.",
        action:
          "Translated briefs into creative directions, produced on-brand content, and helped keep its image coherent across communications.",
        result:
          "A clearer, better-embodied brand — content that serves one story instead of piling up with each opportunity.",
        image: "/images/studio-composition.jpg",
      },
      {
        index: "05",
        client: "Fondament'All",
        discipline: "Brand in transition",
        title: "Evolving without betraying",
        context:
          "A cultural non-profit (Champigny) in the middle of an identity shift. The stake: evolve the communication without losing brand coherence.",
        role: "Communications lead, support on the brand transition.",
        action:
          "Audited the existing identity through the Kapferer and Aaker models, then recommended how to evolve the discourse and materials while preserving the organisation's DNA.",
        result:
          "A clear brand trajectory for an organisation in flux: change owned openly, coherence preserved at every step.",
        image: "/images/extra/pablito-denim.jpg",
      },
    ],
  },
  craft: {
    label: "Craft",
    title: "Before strategy, there's the ear",
    body: [
      "I compose, I play piano, I write. This practice isn't a sideline — it's what sharpens the work.",
      "Music taught me what no marketing handbook really does: feeling a rhythm, reading the emotion in a room, knowing when to leave a silence. That's exactly what a brand is asked to do — to land right, at the right moment, with the right intensity.",
    ],
    aside: "A creative instinct put to work for strategy — never the other way around.",
  },
  path: {
    label: "Path",
    title: "Path & signals",
    educationLabel: "Education",
    education: [
      { year: "2026", title: "MSc Communication Strategy", place: "Target intake — seeking a work-study placement" },
      { year: "2023–26", title: "BUT Information-Communication", place: "Université Paris 8", note: "Top of class" },
      { year: "2021–23", title: "BTS Communication", place: "Lycée Samuel de Champlain" },
      { year: "—", title: "Baccalauréat STD2A — Applied Arts", place: "Design, aesthetics & function" },
    ],
    experienceLabel: "Experience",
    experience: [
      { year: "", title: "Rosa Paris", place: "Art direction & events" },
      { year: "", title: "Volange", place: "Branding & content" },
      { year: "", title: "Riva Agency", place: "Client project leadership" },
      { year: "", title: "Fondament'All", place: "Communications — brand in transition" },
      { year: "", title: "Le Cercle", place: "Brand building (entrepreneurial venture)" },
    ],
    toolsLabel: "Tools",
    tools: ["Photoshop", "Illustrator", "Premiere Pro", "Figma", "FL Studio", "Generative AI", "Firefly"],
    signalLabel: "Distinction",
    signal: "Top of class — overall average above 15/20.",
  },
  contact: {
    label: "Contact",
    title: "Let's build something you can hear.",
    lead:
      "Hiring, a work-study placement, or a brand to grow? Write to me — I reply fast, and always with a real idea.",
    emailLabel: "Email",
    phoneLabel: "Phone",
    linkedinLabel: "LinkedIn",
    email: "pabloassad14@gmail.com",
    phone: "+33 6 15 64 85 28",
    phoneHref: "+33615648528",
    linkedin: "https://www.linkedin.com/in/pablo-assad-40bb75189/",
    linkedinHandle: "in/pablo-assad",
    pdf: "Download as PDF",
  },
  footer: {
    note: "Composed in Paris.",
    rights: "All rights reserved.",
  },
};

export const locales: Locale[] = ["fr", "en"];

export const translations: Record<Locale, Translations> = { fr, en };
