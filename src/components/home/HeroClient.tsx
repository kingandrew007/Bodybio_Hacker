"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ChevronDown, Terminal } from "lucide-react";

export function HeroClient() {
  const container = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // 1. BOOT SEQUENCE
    tl.to(".boot-bar", { width: "100%", duration: 1, ease: "linear" })
      .to(".boot-screen", { yPercent: -100, duration: 0.8, ease: "power2.inOut" })
      .from(".hero-word", { y: 100, opacity: 0, stagger: 0.1, duration: 1 })
      .from(".hero-sub", { opacity: 0, y: 20, duration: 0.8 }, "-=0.5")
      .from(".hero-btn", { scale: 0.9, opacity: 0, duration: 0.5 }, "-=0.3");

  }, { scope: container });

  return (
    <div ref={container} className="relative transition-colors duration-300">
      
      {/* 0. BOOT LOADER */}
      <div className="boot-screen fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-hacker-green font-mono">
         <div className="text-xs tracking-[0.3em] mb-4 animate-pulse">ESTABLISHING_SECURE_CONNECTION...</div>
         <div className="w-64 h-1 bg-gray-900 rounded-full overflow-hidden">
            <div className="boot-bar w-0 h-full bg-hacker-green shadow-[0_0_20px_#00ff41]" />
         </div>
      </div>

      {/* 1. HERO SECTION */}
      <section className="hero-section relative h-[90vh] flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
           <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-hacker-green/10 rounded-full blur-[120px] mix-blend-screen opacity-60" />
           <div className="absolute bottom-0 -right-20 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] mix-blend-screen opacity-60 delay-1000" />
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
           <div className="absolute inset-0" 
                style={{ backgroundImage: `linear-gradient(rgba(100,100,100,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(100,100,100,0.1) 1px, transparent 1px)`, backgroundSize: '40px 40px', maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)' }} />
        </div>

        <div className="relative z-10 text-center max-w-6xl">
          <div className="flex justify-center gap-4 mb-4 overflow-hidden">
             <div className="hero-word inline-flex items-center gap-2 border border-hacker-green/30 bg-hacker-green/5 px-3 py-1 rounded-full text-xs font-mono text-hacker-green">
               <span className="w-2 h-2 rounded-full bg-hacker-green animate-pulse" />
               LIVE_DATABASE_ACTIVE
             </div>
          </div>

          <h1 className="text-4xl md:text-9xl font-bold tracking-tighter leading-[0.9] mb-8">
            <div className="overflow-hidden"><span className="hero-word block">DECLASSIFYING</span></div>
            <div className="overflow-hidden"><span className="hero-word block text-transparent bg-clip-text bg-gradient-to-r from-hacker-green via-foreground to-hacker-green animate-gradient bg-[length:200%_auto]">THE INDUSTRY.</span></div>
          </h1>

          <p className="hero-sub text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            We infiltrated the supplement market to bring you raw data. 
            <span className="text-foreground font-bold"> No influencers. No paid reviews. Just mass spectrometry.</span>
          </p>

          <div className="hero-btn flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/shop">
              <Button variant="hacker" size="lg" className="h-16 px-10 text-lg group text-black font-bold">
                Access Shop Data <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. TICKER */}
      <div className="w-full bg-hacker-green/10 border-y border-hacker-green/20 py-3 overflow-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap font-mono text-xs text-hacker-green tracking-widest">
           <span>// DETECTED: HIGH_MERCURY_LEVELS_IN_BATCH_492</span>
           <span>// VERIFIED: 99% PURITY ON CREATINE_MONOHYDRATE</span>
           <span>// WARNING: AMINO_SPIKING_DETECTED_IN_BUDGET_WHEY</span>
           <span>// SYSTEM: NEW_LAB_RESULTS_UPLOADED</span>
           <span>// DETECTED: HIGH_MERCURY_LEVELS_IN_BATCH_492</span>
           <span>// VERIFIED: 99% PURITY ON CREATINE_MONOHYDRATE</span>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------
// FAQ COMPONENT (Client Logic Needed for State)
// ------------------------------------------
export function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="py-20 px-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold font-mono mb-8 flex items-center gap-3">
        <Terminal className="text-hacker-green" /> MISSION_DEBRIEF (FAQ)
      </h2>
      <div className="space-y-4">
         <FaqItem 
           q="Do brands pay you for these reviews?" 
           a="Negative. We purchase every product anonymously. Accepting payment would compromise the protocol." 
           isOpen={openFaq === 0} toggle={() => setOpenFaq(openFaq === 0 ? null : 0)}
         />
         <FaqItem 
           q="How do you test for purity?" 
           a="We utilize HPLC (High-Performance Liquid Chromatography) for ingredient verification and ICP-MS for heavy metal detection." 
           isOpen={openFaq === 1} toggle={() => setOpenFaq(openFaq === 1 ? null : 1)}
         />
         <FaqItem 
           q="Can I request a product analysis?" 
           a="Affirmative. Members can submit requests in the 'Explore' tab. High-demand items are prioritized for the next lab run." 
           isOpen={openFaq === 2} toggle={() => setOpenFaq(openFaq === 2 ? null : 2)}
         />
      </div>
    </section>
  );
}

function FaqItem({ q, a, isOpen, toggle }: any) {
  return (
    <div className="border border-border bg-card rounded-lg overflow-hidden">
      <button onClick={toggle} className="w-full flex items-center justify-between p-4 text-left hover:bg-background transition-colors">
        <span className="font-bold font-mono text-foreground">{q}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="p-4 pt-0 text-sm text-muted-foreground border-t border-border/50 bg-background/50">
          {a}
        </div>
      )}
    </div>
  )
}