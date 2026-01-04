import { PREWORKOUT_SHOP_LIST } from "@/lib/preworkout-data";

export const PRODUCTS = [
  ...PREWORKOUT_SHOP_LIST,
  // 🥇 1. MuscleBlaze
  {
    _id: "101",
    name: "MuscleBlaze Biozyme Performance",
    slug: "muscleblaze-biozyme",
    brand: "MuscleBlaze",
    category: "whey",
    pricing: { current_price: 2899, mrp: 3699 },
    ratings: { overall: 9.4 },
    images: { thumbnail: "/images/blog/whey/MuscleBlaze.png" }, // Using blog image
    specs: { activeIngredientAmount: 25, servingSize: 36, form: "Powder", totalServings: 55 },
    
    extended_specs: {
      bcaa: "5.51g",
      sweetener: "Sucralose",
      filtration: "BioZyme (Concentrate)",
      certifications: ["Labdoor", "Trustified", "Informed Choice"],
      carbs: "3g",
      sugar: "0g"
    },
    
    description: "India's most trusted whey. Features 'Enhanced Absorption Formula' (EAF®) specifically designed for Indian bodies to reduce bloating.",
    affiliates: [{ link: "https://amzn.to/4sjHnbz", vendor: "Amazon" }]
  },

  // 🥈 2. Avatar Nutrition
  {
    _id: "102",
    name: "Avatar Nutrition Whey",
    slug: "avatar-nutrition-whey",
    brand: "Avatar Nutrition",
    category: "whey",
    pricing: { current_price: 2499, mrp: 3200 },
    ratings: { overall: 9.1 },
    images: { thumbnail: "/images/blog/whey/Avatar_Nutrition.png" },
    specs: { activeIngredientAmount: 24, servingSize: 35, form: "Powder", totalServings: 57 },
    
    extended_specs: {
      bcaa: "5.4g",
      sweetener: "Acesulfame K",
      filtration: "Isolate + Conc Blend",
      certifications: ["In-House Lab Tested"],
      carbs: "4g",
      sugar: "0g"
    },
    
    description: "A fresher alternative. Known for incredible taste profiles like Malai Kulfi and reliable protein spikes.",
    affiliates: [{ link: "https://amzn.to/45xYrkm", vendor: "Amazon" }]
  },

  // 🥉 3. Naturaltein
  {
    _id: "103",
    name: "Naturaltein Whey Isolate",
    slug: "naturaltein-whey",
    brand: "Naturaltein",
    category: "whey",
    pricing: { current_price: 3100, mrp: 3999 },
    ratings: { overall: 9.6 }, // Cleanest
    images: { thumbnail: "/images/blog/whey/Naturaltein.png" },
    specs: { activeIngredientAmount: 26, servingSize: 30, form: "Powder", totalServings: 33 },
    
    extended_specs: {
      bcaa: "6.2g",
      sweetener: "Stevia (Natural)",
      filtration: "100% Isolate",
      certifications: ["Cologne List", "Glyphosate Free"],
      carbs: "1g",
      sugar: "0g"
    },
    
    description: "The cleanest label in India. No artificial sweeteners, no artificial flavors. Just pure German-sourced whey.",
    affiliates: [{ link: "https://amzn.to/4q5wGIg", vendor: "Amazon" }]
  },

  // 🔥 4. Nakpro
  {
    _id: "104",
    name: "Nakpro Platinum Whey",
    slug: "nakpro-whey",
    brand: "Nakpro",
    category: "whey",
    pricing: { current_price: 1899, mrp: 2500 },
    ratings: { overall: 8.7 },
    images: { thumbnail: "/images/blog/whey/Nakpro.png" },
    specs: { activeIngredientAmount: 24, servingSize: 33, form: "Powder", totalServings: 60 },
    
    extended_specs: {
      bcaa: "5.2g",
      sweetener: "Sucralose",
      filtration: "Concentrate",
      certifications: ["Lab Tested"],
      carbs: "4.5g",
      sugar: "0g"
    },
    
    description: "The budget king. Excellent mixability and decent taste profile for the price point.",
    affiliates: [{ link: "https://amzn.to/4pdDnqj", vendor: "Amazon" }]
  },

  // 💪 5. Atom
  {
    _id: "105",
    name: "As-It-Is Atom Whey",
    slug: "atom-whey",
    brand: "As-It-Is",
    category: "whey",
    pricing: { current_price: 1799, mrp: 2299 },
    ratings: { overall: 8.5 },
    images: { thumbnail: "/images/blog/whey/Atom_Whey.png" },
    specs: { activeIngredientAmount: 24, servingSize: 34, form: "Powder", totalServings: 58 },
    
    extended_specs: {
      bcaa: "5.1g",
      sweetener: "Enzyme Blend",
      filtration: "Concentrate",
      certifications: ["Heavy Metals Tested"],
      carbs: "5g",
      sugar: "0g"
    },
    
    description: "Raw performance. A slightly grittier texture but unbeatable value for money.",
    affiliates: [{ link: "https://amzn.to/3MQIcbV", vendor: "Amazon" }]
  }
];