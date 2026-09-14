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
          My name is {AUTHOR.name} and I am the creator and author of{' '}
          <a href={BOOK_URL}>{BOOK_NAME}</a>. I wrote the first edition in 2014.
        </p>
        <p>
          I struggled with math through my final years of high school. When I got
          to university and started engineering mathematics, it was obvious the
          study habits I had brought with me were not going to survive the step up.
          So I spent months on that problem directly: buying books and courses on
          how to learn mathematics, and testing what actually worked.
        </p>
        <p>
          It worked. I went from poor results in high school math to outstanding
          marks in high-level university engineering mathematics. The book is the
          method I ended up with. This blog is that same material, broken into free
          articles.
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

        <h2>Contact</h2>
        <p>
          Questions about the book, or something on the blog that is wrong or
          unclear? Email{' '}
          <a href="mailto:sahil@howtowinatmath.com">sahil@howtowinatmath.com</a>.
        </p>
      </article>
    </>
  );
}
