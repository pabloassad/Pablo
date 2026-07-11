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
      <FullBleed src="/portrait/exterieur-02.webp" alt="Pablo Assad — Paris" caption="Paris" />
      <RepertoireCta />
      <Contact />
    </>
  );
}
