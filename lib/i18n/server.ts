import { cookies, headers } from "next/headers";
import type { Locale } from "./translations";

export const LOCALE_COOKIE = "pablito-locale";

/*
 * Resolve the request locale on the server so the document is rendered — and
 * `<html lang>` set — in the visitor's language on the very first paint.
 * Priority: explicit cookie (set by the toggle) → Accept-Language → English.
 */
export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const stored = cookieStore.get(LOCALE_COOKIE)?.value;
  if (stored === "fr" || stored === "en") return stored;

  const accept = (await headers()).get("accept-language")?.toLowerCase() ?? "";
  const primary = accept.split(",")[0]?.trim() ?? "";
  if (primary.startsWith("fr")) return "fr";
  return "en";
}
