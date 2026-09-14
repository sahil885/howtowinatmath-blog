import { MetadataRoute } from 'next';

const SITE_URL = 'https://blog.howtowinatmath.com';

// Crawlers that read pages to answer questions or ground AI assistants.
// Listed explicitly so the permission is unambiguous and survives any future
// change to the default. Getting read by these is the entire point of the site.
const AI_AGENTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'meta-externalagent',
  'DuckAssistBot',
  'Amazonbot',
  'CCBot',
  'cohere-ai',
  'YouBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...AI_AGENTS.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: SITE_URL + '/sitemap.xml',
    host: SITE_URL,
  };
}
