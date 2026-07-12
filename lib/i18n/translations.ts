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
    roleLabel: string;
    close: string;
    detailSoon: string;
    open: string;
    back: string;
    pieces: string;
  };
  craft: { label: string; title: string; body: string[]; aside: string };
  repCta: { kicker: string; title: string; sub: string; button: string };
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
  };
  footer: { note: string; rights: string };
}

const fr: Translations = {
  meta: {
    title: "Pablo Assad — Communication et direction de projet",
    description:
      "Pablo Assad — communication et direction de projet. Un regard de créatif, la rigueur d'un stratège. Présentation, parcours et pratique créative.",
  },
  repertoireMeta: {
    title: "Répertoire",
    description:
      "Le répertoire de Pablo Assad : productions et réalisations. Design, direction artistique, vidéo, brand content et composition.",
  },
  nav: { presentation: "Présentation", repertoire: "Répertoire", cta: "Me contacter" },
  hero: {
    eyebrow: "Communication · Direction de projet",
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
      "La créativité n'est pas ma touche finale. C'est mon point de départ.",
    ],
    toolsLabel: "Outils",
    photoCaption: "Paris",
  },
  journey: { label: "Parcours", title: "Repères", educationLabel: "Formation", experienceLabel: "Expériences" },
  work: {
    label: "Projets",
    title: "Répertoire",
    intro: "Productions et réalisations. Design, image, son.",
    filterAll: "Tout",
    comingSoon: "À venir",
    roleLabel: "Rôle",
    close: "Fermer",
    detailSoon: "Visuels en cours d'ajout.",
    open: "Voir le projet",
    back: "Présentation",
    pieces: "Pièces détachées",
  },
  craft: {
    label: "Création",
    title: "Avant la stratégie, il y a l'oreille",
    body: ["Composer, monter, concevoir : la pratique aiguise le métier."],
    aside: "Une intuition créative au service de la stratégie. Jamais l'inverse.",
  },
  repCta: {
    kicker: "Le travail",
    title: "Voir le Répertoire",
    sub: "Productions et réalisations, en images.",
    button: "Entrer",
  },
  contact: {
    label: "Contact",
    title: "Construisons quelque chose qui se retient.",
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
  },
  footer: { note: "Composé à Paris", rights: "Tous droits réservés." },
};

const en: Translations = {
  meta: {
    title: "Pablo Assad — Communication and project leadership",
    description:
      "Pablo Assad — communication and project leadership. A creative's eye, a strategist's discipline. Introduction, path and creative practice.",
  },
  repertoireMeta: {
    title: "Portfolio",
    description:
      "Pablo Assad's portfolio: productions and selected work. Design, art direction, video, brand content and composition.",
  },
  nav: { presentation: "About", repertoire: "Portfolio", cta: "Get in touch" },
  hero: {
    eyebrow: "Communication · Project leadership",
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
      "Creativity isn't my finishing touch. It's where I start.",
    ],
    toolsLabel: "Tools",
    photoCaption: "Paris",
  },
  journey: { label: "Path", title: "Markers", educationLabel: "Education", experienceLabel: "Experience" },
  work: {
    label: "Work",
    title: "Portfolio",
    intro: "Productions and selected work. Design, image, sound.",
    filterAll: "All",
    comingSoon: "Coming soon",
    roleLabel: "Role",
    close: "Close",
    detailSoon: "Visuals on their way.",
    open: "View project",
    back: "About",
    pieces: "Single pieces",
  },
  craft: {
    label: "Craft",
    title: "Before strategy, there's the ear",
    body: ["Composing, editing, designing: practice sharpens the work."],
    aside: "A creative instinct put to work for strategy. Never the other way around.",
  },
  repCta: {
    kicker: "The work",
    title: "Enter the Portfolio",
    sub: "Productions and selected work, in pictures.",
    button: "Enter",
  },
  contact: {
    label: "Contact",
    title: "Let's build something that sticks.",
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
  },
  footer: { note: "Composed in Paris", rights: "All rights reserved." },
};

export const locales: Locale[] = ["fr", "en"];

export const translations: Record<Locale, Translations> = { fr, en };
