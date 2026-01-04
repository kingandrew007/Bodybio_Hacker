import { Manrope, JetBrains_Mono } from 'next/font/google';
import { Providers } from '@/components/core/Providers';
import { AuthProvider } from '@/lib/auth-context';
import { CompareProvider } from "@/lib/compare-context"; 
import { Navbar } from '@/components/core/Navbar';
import { Footer } from '@/components/core/Footer';
import { Toaster } from "@/components/ui/Toaster";
import { CompareTray } from "@/components/features/CompareTray"; 
import './globals.css';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata = {
  metadataBase: new URL('https://bodybiohacker.online'),
  title: {
    default: 'BodyBio Hacker | The Truth in Supplements',
    template: '%s | BodyBio Hacker'
  },
  description: 'The world\'s first analytics-driven supplement database. We lab-test Whey, Omega-3, and Nootropics for heavy metals, amino spiking, and purity.',
  
  // 👇 ADVANCED KEYWORDS
  keywords: [
    // Core Identity
    'biohacking', 'supplement analysis', 'lab tested supplements', 'bodybio hacker', 
    
    // Technical Terms (High Value)
    'amino spiking detection', 'heavy metal testing', 'bioavailability', 'HPLC analysis', 'mass spectrometry',
    
    // Specific Categories
    'best whey protein india', 'omega 3 purity test', 'nootropics guide', 'creatine monohydrate purity',
    
    // Problem Solving
    'cognitive enhancement', 'muscle recovery protocol', 'gut health optimization', 'clean label supplements',
    
    // Niche
    'quantified self', 'performance nutrition', 'supplement truth', 'third party verification'
  ],
  
  authors: [{ name: 'BodyBio Hacker Team' }],
  creator: 'BodyBio Hacker',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bodybiohacker.online',
    siteName: 'BodyBio Hacker',
    title: 'BodyBio Hacker | The Truth in Supplements',
    description: 'We tested 50+ supplement brands. See the lab reports. No influencers, just data.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BodyBio Hacker Database Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BodyBio Hacker | The Truth in Supplements',
    description: 'We tested 50+ supplement brands. See the lab reports. No influencers, just data.',
    images: ['/og-image.jpg'],
  },
  // icons: {
  //   icon: '/favicon.ico',
  // },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} ${jetbrains.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <Providers>
          <AuthProvider>
            <CompareProvider>
              <Navbar />
              <main className="flex-grow pt-16">
                {children}
              </main>
              <CompareTray />
              <Footer />
              <Toaster />
            </CompareProvider>
          </AuthProvider>
        </Providers>
        
        {/* STRUCTURAL DATA FOR SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'BodyBio Hacker',
              url: 'https://bodybiohacker.online',
              logo: 'https://bodybiohacker.online/icon-512.png',
              sameAs: [
                'https://twitter.com/bodybiohacker',
                'https://instagram.com/bodybiohacker'
              ],
              description: 'Analytics-driven supplement reviews and tracking.',
            }),
          }}
        />
      </body>
    </html>
  );
}