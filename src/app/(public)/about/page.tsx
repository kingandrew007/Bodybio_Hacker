"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Microscope, ShieldAlert, Database, Skull, Zap, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const container = useRef<HTMLDivElement>(null);
  const horizontalContainer = useRef<HTMLDivElement>(null);

  // 1. Main Animations Setup
  useGSAP(() => {
    const tl = gsap.timeline();

    // --- HERO REVEAL ---
    tl.from(".hero-line", {
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power4.out",
      delay: 0.2
    });

    // --- HORIZONTAL SCROLL SECTION ---
    const panels = gsap.utils.toArray(".horizontal-panel");
    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: horizontalContainer.current,
        pin: true,
        scrub: 0.5, // Softer scrub
        end: "+=2500",
      }
    });

    // --- METHODOLOGY CARDS (Alternating slide-in) ---
    gsap.utils.toArray(".method-card").forEach((card: any, i) => {
      gsap.from(card, {
        opacity: 0,
        x: i % 2 === 0 ? -100 : 100, // Alternate left/right
        rotateY: i % 2 === 0 ? -15 : 15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      });
    });

    // --- SQUAD GRID STAGGER ---
    ScrollTrigger.batch(".squad-card", {
      start: "top 85%",
      onEnter: (elements) => {
        gsap.from(elements, {
          y: 60,
          opacity: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "back.out(1.7)",
        });
      },
    });

  }, { scope: container });


  // 2. 3D TILT EFFECT FOR SQUAD CARDS (Vanilla JS for performance)
  useEffect(() => {
    const cards = document.querySelectorAll(".tilt-card");
    
    cards.forEach((card) => {
      card.addEventListener("mousemove", (e: any) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element.
        const y = e.clientY - rect.top;  // y position within the element.
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg tilt
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.5,
          ease: "elastic.out(1, 0.5)",
        });
      });
    });
  }, []);


  return (
    <div ref={container} className="bg-background text-foreground overflow-x-hidden transition-colors duration-300 relative">
      
      {/* Global animated background aesthetic */}
      <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-hacker-green/20 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-pulse-slow" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-pulse-slow delay-1000" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
      </div>


      {/* ================= SCROLL SECTION 1: HERO ================= */}
      <section className="h-[90vh] flex items-center justify-center px-6 relative z-10">
        <div className="text-center max-w-5xl">
          <div className="overflow-hidden mb-2">
            <h1 className="hero-line text-6xl md:text-9xl font-bold leading-none tracking-tighter">
              WE ARE
            </h1>
          </div>
          <div className="overflow-hidden mb-6">
            <h1 className="hero-line text-6xl md:text-9xl font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-hacker-green to-blue-500 animate-gradient">
              THE GLITCH.
            </h1>
          </div>
          <div className="overflow-hidden">
             <p className="hero-line text-xl md:text-2xl text-muted-foreground font-mono">
               Disrupting a $150B industry built on lies and fillers.
             </p>
          </div>
        </div>
      </section>


      {/* ================= SCROLL SECTION 2: THE HORIZONTAL STORY ================= */}
      <section ref={horizontalContainer} className="horizontal-wrapper h-screen w-full overflow-hidden relative z-20 border-y border-border">
        <div className="flex h-full w-[300vw]">
          
          {/* Panel 1: The Enemy */}
          <div className="horizontal-panel w-screen h-full flex items-center justify-center bg-card px-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-red-900/10 mix-blend-overlay pointer-events-none" />
            <div className="max-w-4xl relative z-10">
              <Skull className="w-16 h-16 text-red-500 mb-6" />
              <span className="text-red-500 font-mono text-xl tracking-widest">01 // THE PROBLEM</span>
              <h2 className="text-5xl md:text-7xl font-bold mt-4 mb-8 text-foreground">The Industry is Toxic.</h2>
              <p className="text-2xl text-muted-foreground leading-relaxed">
                Amino spiking. Heavy metals. Rancid fish oil. 
                Supplements are unregulated and built on obscurity. They profit from your ignorance.
              </p>
            </div>
          </div>

          {/* Panel 2: The Solution */}
          <div className="horizontal-panel w-screen h-full flex items-center justify-center bg-background px-12 relative">
             <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay pointer-events-none" />
             <div className="max-w-4xl relative z-10">
              <Database className="w-16 h-16 text-blue-500 mb-6" />
              <span className="text-blue-500 font-mono text-xl tracking-widest">02 // THE PROTOCOL</span>
              <h2 className="text-5xl md:text-7xl font-bold mt-4 mb-8 text-foreground">Data Over Marketing.</h2>
              <p className="text-2xl text-muted-foreground leading-relaxed">
                We don't read labels. We take samples to the lab. 
                Mass spectrometry doesn't lie. If it's trash, we mark it trash.
              </p>
            </div>
          </div>

          {/* Panel 3: The Mission */}
          <div className="horizontal-panel w-screen h-full flex items-center justify-center bg-hacker-green text-black px-12">
             <div className="max-w-4xl">
              <Zap className="w-16 h-16 text-black mb-6 animate-pulse" />
              <span className="text-black font-mono text-xl tracking-widest">03 // THE ENDGAME</span>
              <h2 className="text-5xl md:text-7xl font-bold mt-4 mb-8">Total Optimization.</h2>
              <p className="text-2xl font-bold leading-relaxed">
                Stop guessing. Start hacking. Access the verified database and optimize your biology with precision.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ================= SCROLL SECTION 3: METHODOLOGY CARDS ================= */}
      <section className="py-32 px-6 relative z-10 max-w-5xl mx-auto">
        <div className="mb-20 text-center">
            <h2 className="text-4xl font-bold font-mono mb-4">OUR EXECUTION_PROTOCOL</h2>
            <div className="w-24 h-1 bg-hacker-green mx-auto" />
        </div>

        <div className="space-y-24 perspective-1000">
           <MethodCard 
             icon={ShieldAlert} 
             step="01" title="Acquire Target" 
             desc="We purchase supplements anonymously from retail shelves. No cherry-picked samples sent by brands."
             color="hacker-green"
           />
           <MethodCard 
             icon={Microscope} 
             step="02" title="Spectrometry Analysis" 
             desc="Samples are sent to ISO-certified 3rd party labs for HPLC and ICP-MS testing to verify purity and detect heavy metals."
             color="blue-500"
             alignRight
           />
           <MethodCard 
             icon={Database} 
             step="03" title="Expose Data" 
             desc="Results are decrypted and uploaded to our public database. We score products based on harsh algorithmic truths."
             color="hacker-green"
           />
        </div>
      </section>


      {/* ================= SCROLL SECTION 4: THE SQUAD (3D TILT) ================= */}
      <section className="py-32 px-6 relative z-10 bg-card/50 backdrop-blur-sm border-t border-border">
        <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-16">
                <div>
                    <h2 className="text-4xl font-bold font-mono mb-2">THE UNIT</h2>
                    <p className="text-muted-foreground">The operatives behind the database.</p>
                </div>
                <Users className="w-12 h-12 text-hacker-green opacity-50" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <SquadCard 
                 role="FOUNDER // LEAD BIOHACKER"
                 name="Sumukha"
                 desc="Obsessed with human optimization and exposing corporate greed. Runs the central protocol."
                 stats={["Data Analysis", "Nootropics", "Spectrometry"]}
               />
               <SquadCard 
                 role="HEAD OF LAB OPS"
                 name="Dr. Aris Thorne"
                 desc="Analytical chemist with 15 years experience in pharmaceutical quality control. The skeptic."
                 stats={["HPLC Certified", "Heavy Metals", "Organic Chem"]}
               />
                <SquadCard 
                 role="FIELD OPERATIVE"
                 name="Sarah 'Glitch' Kerrigan"
                 desc="Acquisition specialist. Ensures samples are procured ethically and anonymously without detection."
                 stats={["Logistics", "OpSec", "Recon"]}
               />
            </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="h-[50vh] flex flex-col items-center justify-center bg-background relative z-10 border-t border-border">
        <h2 className="text-5xl font-bold font-mono tracking-tight mb-8">ARE YOU IN?</h2>
        <button className="group relative px-8 py-4 bg-hacker-green text-black font-bold font-mono overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">
                ACCESS_DATABASE <Zap className="w-4 h-4" />
            </span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </button>
      </section>

    </div>
  );
}


// ================= SUB-COMPONENTS =================

// 1. The vibrant, sliding methodology card
function MethodCard({ icon: Icon, step, title, desc, color, alignRight }: any) {
  const bgColor = color === 'blue-500' ? 'bg-blue-500' : 'bg-hacker-green';
  const textColor = color === 'blue-500' ? 'text-blue-500' : 'text-hacker-green';
  const borderColor = color === 'blue-500' ? 'border-blue-500/30' : 'border-hacker-green/30';

  return (
    <div className={`method-card flex flex-col ${alignRight ? 'md:flex-row-reverse text-right' : 'md:flex-row'} items-center gap-8 p-8 rounded-2xl border ${borderColor} bg-card relative overflow-hidden group`}>
        
        {/* Glowing accent behind the icon */}
        <div className={`absolute top-1/2 ${alignRight ? 'right-12' : 'left-12'} -translate-y-1/2 w-32 h-32 ${bgColor} blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity`} />
        
        <div className={`relative z-10 flex-shrink-0 w-20 h-20 rounded-xl ${bgColor} flex items-center justify-center text-black shadow-lg`}>
            <Icon className="w-10 h-10" />
        </div>

        <div className="relative z-10 flex-1">
            <span className={`font-mono text-sm ${textColor} tracking-widest`}>STEP {step}</span>
            <h3 className="text-3xl font-bold mt-2 mb-4">{title}</h3>
            <p className={`text-muted-foreground text-lg ${alignRight ? 'ml-auto' : 'mr-auto'} max-w-lg`}>
                {desc}
            </p>
        </div>
    </div>
  )
}

// 2. The 3D Tilt Squad Card
function SquadCard({ role, name, desc, stats }: any) {
    return (
        <div className="squad-card tilt-card p-[1px] rounded-2xl bg-gradient-to-b from-hacker-green/50 to-transparent relative h-full">
            <div className="bg-card h-full rounded-2xl p-8 flex flex-col backdrop-blur-xl relative overflow-hidden group">
                {/* Scanline effect on hover */}
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,255,65,0.1)_50%,transparent_100%)] translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />
                
                <div className="font-mono text-xs text-hacker-green mb-2 tracking-wider">{role}</div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{name}</h3>
                <p className="text-muted-foreground mb-8 flex-grow">{desc}</p>

                <div className="flex flex-wrap gap-2 mt-auto">
                    {stats.map((stat: string, i: number) => (
                        <span key={i} className="text-[10px] font-mono uppercase px-3 py-1 rounded-full border border-border bg-background text-muted-foreground">
                            {stat}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}