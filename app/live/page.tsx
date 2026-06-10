import type { Metadata } from "next";
import { LivePageContent } from "@/components/live/LivePageContent";

export const metadata: Metadata = {
  title: "Live",
  description: "Pablito performs in clubs, festivals and premium private events — adaptive sets, technical mastery and total autonomy.",
};

export default function LivePage() {
  return <LivePageContent />;
}
