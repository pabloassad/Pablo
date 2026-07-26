import type { Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import "./converter.css";

// 8-bit display face for titles and key labels; VT323 is the readable
// terminal monospace used for everything longer than a word.
const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-terminal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CONVERT",
  robots: { index: false, follow: false },
};

export default function ConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${pressStart.variable} ${vt323.variable}`}>{children}</div>
  );
}
