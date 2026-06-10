import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { Manifesto } from "@/components/home/Manifesto";
import { Duo } from "@/components/home/Duo";
import { CercleBand } from "@/components/home/CercleBand";
import { ListenStrip } from "@/components/home/ListenStrip";
import { FinalCta } from "@/components/home/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Manifesto />
      <Duo />
      <CercleBand />
      <ListenStrip />
      <FinalCta />
    </>
  );
}
