import type { Metadata } from 'next';
import { HeroClient, FaqSection } from '@/components/home/HeroClient';
import { 
  TrendingProducts, 
  Infrastructure, 
  Testimonials, 
  CallToAction 
} from '@/components/home/HomeSections';

export const metadata: Metadata = {
  title: 'BodyBio Hacker | The Truth in Supplements',
  description: 'Analytics-driven supplement reviews. We test for heavy metals, purity, and price efficiency.',
  openGraph: {
    title: 'BodyBio Hacker',
    description: 'Stop Guessing. Start Hacking.',
    images: ['/og-image.jpg'],
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      
      {/* 1. Client-Side Hero (Animations) */}
      <HeroClient />

      {/* 2. Static Content (Loads Instantly) */}
      <TrendingProducts />
      
      <Infrastructure />
      
      <Testimonials />
      
      {/* 3. FAQ (Client Component for State) */}
      <FaqSection />

      <CallToAction />
      
    </main>
  );
}