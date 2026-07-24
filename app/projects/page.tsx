import type { Metadata } from "next";
import { ProjectsPageContent } from "@/components/projects/ProjectsPageContent";
import { getServerLocale } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(await getServerLocale(), "projects");
}

export default function ProjectsPage() {
  return <ProjectsPageContent />;
}
