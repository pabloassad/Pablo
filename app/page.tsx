import { Hero } from "@/components/chapters/Hero";
import { About } from "@/components/chapters/About";
import { Journey } from "@/components/chapters/Journey";
import { Craft } from "@/components/chapters/Craft";
import { RepertoireCta } from "@/components/chapters/RepertoireCta";
import { Contact } from "@/components/chapters/Contact";
import { Outro } from "@/components/chapters/Outro";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Journey />
      <Craft />
      <RepertoireCta />
      <Contact />
      <Outro />
    </>
  );
}
