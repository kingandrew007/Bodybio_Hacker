"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { 
  ArrowRight, ShieldCheck, Zap, Microscope, 
  Database, Activity, Lock, ScanLine, Star,
  Terminal, ChevronDown, MessageSquare
} from "lucide-react";
import Image from "next/image";
// 1. IMPORT PRODUCTS DATA
import { PRODUCTS } from "@/lib/static-data";

gsap.registerPlugin(ScrollTrigger);

export function HeroClient() {
  const container = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // 1. BOOT SEQUENCE
    tl.to(".boot-bar", { width: "100%", duration: 1, ease: "linear" })
      .to(".boot-screen", { yPercent: -100, duration: 0.8, ease: "power2.inOut" })
      .from(".hero-word", { y: 100, opacity: 0, stagger: 0.1, duration: 1 })
      .from(".hero-sub", { opacity: 0, y: 20, duration: 0.8 }, "-=0.5")
      .from(".hero-btn", { scale: 0.9, opacity: 0, duration: 0.5 }, "-=0.3");

    // 2. SCROLL ANIMATIONS
    gsap.from(".pillar-card", {
      y: 100, opacity: 0, rotateX: -15, stagger: 0.1, duration: 1,
      scrollTrigger: { trigger: ".pillars-section", start: "top 75%" }
    });

    gsap.from(".product-card-anim", {
      x: 100, opacity: 0, stagger: 0.1, duration: 0.8,
      scrollTrigger: { trigger: ".trending-section", start: "top 70%" }
    });
    
    gsap.from(".testimonial-card", {
      y: 50, opacity: 0, stagger: 0.1, duration: 0.8,
      scrollTrigger: { trigger: ".testimonials-section", start: "top 75%" }
    });

  }, { scope: container });

  // 3D Tilt Logic
  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    gsap.to(card, { 
      rotateX: ((y - centerY) / centerY) * -5, 
      rotateY: ((x - centerX) / centerX) * 5, 
      scale: 1.02, 
      duration: 0.3, 
      ease: "power2.out", 
      transformPerspective: 1000 
    });
  };

  const resetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.5 });
  };

  return (
    <div ref={container} className="min-h-screen bg-background text-foreground overflow-x-hidden relative transition-colors duration-300">
      
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

      {/* 3. TRENDING PRODUCTS (AUTOMATED) */}
      <section className="trending-section py-20 px-6 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold font-mono">TOP_RATED_INTEL</h2>
            <p className="text-muted-foreground mt-2">Latest verified uploads to the database.</p>
          </div>
          <Link href="/shop" className="text-hacker-green text-xs font-mono border-b border-hacker-green pb-1 hover:opacity-80">VIEW_FULL_DATABASE</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {/* 2. AUTOMATICALLY MAP TOP 3 PRODUCTS */}
           {PRODUCTS.slice(0, 3).map((product) => (
             <TrendingCard 
               key={product._id}
               name={product.name} 
               category={product.category.toUpperCase()} 
               score={product.ratings.overall} 
               price={product.pricing.current_price.toLocaleString()}
               image={product.images.thumbnail}
               slug={product.slug}
             />
           ))}
        </div>
      </section>

      {/* 4. PILLARS */}
      <section className="pillars-section py-20 px-6 relative z-10 bg-card/30 border-y border-border backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold font-mono mb-4">THE INFRASTRUCTURE</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <PillarCard icon={Microscope} title="RADICAL TRANSPARENCY" desc="We upload raw PDF lab reports. No editing, no mercy." onMouseMove={handleTilt} onMouseLeave={resetTilt} />
            <PillarCard icon={Database} title="DATA SOVEREIGNTY" desc="Our database is immutable. Results cannot be deleted by bribes." onMouseMove={handleTilt} onMouseLeave={resetTilt} />
            <PillarCard icon={ScanLine} title="PRECISION ANALYTICS" desc="Scored on heavy metal PPM, oxidation, and bioavailability." onMouseMove={handleTilt} onMouseLeave={resetTilt} />
            <PillarCard icon={Lock} title="ZERO BIAS" desc="We do not accept free samples. We buy anonymously from retail." onMouseMove={handleTilt} onMouseLeave={resetTilt} />
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="testimonials-section py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold font-mono mb-12 text-center">FIELD_REPORTS</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <TestimonialCard 
             user="Agent_Sarah" 
             msg="The heavy metal data on Fish Oils saved me. I was taking a brand that was basically lead soup. Switched immediately." 
           />
           <TestimonialCard 
             user="Operative_Mike" 
             msg="Finally, a site that doesn't just read the label back to me. The amino spiking detection tool is a game changer." 
           />
           <TestimonialCard 
             user="Biohacker_X" 
             msg="Clean UI, cleaner data. The cost-per-gram analysis exposed how much I was overpaying for marketing." 
           />
        </div>
      </section>

      {/* 6. FAQ DEBRIEFING */}
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

      {/* 7. FINAL CTA */}
      <section className="py-20 bg-hacker-green text-black text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="relative z-10 px-6">
           <h2 className="text-5xl md:text-7xl font-bold font-mono tracking-tighter mb-6">INITIATE PROTOCOL</h2>
           <p className="text-xl font-medium mb-8 max-w-2xl mx-auto">
             Stop guessing what you put in your body. Access the verified database now.
           </p>
           <Link href="/shop">
             <Button className="bg-black text-white hover:bg-gray-900 border-none h-16 px-12 text-xl font-bold">
               ENTER SHOP
             </Button>
           </Link>
        </div>
      </section>

    </div>
  );
}

// ------------------------------------
// SUB-COMPONENTS
// ------------------------------------

// 3. UPDATED TRENDING CARD TO BE A LINK
function TrendingCard({ name, category, score, price, image, slug }: any) {
  return (
    <Link href={`/reviews/${category.toLowerCase()}/${slug}`} className="block h-full">
      <div className="product-card-anim group relative p-4 rounded-xl bg-card border border-border hover:border-hacker-green transition-all h-full flex flex-col">
        <div className="aspect-square bg-background rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
           {/* Fallback image logic */}
           <div className="absolute inset-0 bg-gradient-to-tr from-hacker-green/5 to-transparent" />
           <Image src={image} alt={name} width={200} height={200} className="object-contain p-4 group-hover:scale-110 transition-transform duration-500" />
           <div className="absolute top-2 right-2 bg-black text-hacker-green text-xs font-mono px-2 py-1 rounded border border-hacker-green/30">
             {score}/10
           </div>
        </div>
        <div className="text-xs font-mono text-muted-foreground mb-1">{category}</div>
        <h3 className="font-bold text-foreground text-lg leading-tight mb-3 flex-1">{name}</h3>
        <div className="flex items-center justify-between border-t border-border pt-3 mt-auto">
          <span className="font-mono text-foreground font-bold">₹{price}</span>
          <Button size="sm" variant="ghost" className="h-8 text-xs hover:bg-hacker-green hover:text-black">view_data</Button>
        </div>
      </div>
    </Link>
  )
}

function PillarCard({ icon: Icon, title, desc, onMouseMove, onMouseLeave }: any) {
  return (
    <div className="pillar-card p-8 rounded-2xl bg-background border border-border hover:border-hacker-green/50 transition-colors h-full flex flex-col justify-between group" onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <div>
        <div className="w-12 h-12 rounded bg-card flex items-center justify-center mb-6 text-muted-foreground group-hover:text-hacker-green transition-colors">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold font-mono mb-3 text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function TestimonialCard({ user, msg }: any) {
  return (
    <div className="testimonial-card p-6 rounded-xl bg-card border border-border relative">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-hacker-green/20 flex items-center justify-center">
          <MessageSquare className="w-4 h-4 text-hacker-green" />
        </div>
        <div className="text-sm font-bold font-mono text-foreground">{user}</div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">"{msg}"</p>
    </div>
  )
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