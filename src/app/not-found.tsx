"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, WifiOff, Search } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function NotFound() {
  const container = useRef(null);

  useGSAP(() => {
    // Glitch Animation Loop
    gsap.to(".glitch-layer", {
      x: () => Math.random() * 10 - 5,
      y: () => Math.random() * 10 - 5,
      opacity: () => Math.random(),
      duration: 0.1,
      repeat: -1,
      yoyo: true,
      ease: "rough"
    });

    // Entrance
    gsap.from(".content-box", {
      scale: 0.9,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  }, { scope: container });

  return (
    <div ref={container} className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Noise */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black pointer-events-none" />

      <div className="content-box relative z-10 text-center max-w-lg">
        
        {/* The 404 Glitch Graphic */}
        <div className="relative mb-8 inline-block">
          <div className="text-9xl font-black font-mono tracking-tighter text-gray-800 select-none">
            404
          </div>
          {/* Glitch Overlay 1 (Red) */}
          <div className="glitch-layer absolute inset-0 text-9xl font-black font-mono tracking-tighter text-red-500/50 mix-blend-screen pointer-events-none" style={{clipPath: 'inset(10% 0 60% 0)'}}>
            404
          </div>
          {/* Glitch Overlay 2 (Green) */}
          <div className="glitch-layer absolute inset-0 text-9xl font-black font-mono tracking-tighter text-hacker-green/50 mix-blend-screen pointer-events-none" style={{clipPath: 'inset(60% 0 10% 0)'}}>
            404
          </div>
        </div>

        <h1 className="text-2xl font-bold font-mono text-hacker-green mb-2 animate-pulse">
          SIGNAL_LOST // DATA_CORRUPTED
        </h1>
        
        <p className="text-gray-500 mb-8 leading-relaxed">
          The supplement you are looking for has either been recalled, deleted by the admin, or never existed in this timeline.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="hacker" className="w-full sm:w-auto">
              <ArrowLeft className="mr-2 w-4 h-4" /> Reroute to Base
            </Button>
          </Link>
          <Link href="/explore">
            <Button variant="outline" className="w-full sm:w-auto border-gray-700 text-gray-300 hover:text-white">
              <Search className="mr-2 w-4 h-4" /> Search Database
            </Button>
          </Link>
        </div>

        {/* Footer Code */}
        <div className="mt-12 pt-8 border-t border-white/5 font-mono text-xs text-gray-700">
          ERROR_CODE: 0x404_NOT_FOUND <br />
          TIMESTAMP: {new Date().toISOString()}
        </div>

      </div>
    </div>
  );
}