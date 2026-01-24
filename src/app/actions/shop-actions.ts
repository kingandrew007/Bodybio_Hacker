"use server";

// import { connectDB } from "@/lib/db";
// import { Product } from "@/lib/models";
import { PRODUCTS } from "@/lib/static-data"; // <--- NEW STATIC IMPORT

import Fuse from "fuse.js";

export async function getShopProducts(searchParams: { [key: string]: string | undefined }) {
  
  // --- STATIC MODE (ACTIVE) ---
  const category = searchParams.category || "all";
  const sortBy = searchParams.sort || "newest";

  // 1. Hard Filters (Category, Brand, Price)
  let filtered = PRODUCTS.filter(p => {
    // Category
    if (category !== "all" && p.category.toLowerCase() !== category.toLowerCase()) return false;
    
    // Brand
    if (searchParams.brand && p.brand.toLowerCase() !== searchParams.brand.toLowerCase()) return false;

    // Price
    const minPrice = searchParams.minPrice ? parseInt(searchParams.minPrice) : 0;
    const maxPrice = searchParams.maxPrice ? parseInt(searchParams.maxPrice) : Infinity;
    if (p.pricing.current_price < minPrice || p.pricing.current_price > maxPrice) return false;

    return true;
  });



  // 2. Fuzzy Search (if query exists)
  const query = searchParams.q;
  if (query) {
    const fuse = new Fuse(filtered, {
      keys: ["name", "brand", "tags", "description"], // Search these fields
      threshold: 0.4, // 0.0 = perfect match, 1.0 = match anything. 0.4 is good for typos.
      includeScore: true
    });

    const results = fuse.search(query);
    filtered = results.map(result => result.item);
  }

  // 3. Sort
  filtered.sort((a, b) => {
    switch (sortBy) {
      case "price_low": return a.pricing.current_price - b.pricing.current_price;
      case "price_high": return b.pricing.current_price - a.pricing.current_price;
      case "rating": return b.ratings.overall - a.ratings.overall;
      case "name_asc": return a.name.localeCompare(b.name);
      case "brand": return a.brand.localeCompare(b.brand);
      default: return 0; 
    }
  });

  // 4. Pagination
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const limit = 6;
  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;
  
  const paginatedProducts = filtered.slice(offset, offset + limit);

  return { products: paginatedProducts, total, totalPages, currentPage: page };
}