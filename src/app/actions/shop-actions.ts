"use server";

// import { connectDB } from "@/lib/db";
// import { Product } from "@/lib/models";
import { PRODUCTS } from "@/lib/static-data"; // <--- NEW STATIC IMPORT

export async function getShopProducts(searchParams: { [key: string]: string | undefined }) {
  
  /* ----------------------------------------------------
     DATABASE MODE (DISABLED FOR NOW)
  
  await connectDB();
  const category = searchParams.category || "all";
  const sortBy = searchParams.sort || "newest";

  const filter: any = { published: true };
  if (category !== "all") filter.category = new RegExp(category, "i");

  let sortOption: any = { createdAt: -1 };
  // ... sort logic ...
  const products = await Product.find(filter).sort(sortOption).lean();
  return JSON.parse(JSON.stringify(products));
  ---------------------------------------------------- */


  // --- STATIC MODE (ACTIVE) ---
  const category = searchParams.category || "all";
  const sortBy = searchParams.sort || "newest";

  // 1. Filter Manual Data
  const filtered = PRODUCTS.filter(p => {
    if (category === "all") return true;
    return p.category.toLowerCase() === category.toLowerCase();
  });

  // 2. Sort Manual Data
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

  return filtered;
}