import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://koulant.com",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://koulant.com/career",
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: "https://koulant.com/projects",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://koulant.com/contact",
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
