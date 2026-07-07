import type { Tool, ToolGroup } from "@/lib/content/types";

/**
 * The toolkit. Rendered as a monochrome Swiss grid — the type IS the logo.
 * Drop a real monochrome SVG in public/logos/<name>.svg and add `logo` to an
 * entry to show it instead of the wordmark.
 */

export const toolGroups: ToolGroup[] = [
  { key: "design", label: { fr: "Design", en: "Design" } },
  { key: "motion", label: { fr: "Motion et Vidéo", en: "Motion and Video" } },
  { key: "sound", label: { fr: "Son", en: "Sound" } },
  { key: "ai", label: { fr: "IA et Productivité", en: "AI and Productivity" } },
];

export const tools: Tool[] = [
  { name: "Photoshop", group: "design" },
  { name: "Illustrator", group: "design" },
  { name: "InDesign", group: "design" },

  { name: "Premiere Pro", group: "motion" },
  { name: "After Effects", group: "motion" },

  { name: "FL Studio", group: "sound" },
  { name: "Rekordbox", group: "sound" },

  { name: "Claude", group: "ai" },
  { name: "IA graphique", group: "ai" },
  { name: "Google Workspace", group: "ai" },
];
