import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF renders sharper than WebP at the same file size; WebP is the fallback.
    formats: ["image/avif", "image/webp"],
    // Next 16 defaults the allowlist to [75]; permit high-quality output.
    // 90 is visually indistinguishable from 100 for photography at a fraction
    // of the weight, so it's the app-wide default (see ArtImage).
    qualities: [75, 90, 100],
  },
  async redirects() {
    return [
      { source: "/about", destination: "/", permanent: false },
      { source: "/live", destination: "/projects", permanent: false },
      { source: "/projects/:slug", destination: "/projects", permanent: false },
    ];
  },
};

export default nextConfig;
