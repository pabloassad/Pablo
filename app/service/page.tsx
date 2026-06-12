import type { Metadata } from "next";
import { ServicePageContent } from "@/components/service/ServicePageContent";

export const metadata: Metadata = {
  title: "Service",
  description:
    "DJ sets for private events and custom music production: weddings, corporate events, live shows and audiovisual projects with Pablito.",
};

export default function ServicePage() {
  return <ServicePageContent />;
}
