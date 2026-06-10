import type { Metadata } from "next";
import { AboutPageContent } from "@/components/about/AboutPageContent";

export const metadata: Metadata = {
  title: "About",
  description: "The story of Pablito — a journey shaped by club culture, dancefloors and the pursuit of connection through music.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
