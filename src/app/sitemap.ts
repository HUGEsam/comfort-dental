import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://comfortdentalsurgery.com',
      lastModified: new Date('2026-11-14'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://comfortdentalsurgery.com/socials',
      lastModified: new Date('2026-11-14'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];
}
