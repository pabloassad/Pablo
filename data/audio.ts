import type { AudioTrack } from "@/lib/content/types";

/**
 * The sound library — Pablo's compositions and commissioned work.
 * Files live in public/works/sound-design/. BPM comes from the sessions
 * themselves (La Mesure: the site displays tempo like a score).
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
    bpm: 112,
  },
  {
    id: "pov-media",
    title: "POV Média",
    file: "/works/sound-design/pov-media.mp3",
    kind: "jingle",
    context: { fr: "Jingle du média POV Média", en: "Jingle for POV Média" },
  },
  {
    id: "dantokpa",
    title: "Dantokpa",
    file: "/works/sound-design/dantokpa.mp3",
    kind: "reportage",
    context: { fr: "Reportage culturel et danse · France–Bénin", en: "Culture and dance documentary · France–Benin" },
    bpm: 121,
  },

  // ── Compositions personnelles ───────────────────────────────────────────
  {
    id: "sacre-coeur",
    title: "Sacré Cœur",
    file: "/works/sound-design/sacre-coeur.wav",
    kind: "perso",
    context: { fr: "Composition personnelle", en: "Personal composition" },
    bpm: 124,
  },
  {
    id: "stand-and-the-word",
    title: "Stand and the Word",
    file: "/works/sound-design/stand-and-the-word.wav",
    kind: "perso",
    context: { fr: "Composition personnelle", en: "Personal composition" },
    bpm: 122,
  },
  {
    id: "liberta",
    title: "Liberta",
    file: "/works/sound-design/liberta.wav",
    kind: "perso",
    context: { fr: "Composition personnelle", en: "Personal composition" },
  },
  {
    id: "monday",
    title: "Monday",
    file: "/works/sound-design/monday.wav",
    kind: "perso",
    context: { fr: "Composition personnelle", en: "Personal composition" },
  },
  {
    id: "dassa",
    title: "Dassa",
    file: "/works/sound-design/dassa.mp3",
    kind: "perso",
    context: { fr: "Composition personnelle", en: "Personal composition" },
    bpm: 113,
  },
  {
    id: "rose",
    title: "Rose",
    file: "/works/sound-design/rose.mp3",
    kind: "perso",
    context: { fr: "Composition personnelle", en: "Personal composition" },
    bpm: 120,
  },
  {
    id: "mansa",
    title: "Mansa",
    file: "/works/sound-design/mansa.mp3",
    kind: "perso",
    context: { fr: "Composition personnelle", en: "Personal composition" },
    bpm: 108,
  },
  {
    id: "ladysoul",
    title: "Ladysoul",
    file: "/works/sound-design/ladysoul.wav",
    kind: "perso",
    context: { fr: "Composition personnelle", en: "Personal composition" },
    bpm: 110,
  },
  {
    id: "demon",
    title: "Demon",
    file: "/works/sound-design/demon.mp3",
    kind: "perso",
    context: { fr: "Composition personnelle · extrait", en: "Personal composition · excerpt" },
    bpm: 130,
  },
];
