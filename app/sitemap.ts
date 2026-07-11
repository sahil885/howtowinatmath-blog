import type { MetadataRoute } from 'next'
import { posts } from '@/lib/posts'

const BASE_URL = 'https://blog.howtowinatmath.com'

// Baseline content-audit date. Bump this on any site-wide content change
// (like the encoding fix) to nudge search engines to re-crawl. For a single
// post, set its own `updatedAt` in lib/posts.ts and it takes precedence.
const SITE_CONTENT_UPDATED = new Date('2026-07-11T00:00:00Z')

// Regenerate at most once a day so new posts appear and lastmod stays fresh
// between full redeploys.
export const revalidate = 86400

export default function sitemap(): MetadataRoute.Sitemap {
  const homepage = {
    url: BASE_URL,
    lastModified: SITE_CONTENT_UPDATED,
    changeFrequency: 'weekly' as const,
    priority: 1,
  }

  const blogPosts = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : SITE_CONTENT_UPDATED,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [homepage, ...blogPosts]
}
