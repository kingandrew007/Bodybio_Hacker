import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  //  devIndicators: false,
  // 1. Enable new Next.js 16 Caching Strategy
  experimental: {
    // Allows us to use the 'use cache' directive for heavy computations
    // dynamicIO: true, // Uncomment if you want to test the beta IO features
    
  },

  // 2. Image Optimization (Critical for Premium Speed)
  images: {
    formats: ['image/avif', 'image/webp'],
    // We are using local images, but if you switch to Cloudinary later, add it here:
    // remotePatterns: [{ protocol: 'https', hostname: 'res.cloudinary.com' }],
  },

  // 3. Strict Header Security (Hacker Requirement)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Frame-Options', value: 'DENY' }, // No iframing allowed
        ],
      },
    ];
  },
};

export default nextConfig;