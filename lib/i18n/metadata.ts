import type { Metadata } from "next";
import type { Locale } from "./translations";

const siteUrl = "https://djpablito.vercel.app";
const ogImageUrl = `${siteUrl}/images/og-image.jpg`;

type Entry = { title: string; description: string };

type PageKey = "home" | "music" | "projects" | "service" | "contact" | "privacy";

const root: Record<Locale, Entry> = {
  fr: {
    title: "Pablito — DJ · Producteur · Paris",
    description:
      "DJ et producteur parisien. Sets club, productions FL Studio et Le Cercle. Booking pour clubs, événements privés et festivals.",
  },
  en: {
    title: "Pablito — DJ · Producer · Paris",
    description:
      "Paris-based DJ and producer. Club sets, FL Studio productions and Le Cercle. Booking for clubs, private events and festivals.",
  },
};

const pages: Record<Locale, Record<Exclude<PageKey, "home">, Entry>> = {
  fr: {
    music: {
      title: "Musique",
      description:
        "Les productions, remixes, edits et enregistrements live de Pablito : une galerie sonore entre SoundCloud, Spotify et YouTube.",
    },
    projects: {
      title: "Projets et expérience",
      description:
        "Du Cercle aux résidences en club et aux scènes de festival, les projets qui façonnent le parcours artistique de Pablito.",
    },
    service: {
      title: "Prestations",
      description:
        "Sets DJ pour vos événements et créations musicales sur mesure : mariages, soirées corporate, spectacles et productions audiovisuelles.",
    },
    contact: {
      title: "Contact",
      description: "Contactez Pablito pour un booking, une collaboration ou une demande presse.",
    },
    privacy: {
      title: "Confidentialité",
      description: "Politique de confidentialité du site de Pablito.",
    },
  },
  en: {
    music: {
      title: "Music",
      description:
        "Pablito's productions, remixes, edits and live recordings: a sound gallery across SoundCloud, Spotify and YouTube.",
    },
    projects: {
      title: "Projects and experience",
      description:
        "From Le Cercle to club residencies and festival stages, the projects that shape Pablito's artistic journey.",
    },
    service: {
      title: "Services",
      description:
        "DJ sets for your events and custom music production: weddings, corporate events, live shows and audiovisual projects.",
    },
    contact: {
      title: "Contact",
      description: "Get in touch with Pablito for bookings, collaborations and press inquiries.",
    },
    privacy: {
      title: "Privacy",
      description: "Privacy policy for Pablito's website.",
    },
  },
};

/** Root layout metadata — localized title, description and social cards. */
export function rootMetadata(locale: Locale): Metadata {
  const { title, description } = root[locale];
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: "%s · Pablito",
    },
    description,
    alternates: { canonical: "/" },
    openGraph: {
      title: "Pablito",
      description,
      url: siteUrl,
      siteName: "Pablito",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: "Pablito" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Pablito",
      description,
      images: [ogImageUrl],
    },
  };
}

/** Per-page metadata (title + description) in the request locale. */
export function pageMetadata(locale: Locale, key: Exclude<PageKey, "home">): Metadata {
  const { title, description } = pages[locale][key];
  return { title, description };
}
