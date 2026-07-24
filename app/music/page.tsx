import type { Metadata } from "next";
import { MusicPageContent } from "@/components/music/MusicPageContent";
import { getServerLocale } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(await getServerLocale(), "music");
}

export default function MusicPage() {
  return <MusicPageContent />;
}
