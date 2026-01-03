"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { ArrowUpDown, ChevronDown, Check, X } from "lucide-react";

// DEFINED CATEGORIES (Add as many as you want here)
const CATEGORIES = [
  "all", 
  "whey", 
  "omega-3", 
  "creatine", 
  "vitamins", 
  "pre-workout", 
  "bcaa", 
  "fat-burners", 
  "gear"
];

export function ShopToolbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // URL Params State
  const currentSort = searchParams.get("sort") || "newest";
  const currentCategory = searchParams.get("category") || "all";
  const currentMinPrice = searchParams.get("minPrice") || "";
  const currentMaxPrice = searchParams.get("maxPrice") || "";
  const currentRating = searchParams.get("rating") || "";

  // Local State
  const [priceRange, setPriceRange] = useState({ min: currentMinPrice, max: currentMaxPrice });

  // Logic: Switch to Dropdown if > 4 Categories
  const useCategoryDropdown = CATEGORIES.length > 4;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateFilter = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") params.delete(key);
      else params.set(key, value);
    });
    router.push(`/shop?${params.toString()}`);
    setOpenDropdown(null);
  };

  const clearFilters = () => {
    router.push("/shop");
    setPriceRange({ min: "", max: "" });
  };

  return (
    <div className="flex flex-col gap-4 mb-8 sticky top-20 z-30" ref={dropdownRef}>
      
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between p-4 border border-border bg-card/80 backdrop-blur-md rounded-xl shadow-sm">
        
        {/* LEFT: Filters Group */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          
          {/* --- 1. SMART CATEGORY SELECTOR --- */}
          {useCategoryDropdown ? (
            // MODE A: DROPDOWN (For many categories)
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === "category" ? null : "category")}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono border transition-all ${
                  currentCategory !== "all"
                    ? "border-hacker-green text-black bg-hacker-green font-bold shadow-[0_0_10px_rgba(0,255,65,0.3)]"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {currentCategory === "all" ? "CATEGORY" : currentCategory.toUpperCase()} 
                <ChevronDown className="w-3 h-3" />
              </button>

              {openDropdown === "category" && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-xl p-1 z-50 animate-in fade-in slide-in-from-top-2 max-h-60 overflow-y-auto custom-scrollbar">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => updateFilter({ category: cat })}
                      className={`w-full text-left px-3 py-2 text-xs font-mono rounded flex items-center justify-between hover:bg-background transition-colors ${
                        currentCategory === cat ? "text-hacker-green bg-hacker-green/5 font-bold" : "text-muted-foreground"
                      }`}
                    >
                      {cat.toUpperCase()}
                      {currentCategory === cat && <Check className="w-3 h-3" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            // MODE B: CHIPS (For few categories)
            <div className="flex flex-wrap gap-2 mr-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => updateFilter({ category: cat })}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider transition-all border
                    ${currentCategory === cat 
                      ? "bg-hacker-green text-black border-hacker-green font-bold shadow-[0_0_10px_rgba(0,255,65,0.3)]" 
                      : "bg-background text-muted-foreground border-border hover:border-foreground hover:text-foreground"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          <div className="h-6 w-px bg-border mx-2 hidden md:block" />

          {/* --- 2. PRICE FILTER --- */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === "price" ? null : "price")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono border transition-all ${
                currentMinPrice || currentMaxPrice 
                  ? "border-hacker-green text-hacker-green bg-hacker-green/10" 
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              PRICE <ChevronDown className="w-3 h-3" />
            </button>

            {openDropdown === "price" && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-card border border-border rounded-xl shadow-xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="text-xs font-bold font-mono mb-3 text-foreground">PRICE_RANGE (₹)</div>
                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                    className="w-full bg-background border border-border rounded px-2 py-1.5 text-sm focus:outline-none focus:border-hacker-green text-foreground placeholder:text-muted-foreground"
                  />
                  <span className="text-muted-foreground">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                    className="w-full bg-background border border-border rounded px-2 py-1.5 text-sm focus:outline-none focus:border-hacker-green text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <button onClick={() => updateFilter({ minPrice: priceRange.min, maxPrice: priceRange.max })} className="w-full bg-hacker-green text-black font-bold text-xs py-2 rounded hover:brightness-110">
                  APPLY RANGE
                </button>
              </div>
            )}
          </div>

          {/* --- 3. RESET BUTTON --- */}
          {(currentCategory !== "all" || currentMinPrice || currentMaxPrice || currentRating) && (
             <button onClick={clearFilters} className="text-xs text-red-500 hover:underline flex items-center ml-2 font-mono">
               <X className="w-3 h-3 mr-1" /> RESET
             </button>
          )}
        </div>

        {/* RIGHT: Sorter */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
          <select
            value={currentSort}
            onChange={(e) => updateFilter({ sort: e.target.value })}
            className="bg-background border border-border rounded-lg px-3 py-1.5 text-xs text-foreground focus:outline-none focus:border-hacker-green font-mono w-full md:w-48 cursor-pointer"
          >
            <option value="newest">NEW_ARRIVALS</option>
            <option value="rating">HIGHEST_RATED</option>
            <option value="price_low">PRICE: LOW_TO_HIGH</option>
            <option value="price_high">PRICE: HIGH_TO_LOW</option>
          </select>
        </div>
      </div>
    </div>
  );
}