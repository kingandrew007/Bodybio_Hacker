import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { 
  ArrowRight, ShieldCheck, Zap, Microscope, 
  Database, Activity, Lock, ScanLine, Star,
  Terminal, ChevronDown, MessageSquare
} from "lucide-react";
import { PRODUCTS } from "@/lib/static-data";

// ------------------------------------------------------------------
// 1. TRENDING / TOP RATED INTEL
// ------------------------------------------------------------------
export function TrendingProducts() {
  // Desktop: Show Top 4
  const topProductsDesktop = PRODUCTS.slice(0, 4);
  // Mobile: Show Top 3 only (User request)
  const topProductsMobile = PRODUCTS.slice(0, 3);

  return (
    <section className="trending-section py-16 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold font-mono">TOP_RATED_INTEL</h2>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">Latest verified uploads to the database.</p>
        </div>
        <Link href="/shop" className="text-hacker-green text-xs font-mono border-b border-hacker-green pb-1 hover:opacity-80">
          VIEW_FULL_DATABASE
        </Link>
      </div>

      {/* MOBILE: Horizontal Scroll (Snap) */}
      <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-4 pb-6 -mx-6 px-6 no-scrollbar">
         {topProductsMobile.map((product) => (
           <div key={product._id} className="snap-center shrink-0 w-[85vw] h-full">
             <TrendingCard 
               name={product.name} 
               category={product.category.toUpperCase()} 
               score={product.ratings.overall} 
               price={product.pricing.current_price.toLocaleString()}
               image={product.images.thumbnail}
               slug={product.slug}
             />
           </div>
         ))}
      </div>

      {/* DESKTOP: Grid System */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {topProductsDesktop.map((product) => (
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
  );
}

function TrendingCard({ name, category, score, price, image, slug }: any) {
  return (
    <Link href={`/reviews/${category.toLowerCase()}/${slug}`} className="block h-full group">
      <div className="relative p-4 rounded-xl bg-card border border-border group-hover:border-hacker-green transition-all h-full flex flex-col shadow-sm group-hover:shadow-md">
        
        {/* Image Container */}
        <div className="aspect-square bg-background rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-tr from-hacker-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
           <Image 
             src={image} 
             alt={name} 
             width={200} 
             height={200} 
             className="object-contain p-4 group-hover:scale-105 transition-transform duration-300" 
           />
           <div className="absolute top-2 right-2 bg-black text-hacker-green text-xs font-mono px-2 py-1 rounded border border-hacker-green/30 font-bold shadow-sm">
             {score}/10
           </div>
        </div>

        {/* Content */}
        <div className="text-[10px] font-mono text-muted-foreground mb-1 uppercase tracking-wider">{category}</div>
        <h3 className="font-bold text-foreground text-base leading-tight mb-3 flex-1 group-hover:text-hacker-green transition-colors">
          {name}
        </h3>
        
        <div className="flex items-center justify-between border-t border-border pt-3 mt-auto">
          <span className="font-mono text-foreground font-bold text-sm">₹{price}</span>
          <span className="text-[10px] font-mono text-hacker-green opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
             VIEW_DATA <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  )
}

// ------------------------------------------------------------------
// 2. INFRASTRUCTURE / PILLARS
// ------------------------------------------------------------------
export function Infrastructure() {
  return (
    <section className="pillars-section py-20 px-6 relative z-10 bg-card/30 border-y border-border backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4">THE INFRASTRUCTURE</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Built on a foundation of unadulterated truth.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <PillarCard icon={Microscope} title="RADICAL TRANSPARENCY" desc="We upload raw PDF lab reports. No editing, no mercy." />
          <PillarCard icon={Database} title="DATA SOVEREIGNTY" desc="Our database is immutable. Results cannot be deleted by bribes." />
          <PillarCard icon={ScanLine} title="PRECISION ANALYTICS" desc="Scored on heavy metal PPM, oxidation, and bioavailability." />
          <PillarCard icon={Lock} title="ZERO BIAS" desc="We do not accept free samples. We buy anonymously from retail." />
        </div>
      </div>
    </section>
  );
}

function PillarCard({ icon: Icon, title, desc }: any) {
  return (
    <div className="p-8 rounded-2xl bg-background border border-border hover:border-hacker-green/50 transition-colors h-full flex flex-col">
      <div className="w-12 h-12 rounded bg-card flex items-center justify-center mb-6 text-muted-foreground group-hover:text-hacker-green transition-colors border border-border">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold font-mono mb-3 text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}

// ------------------------------------------------------------------
// 3. TESTIMONIALS
// ------------------------------------------------------------------
export function Testimonials() {
  return (
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
  );
}

function TestimonialCard({ user, msg }: any) {
  return (
    <div className="p-6 rounded-xl bg-card border border-border relative">
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

// ------------------------------------------------------------------
// 4. CALL TO ACTION
// ------------------------------------------------------------------
export function CallToAction() {
  return (
    <section className="py-20 bg-hacker-green text-black text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      <div className="relative z-10 px-6">
         <h2 className="text-4xl md:text-6xl font-bold font-mono tracking-tighter mb-6">INITIATE PROTOCOL</h2>
         <p className="text-lg md:text-xl font-medium mb-8 max-w-2xl mx-auto opacity-90">
           Stop guessing what you put in your body. Access the verified database now.
         </p>
         <Link href="/shop">
           <Button className="bg-black text-white hover:bg-gray-900 border-none h-14 px-10 text-lg font-bold shadow-xl">
             ENTER SHOP
           </Button>
         </Link>
      </div>
    </section>
  );
}
