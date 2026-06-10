import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/about", destination: "/", permanent: false },
      { source: "/live", destination: "/projects", permanent: false },
      { source: "/projects/:slug", destination: "/projects", permanent: false },
    ];
  },
};

export default nextConfig;
