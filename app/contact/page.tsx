import type { Metadata } from "next";
import { ContactPageContent } from "@/components/contact/ContactPageContent";
import { getServerLocale } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(await getServerLocale(), "contact");
}

export default function ContactPage() {
  return <ContactPageContent />;
}
