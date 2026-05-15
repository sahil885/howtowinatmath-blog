import { MetadataRoute } from 'next';
import { getAllSlugs } from '@/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getAllSlugs();
  const posts = slugs.map((slug) => ({
    url: `https://blog.howtowinatmath.com/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));
  return [
    { url: 'https://blog.howtowinatmath.com', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    ...posts,
  ];
}
