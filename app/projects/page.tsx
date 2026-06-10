import type { Metadata } from "next";
import { ProjectsPageContent } from "@/components/projects/ProjectsPageContent";

export const metadata: Metadata = {
  title: "Projects & Experience",
  description: "From Le Cercle to club residencies and festival main stages — the projects that shape Pablito's artistic journey.",
};

export default function ProjectsPage() {
  return <ProjectsPageContent />;
}
