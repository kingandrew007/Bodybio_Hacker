"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ShoppingCart, Info, Check, X, Lightbulb, ZoomIn } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StoryQA } from "./StoryQA";

gsap.registerPlugin(ScrollTrigger);

export function BlogContent({ post }: { post: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  useGSAP(() => {
    // 1. Header Animations (Hero)
    const tl = gsap.timeline();
    tl.from(".gsap-header-item", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out"
    });

    // 2. Text Content & Headings (ScrollTrigger)
    gsap.utils.toArray<HTMLElement>(".gsap-fade-up").forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      });
    });

    // 3. Product Cards (Premium Reveal)
    gsap.utils.toArray<HTMLElement>(".gsap-product-card").forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
      });
    });

     // 4. List Items
    gsap.utils.toArray<HTMLElement>(".gsap-list").forEach((list) => {
      gsap.from(list.children, {
        scrollTrigger: {
            trigger: list,
            start: "top 85%"
        },
        x: -10,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
      });
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground pt-32 pb-20 px-6 transition-colors duration-300">
      
      {/* Lightbox Overlay */}
      {lightboxImg && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setLightboxImg(null)}>
           <button className="absolute top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 text-white">
             <X className="w-6 h-6" />
           </button>
           <div className="relative w-full max-w-5xl aspect-video">
             <Image src={lightboxImg} alt="Zoomed view" fill className="object-contain" />
           </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <Link href="/blog">
          <Button variant="ghost" size="sm" className="mb-8 pl-0 hover:bg-transparent hover:text-hacker-green">
            <ArrowLeft className="w-4 h-4 mr-2" /> BACK_TO_INTEL
          </Button>
        </Link>
        
        {/* Article Header */}
        <div className="mb-12 border-b border-border pb-8">
           <div className="flex items-center gap-3 mb-4 gsap-header-item">
             <span className="px-3 py-1 bg-hacker-green/10 text-hacker-green text-xs font-mono font-bold rounded border border-hacker-green/20">
               {post.category}
             </span>
             <span className="text-xs font-mono text-muted-foreground">{post.date}</span>
           </div>
           
           <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight gsap-header-item">
             {post.title}
           </h1>
           
           <p className="text-xl text-muted-foreground leading-relaxed gsap-header-item">
             {post.excerpt}
           </p>
        </div>

        {/* Article Content Loop */}
        <div className="space-y-8">
          {post.content.map((block: any, index: number) => {
            
            // A. STANDARD TEXT
            if (block.type === "text") {
              return (
                <p key={index} className="text-lg leading-relaxed text-foreground/90 gsap-fade-up">
                  {block.content}
                </p>
              );
            }

            // B. NEW HEADINGS
            if (block.type === "heading") {
               const Tag = block.level === 1 ? 'h2' : 'h3'; 
               const styles = block.level === 1 
                  ? "text-3xl font-bold mt-16 mb-6 font-mono text-hacker-green gsap-fade-up"
                  : "text-2xl font-bold mt-12 mb-4 text-foreground border-l-4 border-hacker-green pl-4 gsap-fade-up";
               
               return <Tag key={index} className={styles}>{block.content}</Tag>;
            }

            // C. NEW LISTS
            if (block.type === "unordered_list") {
               return (
                 <ul key={index} className="space-y-3 pl-6 mb-8 gsap-list">
                   {block.items.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-lg text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-hacker-green mt-2.5 flex-shrink-0" />
                        {item}
                      </li>
                   ))}
                 </ul>
               )
            }

            // D. SECTION HEADER (Legacy)
            if (block.type === "section_header") {
              return (
                <h2 key={index} className="text-3xl font-bold mt-12 mb-4 font-mono text-foreground border-l-4 border-hacker-green pl-4">
                  {block.content}
                </h2>
              );
            }

            // E. TIP BOX
            if (block.type === "tip_box") {
              return (
                <div key={index} className="my-8 p-6 bg-hacker-green/10 border border-hacker-green/20 rounded-xl flex gap-4 gsap-fade-up">
                   <Lightbulb className="w-6 h-6 text-hacker-green flex-shrink-0" />
                   <div>
                     <h4 className="font-bold text-hacker-green font-mono mb-1">{block.title}</h4>
                     <p className="text-sm text-foreground/80">{block.content}</p>
                   </div>
                </div>
              );
            }

            // F. CUSTOM PRODUCT CARD
            if (block.type === "custom_product_card") {
               return (
                 <div key={index} className="my-16 p-1 rounded-2xl bg-gradient-to-br from-border to-hacker-green/20 relative group gsap-product-card">
                   <div className="bg-card rounded-xl p-6 md:p-8 border border-border h-full relative overflow-hidden">
                     
                     <div className="absolute top-0 right-0 w-64 h-64 bg-hacker-green/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
 
                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative z-10">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 flex items-center justify-center bg-hacker-green text-black font-bold text-2xl rounded-xl shadow-[0_0_15px_rgba(0,255,65,0.4)]">
                             #{block.rank}
                           </div>
                           <div>
                             <h2 className="text-2xl font-bold font-mono leading-none">{block.name}</h2>
                             <span className="text-xs text-muted-foreground uppercase tracking-widest">Verified Selection</span>
                           </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                           <div className="text-2xl font-bold font-mono text-foreground">
                             {block.price ? `₹${block.price.toLocaleString('en-IN')}` : 'Check Price'}
                           </div>
                           <a href={block.link} target="_blank" rel="noopener noreferrer">
                              <Button className="bg-hacker-green text-black hover:bg-white font-bold transition-all shadow-lg hover:shadow-hacker-green/20">
                                <ShoppingCart className="w-4 h-4 mr-2" /> Check Price
                              </Button>
                           </a>
                        </div>
                     </div>
 
                     {/* Images Grid with Lightbox */}
                     <div className="grid grid-cols-2 gap-4 mb-8">
                        {block.images && block.images.map((img: string, i: number) => (
                          <div 
                            key={i} 
                            className="aspect-video bg-background rounded-lg border border-border relative overflow-hidden group/image cursor-zoom-in"
                            onClick={() => setLightboxImg(img)}
                          >
                             <Image 
                               src={img} 
                               alt={`${block.name} ${i+1}`} 
                               fill 
                               className="object-contain p-2 group-hover/image:scale-105 transition-transform duration-500" 
                             />
                             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center">
                               <ZoomIn className="text-white w-6 h-6" />
                             </div>
                          </div>
                        ))}
                     </div>
 
                     <div className="grid md:grid-cols-2 gap-8 relative z-10">
                        <div>
                           <h3 className="text-sm font-bold font-mono text-hacker-green mb-3 uppercase flex items-center gap-2">
                             <Info className="w-4 h-4" /> Why It's Great
                           </h3>
                           <p className="text-muted-foreground leading-relaxed text-sm">
                             {block.description}
                           </p>
                           
                           <div className="mt-6 p-4 bg-background rounded-lg border border-border/50">
                             <span className="text-xs font-bold text-foreground block mb-1 uppercase">Best For:</span>
                             <span className="text-sm text-hacker-green font-mono">{block.bestFor || "General Use"}</span>
                           </div>
 
                           {block.extraInfo && (
                             <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                               <div className="p-2 rounded bg-background border border-border/50">
                                 <div className="text-[10px] text-muted-foreground uppercase mb-1">Serving</div>
                                 <div className="text-xs font-bold">{block.extraInfo.servingSize}</div>
                               </div>
                               <div className="p-2 rounded bg-background border border-border/50">
                                 <div className="text-[10px] text-muted-foreground uppercase mb-1">Cost</div>
                                 <div className="text-xs font-bold text-hacker-green">{block.extraInfo.costPerScoop || block.extraInfo.costPerServing}</div>
                               </div>
                               
                               {/* DYNAMIC SLOT: PROTEIN OR STIM */}
                               {block.extraInfo.proteinPerScoop ? (
                                 <div className="p-2 rounded bg-background border border-border/50">
                                   <div className="text-[10px] text-muted-foreground uppercase mb-1">Protein</div>
                                   <div className="text-xs font-bold text-blue-400">{block.extraInfo.proteinPerScoop}</div>
                                 </div>
                               ) : block.extraInfo.stimLevel ? (
                                 <div className="p-2 rounded bg-background border border-border/50">
                                   <div className="text-[10px] text-muted-foreground uppercase mb-1">Stim</div>
                                   <div className="text-xs font-bold text-red-400">{block.extraInfo.stimLevel}</div>
                                 </div>
                               ) : null}
                               
                             </div>
                           )}
                        </div>
 
                        <div>
                           <h3 className="text-sm font-bold font-mono text-foreground mb-3 uppercase">Key Highlights</h3>
                           <ul className="space-y-3">
                             {block.highlights && block.highlights.map((point: string, i: number) => (
                               <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                                 <Check className="w-4 h-4 text-hacker-green mt-0.5 flex-shrink-0" />
                                 {point}
                               </li>
                             ))}
                           </ul>
                        </div>
                     </div>
 
                   </div>
                 </div>
               );
             }

            // G. STORY QA
            if (block.type === "story_qa") {
               return <StoryQA key={index} question={block.question} answer={block.answer} />;
            }
 
             return null;
           })}
        </div>

      </div>
    </div>
  );
}
