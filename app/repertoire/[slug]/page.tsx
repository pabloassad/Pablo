import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/repertoire/CaseStudyView";
import { caseStudies } from "@/data/caseStudies";
import { siteUrl } from "@/lib/site";

const posterFor = (src: string) => src.replace(/\.mp4$/, "-poster.webp");

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study) return {};
  const title = study.title.fr;
  const description = study.result.fr;
  const image = study.cover
    ? study.coverType === "video"
      ? posterFor(study.cover)
      : study.cover
    : "/og.jpg";
  const url = `${siteUrl}/repertoire/${study.slug}`;
  return {
    title,
    description,
    openGraph: {
      title: `${title} · Étude de cas`,
      description,
      url,
      images: [{ url: image, alt: title }],
      siteName: "Pablo Assad",
      locale: "fr_FR",
      type: "article",
    },
    twitter: { card: "summary_large_image", title: `${title} · Pablo Assad`, description, images: [image] },
    alternates: { canonical: url },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = caseStudies.findIndex((c) => c.slug === slug);
  if (index === -1) notFound();
  const study = caseStudies[index];
  const prev = index > 0 ? caseStudies[index - 1] : undefined;
  const next = index < caseStudies.length - 1 ? caseStudies[index + 1] : undefined;

  return (
    <CaseStudyView
      study={study}
      prev={prev ? { slug: prev.slug, title: prev.title } : undefined}
      next={next ? { slug: next.slug, title: next.title } : undefined}
    />
  );
}
