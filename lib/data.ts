export const socials = {
  spotify:
    "https://open.spotify.com/intl-fr/artist/16F2cb3MMhRC7RZ92jkbSG?si=J68EKRK8Sz-Www36tJK0dQ",
  soundcloud: "https://soundcloud.com/user-143220564",
  youtube: "https://www.youtube.com/@pablitobeats8350",
  instagram: "https://www.instagram.com/pablito_beats",
};

export const spotifyArtistId = "16F2cb3MMhRC7RZ92jkbSG";
export const soundcloudProfileUrl = "https://soundcloud.com/user-143220564";

/* Placeholders — replace with real booking details when available */
export const contactEmail = "booking@pablito.world";
export const contactPhone = "+33 6 00 00 00 00";

export const navLinks = [
  { href: "/", key: "home" } as const,
  { href: "/music", key: "music" } as const,
  { href: "/projects", key: "projects" } as const,
  { href: "/contact", key: "contact" } as const,
];

/*
 * Photography manifest. Drop the real files into /public/images with these
 * exact names — every component falls back to abstract gradient art until
 * the file exists, then picks the photo up automatically.
 */
export const images = {
  portraitAmber: "/images/pablito-amber.jpg", // crystal tee, warm brown backdrop
  portraitBeige: "/images/pablito-beige.jpg", // beige suit, seated editorial
  portraitDenim: "/images/pablito-denim.jpg", // denim jacket, daylight
  liveClub: "/images/pablito-club.jpg", // hands up in the booth, red light
  crowdBW: "/images/pablito-crowd.jpg", // black & white crowd, arms raised
};

export type ArtVariant = "amber" | "violet" | "teal" | "rose" | "slate" | "gold";

export type PlayerTrack = {
  id: string;
  title: string;
  subtitle: string;
  art: ArtVariant;
  image?: string;
} & (
  | { source: "youtube"; videoId: string }
  | { source: "soundcloud"; url: string }
);

/*
 * Le Cercle recorded sets — the living archive.
 * Add an entry per edition as recordings are published
 * (playlist: youtube.com/watch?v=_7-zKtmmYDo&list=PLJ_LqhKjauRQ…).
 */
export const cercleSets: { id: string; edition: string; videoId: string }[] = [
  { id: "cercle-01", edition: "01", videoId: "_7-zKtmmYDo" },
];

export const playerQueue: PlayerTrack[] = [
  ...cercleSets.map((set) => ({
    id: set.id,
    title: `Le Cercle — Edition ${set.edition}`,
    subtitle: "Live set",
    art: "amber" as ArtVariant,
    image: images.liveClub,
    source: "youtube" as const,
    videoId: set.videoId,
  })),
  {
    id: "soundcloud-selection",
    title: "Pablito — Selection",
    subtitle: "SoundCloud",
    art: "gold",
    image: images.portraitAmber,
    source: "soundcloud",
    url: soundcloudProfileUrl,
  },
];

/* Venues — replace with the real list & logo files when provided */
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
