"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SlidersHorizontal, ArrowUpDown, Star, Search } from "lucide-react";
import { toast } from "sonner";
import { TestTube } from "lucide-react";
// Mock Data (Replace with DB data later)
import { PRODUCTS } from "@/lib/static-data";
// Mock Data (Replace with DB data later)
// const MOCK_PRODUCTS = [ ...replaced... ];

export default function ExplorePage() {
  const [sortBy, setSortBy] = useState("recommended");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filtering Logic
  const filteredProducts = PRODUCTS
    .filter(p => selectedCategory === "All" || p.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === "price_low") return a.pricing.current_price - b.pricing.current_price;
      if (sortBy === "price_high") return b.pricing.current_price - a.pricing.current_price;
      if (sortBy === "rating") return b.ratings.overall - a.ratings.overall;
      return 0;
    });

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
      
      {/* 1. SIDEBAR FILTERS (Sticky) */}
      <aside className="w-full md:w-64 shrink-0 space-y-8">
        <div className="sticky top-24">
          <div className="flex items-center gap-2 mb-6 text-foreground">
            <SlidersHorizontal className="w-5 h-5" />
            <h2 className="font-bold font-mono uppercase tracking-wider">Filters</h2>
          </div>

          {/* Category Filter */}
          <div className="space-y-3 mb-8">
            <h3 className="text-sm font-bold text-gray-500 uppercase font-mono">Category</h3>
            {['All', 'Whey', 'Omega 3', 'Creatine', 'Multivitamins'].map((cat) => (
              <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="radio" 
                  name="category" 
                  checked={selectedCategory === cat}
                  onChange={() => setSelectedCategory(cat)}
                  className="accent-hacker-green w-4 h-4"
                />
                <span className="text-sm group-hover:text-hacker-green transition-colors text-foreground">{cat}</span>
              </label>
            ))}
          </div>

          {/* Price Range (Visual Only for now) */}
          <div className="space-y-3">
             <h3 className="text-sm font-bold text-gray-500 uppercase font-mono">Price Range</h3>
             <input type="range" className="w-full accent-hacker-green" />
             <div className="flex justify-between text-xs font-mono text-foreground">
               <span>₹500</span>
               <span>₹10,000+</span>
             </div>
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT */}
      <div className="flex-1">
        
        {/* Top Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold font-manrope text-foreground">Explore Supplements</h1>
          
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select 
              className="bg-card border border-border rounded px-3 py-2 text-sm focus:outline-none focus:border-hacker-green text-foreground"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recommended">Recommended</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product._id} className="group relative border border-border bg-card rounded-xl overflow-hidden hover:border-hacker-green/50 transition-all duration-300">
              
              {/* Image Area */}
              <div className="aspect-square bg-white flex items-center justify-center p-6 relative">
                 <div className="absolute top-3 right-3 z-10 bg-black/80 text-white text-xs font-mono px-2 py-1 rounded border border-white/20 flex items-center gap-1">
                   <Star className="w-3 h-3 text-hacker-green fill-hacker-green" />
                   {product.ratings.overall}
                 </div>
                 {/* Placeholder Image Logic */}
                 <div className="w-32 h-32 bg-gray-200 rounded-full blur-xl absolute" />
                 <Image 
                   src={product.images.thumbnail} // Ensure you have a placeholder image here
                   alt={product.name}
                   width={200}
                   height={200}
                   className="object-contain relative z-10 group-hover:scale-110 transition-transform duration-500"
                 />
              </div>

              {/* Content Area */}
              <div className="p-5">
                <div className="text-xs font-mono text-hacker-green mb-1">{product.category}</div>
                <h3 className="font-bold text-lg leading-tight mb-2 text-foreground">{product.name}</h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xl font-bold text-foreground">₹{product.pricing.current_price}</span>
                 <Button 
  size="sm" 
  variant="outline" 
  className="text-xs hover:border-hacker-green hover:text-hacker-green transition-colors"
  onClick={() => {
    toast.success("SAMPLE_ACQUIRED", {
      description: `${product.name} added to comparison queue.`,
      icon: <TestTube className="w-4 h-4 text-hacker-green" />,
      action: {
        label: "COMPARE (1)",
        onClick: () => console.log("Go to compare")
      }
    });
  }}
>
  Add to Queue
</Button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}