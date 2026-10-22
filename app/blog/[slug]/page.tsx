import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPostBySlug, getAllSlugs, getPostsByPillar, BOOK_URL, BOOK_NAME, ContentBlock, type Audience } from '@/lib/posts';
import { AUTHOR, personSchema } from '@/lib/author';

const SITE_URL = 'https://blog.howtowinatmath.com';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

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

const CTA: Record<Audience, { mid: [string, string]; end: [string, string] }> = {
  parents: {
    mid: ['Buying this for your son or daughter?', `${BOOK_NAME} gives your teen a step-by-step system for mindset, study method and test day, so math stops being a nightly fight. It is a $5 ebook, risk-free for 30 days.`],
    end: ['Give your teen a system instead of another lecture.', `${BOOK_NAME} turns advice like this guide into a plan your teen can follow on their own.`],
  },
  'senior-high': {
    mid: ['Studying hard and still failing tests?', `${BOOK_NAME} is the study and test system Sahil Bora built after struggling with math in his final years of high school. It is a $5 ebook, risk-free for 30 days.`],
    end: ['Your next test is a chance to start over.', `${BOOK_NAME} gives you the mindset, study method and test strategy to make it count.`],
  },
  university: {
    mid: ['From poor high school results to top marks in university engineering maths.', `${BOOK_NAME} is the system Sahil Bora used to make that jump: mindset, study method and exam strategy in one plan. It is a $5 ebook, risk-free for 30 days.`],
    end: ['College math rewards a system, not more hours.', `${BOOK_NAME} shows you how to study, practice and sit exams in courses that move fast.`],
  },
  all: {
    mid: ['Tired of math tips that do not stick?', `${BOOK_NAME} is a complete system for mindset, study method and test strategy, written for students who feel math just is not for them. It is a $5 ebook, risk-free for 30 days.`],
    end: ['The fastest way to stop struggling is a system built for people like you.', `${BOOK_NAME} puts mindset, study method and test strategy into one plan you can start tonight.`],
  },
};

const HUB_LINK: Partial<Record<Audience, [string, string]>> = {
  parents: ['/for-parents', 'More guides for parents'],
  'senior-high': ['/for-high-school-students', 'More guides for high school students'],
  university: ['/for-college-students', 'More guides for college students'],
};

function CtaMid({ audience }: { audience: Audience }) {
  const [title, text] = CTA[audience].mid;
  return (
    <div className="cta-box">
      <strong>{title}</strong>
      <p>{text}</p>
      <a href={BOOK_URL} className="btn-cta">Get the $5 ebook</a>
    </div>
  );
}

function CtaEnd({ audience }: { audience: Audience }) {
  const [title, text] = CTA[audience].end;
  return (
    <div className="cta-box cta-end">
      <strong>{title}</strong>
      <p>{text}</p>
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

function renderBlock(block: ContentBlock, index: number, audience: Audience) {
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
      return <CtaMid key={index} audience={audience} />;
    case 'cta-end':
      return <CtaEnd key={index} audience={audience} />;
    case 'callout':
      return (
        <div key={index} className="callout-box">
          <div className="callout-title">{block.title}</div>
          <RichText text={block.text} />
        </div>
      );
    case 'table':
      return (
        <div key={index} className="table-wrap">
          <table className="comparison-table">
            {block.caption && <caption>{block.caption}</caption>}
            <thead>
              <tr>
                {block.headers.map((h, i) => (
                  <th key={i} scope="col">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, c) =>
                    c === 0 ? (
                      <th key={c} scope="row" dangerouslySetInnerHTML={{ __html: cell }} />
                    ) : (
                      <td key={c} dangerouslySetInnerHTML={{ __html: cell }} />
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'video':
      return (
        <figure key={index} className="video-embed">
          <div className="video-frame">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${block.id}`}
              title={block.title}
              loading="lazy"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <figcaption>{block.caption ?? `Video: ${block.title}`}</figcaption>
        </figure>
      );
    default:
      return null;
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const audience: Audience = post.audience ?? 'all';
  const hubLink = HUB_LINK[audience];

  const related = getPostsByPillar(post.pillar)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const url = `${SITE_URL}/blog/${slug}`;
  const datePublished = post.publishedAt ?? '2026-05-15T00:00:00Z';
  const dateModified = post.updatedAt ?? datePublished;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    url,
    datePublished,
    dateModified,
    author: personSchema(),
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

  // Ranked/ordered lists are emitted as ItemList so assistants can read the
  // ranking as structured data rather than inferring it from headings.
  const orderedBlock = post.content.find((b) => b.type === 'ol');
  const rankedItems =
    post.ranking && post.ranking.length > 1
      ? post.ranking
      : orderedBlock && 'items' in orderedBlock && orderedBlock.items.length > 1
        ? orderedBlock.items
        : null;
  const itemListSchema =
    rankedItems
      ? {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: post.title,
          description: post.metaDescription,
          itemListOrder: 'https://schema.org/ItemListOrderAscending',
          numberOfItems: rankedItems.length,
          itemListElement: rankedItems.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.replace(/<[^>]+>/g, ''),
          })),
        }
      : null;

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
      {itemListSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      )}
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
          <p className="article-byline">
            By <a href="/about" rel="author">{AUTHOR.name}</a>
            {' \u00b7 '}
            <time dateTime={datePublished}>{formatDate(datePublished)}</time>
            {dateModified.slice(0, 10) !== datePublished.slice(0, 10) && (
              <>{' \u00b7 Updated '}<time dateTime={dateModified}>{formatDate(dateModified)}</time></>
            )}
          </p>
          {hubLink && (
            <p className="article-audience">
              <a href={hubLink[0]}>{hubLink[1]} →</a>
            </p>
          )}
        </div>
      </div>

      <article className="article-body" itemScope itemType="https://schema.org/Article">
        <meta itemProp="headline" content={post.title} />
        <meta itemProp="description" content={post.metaDescription} />
        <div itemProp="articleBody">
          {post.content.map((block, i) => renderBlock(block, i, audience))}
        </div>

        {post.faq && post.faq.length > 0 && (
          <div className="faq-section">
            <h2>Frequently Asked Questions</h2>
            {post.faq.map(({ q, a }, i) => (
              <div key={i} className="faq-item">
                <h3>{q}</h3>
                <p>{a}</p>
              </div>
            ))}
          </div>
        )}

        <aside className="author-bio">

          <h2>About the author</h2>

          <p>

            <strong>{AUTHOR.name}</strong> — {AUTHOR.tagline}

          </p>

          <p>{AUTHOR.bio}</p>

          <p>

            <a href="/about">More about {AUTHOR.name}</a>

          </p>

        </aside>


        {related.length > 0 && (
          <div className="related-posts">
            <h2>More From {post.pillarName}</h2>
            <div className="related-grid">
              {related.map((r) => (
                <a key={r.slug} href={`/blog/${r.slug}`} className="related-card">
                  <h3>{r.title}</h3>
                  <p>{r.excerpt}</p>
                </a>
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  );
}
