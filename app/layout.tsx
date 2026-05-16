import type { Metadata } from 'next';
import './globals.css';

const SITE_URL = 'https://blog.howtowinatmath.com';

export const metadata: Metadata = {
  title: {
    default: 'How to Win at Math Blog — Help for Students Who Struggle',
    template: '%s | How to Win at Math',
  },
  description: 'Practical guides for students and parents dealing with math struggles. Learn how to pass your math class, overcome math anxiety, and build real confidence.',
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: SITE_URL },
  openGraph: {
    siteName: 'How to Win at Math Blog',
    type: 'website',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'How to Win at Math Blog',
  url: SITE_URL,
  description: 'Practical math help guides for struggling students and their parents.',
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'How to Win at Math',
  url: 'https://howtowinatmath.com',
  sameAs: [SITE_URL],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://howtowinatmath.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body>
        <header className="site-header">
          <div className="container">
            <a href="https://howtowinatmath.com/" className="logo" aria-label="How to Win at Math - Home">
              How to Win at Math
            </a>
            <nav aria-label="Main navigation">
              <a href="/">Blog</a>
              <a href="https://howtowinatmath.com/" className="btn-nav">Get the Book</a>
            </nav>
          </div>
        </header>
        <main id="main-content">{children}</main>
        <footer className="site-footer">
          <div className="container">
            <p>
              <strong>How to Win at Math</strong> — The complete system for students who struggle with math.{' '}
              <a href="https://howtowinatmath.com/">Get the book</a>
            </p>
            <nav aria-label="Footer navigation" className="footer-links">
              <a href="/">Blog Home</a>
              {' '}-{' '}
              <a href="https://howtowinatmath.com/">Main Site</a>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
