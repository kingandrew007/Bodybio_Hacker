import Image from "next/image";
import Link from "next/link";
import { getShopProducts } from "@/app/actions/shop-actions";
import { ShopToolbar } from "@/components/shop/ShopToolbar";
import { Button } from "@/components/ui/Button";
import { ShoppingCart, Eye, Star } from "lucide-react";

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function ShopPage({ searchParams }: Props) {
  const params = await searchParams;
  const products = await getShopProducts(params);

  return (
    // FIX 1: Use 'bg-background' and 'text-foreground' instead of 'bg-black text-white'
    <div className="min-h-screen bg-background text-foreground pt-24 pb-20 px-6 transition-colors duration-300">
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold font-mono tracking-tighter mb-4">
            SUPPLY_<span className="text-hacker-green">DEPOT</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Access our verified database of supplements. Filter by lab score, price efficiency, and purity metrics.
          </p>
        </div>

        <ShopToolbar />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: any }) {
  const scoreColor = product.ratings?.overall >= 8 ? "text-hacker-green" : "text-yellow-500";
  const buyLink = product.affiliates?.[0]?.link || "#";

  return (
    // FIX 2: Use 'bg-card' and 'border-border' for the product card itself
    <div className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-hacker-green/50 transition-all duration-300 flex flex-col h-full shadow-sm">
      
      <div className="aspect-square relative p-8 bg-background/50 flex items-center justify-center overflow-hidden">
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-background/80 backdrop-blur border border-border px-2 py-1 rounded text-xs font-mono">
           <Star className={`w-3 h-3 ${scoreColor} fill-current`} />
           <span className="text-foreground">{product.ratings?.overall}</span>
        </div>

        <div className="relative w-full h-full transform group-hover:scale-110 transition-transform duration-500">
           {product.images?.thumbnail ? (
             <Image 
               src={product.images.thumbnail} 
               alt={product.name} 
               fill 
               className="object-contain"
             />
           ) : (
             <div className="w-full h-full flex items-center justify-center text-muted-foreground font-mono text-xs">NO_IMG</div>
           )}
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
           <span className="text-[10px] font-mono uppercase bg-secondary px-2 py-0.5 rounded text-muted-foreground">
             {product.brand}
           </span>
        </div>

        <h3 className="text-xl font-bold font-manrope leading-tight mb-4 flex-1 text-foreground">
          {product.name}
        </h3>

        <div className="grid grid-cols-2 gap-2 text-xs font-mono text-muted-foreground mb-6 border-t border-border pt-4">
           <div>
             <span className="block uppercase opacity-70">Price</span>
             <span className="text-foreground text-lg font-bold">₹{product.pricing?.current_price}</span>
           </div>
           <div>
             <span className="block uppercase opacity-70">Active</span>
             <span className="text-foreground text-lg">{product.specs?.activeIngredientAmount}mg</span>
           </div>
        </div>

        <div className="flex gap-3 mt-auto">
          <Link href={`/reviews/${product.category}/${product.slug}`} className="flex-1">
            <Button variant="outline" className="w-full text-xs h-10 border-border hover:bg-secondary text-foreground">
              <Eye className="w-3 h-3 mr-2" /> ANALYSIS
            </Button>
          </Link>

          <a href={buyLink} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button className="w-full text-xs h-10 bg-hacker-green text-black font-bold hover:opacity-90 border-none">
              <ShoppingCart className="w-3 h-3 mr-2" /> BUY NOW
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}