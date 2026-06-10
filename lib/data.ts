export const socials = {
  spotify: "https://open.spotify.com/",
  soundcloud: "https://soundcloud.com/",
  youtube: "https://youtube.com/",
  instagram: "https://instagram.com/",
};

export const contactEmail = "booking@pablito.world";

export const navLinks = [
  { href: "/", key: "home" } as const,
  { href: "/music", key: "music" } as const,
  { href: "/projects", key: "projects" } as const,
  { href: "/live", key: "live" } as const,
  { href: "/about", key: "about" } as const,
  { href: "/contact", key: "contact" } as const,
];

export const venueLogos = [
  "Concrete",
  "Rex Club",
  "Output",
  "Tresor",
  "Printworks",
  "Razzmatazz",
  "Watergate",
  "fabric",
];

export type ArtVariant = "amber" | "violet" | "teal" | "rose" | "slate" | "gold";

export const projectArt: Record<string, ArtVariant> = {
  "le-cercle": "amber",
  "club-residency": "violet",
  "festival-mainstage": "teal",
  "studio-sessions": "rose",
};
