import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site";

const base = siteUrl;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/repertoire`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  ];
}
