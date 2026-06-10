import clsx from "clsx";
import type { ArtVariant } from "@/lib/data";

const palettes: Record<ArtVariant, string> = {
  amber:
    "radial-gradient(120% 100% at 20% 20%, rgba(216,180,130,0.7) 0%, rgba(190,140,90,0.25) 45%, rgba(216,200,168,0) 70%), radial-gradient(100% 100% at 85% 80%, rgba(255,170,110,0.35) 0%, rgba(255,255,255,0) 55%), linear-gradient(160deg, #3a2c1e 0%, #1d1410 55%, #0a0807 100%)",
  violet:
    "radial-gradient(120% 100% at 80% 15%, rgba(165,160,255,0.55) 0%, rgba(165,160,255,0) 60%), radial-gradient(100% 100% at 15% 85%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 55%), linear-gradient(160deg, #28283a 0%, #141420 55%, #08080c 100%)",
  teal: "radial-gradient(120% 100% at 15% 80%, rgba(150,225,210,0.5) 0%, rgba(150,225,210,0) 60%), radial-gradient(100% 100% at 85% 15%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 55%), linear-gradient(160deg, #1c3234 0%, #0e1a1b 55%, #070b0b 100%)",
  rose: "radial-gradient(120% 100% at 80% 80%, rgba(255,170,170,0.5) 0%, rgba(255,190,190,0) 60%), radial-gradient(100% 100% at 20% 20%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 55%), linear-gradient(160deg, #3a2222 0%, #1d1111 55%, #0b0707 100%)",
  slate:
    "radial-gradient(120% 100% at 30% 30%, rgba(200,210,230,0.35) 0%, rgba(255,255,255,0) 60%), radial-gradient(100% 100% at 80% 85%, rgba(150,160,190,0.25) 0%, rgba(255,255,255,0) 55%), linear-gradient(160deg, #262a33 0%, #14161c 55%, #08090b 100%)",
  gold: "radial-gradient(120% 100% at 70% 25%, rgba(255,214,150,0.6) 0%, rgba(255,224,170,0) 60%), radial-gradient(100% 100% at 20% 90%, rgba(255,240,210,0.25) 0%, rgba(255,255,255,0) 55%), linear-gradient(160deg, #3c2f1c 0%, #1e170f 55%, #0a0907 100%)",
};

export function GradientArt({
  variant = "slate",
  className,
  pattern = "circle",
}: {
  variant?: ArtVariant;
  className?: string;
  pattern?: "circle" | "lines" | "grid";
}) {
  return (
    <div
      className={clsx("relative overflow-hidden", className)}
      style={{ background: palettes[variant] }}
    >
      {pattern === "circle" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-[140%] w-[140%] rounded-full border border-white/[0.1]" />
          <div className="absolute h-[90%] w-[90%] rounded-full border border-white/[0.09]" />
          <div className="absolute h-[50%] w-[50%] rounded-full border border-white/[0.09]" />
        </div>
      )}
      {pattern === "lines" && (
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "repeating-linear-gradient(115deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 1px, transparent 1px, transparent 36px)",
          }}
        />
      )}
      {pattern === "grid" && (
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      )}
      <div className="absolute inset-0 grain opacity-[0.05]" style={{ position: "absolute" }} />
    </div>
  );
}
