import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ShoppingCart, Star, Check, Info, Lightbulb } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-data";
import { PRODUCTS } from "@/lib/static-data";

// 1. Fetch Post Data
async function getPost(slug: string) {
  return BLOG_POSTS.find(p => p.slug === slug);
}

// 2. Helper to find Product Details for internal embeds
function getProductDetails(slug: string) {
  return PRODUCTS.find(p => p.slug === slug);
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return notFound();

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-20 px-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <Link href="/blog">
          <Button variant="ghost" size="sm" className="mb-8 pl-0 hover:bg-transparent hover:text-hacker-green">
            <ArrowLeft className="w-4 h-4 mr-2" /> BACK_TO_INTEL
          </Button>
        </Link>

        {/* Article Header */}
        <div className="mb-12 border-b border-border pb-8">
           <div className="flex items-center gap-3 mb-4">
             <span className="px-3 py-1 bg-hacker-green/10 text-hacker-green text-xs font-mono font-bold rounded border border-hacker-green/20">
               {post.category}
             </span>
             <span className="text-xs font-mono text-muted-foreground">{post.date}</span>
           </div>
           
           <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
             {post.title}
           </h1>
           
           <p className="text-xl text-muted-foreground leading-relaxed">
             {post.excerpt}
           </p>
        </div>

        {/* Article Content Loop */}
        <div className="space-y-8">
          {post.content.map((block: any, index: number) => {
            
            // A. STANDARD TEXT
            if (block.type === "text") {
              return (
                <p key={index} className="text-lg leading-relaxed text-foreground/90">
                  {block.content}
                </p>
              );
            }

            // B. SECTION HEADER
            if (block.type === "section_header") {
              return (
                <h2 key={index} className="text-3xl font-bold mt-12 mb-4 font-mono text-foreground border-l-4 border-hacker-green pl-4">
                  {block.content}
                </h2>
              );
            }

            // C. TIP BOX
            if (block.type === "tip_box") {
              return (
                <div key={index} className="my-8 p-6 bg-hacker-green/10 border border-hacker-green/20 rounded-xl flex gap-4">
                   <Lightbulb className="w-6 h-6 text-hacker-green flex-shrink-0" />
                   <div>
                     <h4 className="font-bold text-hacker-green font-mono mb-1">{block.title}</h4>
                     <p className="text-sm text-foreground/80">{block.content}</p>
                   </div>
                </div>
              );
            }

            // D. CUSTOM PRODUCT CARD (For Blog-Only Products)
            if (block.type === "custom_product_card") {
              return (
                <div key={index} className="my-16 p-1 rounded-2xl bg-gradient-to-br from-border to-hacker-green/20 relative group">
                  <div className="bg-card rounded-xl p-6 md:p-8 border border-border h-full relative overflow-hidden">
                    
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-hacker-green/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    {/* Header: Rank & Name */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative z-10">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 flex items-center justify-center bg-hacker-green text-black font-bold text-2xl rounded-xl shadow-[0_0_15px_rgba(0,255,65,0.4)]">
                            #{block.rank}
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold font-mono leading-none">{block.name}</h2>
                            <span className="text-xs text-muted-foreground uppercase tracking-widest">Verified Selection</span>
                          </div>
                       </div>
                       <a href={block.link} target="_blank" rel="noopener noreferrer">
                         <Button className="bg-hacker-green text-black hover:bg-white font-bold transition-all shadow-lg hover:shadow-hacker-green/20">
                           <ShoppingCart className="w-4 h-4 mr-2" /> Check Price
                         </Button>
                       </a>
                    </div>

                    {/* Images Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                       {block.images && block.images.map((img: string, i: number) => (
                         <div key={i} className="aspect-video bg-background rounded-lg border border-border relative overflow-hidden group/image">
                            <Image 
                              src={img} 
                              alt={`${block.name} ${i+1}`} 
                              fill 
                              className="object-contain p-2 group-hover/image:scale-105 transition-transform duration-500" 
                            />
                         </div>
                       ))}
                    </div>

                    {/* Description & Highlights */}
                    <div className="grid md:grid-cols-2 gap-8 relative z-10">
                       <div>
                          <h3 className="text-sm font-bold font-mono text-hacker-green mb-3 uppercase flex items-center gap-2">
                            <Info className="w-4 h-4" /> Why It's Great
                          </h3>
                          <p className="text-muted-foreground leading-relaxed text-sm">
                            {block.description}
                          </p>
                          
                          <div className="mt-6 p-4 bg-background rounded-lg border border-border/50">
                            <span className="text-xs font-bold text-foreground block mb-1 uppercase">Best For:</span>
                            <span className="text-sm text-hacker-green font-mono">{block.bestFor}</span>
                          </div>

                          {/* Extra Info Grid */}
                          {block.extraInfo && (
                            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                              <div className="p-2 rounded bg-background border border-border/50">
                                <div className="text-[10px] text-muted-foreground uppercase mb-1">Serving</div>
                                <div className="text-xs font-bold">{block.extraInfo.servingSize}</div>
                              </div>
                              <div className="p-2 rounded bg-background border border-border/50">
                                <div className="text-[10px] text-muted-foreground uppercase mb-1">Cost</div>
                                <div className="text-xs font-bold text-hacker-green">{block.extraInfo.costPerServing}</div>
                              </div>
                              <div className="p-2 rounded bg-background border border-border/50">
                                <div className="text-[10px] text-muted-foreground uppercase mb-1">Stim</div>
                                <div className="text-xs font-bold text-red-400">{block.extraInfo.stimLevel}</div>
                              </div>
                            </div>
                          )}
                       </div>

                       <div>
                          <h3 className="text-sm font-bold font-mono text-foreground mb-3 uppercase">Key Highlights</h3>
                          <ul className="space-y-3">
                            {block.highlights && block.highlights.map((point: string, i: number) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                                <Check className="w-4 h-4 text-hacker-green mt-0.5 flex-shrink-0" />
                                {point}
                              </li>
                            ))}
                          </ul>
                       </div>
                    </div>

                  </div>
                </div>
              );
            }

            // E. PRODUCT HIGHLIGHT (Legacy - Internal Links)
            if (block.type === "product_highlight") {
              const product = getProductDetails(block.productId);
              if (!product) return null;

              return (
                <div key={index} className="my-8 p-6 rounded-xl bg-card border border-border hover:border-hacker-green/40 transition-all shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-hacker-green flex items-center justify-center font-bold text-black text-lg">
                          #{block.rank}
                        </div>
                        <div>
                            <h3 className="font-bold text-lg leading-none">{product.name}</h3>
                            <span className="text-xs text-muted-foreground font-mono">{product.brand}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-background px-2 py-1 rounded border border-border text-xs font-mono">
                        <Star className="w-3 h-3 text-hacker-green fill-current" />
                        {product.ratings.overall}
                      </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-32 h-32 bg-background rounded-lg flex items-center justify-center relative overflow-hidden border border-border">
                        <Image src={product.images.thumbnail} alt={product.name} width={100} height={100} className="object-contain" />
                    </div>

                    <div className="flex-1">
                        <p className="text-sm font-bold text-hacker-green mb-2 uppercase tracking-wide">Lab Verdict:</p>
                        <p className="text-sm text-muted-foreground mb-4">"{block.reason}"</p>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-lg font-bold font-mono">₹{product.pricing.current_price}</div>
                          <Link href={`/reviews/${product.category}/${product.slug}`}>
                            <Button size="sm" variant="hacker" className="h-9 text-xs font-bold text-black">
                              View Full Analysis
                            </Button>
                          </Link>
                        </div>
                    </div>
                  </div>
                </div>
              );
            }

            return null;
          })}
        </div>

      </div>
    </div>
  );
}