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
      source: '/blog/stop-being-bad-at-math',
      destination: '/blog/why-am-i-so-bad-at-math',
      permanent: true,
    },
    {
      source: '/blog/youre-not-a-math-person-myth',
      destination: '/blog/why-am-i-so-bad-at-math',
      permanent: true,
    },
    {
      source: '/blog/math-anxiety-adults',
      destination: '/blog/how-to-overcome-math-anxiety',
      permanent: true,
    },
    {
      source: '/blog/how-to-build-confidence-in-math',
      destination: '/blog/how-to-overcome-math-anxiety',
      permanent: true,
    },
    {
      source: '/blog/back-to-school-math-anxiety',
      destination: '/blog/signs-child-has-math-anxiety',
      permanent: true,
    },
    {
      source: '/blog/how-to-not-fail-math',
      destination: '/blog/what-to-do-when-failing-math-class',
      permanent: true,
    },
    {
      source: '/blog/how-to-pass-summer-school-math',
      destination: '/blog/what-to-do-when-failing-math-class',
      permanent: true,
    },
    {
      source: '/blog/understand-math-in-class-fail-tests',
      destination: '/blog/how-to-stop-failing-math-tests',
      permanent: true,
    },
    {
      source: '/blog/real-reason-you-freeze-on-math-tests',
      destination: '/blog/how-to-stop-failing-math-tests',
      permanent: true,
    },
    {
      source: '/blog/how-to-pass-math-test-without-studying',
      destination: '/blog/how-to-pass-math-exam-last-minute',
      permanent: true,
    },
    {
      source: '/blog/why-cramming-doesnt-work-for-math',
      destination: '/blog/how-to-pass-math-exam-last-minute',
      permanent: true,
    },
    {
      source: '/blog/how-to-study-for-math-test',
      destination: '/blog/how-to-prepare-for-math-final-exam',
      permanent: true,
    },
    {
      source: '/blog/how-to-raise-math-grade-fast',
      destination: '/blog/how-to-get-better-at-math-fast',
      permanent: true,
    },
    {
      source: '/blog/help-child-math-homework',
      destination: '/blog/how-to-help-child-with-math',
      permanent: true,
    },
    {
      source: '/blog/why-is-precalculus-so-hard',
      destination: '/blog/how-to-pass-precalculus',
      permanent: true,
    },
    {
      source: '/blog/how-to-prepare-for-calculus',
      destination: '/blog/how-to-pass-calculus',
      permanent: true,
    },
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
