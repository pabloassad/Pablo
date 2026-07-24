/**
 * Canonical site URL — every metadata field, canonical link, sitemap and
 * robots entry follows it. Resolution order:
 *
 *   1. NEXT_PUBLIC_SITE_URL — set this in Vercel when the custom domain is
 *      live (e.g. https://pablo-assad.com). Explicit, wins over everything.
 *   2. VERCEL_PROJECT_PRODUCTION_URL — Vercel injects the project's production
 *      domain at build; once a custom domain is assigned as production, this
 *      becomes that domain, so the switch works even if step 1 is forgotten.
 *   3. The current .vercel.app fallback, for local dev and first deploy.
 *
 * Only imported by server files (layout metadata, sitemap, robots, the
 * repertoire pages' generateMetadata), so reading the non-public Vercel env
 * here is safe — it never ships to the client bundle.
 */
const explicit = process.env.NEXT_PUBLIC_SITE_URL;
const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = (
  explicit ??
  (vercelProd ? `https://${vercelProd}` : undefined) ??
  "https://pablo-portfolio-alpha.vercel.app"
).replace(/\/$/, "");
