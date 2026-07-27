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

export const pressKitUrl =
  "https://drive.google.com/drive/folders/1VxMX6NAM5UyVw02vwCxBGN1PBbrXRr2L?usp=sharing";

/*
 * Home "profile" video — served from public/ so it rides the Fast Data Transfer
 * quota. It used to live on Vercel Blob, whose 10 GB/month of included transfer
 * ran out and got the store suspended. NEXT_PUBLIC_PROFILE_VIDEO_URL overrides
 * the path without a code change; an empty value falls back to the
 * portraitBeige photo.
 *
 * scripts/optimize-profile-video.sh re-encodes a source file into this exact
 * path when the clip needs to get lighter.
 */
export const profileVideoUrl =
  process.env.NEXT_PUBLIC_PROFILE_VIDEO_URL || "/video/profile.mp4";

export const navLinks = [
  { href: "/", key: "home" } as const,
  { href: "/music", key: "music" } as const,
  { href: "/projects", key: "projects" } as const,
  { href: "/service", key: "service" } as const,
  { href: "/contact", key: "contact" } as const,
];

/*
 * Photography manifest — real files live in /public/images.
 * One image per slot: no photo appears twice across the site.
 */
export const images = {
  portraitAmber: "/images/pablito-amber.webp", // crystal tee, warm backdrop — home hero
  portraitBeige: "/images/pablito-beige.webp", // beige suit, seated editorial — profile
  liveClub: "/images/pablito-club.webp", // hands up in the booth — cercle case study
  clubRed: "/images/pablito-red.webp", // red light, club energy — BSB League cover
  clubCrowd: "/images/cover-bsb.webp", // black and white crowd, hands up — duo club
  cercleRoom: "/images/cercle-room.webp", // full room under the beams — home cercle band
  boothSpread: "/images/pablito-booth-spread.webp", // white shirt, arms wide at the booth — Saint-Valentin set
  boothRaised: "/images/pablito-booth-raised.webp", // arm raised in blue light at the booth — BSB League set
  liveChampagne: "/images/live-champagne.webp", // champagne pour in the dark — music page
  crowdBW: "/images/pablito-crowd.webp", // black and white crowd, arms raised — projects header
  crowdEnergy: "/images/cover-club.webp", // DJ from behind, crowd lit in pink — clubs module
  studioSession: "/images/studio-session.webp", // hands on keyboard, studio — music page header
  studioComposition: "/images/studio-composition.webp", // at the DAW, studio — home producer dial
  pabloCarre: "/images/pablito-portrait-night.webp", // close b&w portrait — contact page
  studioRadio: "/images/cover-radio.webp", // profile at the DAW — rinse radio cover
  yardlandCover: "/images/cover-yardland.webp", // mic in hand, crowd, black and white — yardland set
  serviceEvents: "/images/service-soiree.webp", // beige suit, seated on ottoman — service, private events
  studioFlStudio: "/images/studio-flstudio.webp", // at the FL Studio rig — service, compositions
};

/* Le Cercle gallery — one shot per recorded edition, mirrors `cercleSets` order */
export const cercleGallery = [
  "/images/cercle-01.webp",
  "/images/cercle-02.webp",
  "/images/cercle-03.webp",
  "/images/cercle-04.webp",
  "/images/cercle-05.webp",
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

/* Le Cercle carousel — the recorded editions, then the opening set as the oldest */
export const cercleLiveSets: LiveSet[] = [
  ...cercleSets.map((set, i) => ({
    id: set.id,
    kicker: "Le Cercle",
    name: set.name,
    edition: set.edition,
    cover: cercleGallery[i],
  })),
  {
    id: "cercle-opening",
    kicker: "Le Cercle",
    name: "Opening Set",
    edition: "06",
    cover: "/images/cover-opening.webp",
  },
];

/*
 * Sets Live — Music page carousel. The Cercle highlight opens the carousel,
 * followed by every recorded live set outside Le Cercle, most recent first.
 */
export const liveSetsMusic: LiveSet[] = [
  {
    id: cercleSets[0].id,
    kicker: "Le Cercle",
    name: cercleSets[0].name,
    cover: images.boothSpread,
  },
  {
    id: cercleSets[1].id,
    kicker: "Le Cercle",
    name: cercleSets[1].name,
    cover: images.yardlandCover,
  },
  {
    id: "bsb-league",
    kicker: "2024",
    name: "BSB League",
    sub: "Tournoi de basket de Gazo",
    cover: images.boothRaised,
  },
  {
    id: "rinse-radio",
    kicker: "2023",
    name: "Rinse Radio",
    sub: "La Passe D' avec Armel Bizzman",
    cover: images.studioRadio,
    watermark: { src: "/logos/rinse-france.png", alt: "Rinse France" },
  },
  {
    id: "yardland-2023",
    kicker: "2023",
    name: "Yardland",
    cover: images.clubRed,
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
    image: images.clubRed,
    source: "soundcloud",
    url: "https://soundcloud.com/user-143220564/bsb-league-pablito-mix",
  },
  {
    id: "rinse-radio",
    title: "Rinse Radio",
    subtitle: "La Passe D' avec Armel Bizzman · 2023",
    art: "slate",
    image: images.studioRadio,
    source: "soundcloud",
    url: "https://soundcloud.com/rinse_france/la-passe-d-avec-armel-bizzman-16-mai-2023",
    startTime: 4380,
  },
  {
    id: "yardland-2023",
    title: "Yardland",
    subtitle: "Live set · 2023",
    art: "rose",
    image: images.yardlandCover,
    source: "soundcloud",
    url: "https://soundcloud.com/user-143220564/yardland-pablito-mix",
  },
  {
    id: "cercle-opening",
    title: "Le Cercle · Opening Set",
    subtitle: "Live set",
    art: "amber",
    image: "/images/cover-opening.webp",
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
 * `compact` shrinks square-ish marks whose visual weight outsizes the wordmarks.
 */
export const clubs: {
  name: string;
  instagram: string;
  logo?: string;
  showName?: boolean;
  compact?: boolean;
  logoClassName?: string;
}[] = [
  { name: "La Cigale", instagram: "https://www.instagram.com/lacigaleofficiel/", logo: "/logos/la-cigale.png" },
  { name: "Le Bridge", instagram: "https://www.instagram.com/bridgeparisclub/", logo: "/logos/le-bridge.png" },
  { name: "Le Rouge", instagram: "https://www.instagram.com/lerougepigalleparis/", logo: "/logos/le-rouge.png", logoClassName: "h-8 w-auto max-w-[140px] object-contain sm:h-12" },
  { name: "La Nuit", instagram: "https://www.instagram.com/la.nuit.paris/", logo: "/logos/la-nuit.png", logoClassName: "h-9 w-auto max-w-[150px] object-contain sm:h-[52px]" },
  { name: "Les Planches", instagram: "https://www.instagram.com/lesplanchesparis/", logo: "/logos/les-planches.png" },
  { name: "Volange", instagram: "https://www.instagram.com/volange_event/", logo: "/logos/volange.png" },
  { name: "Trinquet Village", instagram: "https://www.instagram.com/trinquetvillage/", logo: "/logos/trinquet-village.png" },
  { name: "Yardland", instagram: "https://www.instagram.com/yardland_/", logo: "/logos/yardland.png", showName: true },
  { name: "Club Vendôme", instagram: "https://www.instagram.com/le.vendome_club.paris/", logo: "/logos/club-vendome.png", logoClassName: "h-8 w-auto max-w-[130px] object-contain sm:h-11" },
  { name: "Rinse France", instagram: "https://www.instagram.com/rinsefrance/", logo: "/logos/rinse-france.png" },
];
