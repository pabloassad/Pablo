import type { Metadata } from "next";
import { ContactPageContent } from "@/components/contact/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Pablito for bookings, collaborations and press inquiries.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
