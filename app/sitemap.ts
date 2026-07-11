import type { MetadataRoute } from "next";

const base = "https://pablo-portfolio-alpha.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/repertoire`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  ];
}
