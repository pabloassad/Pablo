import type { AudioTrack } from "@/lib/content/types";

/**
 * The sound library — Pablo's compositions and commissioned work.
 * Files live in public/works/sound-design/.
 * kind: "commande" | "jingle" | "reportage" → commissioned; "perso" → personal.
 */

export const audioTracks: AudioTrack[] = [
  // ── Commandes ───────────────────────────────────────────────────────────
  {
    id: "crazyfunk",
    title: "Crazyfunk",
    file: "/works/sound-design/crazyfunk.wav",
    kind: "commande",
    context: { fr: "Composée sur mesure pour Bonduelle", en: "Composed for the Bonduelle brand" },
  },
  {
    id: "pov-media",
    title: "Grand Angle",
    file: "/works/sound-design/pov-media.mp3",
    kind: "jingle",
    context: { fr: "Jingle d'antenne · POV Média", en: "Station jingle · POV Média" },
  },
  {
    id: "dantokpa",
    title: "Dantokpa",
    file: "/works/sound-design/dantokpa.mp3",
    kind: "reportage",
    context: { fr: "Reportage culturel et danse · France–Bénin", en: "Culture and dance documentary · France–Benin" },
  },

  // ── Compositions personnelles (ordre défini) ─────────────────────────────
  {
    id: "dassa",
    title: "Dassa",
    file: "/works/sound-design/dassa.mp3",
    kind: "perso",
    context: { fr: "Composition personnelle", en: "Personal composition" },
  },
  {
    id: "liberta",
    title: "Liberta",
    file: "/works/sound-design/liberta.mp3",
    kind: "perso",
    context: { fr: "Composition personnelle", en: "Personal composition" },
  },
  {
    id: "ladysoul",
    title: "Ladysoul",
    file: "/works/sound-design/ladysoul.mp3",
    kind: "perso",
    context: { fr: "Composition personnelle", en: "Personal composition" },
  },
  {
    id: "rose",
    title: "Rose",
    file: "/works/sound-design/rose.mp3",
    kind: "perso",
    context: { fr: "Composition personnelle", en: "Personal composition" },
  },
  {
    id: "sacre-coeur",
    title: "Sacré Cœur",
    file: "/works/sound-design/sacre-coeur.mp3",
    kind: "perso",
    context: { fr: "Composition personnelle", en: "Personal composition" },
  },
  {
    id: "mansa",
    title: "Mansa",
    file: "/works/sound-design/mansa.mp3",
    kind: "perso",
    context: { fr: "Composition personnelle", en: "Personal composition" },
  },
  {
    id: "stand-and-the-word",
    title: "Stand and the Word",
    file: "/works/sound-design/stand-and-the-word.mp3",
    kind: "perso",
    context: { fr: "Composition personnelle", en: "Personal composition" },
  },
  {
    id: "demon",
    title: "Demon",
    file: "/works/sound-design/demon.mp3",
    kind: "perso",
    context: { fr: "Composition personnelle · extrait", en: "Personal composition · excerpt" },
  },
  {
    id: "monday",
    title: "Monday",
    file: "/works/sound-design/monday.wav",
    kind: "perso",
    context: { fr: "Composition personnelle", en: "Personal composition" },
  },
];
