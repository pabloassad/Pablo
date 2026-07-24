import type { MetadataRoute } from "next";

const siteUrl = "https://djpablito.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/music", "/projects", "/service", "/contact", "/privacy"];
  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: path === "" ? "monthly" : "yearly",
    priority: path === "" ? 1 : 0.7,
  }));
}
