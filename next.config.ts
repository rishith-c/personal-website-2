import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      { protocol: "https", hostname: "opengraph.githubassets.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/projects", destination: "/#index", permanent: true },
      { source: "/about", destination: "/#now", permanent: true },
    ];
  },
};

export default nextConfig;
