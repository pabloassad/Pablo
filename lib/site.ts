/**
 * Canonical site URL — every metadata field, canonical link, sitemap and
 * robots entry follows it. Resolution order:
 *
 *   1. NEXT_PUBLIC_SITE_URL — optional explicit override, set in Vercel. Wins
 *      over everything.
 *   2. VERCEL_PROJECT_PRODUCTION_URL — Vercel injects the project's production
 *      domain at build; now that pabloassad.com is the production custom
 *      domain, this resolves to it, so the switch is automatic.
 *   3. Hard fallback (pabloassad.com), for local dev and safety.
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
  "https://pabloassad.com"
).replace(/\/$/, "");
