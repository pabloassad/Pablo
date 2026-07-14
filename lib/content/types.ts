// Data-driven content model. Pablo fills these collections over time — the
// layout never changes, only the data. Entries flagged `placeholder` render as
// elegant, intentional "coming soon" frames rather than broken holes.

import type { Locale } from "@/lib/i18n/translations";

/** A string that exists in both languages. */
export type Localized = Record<Locale, string>;

export type ProjectCategory = "design" | "video" | "sound";

export interface ProjectMedia {
  /** Path under /public, e.g. /works/rosa-summer/cover.jpg */
  src: string;
  type?: "image" | "video";
  alt?: Localized;
  /** Intrinsic size — lets layouts honour the production's native format. */
  w?: number;
  h?: number;
}

export interface ProjectMetric {
  value: string;
  label: Localized;
}

export interface Project {
  slug: string;
  category: ProjectCategory;
  title: Localized;
  client?: string;
  year?: string;
  role?: Localized;
  blurb?: Localized;
  /** Cover image path under /public. Omit while placeholder. */
  cover?: string;
  coverW?: number;
  coverH?: number;
  media?: ProjectMedia[];
  metrics?: ProjectMetric[];
  status: "published" | "placeholder";
}

export type JourneyKind = "school" | "agency" | "venture" | "goal";

export interface JourneyMilestone {
  id: string;
  year: string;
  title: Localized;
  place: Localized;
  kind: JourneyKind;
  blurb?: Localized;
  /** 1 = standard, 2 = notable, 3 = headline milestone (larger on the timeline). */
  emphasis?: 1 | 2 | 3;
}

export interface Tool {
  name: string;
  /** Group key — see data/tools.ts groups. */
  group: string;
  /** Optional monochrome logo path under /public/logos (svg/png). */
  logo?: string;
}

export interface ToolGroup {
  key: string;
  label: Localized;
}

/** A standalone production — one strong visual (image or video), no project. */
export interface Piece {
  id: string;
  title: Localized;
  /** Path under /public. Omit while the visual is on its way. */
  src?: string;
  /** "image" (default) or "video" — video pieces autoplay muted in view. */
  type?: "image" | "video";
  w?: number;
  h?: number;
  year?: string;
}

export type TrackKind = "commande" | "jingle" | "reportage" | "perso";

/** One track of the sound library. */
export interface AudioTrack {
  id: string;
  title: string;
  file: string;
  kind: TrackKind;
  context: Localized;
  bpm?: number;
  year?: string;
}
