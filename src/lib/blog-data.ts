import { PREWORKOUT_BLOG_CONTENT } from "@/lib/preworkout-data";
import { WHEY_BLOG_CONTENT } from "./whey-data";

export const BLOG_POSTS = [
  // 1. TOP 5 BUDGET WHEY (NEW)
  {
    slug: "top-5-budget-friendly-whey-protein-india-2025",
    title: "Top 5 Budget-Friendly Whey Proteins in India (Lab-Tested & Value for Money)",
    category: "GUIDE",
    date: "2025-01-02",
    image: "/images/blog/whey/Nakpro_impact.jpg",
    excerpt: "If you want to meet your daily protein requirements and build muscle on a tight budget, these lab-tested whey proteins offer the best protein per rupee in India.",
    content: WHEY_BLOG_CONTENT
  },

  // 2. PRE-WORKOUT GUIDE
  {
    slug: "top-5-strongest-preworkout-india-2025",
    title: "Top 5 Strongest Pre-Workout Supplements in India (2025 Ranked)",
    category: "GUIDE",
    date: "2025-01-01",
    image: "/images/blog/preworkout/Gayor3.0.jpg",
    excerpt: "Pre-workout supplements can dramatically boost your energy, focus, and performance — but only if you choose the right one. Here are the Top 5 strongest pre-workouts available in India.",
    content: PREWORKOUT_BLOG_CONTENT
  },
  {
    slug: "top-5-whey-protein-india-2025",
    title: "Top 5 Whey Protein Brands in India (2025)",
    category: "GUIDE",
    date: "2025-01-01",
    image: "/images/blog/whey/Atom_Whey2.png",
    excerpt: "If you’re serious about fitness, choosing the right whey is a game changer. Here are the top 5 Indian brands delivering quality, taste, and results.",
    content: [
      {
        type: "text",
        content: "If you’re serious about fitness and muscle gains, choosing the right whey protein is a game changer. With tons of options flooding the Indian market, it’s easy to get overwhelmed. That’s why I’ve hand-picked the Top 5 Whey Protein Brands in India that deliver quality, taste, and results — all backed by solid nutrition profiles and real user trust."
      },
      
      // 🥇 1. MuscleBlaze
      {
        type: "custom_product_card",
        rank: 1,
        price: 2549,
        name: "MuscleBlaze Whey Protein",
        description: "MuscleBlaze is arguably India’s most popular and trusted whey brand. Known for clean formulations and effective results, it’s a favorite among beginners and pros alike.",
        images: ["/images/blog/whey/MuscleBlaze.png", "/images/blog/whey/MuscleBlaze2.png"],
        link: "https://amzn.to/4sjHnbz",
        highlights: [
          "High protein content per scoop",
          "Fast absorption for muscle recovery",
          "Widely available online & offline",
          "Affordable price point"
        ],
        bestFor: "Fitness newbies to seasoned lifters"
      },

      // 🥈 2. Avatar Nutrition
      {
        type: "custom_product_card",
        rank: 2,
        price: 3099,
        name: "Avatar Nutrition Whey",
        description: "Avatar Nutrition has made a name for itself with premium quality whey options that are rich in essential amino acids. If you’re looking for a no-nonsense protein that supports recovery and growth, this is a solid pick.",
        images: ["/images/blog/whey/Avatar_Nutrition.png", "/images/blog/whey/Avatar_Nutrition2.png"],
        link: "https://amzn.to/45xYrkm",
        highlights: [
          "Great mixability and taste",
          "Excellent BCAA profile",
          "Trusted by athletes"
        ],
        bestFor: "Those who want performance-focused whey"
      },

      // 🥉 3. Naturaltein
      {
        type: "custom_product_card",
        rank: 3,
        price: 2690,
        name: "Naturaltein Whey Protein",
        description: "Naturaltein has quickly gained traction thanks to its balanced macros and natural ingredient focus. It’s a good choice if you want a clean whey with minimal fillers.",
        images: ["/images/blog/whey/Naturaltein.png", "/images/blog/whey/Naturaltein2.png"],
        link: "https://amzn.to/4q5wGIg",
        highlights: [
          "Balanced macro ratio",
          "Natural flavor profiles",
          "Smooth mixability"
        ],
        bestFor: "Clean eaters and those watching macros closely"
      },

      // 🔥 4. Nakpro
      {
        type: "custom_product_card",
        rank: 4,
        price: 1199,
        name: "Nakpro Whey Protein",
        description: "Nakpro stands out with excellent taste profiles and consistent quality. It’s especially popular among people who struggle with chalky or bitter protein powders.",
        images: ["/images/blog/whey/Nakpro.png", "/images/blog/whey/Nakpro2.png"],
        link: "https://amzn.to/4pdDnqj",
        highlights: [
          "Smooth, tasty shakes",
          "Good digestibility",
          "Trusted brand in Indian fitness circles"
        ],
        bestFor: "Everyday gym enthusiasts who want great taste"
      },

      // 💪 5. Atom Whey
      {
        type: "custom_product_card",
        rank: 5,
        price: 1999,
        name: "Atom Whey Protein",
        description: "Atom Whey combines solid protein content with great pricing, making it a bang-for-buck option. Great for anyone who wants quality without stretching the budget.",
        images: ["/images/blog/whey/Atom_Whey2.png","/images/blog/whey/Atom_Whey.png" ],
        link: "https://amzn.to/3MQIcbV",
        highlights: [
          "Strong protein per scoop",
          "Affordable",
          "Mixes well"
        ],
        bestFor: "Budget-conscious lifters"
      },

      {
        type: "section_header",
        content: "How to Choose the Right Whey"
      },
      {
        type: "text",
        content: "Here are a few things you should keep in mind before buying: Protein content (Aim for ~24g+ per scoop), Ingredient quality (Fewer fillers = better results), Mixability & taste, and Digestibility."
      },
      {
        type: "tip_box",
        title: "Quick Tip from BioBodyHacker",
        content: "For best results, mix your whey with water or milk immediately after your workout. That’s when your muscles crave protein the most! 💪"
      }
    ]
  },
  {
    slug: "best-omega-3-for-brain-fog",
    title: "The Only 3 Fish Oils That Actually Work for Focus",
    category: "DEEP_DIVE",
    date: "2024-01-02",
    image: "/images/blog/omega3/omega-brain.webp",
    excerpt: "Most cheap fish oils are rancid. If you want cognitive benefits, you need high EPA. Here is the list.",
    content: [
      {
        type: "text",
        content: "Brain fog often comes from inflammation. To combat this, you need a high concentration of EPA. Standard grocery store brands simply don't have the dosage required."
      },
      {
        type: "product_highlight",
        productId: "nordic-naturals-omega",
        rank: 1,
        reason: "The Gold Standard. Triglyceride form means you absorb 70% more."
      }
    ]
  }
];