export const SITE_URL = 'https://blog.howtowinatmath.com';
export const BOOK_SALES_URL = 'https://howtowinatmath.com/';

/**
 * Public profiles for the author entity.
 *
 * These feed the schema.org sameAs property, which is how assistants and search
 * engines confirm that the person writing this blog, the person selling the book
 * and the person on Amazon/Goodreads are all the same entity.
 *
 * Empty strings are filtered out, so it is safe to leave one blank until that
 * profile exists. Fill each one in as it goes live.
 */
export const AUTHOR_PROFILES: Record<string, string> = {
  youtube: 'https://www.youtube.com/@HowToWinAtMathematics',
  amazon: 'https://www.amazon.com.au/stores/Sahil-Bora/author/B00JD2GPM8',
  goodreads: '', // intentionally skipped
  linkedin: 'https://www.linkedin.com/in/sahil-bora-0a7b9378/',
};

export const authorSameAs = (): string[] =>
  Object.values(AUTHOR_PROFILES).filter(Boolean);

export const AUTHOR = {
  name: 'Sahil Bora',
  url: SITE_URL + '/about',
  jobTitle: 'Author',
  email: 'sahil@howtowinatmath.com',
  /** ~60 words. Shown under every post and on the about page. */
  bio:
    'Sahil Bora is the author of How to Win at Mathematics, first published in ' +
    '2014. After struggling with math in his final years of high school, he spent ' +
    'months researching how to actually learn it, and went from poor high school ' +
    'results to outstanding marks in university engineering mathematics. He now ' +
    'writes about study method, math anxiety, and passing hard math classes.',
  /** One line, used for bylines. */
  tagline: 'Author of How to Win at Mathematics',
  knowsAbout: [
    'Mathematics education',
    'Math anxiety',
    'Study skills',
    'Algebra',
    'Geometry',
    'Precalculus',
    'Test preparation',
  ],
};

/** schema.org Person for the author. Reused across posts, about page and layout. */
export const personSchema = () => {
  const sameAs = authorSameAs();
  return {
    '@type': 'Person',
    '@id': SITE_URL + '/about#person',
    name: AUTHOR.name,
    url: AUTHOR.url,
    jobTitle: AUTHOR.jobTitle,
    email: AUTHOR.email,
    description: AUTHOR.bio,
    knowsAbout: AUTHOR.knowsAbout,
    ...(sameAs.length ? { sameAs } : {}),
  };
};
