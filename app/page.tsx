import { Hero } from "@/components/chapters/Hero";
import { About } from "@/components/chapters/About";
import { Journey } from "@/components/chapters/Journey";
import { Craft } from "@/components/chapters/Craft";
import { FullBleed } from "@/components/chapters/FullBleed";
import { RepertoireCta } from "@/components/chapters/RepertoireCta";
import { Contact } from "@/components/chapters/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Journey />
      <Craft />
      <FullBleed
        src="/portrait/montmartre.webp"
        alt="Pablo Assad, Montmartre"
        caption="Montmartre · Paris"
        focal="38% 45%"
      />
      <RepertoireCta />
      <Contact />
    </>
  );
}
