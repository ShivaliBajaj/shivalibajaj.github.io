import { MetadataRoute } from "next";

// Robots.ts — tells crawlers what to index.
// Portfolio is fully public — allow everything.
// Sitemap location provided so Google finds it automatically.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",   // applies to ALL crawlers (Google, Bing, etc.)
      allow:     "/",   // allow entire site
    },
    sitemap: "https://shivalibajaj.github.io/sitemap.xml",
  };
}