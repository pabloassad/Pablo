export const socials = {
  spotify:
    "https://open.spotify.com/intl-fr/artist/16F2cb3MMhRC7RZ92jkbSG?si=J68EKRK8Sz-Www36tJK0dQ",
  soundcloud: "https://soundcloud.com/user-143220564",
  youtube: "https://www.youtube.com/@pablitobeats8350",
  instagram: "https://www.instagram.com/pablito_beats",
};

export const spotifyArtistId = "16F2cb3MMhRC7RZ92jkbSG";
export const soundcloudProfileUrl = "https://soundcloud.com/user-143220564";

export const contactEmail = "pablito.booking@gmail.com";
export const contactPhone = "06 15 64 85 28";

export const cercleInstagram = "https://www.instagram.com/lecercle.paris/";

export const navLinks = [
  { href: "/", key: "home" } as const,
  { href: "/music", key: "music" } as const,
  { href: "/projects", key: "projects" } as const,
  { href: "/contact", key: "contact" } as const,
];

/*
 * Photography manifest — real files live in /public/images.
 */
export const images = {
  portraitAmber: "/images/pablito-amber.jpg", // warm-toned portrait
  portraitBeige: "/images/pablito-beige.jpg", // beige suit, seated editorial
  portraitDenim: "/images/pablito-denim.jpg", // denim jacket, daylight
  liveClub: "/images/pablito-club.jpg", // hands up in the booth
  crowdBW: "/images/pablito-crowd.png", // black & white crowd, arms raised
};

/* Le Cercle gallery — one shot per recorded edition, mirrors `cercleSets` order */
export const cercleGallery = [
  "/images/cercle-01.jpg",
  "/images/cercle-02.jpg",
  "/images/cercle-03.jpg",
  "/images/cercle-04.jpg",
  "/images/cercle-05.jpg",
];

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
 * Add an entry per edition as recordings are published.
 */
export const cercleSets: { id: string; edition: string; name: string; videoId: string }[] = [
  { id: "cercle-saint-valentin", edition: "01", name: "Saint-Valentin", videoId: "_7-zKtmmYDo" },
  { id: "cercle-bresil", edition: "02", name: "Brésil", videoId: "dcVG4HYvEHM" },
  { id: "cercle-las-vegas", edition: "03", name: "Las Vegas", videoId: "4wFp_u7nr4o" },
  { id: "cercle-prestige", edition: "04", name: "Prestige", videoId: "EEQBWvpjels" },
  { id: "cercle-summer-party", edition: "05", name: "Summer Party", videoId: "EfLqfgu0KGE" },
];

/* Le Cercle — key figures for the animated stat band */
export const cercleStats = {
  participants: "800+",
  editions: "7",
  views: "1M+",
  partners: ["Durex", "Red Bull", "Jägermeister", "Sipsty"],
};

export const playerQueue: PlayerTrack[] = [
  {
    id: "pablito-signature",
    title: "Pablito — Signature Set",
    subtitle: "Live set",
    art: "amber",
    image: images.liveClub,
    source: "youtube",
    videoId: "8N-ATi5XuW8",
  },
  ...cercleSets.map((set) => ({
    id: set.id,
    title: `Le Cercle — ${set.name}`,
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

/* Clubs & venues — each opens the venue's Instagram profile */
export const clubs: { name: string; instagram: string; logo: string }[] = [
  { name: "La Cigale", instagram: "https://www.instagram.com/lacigaleofficiel/", logo: "/logos/la-cigale.png" },
  { name: "Le Bridge", instagram: "https://www.instagram.com/bridgeparisclub/", logo: "/logos/le-bridge.png" },
  { name: "Le Rouge", instagram: "https://www.instagram.com/lerougepigalleparis/", logo: "/logos/le-rouge.png" },
  { name: "La Nuit", instagram: "https://www.instagram.com/la.nuit.paris/", logo: "/logos/la-nuit.png" },
  { name: "Les Planches", instagram: "https://www.instagram.com/lesplanchesparis/", logo: "/logos/les-planches.png" },
  { name: "Volange", instagram: "https://www.instagram.com/volange_event/", logo: "/logos/volange.png" },
  { name: "Trinquet Village", instagram: "https://www.instagram.com/trinquetvillage/", logo: "/logos/trinquet-village.png" },
  { name: "Yardland", instagram: "https://www.instagram.com/yardland_/", logo: "/logos/yardland.png" },
  { name: "Club Vendôme", instagram: "https://www.instagram.com/le.vendome_club.paris/", logo: "/logos/club-vendome.png" },
];
