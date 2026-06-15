import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // All imagery is local; AVIF/WebP for lighter payloads.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
