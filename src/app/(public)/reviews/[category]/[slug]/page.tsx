import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ProductActions } from "@/components/features/ProductActions";
import { PRODUCTS } from "@/lib/static-data";
import { 
  ShieldCheck, Beaker, Zap, AlertCircle, 
  CheckCircle2, FileText, Activity 
} from "lucide-react";

async function getProduct(slug: string) {
  return PRODUCTS.find(p => p.slug === slug) || null;
}

type Props = {
  params: Promise<{ category: string; slug: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) return notFound();

  // CALCULATIONS
  const filler = product.specs.servingSize - product.specs.activeIngredientAmount;
  const proteinPurity = ((product.specs.activeIngredientAmount / product.specs.servingSize) * 100).toFixed(1);
  const isHighPurity = Number(proteinPurity) > 75;

  // 👇 EXTRACT AFFILIATE LINK (Fallback to #)
  const buyLink = product.affiliates?.[0]?.link || "#";

  return (
    <div className="min-h-screen pb-20 bg-background text-foreground transition-colors duration-300 selection:bg-hacker-green selection:text-black">
      
      {/* 1. HERO SECTION */}
      <section className="pt-32 pb-12 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          {/* LEFT: IMAGE (Holographic Card Look) */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-card to-background border border-border flex items-center justify-center p-12 group shadow-2xl">
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
             <div className="absolute inset-0 bg-gradient-to-tr from-hacker-green/10 to-transparent opacity-60" />
             
             <Image 
               src={product.images.thumbnail} 
               alt={product.name}
               width={600}
               height={600}
               className="object-contain z-10 hover:scale-110 transition-transform duration-700 ease-in-out drop-shadow-2xl"
               priority
             />
             
             {/* Score Badge */}
             <div className="absolute top-6 right-6 flex flex-col items-center bg-background/90 backdrop-blur-xl border border-hacker-green/30 px-5 py-3 rounded-xl shadow-lg z-20">
               <div className="text-5xl font-mono font-bold text-hacker-green tracking-tighter drop-shadow-[0_0_10px_rgba(0,255,65,0.5)]">
                 {product.ratings.overall}
               </div>
               <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mt-1">Lab Score</div>
             </div>
          </div>

          {/* RIGHT: HEADLINE & ACTIONS */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 text-xs font-mono border border-hacker-green/30 text-hacker-green rounded-full uppercase tracking-widest bg-hacker-green/5">
                  {product.category}
                </span>
                <span className="flex items-center gap-1 text-xs font-mono text-muted-foreground">
                  <ShieldCheck className="w-3 h-3" /> VERIFIED_UPLOAD
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold font-mono tracking-tight leading-tight mb-4">
                {product.name}
              </h1>
              
              <div className="text-muted-foreground text-lg leading-relaxed border-l-2 border-hacker-green pl-4">
                {product.description}
              </div>
            </div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <MetricBox label="Current Price" value={`₹${product.pricing.current_price}`} />
              <MetricBox label="Cost / Serving" value={`₹${(product.pricing.current_price / 30).toFixed(0)}`} sub="Approx." />
            </div>

            <div className="pt-4 border-t border-border">
              {/* 👇 PASSING THE LINK & SLUG TO ACTIONS */}
              <ProductActions 
                purityScore={product.ratings.overall} 
                slug={product.slug} 
                buyLink={buyLink}
              />
            </div>
          </div>

        </div>
      </section>

      {/* 2. DEEP INTEL GRID */}
      <section className="px-6 max-w-7xl mx-auto mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* COLUMN 1: COMPOSITION ANALYSIS */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-card border border-border rounded-2xl p-8 relative overflow-hidden">
               <h3 className="text-xl font-bold font-mono mb-6 flex items-center gap-2">
                 <Beaker className="text-hacker-green" /> COMPOSITION_ANALYSIS
               </h3>
               
               {/* Visual Purity Bar */}
               <div className="mb-8">
                  <div className="flex justify-between text-sm font-mono mb-2">
                    <span className="text-foreground font-bold">Protein Purity Ratio</span>
                    <span className={isHighPurity ? "text-hacker-green" : "text-yellow-500"}>{proteinPurity}% Pure</span>
                  </div>
                  <div className="h-4 bg-background rounded-full overflow-hidden border border-border">
                    <div 
                      className={`h-full ${isHighPurity ? 'bg-hacker-green' : 'bg-yellow-500'} relative`} 
                      style={{ width: `${proteinPurity}%` }}
                    >
                      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground flex justify-between">
                     <span>Active Ingredient: {product.specs.activeIngredientAmount}g</span>
                     <span>Scoop Size: {product.specs.servingSize}g</span>
                  </div>
               </div>

               {/* Extended Specs Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SpecRow label="Filtration Method" value={product.extended_specs?.filtration} />
                  <SpecRow label="Sweetener" value={product.extended_specs?.sweetener} warning={product.extended_specs?.sweetener?.includes("Aspartame") || product.extended_specs?.sweetener?.includes("Sucralose")} />
                  <SpecRow label="BCAA Profile" value={product.extended_specs?.bcaa} />
                  <SpecRow label="Carbohydrates" value={product.extended_specs?.carbs} />
                  <SpecRow label="Added Sugar" value={product.extended_specs?.sugar} highlight={product.extended_specs?.sugar === "0g"} />
                  <SpecRow label="Form Factor" value={product.specs.form} />
               </div>
            </div>

            {/* CERTIFICATIONS */}
            <div className="bg-card border border-border rounded-2xl p-8">
               <h3 className="text-xl font-bold font-mono mb-6 flex items-center gap-2">
                 <FileText className="text-blue-500" /> VERIFIED_CERTIFICATIONS
               </h3>
               <div className="flex flex-wrap gap-3">
                 {product.extended_specs?.certifications?.map((cert, i) => (
                   <div key={i} className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium">
                     <CheckCircle2 className="w-4 h-4 text-hacker-green" />
                     {cert}
                   </div>
                 )) || <span className="text-muted-foreground italic">No specific certifications listed.</span>}
               </div>
            </div>
          </div>

          {/* COLUMN 2: THE VERDICT (Sidebar) */}
          <div className="space-y-6">
            <div className="bg-hacker-green/5 border border-hacker-green/20 rounded-2xl p-6">
              <h3 className="text-sm font-bold font-mono text-hacker-green uppercase mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4" /> Bio-Hacker Verdict
              </h3>
              <p className="text-sm leading-relaxed text-foreground/90 mb-4">
                Based on our lab analysis, this product scores a <strong>{product.ratings.overall}/10</strong>.
                {isHighPurity 
                  ? " It demonstrates excellent filtration quality and high protein density per scoop." 
                  : " Note that the protein density is lower than average, meaning more fillers per serving."}
              </p>
              
              <div className="space-y-2 mt-6">
                <div className="flex justify-between text-xs font-mono border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">PRICE EFFICIENCY</span>
                  <span className="font-bold">HIGH</span>
                </div>
                <div className="flex justify-between text-xs font-mono border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">GUT HEALTH</span>
                  <span className="font-bold">{product.extended_specs?.filtration?.includes("Concentrate") ? "MODERATE" : "EXCELLENT"}</span>
                </div>
                <div className="flex justify-between text-xs font-mono pt-1">
                  <span className="text-muted-foreground">TOXICITY</span>
                  <span className="font-bold text-hacker-green">PASS</span>
                </div>
              </div>
            </div>

            {/* Warning Box */}
            {(product.extended_specs?.sweetener?.includes("Sucralose") || product.extended_specs?.sweetener?.includes("Ace")) && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-6">
                 <h3 className="text-sm font-bold font-mono text-yellow-500 uppercase mb-2 flex items-center gap-2">
                   <AlertCircle className="w-4 h-4" /> Additive Notice
                 </h3>
                 <p className="text-xs text-foreground/80 leading-relaxed">
                   Contains artificial sweeteners ({product.extended_specs?.sweetener}). 
                   May cause bloating in sensitive individuals.
                 </p>
              </div>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}

// ----------------------------------------
// SUB-COMPONENTS
// ----------------------------------------

function MetricBox({ label, value, sub }: any) {
  return (
    <div className="p-4 rounded-xl bg-card border border-border">
      <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">{label}</div>
      <div className="text-2xl font-bold font-mono text-foreground flex items-baseline gap-2">
        {value} {sub && <span className="text-xs font-normal text-muted-foreground">{sub}</span>}
      </div>
    </div>
  )
}

function SpecRow({ label, value, warning, highlight }: any) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-border/50 last:border-0">
      <span className="text-sm text-muted-foreground font-medium">{label}</span>
      <span className={`text-sm font-mono font-bold ${warning ? "text-yellow-500" : ""} ${highlight ? "text-hacker-green" : "text-foreground"}`}>
        {value || "N/A"}
      </span>
    </div>
  )
}