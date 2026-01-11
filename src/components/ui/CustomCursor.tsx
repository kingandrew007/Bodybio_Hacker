"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // 1. Mouse Move Listener
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      
      // Move main dot
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: "power2.out"
        });
      }
    };

    // 2. Hover Listeners
    const onMouseEnter = () => setIsHovering(true);
    const onMouseLeave = () => setIsHovering(false);

    // 3. Scroll Progress
    const onScroll = () => {
        if (!progressCircleRef.current) return;
        const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scroll = totalScroll / windowHeight;
        
        const offset = circumference - (scroll * circumference);
        progressCircleRef.current.style.strokeDashoffset = `${offset}`;
    };

    // Initialize
    onScroll();

    document.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll);

    // Attach hover listeners
    const interactables = document.querySelectorAll("a, button, input, textarea, .cursor-hover");
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, []);

  useGSAP(() => {
    // Cursor Follower Movement
    gsap.ticker.add(() => {
        if (!followerRef.current) return;
        const dt = 1.0 - Math.pow(1.0 - 0.15, gsap.ticker.deltaRatio()); 
        const currentX = parseFloat(gsap.getProperty(followerRef.current, "x") as string) || 0;
        const currentY = parseFloat(gsap.getProperty(followerRef.current, "y") as string) || 0;
        const dx = mouse.current.x - currentX;
        const dy = mouse.current.y - currentY;
        
        gsap.set(followerRef.current, {
            x: currentX + dx * dt,
            y: currentY + dy * dt
        });
    });
  }, { scope: followerRef});

  useEffect(() => {
    // Scale animation on hover
    if (followerRef.current) {
        gsap.to(followerRef.current, {
            scale: isHovering ? 2.5 : 1,
            backgroundColor: isHovering ? "rgba(0, 255, 65, 0.1)" : "transparent",
            borderColor: isHovering ? "rgba(0, 255, 65, 0.5)" : "rgba(0, 255, 65, 0.3)",
            duration: 0.3
        });
    }
  }, [isHovering]);

  // Radius for the svg circle
  const radius = 18; 
  const circumference = 2 * Math.PI * radius;
  const progressCircleRef = useRef<SVGCircleElement>(null);

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Main Dot */}
      <div 
        ref={cursorRef}
        className="absolute top-0 left-0 w-2 h-2 bg-hacker-green rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(0,255,65,0.8)] z-50 mix-blend-difference"
      />
      
      {/* Follower Ring / Tail */}
      <div 
        ref={followerRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-40 flex items-center justify-center w-12 h-12"
      >
        {/* SVG Progress Circle */}
        <svg 
            className="w-full h-full -rotate-90 absolute inset-0" 
            viewBox="0 0 40 40"
        >
            {/* Background Track */}
            <circle 
                className="text-hacker-green/10"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx="20"
                cy="20"
            />
            {/* Progress Bar */}
            <circle 
                ref={progressCircleRef}
                className="text-hacker-green"
                strokeWidth="1.5"
                strokeDasharray={circumference}
                strokeDashoffset={circumference}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx="20"
                cy="20"
            />
        </svg>

        {/* Inner glow */}
         <div className="absolute inset-0 bg-hacker-green/5 rounded-full blur-md" />
      </div>
    </div>
  );
}
