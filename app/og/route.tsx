import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/posts';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const post = slug ? getPostBySlug(slug) : null;

  const title = post?.metaTitle ?? post?.title ?? 'How to Win at Math Blog';
  const pillarName = post?.pillarName ?? 'Practical Math Help for Struggling Students';

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          background: 'linear-gradient(135deg, #1a3a6b 0%, #0d2144 100%)',
          padding: '60px',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        {/* Top accent bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: '#f0a500', display: 'flex' }} />

        {/* Site brand top-left */}
        <div style={{ position: 'absolute', top: '40px', left: '60px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ fontSize: '22px', color: '#f0a500', fontWeight: 'bold', display: 'flex' }}>
            How to Win at Math
          </div>
        </div>

        {/* Pillar tag */}
        <div style={{
          display: 'flex',
          backgroundColor: 'rgba(240,165,0,0.15)',
          border: '1px solid rgba(240,165,0,0.4)',
          borderRadius: '6px',
          padding: '8px 16px',
          marginBottom: '24px',
          width: 'fit-content',
        }}>
          <span style={{ color: '#f0a500', fontSize: '16px', fontWeight: 'bold', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'flex' }}>
            {pillarName}
          </span>
        </div>

        {/* Title */}
        <div style={{
          fontSize: title.length > 60 ? '44px' : '52px',
          fontWeight: 'bold',
          color: '#ffffff',
          lineHeight: 1.2,
          marginBottom: '32px',
          display: 'flex',
          flexWrap: 'wrap',
        }}>
          {title}
        </div>

        {/* Bottom row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', display: 'flex' }}>
            blog.howtowinatmath.com
          </div>
          <div style={{
            backgroundColor: '#f0a500',
            color: '#1a1a1a',
            fontSize: '18px',
            fontWeight: 'bold',
            padding: '12px 24px',
            borderRadius: '8px',
            display: 'flex',
          }}>
            Get the Book →
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
