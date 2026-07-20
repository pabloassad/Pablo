/**
 * Canonical site URL. Override with NEXT_PUBLIC_SITE_URL in Vercel when the
 * custom domain goes live (e.g. https://pablo-assad.com) — every metadata
 * field, canonical link and sitemap entry follows it.
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pablo-portfolio-alpha.vercel.app";
