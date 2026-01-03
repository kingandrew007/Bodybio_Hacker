"use client";

import { useCompare } from "@/lib/compare-context";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { X, ArrowRight, Scale } from "lucide-react";
import { PRODUCTS } from "@/lib/static-data"; // To get names/images

export function CompareTray() {
  const { items, removeFromCompare, clearCompare } = useCompare();

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 p-4 animate-in slide-in-from-bottom-10">
      <div className="max-w-4xl mx-auto bg-card border border-hacker-green/30 shadow-[0_0_30px_rgba(0,255,65,0.1)] rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-xl">
        
        {/* Header */}
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-full bg-hacker-green/20 flex items-center justify-center text-hacker-green">
             <Scale className="w-5 h-5" />
           </div>
           <div>
             <div className="text-xs font-mono text-muted-foreground">ANALYSIS_BUFFER</div>
             <div className="font-bold text-foreground">{items.length} / 3 Selected</div>
           </div>
        </div>

        {/* Selected Items Previews */}
        <div className="flex items-center gap-2">
          {items.map((slug) => {
            const product = PRODUCTS.find(p => p.slug === slug);
            if (!product) return null;
            return (
              <div key={slug} className="relative group">
                 <img src={product.images.thumbnail} alt="thumb" className="w-12 h-12 object-contain bg-background rounded border border-border" />
                 <button 
                   onClick={() => removeFromCompare(slug)}
                   className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                 >
                   <X className="w-3 h-3" />
                 </button>
              </div>
            )
          })}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button onClick={clearCompare} variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-red-500">
            Clear
          </Button>
          <Link href="/compare">
            <Button variant="hacker" size="sm" className="font-bold text-black">
              RUN_COMPARISON <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}