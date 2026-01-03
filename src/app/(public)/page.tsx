import type { Metadata } from 'next';
import { HeroClient } from '@/components/home/HeroClient';

// 1. This is a Server Component by default (no "use client")
// 2. We can export Metadata here for SEO
export const metadata: Metadata = {
  title: 'BodyBio Hacker | The Truth in Supplements',
  description: 'Analytics-driven supplement reviews. We test for heavy metals, purity, and price efficiency.',
  openGraph: {
    title: 'BodyBio Hacker',
    description: 'Stop Guessing. Start Hacking.',
    images: ['/og-image.jpg'], // Add this image to public folder later
  },
};

export default function HomePage() {
  // In the future, you can fetch DB data here:
  // const stats = await db.getStats();

  return (
    <main>
      {/* We pass data to the client component if needed */}
      <HeroClient />
    </main>
  );
}