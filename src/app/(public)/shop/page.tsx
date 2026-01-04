import Image from "next/image";
import Link from "next/link";
import { getShopProducts } from "@/app/actions/shop-actions";
import { ShopToolbar } from "@/components/shop/ShopToolbar";
import { Button } from "@/components/ui/Button";
import { ShoppingCart, Eye, Star } from "lucide-react";

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

import { PRODUCTS } from "@/lib/static-data";

// ... existing imports

export default async function ShopPage({ searchParams }: Props) {
  const params = await searchParams;
  const products = await getShopProducts(params);
  
  // Extract Unique Brands
  const uniqueBrands = Array.from(new Set(PRODUCTS.map(p => p.brand))).sort();

  // Check if any filter is active (category, brand, price, rating)
  // Note: 'sort' doesn't count as a filter that hides sections, but let's say if user sorts, they probably want a list.
  // Actually, usually "Shop" landing page shows sections, but if I search/filter, I see grid.
  const isFiltered = params.category || params.brand || params.minPrice || params.maxPrice || params.rating || (params.sort && params.sort !== 'newest');

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-20 px-4 md:px-6 transition-colors duration-300">
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 md:mb-10">
          <h1 className="text-3xl md:text-5xl font-bold font-mono tracking-tighter mb-2 md:mb-4">
            SUPPLY_<span className="text-hacker-green">DEPOT</span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
            Verified supplements. Lab-tested for purity and potency.
          </p>
        </div>

        <ShopToolbar brands={uniqueBrands} />

        {/* CONDITION: If Filtered -> Show Grid. If Default -> Show Sections */}
        {isFiltered ? (
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
             {products.map((product: any) => (
               <ProductCard key={product._id} product={product} />
             ))}

             {products.length === 0 && (
                <div className="col-span-full py-20 text-center border border-dashed border-border rounded-xl">
                  <div className="text-hacker-green font-mono text-xl animate-pulse">NO_ASSETS_FOUND</div>
                  <p className="text-muted-foreground mt-2">Adjust your filters to locate supplies.</p>
                </div>
             )}
           </div>
        ) : (
          <div className="space-y-16">
             {/* SECTION 1: WHEY PROTEIN */}
             <ShopSection title="WHEY_PROTEIN" link="/shop?category=whey">
                {PRODUCTS.filter(p => p.category === 'whey').slice(0, 4).map(p => (
                   <ProductCard key={p._id} product={p} />
                ))}
             </ShopSection>

             {/* SECTION 2: PRE-WORKOUT */}
             <ShopSection title="PRE_WARFARE" link="/shop?category=pre-workout">
                {PRODUCTS.filter(p => p.category === 'pre-workout').slice(0, 4).map(p => (
                   <ProductCard key={p._id} product={p} />
                ))}
             </ShopSection>

             {/* SECTION 3: ESSENTIALS */}
             <ShopSection title="ESSENTIAL_GEAR" link="/shop?category=omega-3">
                {PRODUCTS.filter(p => ['omega-3', 'vitamins', 'creatine'].includes(p.category)).slice(0, 4).map(p => (
                   <ProductCard key={p._id} product={p} />
                ))}
             </ShopSection>
          </div>
        )}

      </div>
    </div>
  );
}

function ShopSection({ title, link, children }: any) {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold font-mono border-l-4 border-hacker-green pl-3">{title}</h2>
        <Link href={link} className="text-xs font-mono text-hacker-green bg-hacker-green/10 px-3 py-1 rounded hover:bg-hacker-green hover:text-black transition-colors">
          VIEW_ALL
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        {children}
      </div>
    </section>
  )
}

function ProductCard({ product }: { product: any }) {
  const scoreColor = product.ratings?.overall >= 8 ? "text-hacker-green" : "text-yellow-500";
  const buyLink = product.affiliates?.[0]?.link || "#";

  return (
    <div className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-hacker-green/50 transition-all duration-300 flex flex-col h-full shadow-sm hover:shadow-lg">
      
      {/* Image Area */}
      <div className="aspect-square relative p-4 md:p-8 bg-background/50 flex items-center justify-center overflow-hidden">
        <div className="absolute top-2 right-2 md:top-3 md:right-3 z-10 flex items-center gap-1 bg-background/90 backdrop-blur border border-border px-1.5 py-0.5 rounded text-[10px] font-mono shadow-sm">
           <Star className={`w-3 h-3 ${scoreColor} fill-current`} />
           <span className="text-foreground font-bold">{product.ratings?.overall}</span>
        </div>

        <Link href={`/reviews/${product.category}/${product.slug}`} className="relative w-full h-full block">
           {product.images?.thumbnail ? (
             <Image 
               src={product.images.thumbnail} 
               alt={product.name} 
               fill 
               className="object-contain transform group-hover:scale-105 transition-transform duration-500"
             />
           ) : (
             <div className="w-full h-full flex items-center justify-center text-muted-foreground font-mono text-xs">NO_IMG</div>
           )}
        </Link>
      </div>

      {/* Content Area */}
      <div className="p-3 md:p-5 flex-1 flex flex-col">
        {/* Brand Chip */}
        <div className="mb-1">
           <span className="text-[9px] md:text-[10px] font-mono uppercase text-muted-foreground truncate block">
             {product.brand}
           </span>
        </div>

        {/* Title */}
        <Link href={`/reviews/${product.category}/${product.slug}`} className="block mb-2 md:mb-4">
          <h3 className="text-sm md:text-lg font-bold font-manrope leading-snug line-clamp-2 text-foreground group-hover:text-hacker-green transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Price & Spec */}
        <div className="mt-auto pt-3 border-t border-border flex items-end justify-between gap-2">
           <div>
             <div className="text-[10px] text-muted-foreground uppercase scale-90 origin-left">Best Price</div>
             <div className="text-sm md:text-base font-bold font-mono">₹{product.pricing?.current_price?.toLocaleString('en-IN')}</div>
           </div>
           
           <a href={buyLink} target="_blank" rel="noopener noreferrer">
             <Button size="sm" className="h-8 px-3 md:px-4 bg-hacker-green text-black font-bold text-[10px] md:text-xs hover:bg-white border-0 shadow-sm">
                BUY
             </Button>
           </a>
        </div>
      </div>
    </div>
  );
}