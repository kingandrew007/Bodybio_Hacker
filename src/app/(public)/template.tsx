"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Template({ children }: { children: React.ReactNode }) {
  const container = useRef<HTMLDivElement>(null);
  // 1. Create a Ref for the text element
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // SETUP
    gsap.set(".transition-overlay", { display: "flex" });
    gsap.set(".shutter-col", { yPercent: 0 });
    gsap.set(".scan-line", { top: "0%" });
    gsap.set(".loader-hud", { opacity: 1, scale: 1 });

    // THE SCAN
    tl.to(".scan-line", {
      top: "100%",
      duration: 1.2,
      ease: "power2.inOut",
      repeat: 1,
      yoyo: true
    })
    // 2. Animate the Ref directly (No selector string)
    .to(textRef.current, {
      duration: 1,
      // 3. Use Arrow Function + Ref (Type Safe)
      onUpdate: () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
        const target = textRef.current;
        
        if (target) {
          // Manual glitch effect
          target.innerText = "DECRYPTING_BIO_DATA..."
            .split("")
            .map((char) => Math.random() > 0.8 ? chars[Math.floor(Math.random() * chars.length)] : char)
            .join("");
        }
      },
      onComplete: () => {
        if (textRef.current) {
          textRef.current.innerText = "ACCESS GRANTED";
        }
      }
    }, "<")

    // THE SHREDDER REVEAL
    .to(".col-odd", {
      yPercent: -100,
      duration: 0.8,
      ease: "power4.inOut",
      stagger: 0.05
    }, "reveal")
    .to(".col-even", {
      yPercent: 100,
      duration: 0.8,
      ease: "power4.inOut",
      stagger: 0.05
    }, "reveal")

    // CLEANUP
    .to(".loader-hud", { opacity: 0, duration: 0.2 }, "reveal")
    .set(".transition-overlay", { display: "none" });

  }, { scope: container });

  const columns = Array.from({ length: 12 });

  return (
    <div ref={container}>
      <div className="transition-overlay fixed inset-0 z-[9999] flex pointer-events-none">
        
        {/* COLUMNS */}
        {columns.map((_, i) => (
          <div 
            key={i} 
            className={`shutter-col relative h-full flex-1 bg-black border-r border-white/5 
              ${i % 2 === 0 ? "col-even" : "col-odd"}`} 
          >
            <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-hacker-green/20 to-transparent opacity-50" />
          </div>
        ))}

        {/* HUD */}
        <div className="loader-hud fixed inset-0 z-[10000] flex flex-col items-center justify-center mix-blend-screen">
            <div className="relative w-64 h-64 border border-hacker-green/30 rounded-lg p-2 flex items-center justify-center overflow-hidden bg-black/50 backdrop-blur-sm">
                <div className="scan-line absolute left-0 w-full h-1 bg-hacker-green shadow-[0_0_20px_#00ff41] z-20" />
                <div className="absolute inset-0 opacity-20" 
                     style={{ backgroundImage: 'linear-gradient(hacker-green 1px, transparent 1px), linear-gradient(90deg, hacker-green 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
                />
                
                <div className="text-hacker-green animate-pulse">
                   <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="drop-shadow-[0_0_10px_#00ff41]">
                     <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                     <path d="M8.5 8.5v.01" />
                     <path d="M16 16v.01" />
                     <path d="M12 12v.01" />
                   </svg>
                </div>
                
                {/* Corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-hacker-green" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-hacker-green" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-hacker-green" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-hacker-green" />
            </div>

            {/* 4. ATTACH THE REF HERE */}
            <div ref={textRef} className="loading-text mt-8 font-mono text-sm tracking-[0.3em] text-hacker-green font-bold">
                INITIALIZING...
            </div>
            
            <div className="mt-2 h-1 w-32 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full w-full bg-hacker-green animate-progress origin-left" />
            </div>
        </div>
      </div>

      {children}
    </div>
  );
}