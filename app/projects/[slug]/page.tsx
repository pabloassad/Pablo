import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailContent } from "@/components/projects/ProjectDetailContent";
import { translations } from "@/lib/i18n/translations";

const slugs: string[] = translations.en.projects.items.map((item) => item.slug);

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = translations.en.projects.items.find((p) => p.slug === slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.short,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!slugs.includes(slug)) notFound();

  return <ProjectDetailContent slug={slug} />;
}
