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
