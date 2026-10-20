import { MetadataRoute } from "next";

// Required for Next.js static export (output: "export" in next.config.ts)
export const dynamic = "force-static";

// Robots.ts — tells crawlers what to index.
// Portfolio is fully public — allow everything.
// Sitemap location provided so Google finds it automatically.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow:     "/",
    },
    sitemap: "https://shivalibajaj.github.io/sitemap.xml",
  };
}