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
  return {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: 'article',
      url,
      siteName: 'How to Win at Math Blog',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription,
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
      <a href={BOOK_URL} className="btn-cta">Get the Book →</a>
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
      <a href={BOOK_URL} className="btn-cta">Get Your Copy at HowToWinAtMath.com →</a>
    </div>
  );
}

// Renders paragraph text that may contain HTML anchor tags from our interlinks
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

  // JSON-LD: Article schema
  const articleSchema = {
    '@context': 'https://schema.org',
