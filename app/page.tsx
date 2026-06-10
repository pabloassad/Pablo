import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { Pillars } from "@/components/home/Pillars";
import { MusicPreview } from "@/components/home/MusicPreview";
import { ProjectsPreview } from "@/components/home/ProjectsPreview";
import { LivePreview } from "@/components/home/LivePreview";
import { FinalCta } from "@/components/home/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Pillars />
      <MusicPreview />
      <ProjectsPreview />
      <LivePreview />
      <FinalCta />
    </>
  );
}
