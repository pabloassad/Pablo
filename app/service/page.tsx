import type { Metadata } from "next";
import { ServicePageContent } from "@/components/service/ServicePageContent";
import { getServerLocale } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(await getServerLocale(), "service");
}

export default function ServicePage() {
  return <ServicePageContent />;
}
