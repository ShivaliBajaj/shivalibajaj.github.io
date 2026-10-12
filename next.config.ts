import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",        // static export → deploys to GitHub Pages
  basePath: "",            // root domain: shivalibajaj.github.io
  images: {
    unoptimized: true,     // required for static export
  },
};

export default nextConfig;
