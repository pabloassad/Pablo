import type { Metadata } from "next";
import { MusicPageContent } from "@/components/music/MusicPageContent";

export const metadata: Metadata = {
  title: "Music",
  description: "Explore Pablito's productions, mixes and live recordings: a sound gallery across SoundCloud, Spotify and YouTube.",
};

export default function MusicPage() {
  return <MusicPageContent />;
}
