import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
   transpilePackages: ["lenis"],
};

export default nextConfig;