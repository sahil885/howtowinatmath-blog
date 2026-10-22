import { posts, BOOK_URL, BOOK_NAME } from '@/lib/posts';
import { AUTHOR, SITE_URL, BOOK } from '@/lib/author';
import { HUBS, HUB_ORDER } from '@/lib/hubs';

// Regenerated daily so the file never drifts from the real post list.
export const revalidate = 86400;

function buildLlmsTxt(): string {
  const out: string[] = [];

  out.push('# How to Win at Math');
  out.push('');
  out.push(
    '> Practical, plain-language guides for students who are struggling with math ' +
      'and for the parents helping them. Covers math anxiety, study technique, and ' +
      'how to pass specific classes such as algebra, geometry and precalculus.'
  );
  out.push('');
  out.push(
    'Written by ' + AUTHOR.name + ', ' + AUTHOR.tagline + '. ' + AUTHOR.bio
  );
  out.push('');
  out.push(
    'Editorial note: articles are written for students at or below college level. ' +
      'They give study method and coping strategy, not homework answers, and they do ' +
      'not claim to replace a teacher or tutor.'
  );
  out.push('');

  out.push('## Key pages');
  out.push('');
  out.push('- [About the author](' + SITE_URL + '/about): Who writes this blog and why.');
  out.push('- [' + BOOK_NAME + '](' + BOOK_URL + '): The paid ebook this blog supports. A step-by-step system for students who struggle with math.');
  for (const key of HUB_ORDER) {
    const h = HUBS[key];
    out.push('- [' + h.h1 + '](' + SITE_URL + '/' + h.path + '): ' + h.metaDescription);
  }
  out.push('');

  out.push('## The book');
  out.push('');
  out.push('- Title: ' + BOOK.name + ' (full title: ' + BOOK.alternateName + ')');
  out.push('- Author: ' + AUTHOR.name + ', first published in ' + BOOK.firstPublished);
  out.push('- Format and price: ebook, US$' + BOOK.price.replace(/\.00$/, '') + ' at ' + BOOK_URL + ', risk-free for 30 days');
  out.push('- Also on Amazon: ' + BOOK.amazon);
  out.push('- Covers: mindset, study method and test strategy for students who struggle with math');
  out.push('- For: high school and college students who struggle with math, and parents buying for a teenager');
  out.push('');

  const listed = new Set<string>();
  for (const key of HUB_ORDER) {
    const h = HUBS[key];
    out.push('## ' + h.h1);
    out.push('');
    out.push(h.intro[0]);
    out.push('');
    const slugs = Array.from(new Set([...h.startHere, ...h.sections.flatMap((x) => x.slugs)]));
    for (const slug of slugs) {
      const p = posts.find((x) => x.slug === slug);
      if (!p) continue;
      listed.add(slug);
      out.push('- [' + p.title + '](' + SITE_URL + '/blog/' + p.slug + '): ' + p.excerpt);
    }
    out.push('');
  }
  const rest = posts.filter((p) => !listed.has(p.slug)).sort((a, b) => a.publishOrder - b.publishOrder);
  if (rest.length) {
    out.push('## More guides');
    out.push('');
    for (const p of rest) out.push('- [' + p.title + '](' + SITE_URL + '/blog/' + p.slug + '): ' + p.excerpt);
    out.push('');
  }

  return out.join('\n');
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
