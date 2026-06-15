import { Hero } from "@/components/chapters/Hero";
import { Manifesto } from "@/components/chapters/Manifesto";
import { Method } from "@/components/chapters/Method";
import { Work } from "@/components/chapters/Work";
import { Craft } from "@/components/chapters/Craft";
import { Path } from "@/components/chapters/Path";
import { Contact } from "@/components/chapters/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Method />
      <Work />
      <Craft />
      <Path />
      <Contact />
    </>
  );
}
