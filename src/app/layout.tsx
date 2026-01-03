import { Manrope, JetBrains_Mono } from 'next/font/google';
import { Providers } from '@/components/core/Providers';
import { AuthProvider } from '@/lib/auth-context';
import { CompareProvider } from "@/lib/compare-context"; // <--- 1. NEW IMPORT
import { Navbar } from '@/components/core/Navbar';
import { Footer } from '@/components/core/Footer';
import { Toaster } from "@/components/ui/Toaster";
import { CompareTray } from "@/components/features/CompareTray"; // <--- 2. NEW IMPORT
import './globals.css';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata = {
  title: 'BodyBio Hacker | The Truth in Supplements',
  description: 'Analytics-driven supplement reviews. No nonsense.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} ${jetbrains.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <Providers>
          <AuthProvider>
            {/* 3. WRAP CONTENT IN COMPARE PROVIDER */}
            <CompareProvider>
              <Navbar />
              <main className="flex-grow pt-16">
                {children}
              </main>
              
              {/* 4. ADD THE FLOATING TRAY HERE */}
              <CompareTray />
              
              <Footer />
              <Toaster />
            </CompareProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}