"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Search, ArrowRight, Calendar, FileText, Cpu, Activity, Database, Zap } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-data";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function BlogClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");

  // Filter Logic
  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(query.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(query.toLowerCase());
    const matchesCat = activeCategory === "ALL" || post.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  useGSAP(() => {
    // 1. Title Animation
    gsap.from(".gsap-title", {
       y: -30,
       opacity: 0,
       duration: 0.8,
       ease: "power3.out"
    });

    // 2. Staggered Cards
    gsap.from(".gsap-blog-card", {
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      delay: 0.2
    });

  }, { scope: containerRef, dependencies: [filteredPosts] });

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground pt-24 pb-20 px-6 relative overflow-hidden transition-colors duration-700 ease-in-out">
      
      {/* Dynamic Background Grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
          {/* Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f0f0f_1px,transparent_1px),linear-gradient(to_bottom,#0f0f0f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
          {/* Orbs */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-hacker-green/5 rounded-full blur-[150px] animate-pulse-slow" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 gsap-title relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-hacker-green/10 border border-hacker-green/20 text-hacker-green text-xs font-mono mb-4 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-hacker-green" />
            SYSTEM_ONLINE
          </div>
          <h1 className="text-5xl md:text-8xl font-black font-mono tracking-tighter mb-6 text-foreground uppercase glitch-text" data-text="INTELLIGENCE_LOGS">
            INTELLIGENCE_<span className="text-transparent bg-clip-text bg-gradient-to-r from-hacker-green to-emerald-400">LOGS</span>
          </h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-light border-l-2 border-hacker-green/30 pl-4 py-2 bg-gradient-to-r from-hacker-green/5 to-transparent">
            ACCESSING CLASSIFIED SUPPLEMENTATION PROTOCOLS...<br/>
            <span className="text-sm font-mono opacity-50">Authorized Personnel Only.</span>
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-16 gsap-title">
          {/* Search Input */}
          <div className="relative w-full md:w-96 group">
            <div className="absolute inset-0 bg-gradient-to-r from-hacker-green to-blue-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative bg-background/80 border border-foreground/10 rounded-xl overflow-hidden backdrop-blur flex items-center">
                <Search className="ml-4 w-4 h-4 text-muted-foreground group-focus-within:text-hacker-green transition-colors" />
                <input 
                  type="text" 
                  placeholder="SEARCH_DATABASE..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent border-none py-4 px-4 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 uppercase tracking-widest"
                />
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
             {["ALL", "GUIDE", "DEEP_DIVE", "PROTOCOL"].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-6 py-2 rounded-none text-xs font-mono font-bold transition-all uppercase tracking-widest clip-path-polygon ${
                  activeCategory === cat 
                    ? "bg-hacker-green text-black border-transparent" 
                    : "bg-foreground/5 text-muted-foreground hover:text-foreground hover:bg-foreground/10"
                }`}
                style={{ clipPath: "polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)" }}
              >
                {cat}
                {activeCategory === cat && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black/20" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* The Grid - Holographic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, i) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group h-full gsap-blog-card block perspective-1000">
              <div className="relative h-full bg-card/40 border border-foreground/5 hover:border-hacker-green/50 hover:shadow-[0_0_40px_-5px_rgba(0,255,65,0.2)] transition-all duration-500 rounded-xl overflow-hidden group-hover:-translate-y-2 backdrop-blur-md flex flex-col">
                
                {/* Holographic Overlay on Hover */}
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-0 group-hover:opacity-10 pointer-events-none z-20 mix-blend-overlay" />
                <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-hacker-green to-transparent opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_#00ff41]" />

                {/* Image Area with Glitch Effect on Hover */}
                <div className="aspect-video relative bg-card overflow-hidden border-b border-foreground/5">
                   <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                   
                   {/* Tech Overlay Lines */}
                   <div className="absolute inset-0 z-20 bg-[linear-gradient(transparent_2px,#000_2px)] bg-[size:100%_4px] opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none" />

                   {post.image ? (
                     <Image 
                       src={post.image} 
                       alt={post.title} 
                       fill 
                       className="object-cover group-hover:scale-110 group-hover:saturate-150 transition-all duration-700 ease-out opacity-80 group-hover:opacity-100" 
                     />
                   ) : (
                     <div className="absolute inset-0 bg-gradient-to-tr from-hacker-green/10 to-transparent" />
                   )}
                   
                   {/* Top Left Badge */}
                   <div className="absolute top-4 left-4 z-30 flex items-center gap-2">
                       <span className="bg-black/80 backdrop-blur text-hacker-green text-[10px] font-mono font-bold px-2 py-1 border border-hacker-green/30 uppercase">
                         {post.category}
                       </span>
                   </div>

                    {/* Top Right ID */}
                   <div className="absolute top-4 right-4 z-30 text-[9px] font-mono text-white/40 tracking-widest">
                       ID: {1000 + (i * 543) % 8999}
                   </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col relative z-20">
                  <div className="flex items-center justify-between mb-4 border-b border-foreground/5 pb-4">
                     <div className="flex items-center gap-2 text-xs text-hacker-green font-mono">
                        <Activity className="w-3 h-3" />
                         {/* Random fake scan data */}
                        <span className="opacity-80">VERIFIED</span>
                     </div>
                     <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
                        <Calendar className="w-3 h-3" /> {post.date}
                     </div>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold font-mono leading-tight mb-3 text-foreground group-hover:text-hacker-green transition-colors uppercase tracking-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-sm text-neutral-400 line-clamp-3 mb-6 flex-1 font-sans leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto">
                     <div className="flex items-center justify-between text-xs font-bold font-mono text-foreground group-hover:text-hacker-green transition-colors bg-foreground/5 p-3 rounded border border-foreground/5 group-hover:border-hacker-green/30">
                        <span>INITIATE_PROTOCOL</span> 
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                     </div>
                  </div>
                </div>

                {/* Decorative Corner Accents */}
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-white/10 group-hover:border-hacker-green transition-colors rounded-br-xl" />
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-hacker-green opacity-0 group-hover:opacity-100 transition-opacity blur-[2px]" />

              </div>
            </Link>
          ))}

          {filteredPosts.length === 0 && (
            <div className="col-span-full py-20 text-center gsap-blog-card border border-foreground/10 rounded-xl bg-card/40 backdrop-blur">
              <Database className="w-12 h-12 text-neutral-700 mx-auto mb-4 animate-pulse" />
              <div className="text-lg font-mono text-foreground">NO_DATA_FOUND_IN_SECTOR</div>
              <p className="text-neutral-500 font-mono text-sm mt-2">ADJUST_SEARCH_PARAMETERS</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
