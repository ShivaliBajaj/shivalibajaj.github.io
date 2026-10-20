import { MetadataRoute } from "next";

// Required for Next.js static export (output: "export" in next.config.ts)
export const dynamic = "force-static";

// Sitemap tells Google which pages exist on the site.
// For a single-page portfolio, there's only one URL.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url:             "https://shivalibajaj.github.io",
      lastModified:    new Date(),
      changeFrequency: "monthly",
      priority:        1,
    },
  ];
}