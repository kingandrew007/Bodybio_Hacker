"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HelpCircle, Lightbulb } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface StoryQAProps {
  question: string;
  answer: string;
}

export function StoryQA({ question, answer }: StoryQAProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const qRef = useRef<HTMLDivElement>(null);
  const aRef = useRef<HTMLDivElement>(null);
  const [pathD, setPathD] = useState("");

  // Calculate path on mount and resize
  useEffect(() => {
    const updatePath = () => {
      if (!qRef.current || !aRef.current || !containerRef.current) return;

      const qRect = qRef.current.getBoundingClientRect();
      const aRect = aRef.current.getBoundingClientRect();
      const cRect = containerRef.current.getBoundingClientRect();

      // Relative coordinates
      const startX = (qRect.left + qRect.width / 2) - cRect.left;
      const startY = (qRect.bottom) - cRect.top;
      const endX = (aRect.left + aRect.width / 2) - cRect.left;
      const endY = (aRect.top) - cRect.top;

      // Create a nice localized S-curve
      // Control points for bezier
      const cp1Y = startY + (endY - startY) * 0.6;
      const cp2Y = endY - (endY - startY) * 0.6;

      const d = `M ${startX} ${startY} C ${startX} ${cp1Y}, ${endX} ${cp2Y}, ${endX} ${endY}`;
      setPathD(d);
    };

    updatePath();
    window.addEventListener("resize", updatePath);
    // slight delay to allow layout to settle
    setTimeout(updatePath, 100);

    return () => window.removeEventListener("resize", updatePath);
  }, [question, answer]);

  useGSAP(() => {
    if (!pathD) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        end: "bottom bottom",
        toggleActions: "play none none reverse",
      }
    });

    // 1. Reveal Question
    tl.from(qRef.current, {
      opacity: 0,
      x: -50,
      duration: 0.8,
      ease: "power3.out"
    });

    // 2. Draw Line
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
      
      tl.to(pathRef.current, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: "power2.inOut",
        opacity: 1
      }, "-=0.4");
    }

    // 3. Reveal Answer
    tl.from(aRef.current, {
      opacity: 0,
      x: 50, // Comes from right
      duration: 0.8,
      ease: "back.out(1.5)"
    }, "-=0.4");

  }, { scope: containerRef, dependencies: [pathD] });

  return (
    <div ref={containerRef} className="my-24 relative min-h-[300px]">
      
      {/* Visual Connector Layer */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0">
        <defs>
          <radialGradient id="lineGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#00ff41" stopOpacity="1" />
            <stop offset="100%" stopColor="#008F11" stopOpacity="0.5" />
          </radialGradient>
           <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        {pathD && (
          <path 
            ref={pathRef}
            d={pathD} 
            fill="none" 
            stroke="#00ff41" 
            strokeWidth="3" 
            strokeLinecap="round"
            style={{ opacity: 0, filter: "url(#glow)" }}
          />
        )}
      </svg>

      {/* QUESTION: Top Left */}
      <div ref={qRef} className="w-full md:w-[60%] mr-auto relative z-10 mb-20">
        <div className="bg-background border border-border p-6 md:p-8 rounded-2xl shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="flex gap-4 md:gap-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
               <h3 className="text-sm font-mono text-red-400 mb-2 uppercase tracking-widest font-bold">The Challenge</h3>
               <p className="text-xl md:text-3xl font-bold font-heading leading-tight text-foreground">
                 {question}
               </p>
            </div>
          </div>
        </div>
      </div>

      {/* ANSWER: Bottom Right */}
      <div ref={aRef} className="w-full md:w-[65%] ml-auto relative z-10">
        <div className="bg-hacker-green/5 border border-hacker-green/20 p-6 md:p-8 rounded-2xl shadow-[0_0_40px_rgba(0,255,65,0.05)] relative overflow-hidden">
           <div className="absolute bottom-0 left-0 w-40 h-40 bg-hacker-green/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

           <div className="flex gap-4 md:gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-hacker-green/20 flex items-center justify-center text-hacker-green border border-hacker-green/20 shadow-[0_0_15px_rgba(0,255,65,0.2)]">
                 <Lightbulb className="w-6 h-6" />
              </div>
              <div className="relative z-10">
                 <h3 className="text-sm font-mono text-hacker-green mb-3 uppercase tracking-widest font-bold">The Solution</h3>
                 <div className="text-lg md:text-xl text-foreground/90 leading-relaxed font-sans">
                   {answer}
                 </div>
              </div>
           </div>
        </div>
      </div>

    </div>
  );
}
