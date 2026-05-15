import { posts } from '@/lib/posts';

const pillarNames: Record<number, string> = {
  1: 'The Math Mindset',
  2: 'Pass Your Math Class',
  3: 'How to Study Math',
  4: "Parent's Math Survival Guide",
};

export default function Home() {
  const pillars = [1, 2, 3, 4] as const;

  return (
    <>
      <section className="home-hero">
        <div className="container">
          <h1>Math Help That Actually Works</h1>
          <p>
            Practical guides for students who struggle with math — and the parents who want to help them.
            No fluff, no tutorials. Real strategies that move grades.
          </p>
          <a href="https://howtowinatmath.com/" className="btn-hero">
            Get the Book — How to Win at Math →
          </a>
        </div>
      </section>

      <div className="pillar-nav">
        <div className="container">
          {pillars.map((p) => (
            <span key={p} className="pillar-tag">
              {pillarNames[p]}
            </span>
          ))}
        </div>
      </div>

      {pillars.map((pillar) => {
        const pillarPosts = posts
          .filter((p) => p.pillar === pillar)
          .sort((a, b) => a.publishOrder - b.publishOrder);
        return (
          <section key={pillar} className="posts-grid-section">
            <div className="container">
              <h2>Pillar {pillar}: {pillarNames[pillar]}</h2>
              <div className="posts-grid">
                {pillarPosts.map((post) => (
                  <a key={post.slug} href={`/blog/${post.slug}`} className="post-card">
                    <span className="post-card-pillar">{post.pillarName}</span>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <span className="post-card-cta">Read the guide →</span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section style={{ background: 'var(--blue)', color: '#fff', padding: '3rem 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'Arial,sans-serif', fontSize: '1.6rem', marginBottom: '.75rem' }}>
            Ready to Stop Struggling With Math?
          </h2>
          <p style={{ opacity: .88, maxWidth: 500, margin: '0 auto 1.5rem', fontFamily: 'Arial,sans-serif' }}>
            <em>How to Win at Math</em> is the complete system — mindset, study strategy, and test performance — for students who have tried everything else.
          </p>
          <a href="https://howtowinatmath.com/" className="btn-hero">Get the Book →</a>
        </div>
      </section>
    </>
  );
}
