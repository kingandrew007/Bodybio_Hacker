import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
 
export const alt = 'BodyBio Hacker - Disrupting the Supplement Industry';
export const size = {
  width: 1200,
  height: 630,
};
 
export const contentType = 'image/png';
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'monospace',
          position: 'relative',
        }}
      >
        {/* Background Grid */}
        <div
          style={{
             position: 'absolute',
             top: 0,
             left: 0,
             right: 0,
             bottom: 0,
             backgroundImage: 'linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px)',
             backgroundSize: '40px 40px',
             maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
             {/* Logo Icon */}
             <div style={{
                 width: '60px',
                 height: '60px',
                 background: '#00ff41',
                 borderRadius: '50%',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 boxShadow: '0 0 40px rgba(0,255,65,0.4)',
             }}>
                <div style={{ width: '30px', height: '30px', background: 'black', borderRadius: '50%' }} />
             </div>

             <div style={{ fontSize: 60, color: 'white', fontWeight: 'bold', display: 'flex' }}>
                BODYBIO<span style={{ color: '#00ff41' }}>_HACKER</span>
             </div>
        </div>
        
        <div style={{ display: 'flex', marginTop: '40px', gap: '20px' }}>
            <div style={{ padding: '10px 20px', border: '2px solid #333', color: '#888', borderRadius: '8px', fontSize: 20 }}>
                LAB_TESTED
            </div>
            <div style={{ padding: '10px 20px', border: '2px solid #00ff41', color: '#00ff41', borderRadius: '8px', fontSize: 20, boxShadow: '0 0 20px rgba(0,255,65,0.2)' }}>
                VERIFIED_DATA
            </div>
        </div>

      </div>
    ),
    {
      ...size,
    }
  );
}
