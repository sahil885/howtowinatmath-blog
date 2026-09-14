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

// Each URL gets its own honest lastmod: the date the post was last meaningfully
// edited, falling back to its real first-publish date. Never a blanket site date.
const postDate = (post: { updatedAt?: string; publishedAt?: string }) =>
  new Date(post.updatedAt ?? post.publishedAt ?? SITE_CONTENT_UPDATED.toISOString())

export default function sitemap(): MetadataRoute.Sitemap {
  // Homepage lastmod tracks the newest post rather than a hand-bumped constant.
  const newestPost = posts.reduce(
    (acc, p) => (postDate(p) > acc ? postDate(p) : acc),
    new Date(0)
  )

  const homepage = {
    url: BASE_URL,
    lastModified: newestPost,
    changeFrequency: 'weekly' as const,
    priority: 1,
  }

  const blogPosts = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: postDate(post),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const about = {
    url: `${BASE_URL}/about`,
    lastModified: newestPost,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }

  return [homepage, about, ...blogPosts]
}
