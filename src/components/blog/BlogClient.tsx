"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Search, Hash, ArrowRight, Calendar, FileText } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-data";

export function BlogClient() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");

  // Filter Logic
  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(query.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(query.toLowerCase());
    const matchesCat = activeCategory === "ALL" || post.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-20 px-6 relative overflow-hidden transition-colors duration-300">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-hacker-green/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-7xl font-bold font-mono tracking-tighter mb-6">
            INTELLIGENCE_<span className="text-hacker-green">LOGS</span>
          </h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            Curated dossiers on supplementation protocols. <br/>
            Search by goal, budget, or ingredient.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12 bg-card p-4 rounded-2xl border border-border shadow-sm">
          
          {/* Search Input */}
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-hacker-green transition-colors" />
            <input 
              type="text" 
              placeholder="Search database (e.g., 'Student', 'Omega 3')"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-4 text-sm font-mono focus:outline-none focus:border-hacker-green transition-all"
            />
          </div>

          {/* Category Chips */}
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {["ALL", "GUIDE", "DEEP_DIVE", "PROTOCOL"].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all border ${
                  activeCategory === cat 
                    ? "bg-hacker-green text-black border-hacker-green" 
                    : "bg-background text-muted-foreground border-border hover:border-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group h-full">
              <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-hacker-green/50 hover:shadow-[0_0_30px_rgba(0,255,65,0.1)] transition-all duration-300 h-full flex flex-col">
                
                {/* Image Area */}
                <div className="aspect-video relative bg-background overflow-hidden">
                   {/* Fallback Gradient or Actual Image */}
                   {post.image ? (
                     <Image 
                       src={post.image} 
                       alt={post.title} 
                       fill 
                       className="object-cover group-hover:scale-105 transition-transform duration-500" 
                     />
                   ) : (
                     <div className="absolute inset-0 bg-gradient-to-tr from-hacker-green/10 to-transparent" />
                   )}
                   
                   <div className="absolute top-4 left-4 bg-black/80 backdrop-blur text-hacker-green text-[10px] font-mono px-2 py-1 rounded border border-hacker-green/20">
                     //{post.category}
                   </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono mb-3">
                    <Calendar className="w-3 h-3" /> {post.date}
                  </div>
                  
                  <h3 className="text-xl font-bold font-manrope leading-tight mb-3 group-hover:text-hacker-green transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-6 flex-1">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center text-xs font-bold font-mono text-foreground mt-auto">
                    READ_DOSSIER <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

              </div>
            </Link>
          ))}

          {filteredPosts.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <div className="text-lg font-mono">NO_RECORDS_FOUND</div>
              <p className="text-muted-foreground">Adjust search parameters.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
