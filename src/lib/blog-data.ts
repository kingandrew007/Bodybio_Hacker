import { RTD_PROTEIN_BLOG_CONTENT } from "@/lib/rtd-protein-data";
import { PREWORKOUT_BLOG_CONTENT } from "@/lib/preworkout-data";
import { WHEY_BLOG_CONTENT } from "./whey-data";
import { VITAMIN_D3_BLOG_CONTENT } from "./vitamin-data";
import { OMEGA3_BLOG_CONTENT } from "./omega3-data";
import { CREATINE_BLOG_CONTENT } from "./creatine-data";

export const BLOG_POSTS = [
  {
    slug: "top-5-ready-to-drink-protein-shakes-india-2026",
    title: "Top 5 Ready-to-Drink Protein Shakes in India (Convenient & Travel-Friendly)",
    category: "GUIDE",
    date: "2026-01-21",
    image: "/images/blog/proteinshake/protein-drinks-cover.png",
    excerpt:
      "Ready-to-drink protein shakes are the most convenient way to hit protein goals when you’re busy, traveling, or don’t want the hassle of mixing whey. Here are the best RTD protein shakes available in India.",
    content: RTD_PROTEIN_BLOG_CONTENT
  },
  {
    slug: "creatine-complete-guide-india-2026",
    title: "Creatine: Benefits, Dosage, Myths & Best Creatine Supplements in India",
    category: "GUIDE",
    date: "2026-01-15",
    image: "/images/blog/creatine/creatine-cover_cyberpunk.svg",
    excerpt:
      "Creatine is the most researched and effective muscle-building supplement in the world. Learn what creatine is, how it works, correct dosage, loading myths, safety facts, brain benefits, FAQs, and the best creatine supplements in India.",
    content: CREATINE_BLOG_CONTENT
  },
  {
    slug: "vitamin-d3-complete-guide-india-2025",
    title: "Vitamin D3: Complete Guide for Indians (2025)",
    category: "GUIDE",
    date: "2025-01-06",
    image: "/images/blog/vitamins/vitamin-d3-cover.png",
    excerpt: "Why most Indians are deficient in Vitamin D3, how much you need, and the best D3 supplements to choose.",
    content: VITAMIN_D3_BLOG_CONTENT
  },
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

      {
        type: "story_qa",
        question: "Why do prices vary so much between brands?",
        answer: "It often comes down to the SOURCE of the whey. Premium brands use imported raw whey (often from the US or Europe) which has stricter quality controls, while budget brands might source locally or use more fillers to cut costs. We've balanced this list to show you where it's worth paying extra and where you can save."
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
    slug: "omega-3-complete-guide-india-2026",
    title: "Omega 3: Benefits, Dosage, Strengths & Best Omega 3 Supplements in India",
    category: "GUIDE",
    date: "2026-01-10",
    image: "/images/blog/omega3/omega-3-cover.png",
    excerpt: "Omega 3 is one of the most important yet under-consumed nutrients in India. Learn what Omega 3 is, why supplementation is needed, proper dosage, and the best Omega 3 supplements for gym-goers and overall health.",
    content: OMEGA3_BLOG_CONTENT
  }
];