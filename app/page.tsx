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
        src="/portrait/studio-01.webp"
        alt="Pablo Assad — en studio"
        caption="Studio · Paris"
        focal="54% 32%"
      />
      <RepertoireCta />
      <Contact />
    </>
  );
}
