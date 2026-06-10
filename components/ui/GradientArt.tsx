import clsx from "clsx";
import type { ArtVariant } from "@/lib/data";

const palettes: Record<ArtVariant, string> = {
  amber:
    "radial-gradient(120% 100% at 20% 20%, rgba(216,200,168,0.35) 0%, rgba(216,200,168,0) 55%), radial-gradient(100% 100% at 85% 80%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 50%), linear-gradient(160deg, #1a1714 0%, #0a0908 60%, #050505 100%)",
  violet:
    "radial-gradient(120% 100% at 80% 15%, rgba(165,160,255,0.25) 0%, rgba(165,160,255,0) 55%), radial-gradient(100% 100% at 15% 85%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%), linear-gradient(160deg, #15151a 0%, #0a0a0c 60%, #050505 100%)",
  teal: "radial-gradient(120% 100% at 15% 80%, rgba(150,225,210,0.22) 0%, rgba(150,225,210,0) 55%), radial-gradient(100% 100% at 85% 15%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%), linear-gradient(160deg, #11181a 0%, #090c0c 60%, #050505 100%)",
  rose: "radial-gradient(120% 100% at 80% 80%, rgba(255,190,190,0.2) 0%, rgba(255,190,190,0) 55%), radial-gradient(100% 100% at 20% 20%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%), linear-gradient(160deg, #1a1414 0%, #0a0909 60%, #050505 100%)",
  slate:
    "radial-gradient(120% 100% at 30% 30%, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 55%), linear-gradient(160deg, #16171a 0%, #0a0a0b 60%, #050505 100%)",
  gold: "radial-gradient(120% 100% at 70% 25%, rgba(255,224,170,0.28) 0%, rgba(255,224,170,0) 55%), radial-gradient(100% 100% at 20% 90%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%), linear-gradient(160deg, #1c1813 0%, #0a0908 60%, #050505 100%)",
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
          <div className="h-[140%] w-[140%] rounded-full border border-white/[0.06]" />
          <div className="absolute h-[90%] w-[90%] rounded-full border border-white/[0.05]" />
          <div className="absolute h-[50%] w-[50%] rounded-full border border-white/[0.05]" />
        </div>
      )}
      {pattern === "lines" && (
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(115deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 36px)",
          }}
        />
      )}
      {pattern === "grid" && (
        <div
          className="absolute inset-0 opacity-[0.08]"
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
