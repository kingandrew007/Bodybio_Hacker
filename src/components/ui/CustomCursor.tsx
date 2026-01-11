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
        const brackets = followerRef.current.querySelectorAll(".cursor-bracket");
        
        // 1. Circle Animation (Subtle expand, distinct color)
        gsap.to(followerRef.current, {
            scale: isHovering ? 1.5 : 1, // Reduced/Increased from 2.5 to 1.5 for tightness
            overwrite: "auto",
            duration: 0.3,
            ease: "back.out(1.7)"
        });

        // 2. SVG Circle Opacity (Fade out circle track on hover to focus on brackets)
        const svgCircle = followerRef.current.querySelector("svg");
        if (svgCircle) {
           gsap.to(svgCircle, {
             opacity: isHovering ? 0 : 1,
             scale: isHovering ? 0.5 : 1,
             duration: 0.3
           });
        }

        // 3. Brackets Animation (Fade in & Snap)
        if (brackets.length > 0) {
            gsap.to(brackets, {
                opacity: isHovering ? 1 : 0,
                scale: isHovering ? 1 : 0.5,
                rotation: isHovering ? 0 : 45,
                duration: 0.3,
                ease: "back.out(1.7)"
            });
        }
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
        {/* SVG Progress Circle (Fades out on Hover) */}
        <svg 
            className="w-full h-full -rotate-90 absolute inset-0 transition-opacity" 
            viewBox="0 0 40 40"
        >
            {/* Background Track */}
            <circle 
                className="text-hacker-green/20"
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

        {/* Hover Brackets (Visible only on hover) */}
        <div className="absolute inset-0 flex items-center justify-center">
            {/* Top-Left */}
            <div className="cursor-bracket absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-hacker-green opacity-0" />
            {/* Top-Right */}
            <div className="cursor-bracket absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-hacker-green opacity-0" />
            {/* Bottom-Left */}
            <div className="cursor-bracket absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-hacker-green opacity-0" />
            {/* Bottom-Right */}
            <div className="cursor-bracket absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-hacker-green opacity-0" />
        </div>

        {/* Inner glow */}
         <div className="absolute inset-0 bg-hacker-green/5 rounded-full blur-md" />
      </div>
    </div>
  );
}
