import { MetadataRoute } from "next";

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
