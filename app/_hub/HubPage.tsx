import type { Metadata } from 'next';
import { getPostBySlug, BOOK_URL } from '@/lib/posts';
import { HUBS, type HubKey } from '@/lib/hubs';
import { SITE_URL } from '@/lib/author';

export function hubMetadata(key: HubKey): Metadata {
  const h = HUBS[key];
  const url = `${SITE_URL}/${h.path}`;
  return {
    title: { absolute: h.metaTitle },
    description: h.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: h.metaTitle, description: h.metaDescription, url, type: 'website', siteName: 'How to Win at Math Blog' },
  };
}

function PostCard({ slug }: { slug: string }) {
  const p = getPostBySlug(slug);
  if (!p) return null;
  return (
    <a href={`/blog/${p.slug}`} className="post-card">
      <h3>{p.title}</h3>
      <p>{p.excerpt}</p>
      <span className="post-card-cta">Read the guide →</span>
    </a>
  );
}

export default function HubPage({ hub }: { hub: HubKey }) {
  const h = HUBS[hub];
  const url = `${SITE_URL}/${h.path}`;
  const slugs = Array.from(new Set([...h.startHere, ...h.sections.flatMap((s) => s.slugs)])).filter((s) => getPostBySlug(s));
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': url,
        url,
        name: h.h1,
        description: h.metaDescription,
        about: { '@id': `${BOOK_URL}#book` },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: slugs.map((s, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE_URL}/blog/${s}`, name: getPostBySlug(s)?.title })),
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: h.faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Blog', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: h.h1, item: url },
        ],
      },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="home-hero">
        <div className="container">
          <h1>{h.h1}</h1>
          {h.intro.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </section>
      <section className="posts-grid-section">
        <div className="container">
          <h2>Start here</h2>
          <div className="posts-grid">{h.startHere.map((s) => <PostCard key={s} slug={s} />)}</div>
        </div>
      </section>
      {h.sections.map((sec) => (
        <section key={sec.heading} className="posts-grid-section">
          <div className="container">
            <h2>{sec.heading}</h2>
            <div className="posts-grid">{sec.slugs.map((s) => <PostCard key={s} slug={s} />)}</div>
          </div>
        </section>
      ))}
      <section className="posts-grid-section">
        <div className="container article-body">
          <div className="cta-box">
            <strong>{h.pitch[0]}</strong>
            <p>{h.pitch[1]}</p>
            <a href={BOOK_URL} className="btn-cta">Get the $5 ebook</a>
          </div>
          <div className="faq-section">
            <h2>Frequently Asked Questions</h2>
            {h.faq.map(({ q, a }, i) => (
              <div key={i} className="faq-item">
                <h3>{q}</h3>
                <p>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
