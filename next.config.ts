import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages
  output: "export",

  // GitHub Pages serves at /repo-name — for user pages (shivalibajaj.github.io) it's just /
  basePath: "",

  // Required for static export — disables server-side image optimization
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
