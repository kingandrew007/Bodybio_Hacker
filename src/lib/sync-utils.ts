import { BLOG_POSTS } from "./blog-data";

export interface ShopProduct {
  _id: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  pricing: {
    current_price: number;
    mrp: number;
  };
  ratings: {
    overall: number;
  };
  images: {
    thumbnail: string;
  };
  specs: Record<string, any>;
  extended_specs: Record<string, any>;
  description: string;
  affiliates: Array<{ link: string; vendor: string }>;
}

export function extractProductsFromBlog(): ShopProduct[] {
  const products: ShopProduct[] = [];
  const seenSlugs = new Set<string>();

  BLOG_POSTS.forEach((post) => {
    // @ts-ignore - We know productCategory exists now
    const category = post.productCategory || "uncategorized";
    
    if (!post.content || !Array.isArray(post.content)) return;

    post.content.forEach((block: any) => {
      if (block.type === "custom_product_card") {
        // Generate a slug if not present (usually not in blog card)
        const slug = slugify(block.name);

        // Avoid duplicates (e.g. same product in multiple lists)
        if (seenSlugs.has(slug)) return;
        seenSlugs.add(slug);

        // Parse Price: "1899 for 24 bottles" -> 1899
        let price = 0;
        let mrp = 0;
        if (block.price) {
            const priceMatch = block.price.toString().match(/(\d+)/);
            if (priceMatch) {
                price = parseInt(priceMatch[0], 10);
                mrp = Math.ceil(price * 1.25); // Estimated MRP if not provided
            }
        }

        // Parse Rating: "8.5/10" -> 8.5
        let rating = 0;
        if (block.ourRating) {
            const ratingMatch = block.ourRating.toString().match(/([\d.]+)/);
            if (ratingMatch) {
                rating = parseFloat(ratingMatch[0]);
            }
        }

        const product: ShopProduct = {
          _id: `blog-${slug}`,
          name: block.name,
          slug: slug,
          brand: block.brand || "Generic",
          category: category,
          pricing: {
            current_price: price,
            mrp: mrp,
          },
          ratings: {
            overall: rating,
          },
          images: {
            thumbnail: block.images && block.images.length > 0 ? block.images[0] : "",
          },
          specs: {
              form: "N/A", // Defaults since blog doesn't have deep specs
              servingSize: "N/A",
              totalServings: 0,
              activeIngredientAmount: 0
          },
          extended_specs: {
              highlights: block.highlights // Preserve highlights if we want to show them
          },
          description: block.highlights && Array.isArray(block.highlights) 
            ? block.highlights.join(". ") + "." 
            : "Featured in our blog guide.",
          affiliates: [
            {
              link: block.link || "#",
              vendor: "Amazon", // Defaulting to Amazon as most blog links seem to be
            },
          ],
        };

        products.push(product);
      }
    });
  });

  return products;
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}
