"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactLenis } from "lenis/react"; // The "Rolls Royce" of scrolling

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="dark" 
      enableSystem 
      disableTransitionOnChange
    >
      {/* root: true -> Tells Lenis to hijack the main HTML scroll 
        options -> lerp: 0.1 is the "heaviness" (lower = smoother/slower)
      */}
      <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
        {children}
      </ReactLenis>
    </NextThemesProvider>
  );
}