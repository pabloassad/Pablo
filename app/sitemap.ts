import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site";
import { caseStudies } from "@/data/caseStudies";

const base = siteUrl;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/repertoire`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    ...caseStudies.map((c) => ({
      url: `${base}/repertoire/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
