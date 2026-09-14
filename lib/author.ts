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
  amazon: '', // TODO: Amazon author page
  goodreads: '', // TODO: Goodreads author page
  linkedin: '', // TODO: LinkedIn profile
};

export const authorSameAs = (): string[] =>
  Object.values(AUTHOR_PROFILES).filter(Boolean);

export const AUTHOR = {
  name: 'Sahil Bora',
  url: SITE_URL + '/about',
  jobTitle: 'Author',
  /** ~60 words. Shown under every post and on the about page. */
  bio:
    'Sahil Bora is the author of How to Win at Mathematics, a step-by-step system ' +
    'for students who struggle with math. He writes about math anxiety, study ' +
    'technique, and how to pass the classes that feel impossible. Based in ' +
    'Melbourne, Australia, he has spent years teaching himself hard technical ' +
    'subjects and now helps students do the same.',
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
    description: AUTHOR.bio,
    knowsAbout: AUTHOR.knowsAbout,
    ...(sameAs.length ? { sameAs } : {}),
  };
};
