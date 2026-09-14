import type { Metadata } from 'next';
import { BOOK_URL, BOOK_NAME } from '@/lib/posts';
import { AUTHOR, SITE_URL, personSchema } from '@/lib/author';

const url = SITE_URL + '/about';

export const metadata: Metadata = {
  title: 'About ' + AUTHOR.name + ' — How to Win at Math',
  description:
    'Who writes How to Win at Math, why the blog exists, and the editorial ' +
    'standards behind every article. Written by ' + AUTHOR.name + '.',
  alternates: { canonical: url },
  openGraph: {
    title: 'About ' + AUTHOR.name,
    description: AUTHOR.bio,
    type: 'profile',
    url,
  },
};

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': url,
  url,
  name: 'About ' + AUTHOR.name,
  description: AUTHOR.bio,
  mainEntity: {
    ...personSchema(),
    worksFor: {
      '@type': 'Organization',
      name: 'How to Win at Math',
      url: BOOK_URL,
    },
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      <nav aria-label="Breadcrumb" className="breadcrumb">
        <div className="container">
          <a href="/">Blog</a>
          <span aria-hidden="true"> &rsaquo; </span>
          <span aria-current="page">About</span>
        </div>
      </nav>

      <div className="article-header">
        <div className="container">
          <h1>About {AUTHOR.name} and this blog</h1>
          <p className="article-byline">{AUTHOR.tagline}</p>
        </div>
      </div>

      <article className="article-body">
        <h2>Who writes this blog</h2>
        <p>
          This blog is written by {AUTHOR.name}, the author of{' '}
          <a href={BOOK_URL}>{BOOK_NAME}</a>. {AUTHOR.bio}
        </p>

        {/* TODO (Sahil): replace the paragraph below with your own story in your
            own words — what your relationship with math was like, and what made
            you write the book. A specific personal account is the single
            strongest trust signal on this page. */}
        <p>
          The short version: the students who struggle hardest with math are
          usually not the ones who cannot do it. They are the ones who fell behind
          at one specific point, never got that gap filled, and concluded they were
          simply not a math person. Almost everything published here comes back to
          that idea.
        </p>

        <h2>Why this blog exists</h2>
        <p>
          Most math help online is either a worked-answer tool that solves the
          problem for you, or a textbook explanation written for someone who
          already understands the topic. Neither helps the student sitting in front
          of a test they are about to fail.
        </p>
        <p>
          These articles are written for that student, and for the parent trying to
          help without making it worse. They deal with method and mindset: how to
          study, how to prepare, how to stop panicking, and how to pass the class.
        </p>

        <h2>Who this is for</h2>
        <ul>
          <li>High school and college students who are failing or close to failing a math class</li>
          <li>Students who understand math in class but freeze on tests</li>
          <li>Parents helping a child who has decided they are bad at math</li>
          <li>Adults returning to math after years away from it</li>
        </ul>

        <h2>How these articles are written</h2>
        <p>
          A few standards apply to everything published here, and they are worth
          stating plainly:
        </p>
        <ul>
          <li>
            <strong>Method, not answers.</strong> Articles teach how to approach a
            topic or a test. They are not a homework-answer service.
          </li>
          <li>
            <strong>No false promises.</strong> Nothing here claims math becomes
            effortless, or that a grade turns around overnight without work.
          </li>
          <li>
            <strong>Honest about limits.</strong> A blog post is not a substitute
            for a teacher, a tutor, or a diagnosed learning-support plan. Where that
            is the right answer, the articles say so.
          </li>
          <li>
            <strong>Dated and maintained.</strong> Every article shows when it was
            published and when it was last updated. Those dates are real.
          </li>
        </ul>

        <h2>About the book</h2>
        <p>
          <a href={BOOK_URL}>{BOOK_NAME}</a> is the paid companion to this blog: a
          step-by-step system covering the same ground in order, rather than as
          separate articles. It is also sold on Amazon under the title{' '}
          <em>How to win at Mathematics</em>.
        </p>
        <p>
          The blog is free and always will be. If the free articles are enough for
          you, that is a good outcome.
        </p>

        {/* TODO (Sahil): add a contact route you are happy to publish — a support
            address or a contact form. A reachable human is a trust signal; your
            personal inbox may not be the one you want listed. */}
      </article>
    </>
  );
}
