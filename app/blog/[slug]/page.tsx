import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPostBySlug, getAllSlugs, getPostsByPillar, BOOK_URL, BOOK_NAME, ContentBlock } from '@/lib/posts';

const SITE_URL = 'https://blog.howtowinatmath.com';

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const url = `${SITE_URL}/blog/${slug}`;
  const ogImageUrl = `${SITE_URL}/og?slug=${slug}`;
  const displayTitle = post.metaTitle ?? post.title;
  return {
    title: displayTitle,
    description: post.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: displayTitle,
      description: post.metaDescription,
      type: 'article',
      url,
      siteName: 'How to Win at Math Blog',
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: displayTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: displayTitle,
      description: post.metaDescription,
      images: [ogImageUrl],
    },
  };
}

function CtaMid() {
  return (
    <div className="cta-box">
      <strong>Struggling with math and tired of tips that don&rsquo;t stick?</strong>
      <p>
        <em>{BOOK_NAME}</em> is the complete system — mindset, study approach, and test strategy — built specifically for students who feel like math just isn&rsquo;t for them. Thousands of students have used it to go from failing to passing.
      </p>
      <a href={BOOK_URL} className="btn-cta">Get the Book</a>
    </div>
  );
}

function CtaEnd() {
  return (
    <div className="cta-box cta-end">
      <strong>The fastest way to stop struggling is to use a system built for people like you.</strong>
      <p>
        <em>{BOOK_NAME}</em> was written for students who&rsquo;ve tried everything and still can&rsquo;t make math click. It&rsquo;s the system thousands of students wish they had sooner.
      </p>
      <a href={BOOK_URL} className="btn-cta">Get Your Copy at HowToWinAtMath.com</a>
    </div>
  );
}

function RichText({ text }: { text: string }) {
  if (text.includes('<a ')) {
    return <p dangerouslySetInnerHTML={{ __html: text }} />;
  }
  return <p>{text}</p>;
}

function renderBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case 'p':
      return <RichText key={index} text={block.text} />;
    case 'h2':
      return <h2 key={index}>{block.text}</h2>;
    case 'h3':
      return <h3 key={index}>{block.text}</h3>;
    case 'ul':
      return (
        <ul key={index}>
          {block.items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      );
    case 'ol':
      return (
        <ol key={index}>
          {block.items.map((item, i) => <li key={i}>{item}</li>)}
        </ol>
      );
    case 'cta-mid':
      return <CtaMid key={index} />;
    case 'cta-end':
      return <CtaEnd key={index} />;
    case 'callout':
      return (
        <div key={index} className="callout-box">
          <div className="callout-title">{block.title}</div>
          <RichText text={block.text} />
        </div>
      );
    default:
      return null;
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getPostsByPillar(post.pillar)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const url = `${SITE_URL}/blog/${slug}`;
  const datePublished = '2025-01-01T00:00:00Z';
  const dateModified = new Date().toISOString();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    url,
    datePublished,
    dateModified,
    author: {
      '@type': 'Organization',
      name: 'How to Win at Math',
      url: 'https://howtowinatmath.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'How to Win at Math',
      url: 'https://howtowinatmath.com',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    image: `${SITE_URL}/og?slug=${slug}`,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Blog', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: post.pillarName, item: `${SITE_URL}/#pillar-${post.pillar}` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  };

  const faqSchema = post.faq && post.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <nav aria-label="Breadcrumb" className="breadcrumb">
        <div className="container">
          <a href="/">Blog</a>
          <span aria-hidden="true"> &rsaquo; </span>
          <a href={`/#pillar-${post.pillar}`}>{post.pillarName}</a>
          <span aria-hidden="true"> &rsaquo; </span>
          <span aria-current="page">{post.title}</span>
        </div>
      </nav>

      <div className="article-header">
        <div className="container">
          <span className="article-pillar-tag">Pillar {post.pillar}: {post.pillarName}</span>
          <h1>{post.title}</h1>
        </div>
      </div>

      <article className="article-body" itemScope itemType="https://schema.org/Article">
        <meta itemProp="headline" content={post.title} />
        <meta itemProp="description" content={post.metaDescription} />
        <div itemProp="articleBody">
          {post.content.map((block, i) => renderBlock(block, i))}
        </div>

        {post.faq && post.faq.length > 0 && (
          <div 