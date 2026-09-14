import { posts, BOOK_URL, BOOK_NAME } from '@/lib/posts';
import { AUTHOR, SITE_URL } from '@/lib/author';

// Regenerated daily so the file never drifts from the real post list.
export const revalidate = 86400;

const PILLARS: { n: number; name: string; blurb: string }[] = [
  {
    n: 1,
    name: 'The Math Mindset',
    blurb: 'Confidence, math anxiety, and the belief that you can get better at math.',
  },
  {
    n: 2,
    name: 'Pass Your Math Class',
    blurb: 'Passing specific classes: algebra, geometry, precalculus, and what to do when you are failing.',
  },
  {
    n: 3,
    name: 'How to Study Math',
    blurb: 'Study technique, homework, practice, and test preparation.',
  },
  {
    n: 4,
    name: "Parent's Math Survival Guide",
    blurb: 'For parents helping a child who is struggling with math.',
  },
];

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
  out.push(
    '- [' + BOOK_NAME + '](' + BOOK_URL + '): The paid ebook this blog supports. ' +
      'A step-by-step system for students who struggle with math.'
  );
  out.push('');

  for (const pillar of PILLARS) {
    const group = posts
      .filter((p) => p.pillar === pillar.n)
      .slice()
      .sort((a, b) => a.publishOrder - b.publishOrder);
    if (!group.length) continue;

    out.push('## ' + pillar.name);
    out.push('');
    out.push(pillar.blurb);
    out.push('');
    for (const p of group) {
      out.push(
        '- [' + p.title + '](' + SITE_URL + '/blog/' + p.slug + '): ' + p.excerpt
      );
    }
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
