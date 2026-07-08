// Bilingual UI + section copy for the Pablo Assad portfolio.
// Text is rare and sharp by design — the visuals carry the meaning. The English
// is an *adaptation* for an international audience, never a literal mirror.

export type Locale = "fr" | "en";

export interface NavItem {
  id: string;
  label: string;
}

export interface Translations {
  meta: { title: string; description: string };
  nav: { items: NavItem[]; cta: string };
  hero: {
    eyebrow: string;
    name: string;
    statement: string;
    intro: string;
    scroll: string;
  };
  journey: { label: string; title: string; intro: string };
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
  };
  craft: { label: string; title: string; body: string[]; aside: string };
  tools: { label: string; title: string; intro: string };
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
      "Pablo Assad — communication et direction de projet. Design graphique, direction artistique, brand content et production. Un catalogue visuel et un parcours.",
  },
  nav: {
    items: [
      { id: "parcours", label: "Parcours" },
      { id: "projets", label: "Projets" },
      { id: "creation", label: "Création" },
      { id: "outils", label: "Outils" },
      { id: "contact", label: "Contact" },
    ],
    cta: "Me contacter",
  },
  hero: {
    eyebrow: "Communication · Direction de projet",
    name: "Pablo Assad",
    statement: "Je compose des marques.",
    intro: "Un regard de créatif, la rigueur d'un stratège.",
    scroll: "Défiler",
  },
  journey: {
    label: "Parcours",
    title: "Le chemin",
    intro: "Des arts appliqués à la stratégie de marque. Une ligne, pas un hasard.",
  },
  work: {
    label: "Projets",
    title: "Répertoire",
    intro: "Un catalogue vivant. Design, image, son.",
    filterAll: "Tout",
    comingSoon: "À venir",
    roleLabel: "Rôle",
    close: "Fermer",
    detailSoon: "Visuels en cours d'ajout.",
    open: "Voir le projet",
  },
  craft: {
    label: "Création",
    title: "Avant la stratégie, il y a l'oreille",
    body: ["Composer, monter, concevoir — la pratique aiguise le métier."],
    aside: "Une intuition créative au service de la stratégie. Jamais l'inverse.",
  },
  tools: {
    label: "Outils",
    title: "L'atelier",
    intro: "Les outils que je maîtrise, du pixel à la piste audio.",
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
      "Pablo Assad — communication and project leadership. Graphic design, art direction, brand content and production. A visual catalogue and a path.",
  },
  nav: {
    items: [
      { id: "parcours", label: "Path" },
      { id: "projets", label: "Work" },
      { id: "creation", label: "Craft" },
      { id: "outils", label: "Tools" },
      { id: "contact", label: "Contact" },
    ],
    cta: "Get in touch",
  },
  hero: {
    eyebrow: "Communication · Project leadership",
    name: "Pablo Assad",
    statement: "I compose brands.",
    intro: "A creative's eye, a strategist's discipline.",
    scroll: "Scroll",
  },
  journey: {
    label: "Path",
    title: "The road",
    intro: "From applied arts to brand strategy. A line, not an accident.",
  },
  work: {
    label: "Work",
    title: "Repertoire",
    intro: "A living catalogue. Design, image, sound.",
    filterAll: "All",
    comingSoon: "Coming soon",
    roleLabel: "Role",
    close: "Close",
    detailSoon: "Visuals on their way.",
    open: "View project",
  },
  craft: {
    label: "Craft",
    title: "Before strategy, there's the ear",
    body: ["Composing, editing, designing — practice sharpens the work."],
    aside: "A creative instinct put to work for strategy. Never the other way around.",
  },
  tools: {
    label: "Tools",
    title: "The toolkit",
    intro: "The tools I master, from pixel to audio track.",
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
