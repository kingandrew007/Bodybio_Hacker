import { PRODUCTS } from "@/lib/static-data";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Check, X } from "lucide-react";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ products: string }>;
}

export default async function ComparePage({ params }: PageProps) {
  const resolvedParams = await params;
  const slugs = resolvedParams.products.split("%2C"); // Handle encoded comma or regular comma
  
  // Clean slugs (in case of double decoding or raw commas)
  const cleanSlugs = slugs.flatMap(s => s.split(','));

  const selectedProducts = PRODUCTS.filter((p) => cleanSlugs.includes(p.slug));

  if (selectedProducts.length === 0) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/">
        <Button variant="ghost" className="mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          RETURN_TO_BASE
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold font-mono uppercase tracking-tighter text-hacker-green mb-2">
          WAR_ROOM_COMPARISON
        </h1>
        <p className="text-muted-foreground">
          Analyzing {selectedProducts.length} units side-by-side.
        </p>
      </div>

      <div className="overflow-x-auto pb-4">
        <table className="w-full border-collapse min-w-[800px]">
          <thead>
            <tr>
              <th className="p-4 text-left min-w-[200px] bg-card/50 border-b border-white/10">Feature</th>
              {selectedProducts.map((product) => (
                <th key={product._id} className="p-4 text-left min-w-[250px] bg-card/50 border-b border-white/10">
                  <div className="space-y-3">
                    <div className="h-40 flex items-center justify-center bg-white/5 rounded-lg p-2">
                      <img 
                        src={product.images.thumbnail} 
                        alt={product.name}
                        className="h-full object-contain"
                      />
                    </div>
                    <div className="text-lg font-bold leading-tight">{product.name}</div>
                    <div className="text-sm text-hacker-green font-mono">
                      ₹{product.pricing.current_price}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {/* OVERALL RATING */}
            <tr className="bg-white/5">
              <td className="p-4 font-mono font-bold text-hacker-green">SYSTEM_RATING</td>
              {selectedProducts.map((p) => (
                <td key={p._id} className="p-4 font-bold text-xl">
                  {p.ratings.overall}/10
                </td>
              ))}
            </tr>

            {/* SPECS */}
            <tr>
              <td className="p-4 font-mono text-muted-foreground">PROTEIN_PER_SERVE</td>
              {selectedProducts.map((p) => (
                <td key={p._id} className="p-4">
                  {p.specs.activeIngredientAmount}g
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-mono text-muted-foreground">SERVING_SIZE</td>
              {selectedProducts.map((p) => (
                <td key={p._id} className="p-4">
                  {p.specs.servingSize}g
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-mono text-muted-foreground">PRICE_PER_SERVE</td>
              {selectedProducts.map((p) => {
                 const pps = Math.round(p.pricing.current_price / p.specs.totalServings!);
                 return (
                  <td key={p._id} className="p-4 font-mono">
                    ₹{isNaN(pps) ? "?" : pps}
                  </td>
                 );
              })}
            </tr>

            {/* EXTENDED SPECS */}
            <tr>
              <td className="p-4 font-mono text-muted-foreground">FILTRATION</td>
              {selectedProducts.map((p) => (
                <td key={p._id} className="p-4 text-sm">
                  {p.extended_specs?.filtration || "-"}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-mono text-muted-foreground">SWEETENER</td>
              {selectedProducts.map((p) => (
                <td key={p._id} className="p-4 text-sm">
                  {p.extended_specs?.sweetener || "-"}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-mono text-muted-foreground">CERTIFICATIONS</td>
              {selectedProducts.map((p) => (
                <td key={p._id} className="p-4 text-sm">
                  <div className="flex flex-wrap gap-1">
                    {p.extended_specs?.certifications?.map((c) => (
                      <span key={c} className="px-2 py-0.5 rounded bg-hacker-green/10 text-hacker-green text-xs border border-hacker-green/20">
                        {c}
                      </span>
                    )) || "-"}
                  </div>
                </td>
              ))}
            </tr>
             
            {/* LINK */}
            <tr>
              <td className="p-4"></td>
              {selectedProducts.map((p) => (
                <td key={p._id} className="p-4">
                  <Link href={`/shop/${p.slug}`}>
                    <Button className="w-full" variant="outline">
                      VIEW_INTEL
                    </Button>
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
