import { ImageResponse } from 'next/og';
import { BLOG_POSTS } from '@/lib/blog-data';
 
export const runtime = 'edge';
 
export const alt = 'BodyBio Hacker Blog Analysis';
export const size = {
  width: 1200,
  height: 630,
};
 
export const contentType = 'image/png';
 
export default async function Image({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  const title = post?.title || 'Supplement Intelligence';
  const category = post?.category || 'ANALYSIS';

  return new ImageResponse(
    (
      <div
        style={{
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          fontFamily: 'sans-serif',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Decorative Grid */}
        <div
            style={{
                position: 'absolute',
                top: 0, 
                right: 0,
                width: '400px',
                height: '100%',
                background: 'linear-gradient(90deg, transparent 0%, rgba(0,255,65,0.05) 100%)',
                display: 'flex', // Crucial for valid flexbox in OG
            }}
        />

        {/* Top Label */}
        <div style={{
            background: '#00ff41',
            color: 'black',
            padding: '10px 20px',
            fontSize: 24,
            fontWeight: 'bold',
            borderRadius: 4,
            textTransform: 'uppercase',
            letterSpacing: '2px',
        }}>
           {category}
        </div>

        {/* Title */}
        <div style={{
            fontSize: 80,
            fontWeight: 800,
            color: 'white',
            lineHeight: 1.1,
            maxWidth: '900px',
            // textShadow: '0 0 40px rgba(255,255,255,0.2)', // Text shadow can be expensive/glitchy in OG
        }}>
            {title}
        </div>

        {/* Footer */}
        <div style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            borderTop: '2px solid rgba(255,255,255,0.1)',
            paddingTop: '40px',
        }}>
            <div style={{
                width: '40px',
                height: '40px',
                background: '#00ff41',
                borderRadius: '50%',
                marginRight: '20px',
            }} />
            <div style={{ fontSize: 30, color: '#888' }}>
                bodybio-hacker.com
            </div>
            <div style={{ flexGrow: 1 }} />
            <div style={{ fontSize: 30, color: '#00ff41', fontFamily: 'monospace' }}>
                VERIFIED_SOURCE
            </div>
        </div>

      </div>
    ),
    {
      ...size,
    }
  );
}
