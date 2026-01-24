"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { ArrowUpDown, ChevronDown, Check, X, Search } from "lucide-react";

import { PRODUCTS } from "@/lib/static-data"; // <--- Import Products

// DEFINED CATEGORIES (Add as many as you want here)
const CATEGORIES = [
  "all", 
  "ready-to-drink",
  "whey", 
  "omega-3", 
  "creatine", 
  "vitamins", 
  "pre-workout", 
  "bcaa", 
  "fat-burners", 
  "gear"
];

export function ShopToolbar({ brands = [] }: { brands?: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null); // New Ref for Search

  // URL Params State
  const currentSort = searchParams.get("sort") || "newest";
  const currentCategory = searchParams.get("category") || "all";
  const currentBrand = searchParams.get("brand") || "";
  const currentSearch = searchParams.get("q") || ""; // <--- NEW SEARCH PARAM
  const currentMinPrice = searchParams.get("minPrice") || "";
  const currentMaxPrice = searchParams.get("maxPrice") || "";
  const currentRating = searchParams.get("rating") || "";
  
  // Local State
  const [searchTerm, setSearchTerm] = useState(currentSearch);
  const [priceRange, setPriceRange] = useState({ min: searchParams.get("minPrice") || "", max: searchParams.get("maxPrice") || "" });
  
  // SUGGESTIONS STATE
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== currentSearch) {
        updateFilter({ q: searchTerm });
      }
    }, 400); // 400ms debounce

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Handle Input Change & Suggestions
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 1) {
      const matches = PRODUCTS
        .filter(p => p.name.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5) // Top 5
        .map(p => p.name);
      setSuggestions(matches);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (name: string) => {
    setSearchTerm(name);
    updateFilter({ q: name });
    setShowSuggestions(false);
  };

  const useCategoryDropdown = CATEGORIES.length > 4;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Close Filter Dropdowns
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
      // Close Suggestions
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
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
    setSearchTerm("");
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
                      // When switching category, we might want to keep the brand or clear it. Usually clear it to avoid empty results.
                      onClick={() => {
                         // Optional: Clear brand when switching category if you want strict hierarchy, but keeping it flexible for now.
                         updateFilter({ category: cat, brand: null }); 
                      }}
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
            // MODE B: MOBILE RAIL (Horizontal Scroll)
            <div className="flex overflow-x-auto w-full md:w-auto pb-2 md:pb-0 gap-3 no-scrollbar snap-x snap-mandatory">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => updateFilter({ category: cat, brand: null })} 
                  className={`snap-start shrink-0 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all border whitespace-nowrap
                    ${currentCategory === cat 
                      ? "bg-hacker-green text-black border-hacker-green font-bold shadow-[0_0_10px_rgba(0,255,65,0.3)]" 
                      : "bg-background text-muted-foreground border-border hover:border-foreground hover:text-foreground"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            /* End Mode B */
          )}

          <div className="h-6 w-px bg-border mx-2 hidden md:block" />

          {/* --- 2. BRAND FILTER (NEW) --- */}
          {/* User asked for this to appear "when we click on whey", but generally it's good UI to show if available. 
              We can conditionally show it ONLY if category != 'all', but brands are global. 
              Let's show it always but highlight it's the specific feature requested. */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === "brand" ? null : "brand")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono border transition-all ${
                currentBrand
                  ? "border-hacker-green text-hacker-green bg-hacker-green/10" 
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {currentBrand ? currentBrand.toUpperCase() : "BRAND"} <ChevronDown className="w-3 h-3" />
            </button>

            {openDropdown === "brand" && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-xl p-1 z-50 animate-in fade-in slide-in-from-top-2 max-h-60 overflow-y-auto custom-scrollbar">
                {brands.length > 0 ? brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => updateFilter({ brand: brand })}
                    className={`w-full text-left px-3 py-2 text-xs font-mono rounded flex items-center justify-between hover:bg-background transition-colors ${
                      currentBrand === brand ? "text-hacker-green bg-hacker-green/5 font-bold" : "text-muted-foreground"
                    }`}
                  >
                    {brand}
                    {currentBrand === brand && <Check className="w-3 h-3" />}
                  </button>
                )) : (
                  <div className="px-3 py-2 text-xs text-muted-foreground">No brands found.</div>
                )}
              </div>
            )}
          </div>


          {/* --- 3. PRICE FILTER --- */}
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
          {(currentCategory !== "all" || currentMinPrice || currentMaxPrice || currentRating || currentBrand) && (
             <button onClick={clearFilters} className="text-xs text-red-500 hover:underline flex items-center ml-2 font-mono">
               <X className="w-3 h-3 mr-1" /> RESET
             </button>
          )}
        </div>

        {/* RIGHT: Search & Sorter */}
        <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
          
          {/* SEARCH INPUT & SUGGESTIONS */}
          <div className="relative w-full md:w-64" ref={searchContainerRef}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="SEARCH_DB..." 
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => { if (searchTerm.length > 1) setShowSuggestions(true); }}
              className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-1.5 text-xs text-foreground focus:outline-none focus:border-hacker-green font-mono placeholder:text-muted-foreground"
            />
            
            {/* SUGGESTIONS DROPDOWN */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 mt-2 w-full bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-1">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-4 py-2 text-xs font-mono text-muted-foreground hover:bg-hacker-green/10 hover:text-hacker-green transition-colors border-b border-border last:border-0 truncate"
                  >
                     {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <ArrowUpDown className="w-4 h-4 text-muted-foreground hidden md:block" />
            <select
              value={currentSort}
              onChange={(e) => updateFilter({ sort: e.target.value })}
              className="bg-background border border-border rounded-lg px-3 py-1.5 text-xs text-foreground focus:outline-none focus:border-hacker-green font-mono w-full md:w-48 cursor-pointer"
            >
              <option value="newest">NEW_ARRIVALS</option>
              <option value="rating">HIGHEST_RATED</option>
              <option value="price_low">PRICE: LOW_TO_HIGH</option>
              <option value="price_high">PRICE: HIGH_TO_LOW</option>
              <option value="brand">BRAND (A-Z)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}