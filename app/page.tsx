import { VinylLayer } from "@/components/webgl/VinylLayer";
import { Hero } from "@/components/chapters/Hero";
import { Journey } from "@/components/chapters/Journey";
import { Catalogue } from "@/components/chapters/Catalogue";
import { Craft } from "@/components/chapters/Craft";
import { Tools } from "@/components/chapters/Tools";
import { Contact } from "@/components/chapters/Contact";

export default function Home() {
  return (
    <>
      <VinylLayer />
      <Hero />
      <Journey />
      <Catalogue />
      <Craft />
      <Tools />
      <Contact />
    </>
  );
}
