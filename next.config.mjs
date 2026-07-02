/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,

  headers: async () => [
    {
      source: '/_next/static/(.*)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
    {
      source: '/blog/(.*)',
      headers: [
        { key: 'Cache-Control', value: 'public, s-maxage=3600, stale-while-revalidate=86400' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ],
    },
    {
      source: '/',
      headers: [
        { key: 'Cache-Control', value: 'public, s-maxage=600, stale-while-revalidate=3600' },
      ],
    },
  ],

  redirects: async () => [
    {
      source: '/blog',
      destination: '/',
      permanent: true,
    },
    {
      source: '/blog/why-youre-not-bad-at-math',
      destination: '/blog/why-am-i-so-bad-at-math',
      permanent: true,
    },
    {
      source: '/blog/how-to-catch-up-in-math-after-falling-behind',
      destination: '/blog/how-to-catch-up-in-math',
      permanent: true,
    },
  ],
};

export default nextConfig;
