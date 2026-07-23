// Bilingual UI + section copy for the Pablo Assad portfolio.
// Text is rare and sharp by design — the visuals carry the meaning. The English
// is an *adaptation* for an international audience, never a literal mirror.

export type Locale = "fr" | "en";

export interface Translations {
  meta: { title: string; description: string };
  repertoireMeta: { title: string; description: string };
  nav: { presentation: string; repertoire: string; cta: string };
  hero: {
    eyebrow: string;
    name: string;
    statement: string;
    intro: string;
    scroll: string;
  };
  about: {
    label: string;
    title: string;
    body: string[];
    toolsLabel: string;
    photoCaption: string;
  };
  journey: { label: string; title: string; educationLabel: string; experienceLabel: string };
  work: {
    label: string;
    title: string;
    intro: string;
    filterAll: string;
    comingSoon: string;
    close: string;
    back: string;
    pieces: string;
    piecesNote: string;
    seeMore: string;
    seeLess: string;
    backToTop: string;
    flowVisual: string;
    flowPieces: string;
    flowCases: string;
    flowSound: string;
    soundOn: string;
    soundOff: string;
    casesTitle: string;
    casesIntro: string;
    caseContext: string;
    caseChallenge: string;
    caseDecisions: string;
    caseResult: string;
    caseRead: string;
    caseBack: string;
    caseNext: string;
    casePrev: string;
    caseCta: string;
  };
  sound: {
    label: string;
    title: string;
    author: string;
    intro: string;
    intro2: string;
    commissioned: string;
    personal: string;
    play: string;
    pause: string;
    seekLabel: string;
    idle: string;
    kindCommande: string;
    kindJingle: string;
    kindReportage: string;
    close: string;
    designer: string;
    more: string;
    less: string;
  };
  craft: { label: string; title: string; body: string[]; aside: string };
  repCta: { title: string; sub: string; button: string };
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
    cta: string;
    cv: string;
  };
  footer: { rights: string };
}

const fr: Translations = {
  meta: {
    title: "Pablo Assad · Communication et direction de projet",
    description:
      "Pablo Assad · communication et direction de projet. Un regard de créatif, la rigueur d'un stratège. Présentation, parcours et pratique créative.",
  },
  repertoireMeta: {
    title: "Répertoire",
    description:
      "Le répertoire de Pablo Assad : productions et réalisations. Design, direction artistique, vidéo, brand content et composition.",
  },
  nav: { presentation: "Présentation", repertoire: "Répertoire", cta: "Me contacter" },
  hero: {
    eyebrow: "Communication · Direction de projet",
    name: "Pablo Assad",
    statement: "Je compose des marques.",
    intro: "Un regard de créatif, la rigueur d'un stratège.",
    scroll: "Défiler",
  },
  about: {
    label: "À propos",
    title: "Qui je suis",
    body: [
      "Je m'appelle Pablo. Formé aux arts appliqués avant la communication, je suis passé par l'agence, l'associatif et l'entrepreneuriat, toujours du côté où l'on fabrique.",
      "Concevoir une identité, cadrer un projet, tenir un budget : j'aime que les idées tiennent debout.",
      "Avant chaque projet, je prends de la hauteur. C'est là que les bonnes idées se trouvent.",
    ],
    toolsLabel: "Outils",
    photoCaption: "Paris",
  },
  journey: { label: "Parcours", title: "Repères", educationLabel: "Formation", experienceLabel: "Expériences" },
  work: {
    label: "Projets",
    title: "Répertoire",
    intro: "Productions et réalisations. Design, image, son.",
    filterAll: "Tout",
    comingSoon: "À venir",
    close: "Fermer",
    back: "Présentation",
    pieces: "Pièces détachées",
    piecesNote: "Projets indépendants",
    seeMore: "Voir plus",
    seeLess: "Voir moins",
    backToTop: "Retour en haut",
    flowVisual: "Visuel",
    flowPieces: "Pièces",
    flowCases: "Décryptages",
    flowSound: "Son",
    soundOn: "Activer le son",
    soundOff: "Couper le son",
    casesTitle: "Décryptages",
    casesIntro: "Des projets décryptés : le rôle, le contexte, les décisions, le résultat.",
    caseContext: "Contexte",
    caseChallenge: "Enjeu",
    caseDecisions: "Décisions",
    caseResult: "Résultat",
    caseRead: "Lire le décryptage",
    caseBack: "Tous les décryptages",
    caseNext: "Suivante",
    casePrev: "Précédente",
    caseCta: "Travailler ensemble",
  },
  sound: {
    label: "Son",
    title: "La Table d'écoute",
    author: "Je compose.",
    intro: "Des compositions originales, commandes de marque et pièces personnelles.",
    intro2: "Cliquez, écoutez.",
    commissioned: "Commandes",
    personal: "Compositions personnelles",
    play: "Lire",
    pause: "Mettre en pause",
    seekLabel: "Position de lecture",
    idle: "Choisissez une piste",
    kindCommande: "Commande",
    kindJingle: "Jingle",
    kindReportage: "Reportage",
    close: "Fermer le lecteur",
    designer: "Également sound designer : habillage sonore et compositions sur mesure, sur demande.",
    more: "Voir plus",
    less: "Voir moins",
  },
  craft: {
    label: "Création",
    title: "Être du côté des gens,\nc'est être du côté des marques.",
    body: [],
    aside: "Pablo Assad",
  },
  repCta: {
    title: "Voir le Répertoire",
    sub: "Productions et réalisations, en images.",
    button: "Entrer",
  },
  contact: {
    label: "Contact",
    title: "Travaillons ensemble.",
    lead: "Un projet, un recrutement, ou une marque à faire grandir ? Écrivez-moi.",
    emailLabel: "Email",
    phoneLabel: "Téléphone",
    linkedinLabel: "LinkedIn",
    email: "pabloassad14@gmail.com",
    phone: "06 15 64 85 28",
    phoneHref: "+33615648528",
    linkedin: "https://www.linkedin.com/in/pablo-assad-40bb75189/",
    linkedinHandle: "in/pablo-assad",
    cta: "Écrire un email",
    cv: "Télécharger le CV",
  },
  footer: { rights: "Tous droits réservés." },
};

const en: Translations = {
  meta: {
    title: "Pablo Assad · Communication and project leadership",
    description:
      "Pablo Assad · communication and project leadership. A creative's eye, a strategist's discipline. Introduction, path and creative practice.",
  },
  repertoireMeta: {
    title: "Portfolio",
    description:
      "Pablo Assad's portfolio: productions and selected work. Design, art direction, video, brand content and composition.",
  },
  nav: { presentation: "About", repertoire: "Portfolio", cta: "Get in touch" },
  hero: {
    eyebrow: "Communication · Project leadership",
    name: "Pablo Assad",
    statement: "I compose brands.",
    intro: "A creative's eye, a strategist's discipline.",
    scroll: "Scroll",
  },
  about: {
    label: "About",
    title: "Who I am",
    body: [
      "I'm Pablo. Trained in applied arts before communication, I've worked agency side, with non profits, and as a founder, always where things get made.",
      "Shaping an identity, framing a project, holding a budget: I like ideas that stand up.",
      "Before any project, I step back. That's where the good ideas are.",
    ],
    toolsLabel: "Tools",
    photoCaption: "Paris",
  },
  journey: { label: "Path", title: "Markers", educationLabel: "Education", experienceLabel: "Experience" },
  work: {
    label: "Work",
    title: "Portfolio",
    intro: "Productions and selected work. Design, image, sound.",
    filterAll: "All",
    comingSoon: "Coming soon",
    close: "Close",
    back: "About",
    pieces: "Single pieces",
    piecesNote: "Standalone projects",
    seeMore: "See more",
    seeLess: "See less",
    backToTop: "Back to top",
    flowVisual: "Visual",
    flowPieces: "Pieces",
    flowCases: "Deep dives",
    flowSound: "Sound",
    soundOn: "Unmute",
    soundOff: "Mute",
    casesTitle: "Deep dives",
    casesIntro: "Projects decoded: the role, the context, the decisions, the outcome.",
    caseContext: "Context",
    caseChallenge: "Challenge",
    caseDecisions: "Decisions",
    caseResult: "Outcome",
    caseRead: "Read the deep dive",
    caseBack: "All deep dives",
    caseNext: "Next",
    casePrev: "Previous",
    caseCta: "Let's work together",
  },
  sound: {
    label: "Sound",
    title: "The Listening Table",
    author: "I compose.",
    intro: "Original compositions, brand commissions and personal pieces.",
    intro2: "Click, listen.",
    commissioned: "Commissions",
    personal: "Personal compositions",
    play: "Play",
    pause: "Pause",
    seekLabel: "Playback position",
    idle: "Pick a track",
    kindCommande: "Commission",
    kindJingle: "Jingle",
    kindReportage: "Documentary",
    close: "Close player",
    designer: "Also a sound designer: scoring and bespoke composition on request.",
    more: "Show more",
    less: "Show less",
  },
  craft: {
    label: "Craft",
    title: "To stand with people\nis to stand with brands.",
    body: [],
    aside: "Pablo Assad",
  },
  repCta: {
    title: "Enter the Portfolio",
    sub: "Productions and selected work, in pictures.",
    button: "Enter",
  },
  contact: {
    label: "Contact",
    title: "Let's work together.",
    lead: "A project, a role, or a brand to grow? Write to me.",
    emailLabel: "Email",
    phoneLabel: "Phone",
    linkedinLabel: "LinkedIn",
    email: "pabloassad14@gmail.com",
    phone: "+33 6 15 64 85 28",
    phoneHref: "+33615648528",
    linkedin: "https://www.linkedin.com/in/pablo-assad-40bb75189/",
    linkedinHandle: "in/pablo-assad",
    cta: "Send an email",
    cv: "Download the CV",
  },
  footer: { rights: "All rights reserved." },
};

export const locales: Locale[] = ["fr", "en"];

export const translations: Record<Locale, Translations> = { fr, en };
