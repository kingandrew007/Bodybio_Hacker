"use client";

import { useCompare } from "@/lib/compare-context";
import { PRODUCTS } from "@/lib/static-data";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { X, Check, Minus, AlertTriangle, ShieldCheck, Zap } from "lucide-react";

export function CompareClient() {
  const { items, removeFromCompare } = useCompare();

  const products = items.map(slug => PRODUCTS.find(p => p.slug === slug)).filter(Boolean) as typeof PRODUCTS;

  if (products.length === 0) {
    return (
      <div className="min-h-screen pt-32 text-center px-6">
         <h1 className="text-3xl font-mono font-bold mb-4">BUFFER_EMPTY</h1>
         <p className="text-muted-foreground mb-8">Select products from the shop to initiate comparison protocol.</p>
         <Link href="/shop"><Button variant="hacker">GO TO SHOP</Button></Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 max-w-7xl mx-auto bg-background text-foreground transition-colors duration-300">
      
      <div className="mb-10 flex items-center justify-between">
        <div>
           <h1 className="text-4xl font-bold font-mono">COMPARISON_MATRIX_V2</h1>
           <p className="text-xs font-mono text-hacker-green mt-1">
             // ANALYZING {products.length} ASSETS
           </p>
        </div>
        <Link href="/shop"><Button variant="outline">Add More</Button></Link>
      </div>

      <div className="overflow-x-auto custom-scrollbar pb-10">
        <table className="w-full min-w-[1000px] border-collapse">
          <thead>
            <tr>
              <th className="p-4 text-left w-48 bg-card border border-border sticky left-0 z-10">METRIC</th>
              {products.map(p => (
                <th key={p._id} className="p-6 border border-border bg-card/50 align-top relative w-64 min-w-[250px]">
                  <button onClick={() => removeFromCompare(p.slug)} className="absolute top-2 right-2 text-muted-foreground hover:text-red-500"><X className="w-4 h-4" /></button>
                  <div className="h-32 relative mb-4 flex items-center justify-center">
                    <Image src={p.images.thumbnail} alt={p.name} width={100} height={100} className="object-contain" />
                  </div>
                  <div className="font-bold text-lg leading-tight mb-1">{p.name}</div>
                  <div className="text-xs font-mono text-muted-foreground mb-2">{p.brand}</div>
                  <div className="text-lg font-bold text-hacker-green">₹{p.pricing.current_price}</div>
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody className="font-mono text-sm">
            {/* --- SECTION 1: CORE STATS --- */}
            <tr className="bg-muted/50"><td colSpan={products.length + 1} className="p-2 text-xs font-bold text-center border border-border text-muted-foreground tracking-widest">CORE_METRICS</td></tr>

            <tr>
              <td className="p-4 font-bold border border-border bg-card sticky left-0 z-10">LAB SCORE</td>
              {products.map(p => (
                <td key={p._id} className="p-4 border border-border text-center">
                   <span className={`px-3 py-1 rounded font-bold ${p.ratings.overall >= 8 ? 'bg-hacker-green text-black' : 'bg-yellow-500 text-black'}`}>
                     {p.ratings.overall}/10
                   </span>
                </td>
              ))}
            </tr>

            <tr>
              <td className="p-4 font-bold border border-border bg-card sticky left-0 z-10">PROTEIN / SERVE</td>
              {products.map(p => (
                <td key={p._id} className="p-4 border border-border text-center font-bold">
                  {p.specs.activeIngredientAmount}g
                </td>
              ))}
            </tr>

            {/* 🔥 NEW: PROTEIN PERCENTAGE CALCULATION */}
            <tr>
              <td className="p-4 font-bold border border-border bg-card sticky left-0 z-10 text-blue-500">PROTEIN PURITY %</td>
              {products.map(p => {
                const purity = ((p.specs.activeIngredientAmount / p.specs.servingSize) * 100).toFixed(1);
                return (
                  <td key={p._id} className="p-4 border border-border text-center">
                    <div className="text-lg font-bold">{purity}%</div>
                    <div className="text-[10px] text-muted-foreground">of powder is actual protein</div>
                  </td>
                )
              })}
            </tr>

            <tr>
              <td className="p-4 font-bold border border-border bg-card sticky left-0 z-10">COST PER SERVING</td>
              {products.map(p => {
                // Assuming typical tub is 1kg (approx 30 servings). You might want to add 'totalServings' to your data later.
                const costPerServe = (p.pricing.current_price / 30).toFixed(0); 
                return (
                  <td key={p._id} className="p-4 border border-border text-center">
                    ₹{costPerServe} <span className="text-[10px] text-muted-foreground">/ scoop</span>
                  </td>
                )
              })}
            </tr>

            {/* --- SECTION 2: INGREDIENT QUALITY --- */}
            <tr className="bg-muted/50"><td colSpan={products.length + 1} className="p-2 text-xs font-bold text-center border border-border text-muted-foreground tracking-widest">INGREDIENT_QUALITY</td></tr>

            <tr>
              <td className="p-4 font-bold border border-border bg-card sticky left-0 z-10">SWEETENER</td>
              {products.map(p => (
                <td key={p._id} className="p-4 border border-border text-center text-xs">
                   {p.extended_specs?.sweetener || "N/A"}
                   {p.extended_specs?.sweetener?.includes("Aspartame") && <AlertTriangle className="inline w-3 h-3 text-red-500 ml-1" />}
                </td>
              ))}
            </tr>

            <tr>
              <td className="p-4 font-bold border border-border bg-card sticky left-0 z-10">FILTRATION</td>
              {products.map(p => (
                <td key={p._id} className="p-4 border border-border text-center text-xs">
                   {p.extended_specs?.filtration || "N/A"}
                </td>
              ))}
            </tr>

            <tr>
              <td className="p-4 font-bold border border-border bg-card sticky left-0 z-10">BCAA PROFILE</td>
              {products.map(p => (
                <td key={p._id} className="p-4 border border-border text-center text-xs">
                   {p.extended_specs?.bcaa || "N/A"}
                </td>
              ))}
            </tr>

            {/* --- SECTION 3: TRUST FACTOR --- */}
            <tr className="bg-muted/50"><td colSpan={products.length + 1} className="p-2 text-xs font-bold text-center border border-border text-muted-foreground tracking-widest">TRUST_PROTOCOL</td></tr>

            <tr>
              <td className="p-4 font-bold border border-border bg-card sticky left-0 z-10">CERTIFICATIONS</td>
              {products.map(p => (
                <td key={p._id} className="p-4 border border-border text-center">
                   <div className="flex flex-wrap justify-center gap-1">
                     {p.extended_specs?.certifications?.map((cert: string, i: number) => (
                       <span key={i} className="px-2 py-0.5 bg-green-500/10 text-green-500 rounded text-[10px] border border-green-500/20">
                         {cert}
                       </span>
                     )) || "-"}
                   </div>
                </td>
              ))}
            </tr>

            <tr>
              <td className="p-4 border border-border bg-card sticky left-0 z-10"></td>
              {products.map(p => (
                <td key={p._id} className="p-4 border border-border text-center">
                   <Link href={`/reviews/${p.category}/${p.slug}`}>
                     <Button className="w-full" variant="hacker">VIEW FULL INTEL</Button>
                   </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
