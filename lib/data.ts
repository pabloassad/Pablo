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
export const contactPhone = "+33 6 15 64 85 28";

export const cercleInstagram = "https://www.instagram.com/lecercle.paris/";

export const navLinks = [
  { href: "/", key: "home" } as const,
  { href: "/music", key: "music" } as const,
  { href: "/projects", key: "projects" } as const,
  { href: "/contact", key: "contact" } as const,
];

/*
 * Photography manifest — real files live in /public/images.
 * One image per slot: no photo appears twice across the site.
 */
export const images = {
  portraitAmber: "/images/pablito-amber.jpg", // crystal tee, warm backdrop — home hero
  portraitBeige: "/images/pablito-beige.jpg", // beige suit, seated editorial — profile
  portraitStreet: "/images/pablito-street.jpg", // beige suit, street daylight — contact
  liveClub: "/images/pablito-club.png", // hands up in the booth — cercle case study
  clubRed: "/images/pablito-red.jpg", // red light, club energy — duo club, sets live
  cercleRoom: "/images/cercle-room.png", // full room under the beams — home cercle band
  liveViolet: "/images/live-violet.png", // violet beams over the floor — music page
  liveChampagne: "/images/live-champagne.png", // champagne pour in the dark — music page
  crowdBW: "/images/pablito-crowd.png", // black and white crowd, arms raised — projects header
  crowdEnergy: "/images/cover-bsb.png", // crowd, hands up — clubs section, sets live cover
  studioSession: "/images/studio-session.jpg", // hands on keyboard, studio — home producer dial
  studioComposition: "/images/studio-composition.jpg", // at the DAW, studio — music page header
  pabloCarre: "/images/cover-rinse.jpg", // square portrait — contact page
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
  /** Playback start offset in seconds */
  startTime?: number;
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

export type LiveSet = {
  id: string;
  kicker: string;
  name: string;
  sub?: string;
  edition?: string;
  cover: string;
  /** Brand mark rendered discreetly on the cover */
  watermark?: { src: string; alt: string };
};

/* Le Cercle carousel — exclusively the recorded editions, mirrors `cercleGallery` */
export const cercleLiveSets: LiveSet[] = cercleSets.map((set, i) => ({
  id: set.id,
  kicker: "Le Cercle",
  name: set.name,
  edition: set.edition,
  cover: cercleGallery[i],
}));

/*
 * Sets Live — Music page carousel. Every recorded live set outside the
 * official Le Cercle editions, most recent first, the opening last.
 */
export const liveSetsMusic: LiveSet[] = [
  {
    id: "bsb-league",
    kicker: "2024",
    name: "BSB League",
    sub: "Tournoi de basket de Gazo",
    cover: "/images/cover-bsb.png",
  },
  {
    id: "rinse-radio",
    kicker: "2023",
    name: "Rinse Radio",
    sub: "La Passe D' avec Armel Bizzman",
    cover: "/images/cover-rinse.jpg",
    watermark: { src: "/logos/rinse-france.png", alt: "Rinse France" },
  },
  {
    id: "yardland-2023",
    kicker: "2023",
    name: "Yardland",
    cover: images.clubRed,
  },
  {
    id: "cercle-opening",
    kicker: "Le Cercle",
    name: "Opening Set",
    cover: "/images/cover-opening.png",
  },
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
    title: "Pablito · Signature Set",
    subtitle: "Live set",
    art: "amber",
    image: images.liveClub,
    source: "youtube",
    videoId: "8N-ATi5XuW8",
  },
  ...cercleSets.map((set, i) => ({
    id: set.id,
    title: `Le Cercle · ${set.name}`,
    subtitle: "Live set",
    art: "amber" as ArtVariant,
    image: cercleGallery[i],
    source: "youtube" as const,
    videoId: set.videoId,
  })),
  {
    id: "bsb-league",
    title: "BSB League",
    subtitle: "Tournoi de basket de Gazo · 2024",
    art: "gold",
    image: "/images/cover-bsb.png",
    source: "soundcloud",
    url: "https://soundcloud.com/user-143220564/bsb-league-pablito-mix",
  },
  {
    id: "rinse-radio",
    title: "Rinse Radio",
    subtitle: "La Passe D' avec Armel Bizzman · 2023",
    art: "slate",
    image: "/images/cover-rinse.jpg",
    source: "soundcloud",
    url: "https://soundcloud.com/rinse_france/la-passe-d-avec-armel-bizzman-16-mai-2023",
    startTime: 4380,
  },
  {
    id: "yardland-2023",
    title: "Yardland",
    subtitle: "Live set · 2023",
    art: "rose",
    image: images.clubRed,
    source: "soundcloud",
    url: "https://soundcloud.com/user-143220564/yardland-pablito-mix",
  },
  {
    id: "cercle-opening",
    title: "Le Cercle · Opening Set",
    subtitle: "Live set",
    art: "amber",
    image: "/images/cover-opening.png",
    source: "youtube",
    videoId: "vxGilpTQv3E",
    startTime: 685,
  },
  {
    id: "soundcloud-selection",
    title: "Pablito · Selection",
    subtitle: "SoundCloud",
    art: "gold",
    image: images.portraitAmber,
    source: "soundcloud",
    url: soundcloudProfileUrl,
  },
];

/*
 * Clubs et venues — each opens the venue's Instagram profile.
 * `logo` renders alone (no caption); `showName` adds the name under a sigil
 * logo; entries without a logo render as a typographic wordmark.
 */
export const clubs: {
  name: string;
  instagram: string;
  logo?: string;
  showName?: boolean;
}[] = [
  { name: "La Cigale", instagram: "https://www.instagram.com/lacigaleofficiel/", logo: "/logos/la-cigale.png" },
  { name: "Le Bridge", instagram: "https://www.instagram.com/bridgeparisclub/", logo: "/logos/le-bridge.png" },
  { name: "Le Rouge", instagram: "https://www.instagram.com/lerougepigalleparis/", logo: "/logos/le-rouge.png" },
  { name: "La Nuit", instagram: "https://www.instagram.com/la.nuit.paris/", logo: "/logos/la-nuit.png" },
  { name: "Les Planches", instagram: "https://www.instagram.com/lesplanchesparis/", logo: "/logos/les-planches.png" },
  { name: "Volange", instagram: "https://www.instagram.com/volange_event/", logo: "/logos/volange.png" },
  { name: "Trinquet Village", instagram: "https://www.instagram.com/trinquetvillage/", logo: "/logos/trinquet-village.png" },
  { name: "Yardland", instagram: "https://www.instagram.com/yardland_/", logo: "/logos/yardland.png", showName: true },
  { name: "Club Vendôme", instagram: "https://www.instagram.com/le.vendome_club.paris/", logo: "/logos/club-vendome.png" },
  { name: "Rinse France", instagram: "https://www.instagram.com/rinsefrance/", logo: "/logos/rinse-france.png" },
];
