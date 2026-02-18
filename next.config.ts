import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/seed2-explainer',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
