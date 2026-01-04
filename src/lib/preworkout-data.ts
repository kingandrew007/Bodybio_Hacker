export const PREWORKOUT_SHOP_LIST = [
  // 🥇 1. Gayor Essentials 3.0
  {
    _id: "201",
    name: "Gayor Essentials 3.0",
    slug: "gayor-essentials-3",
    brand: "Gayor Essentials",
    category: "pre-workout",
    pricing: { current_price: 2499, mrp: 3499 }, // Estimated from costPerServing ~70-140
    ratings: { overall: 9.5 },
    images: { thumbnail: "/images/blog/preworkout/Gayor3.0.jpg" },
    specs: { activeIngredientAmount: 300, servingSize: 35, form: "Powder", totalServings: 25 }, // Caffeine: ~300mg
    extended_specs: {
      bcaa: "N/A",
      sweetener: "Check Label",
      filtration: "N/A",
      certifications: ["Lab Tested"],
      carbs: "N/A",
      sugar: "0g"
    },
    description: "A complete, well-rounded, and powerful pre-workout with large serving size and clinically dosed ingredients like Nitrosigine® and HydroPrime®.",
    affiliates: [{ link: "https://amzn.to/49mtukn", vendor: "Amazon" }]
  },

  // 🥈 2. Gayor Essentials 2.0
  {
    _id: "202",
    name: "Gayor Essentials 2.0",
    slug: "gayor-essentials-2",
    brand: "Gayor Essentials",
    category: "pre-workout",
    pricing: { current_price: 1899, mrp: 2499 },
    ratings: { overall: 9.0 },
    images: { thumbnail: "/images/blog/preworkout/Gayor2.0.jpeg" },
    specs: { activeIngredientAmount: 250, servingSize: 26, form: "Powder", totalServings: 30 }, // Caffeine: ~250mg
    extended_specs: {
      bcaa: "N/A",
      sweetener: "Check Label",
      filtration: "N/A",
      certifications: ["Lab Tested"],
      carbs: "N/A",
      sugar: "0g"
    },
    description: "Focuses on pumps and sustained workout performance. High dose L-Citrulline Malate.",
    affiliates: [{ link: "https://amzn.to/49tULBE", vendor: "Amazon" }]
  },

  // 🥉 3. GAT Nitraflex
  {
    _id: "203",
    name: "GAT Nitraflex",
    slug: "gat-nitraflex",
    brand: "GAT Sport",
    category: "pre-workout",
    pricing: { current_price: 2300, mrp: 3100 },
    ratings: { overall: 8.8 },
    images: { thumbnail: "/images/blog/preworkout/Nitraflex.jpg" },
    specs: { activeIngredientAmount: 325, servingSize: 10, form: "Powder", totalServings: 30 }, // Caffeine: ~325mg
    extended_specs: {
      bcaa: "N/A",
      sweetener: "Sucralose",
      filtration: "N/A",
      certifications: ["Imported"],
      carbs: "1g",
      sugar: "0g"
    },
    description: "High-stimulant pre-workout built for aggression, intensity, and raw power. Ideal for heavy days.",
    affiliates: [{ link: "https://amzn.to/4qtRDfC", vendor: "Amazon" }]
  },

  // 4. Hyde Extreme
  {
    _id: "204",
    name: "ProSupps Hyde Extreme",
    slug: "prosupps-hyde-extreme",
    brand: "ProSupps",
    category: "pre-workout",
    pricing: { current_price: 1999, mrp: 2799 },
    ratings: { overall: 8.5 },
    images: { thumbnail: "/images/blog/preworkout/HydeXtreme.jpg" },
    specs: { activeIngredientAmount: 400, servingSize: 7, form: "Powder", totalServings: 30 }, // Caffeine: ~400mg
    extended_specs: {
      bcaa: "N/A",
      sweetener: "Sucralose",
      filtration: "N/A",
      certifications: ["Imported"],
      carbs: "0g",
      sugar: "0g"
    },
    description: "Ultra-high stimulant pre-workout delivering explosive energy. Strictly for stim-tolerant users.",
    affiliates: [{ link: "https://amzn.to/3MZTWc9", vendor: "Amazon" }]
  },

  // 5. Blackbeast Inferno
  {
    _id: "205",
    name: "Blackbeast Big Daddy Inferno",
    slug: "blackbeast-inferno",
    brand: "Blackbeast",
    category: "pre-workout",
    pricing: { current_price: 1499, mrp: 1999 },
    ratings: { overall: 8.2 },
    images: { thumbnail: "/images/blog/preworkout/Blackbeast.jpg" },
    specs: { activeIngredientAmount: 300, servingSize: 12, form: "Powder", totalServings: 30 }, // Caffeine: ~300mg
    extended_specs: {
      bcaa: "N/A",
      sweetener: "Check Label",
      filtration: "N/A",
      certifications: ["Lab Tested"],
      carbs: "1g",
      sugar: "0g"
    },
    description: "Combines strong stimulants with added creatine and thermogenic ingredients.",
    affiliates: [{ link: "https://amzn.to/49eYpQZ", vendor: "Amazon" }]
  }
];

export const PREWORKOUT_BLOG_CONTENT = [
  // 1. Education Section (New Data)
  {
    type: "heading",
    level: 1,
    content: "Top 5 Strongest Pre-Workout in India"
  },
  {
    type: "heading",
    level: 2,
    content: "What Is Pre-Workout?"
  },
  {
    type: "text",
    content:
      "Pre-workout supplements are nutritional formulas you take before exercise to boost performance, energy, focus, and endurance during training sessions. They typically contain a mix of caffeine, nitric-oxide boosters like citrulline, amino acids, and other performance-enhancing ingredients designed to help you train harder and longer."
  },
  {
    type: "heading",
    level: 2,
    content: "Is Pre-Workout Needed for Everyone?"
  },
  {
    type: "text",
    content:
      "Not necessarily. Pre-workout supplements are useful if you want more energy and focus during intense workouts, struggle with motivation or fatigue before training, or train early in the morning or after long days. However, they are not essential if you are already eating well, well-rested, and energized."
  },
  {
    type: "heading",
    level: 2,
    content: "Benefits of Pre-Workout"
  },
  {
    type: "text",
    content: "Pre-workout supplements are popular because they provide:"
  },
  {
    type: "unordered_list",
    items: [
       "Enhanced energy and focus from caffeine and nootropics",
       "Better muscle pumps and blood flow (Nitric Oxide)",
       "Increased endurance and strength (Beta-Alanine)",
       "Improved mental drive to stay locked in"
    ]
  },
  {
    type: "heading",
    level: 2,
    content: "Risks & Side Effects"
  },
  {
    type: "text",
    content:
      "When used responsibly, pre-workouts are generally safe. However, excessive use may cause jitters and anxiety due to high caffeine intake, sleep disruption if taken late in the day, or digestive upset. To reduce these risks, start with half a scoop, avoid taking pre-workout after 2 PM, and drink plenty of water."
  },
  {
    type: "heading",
    level: 2,
    content: "Who Shouldn’t Take Pre-Workout?"
  },
  {
    type: "text",
    content:
      "Avoid using them if you are under 18, pregnant, have heart conditions, or are high anxiety/stimulant-sensitive. Always consult a healthcare professional if unsure."
  },
  {
    type: "tip_box",
    title: "Safety First - Best Practices",
    content: "Use only on PR days or heavy sessions. Never exceed the recommended dose. Hydrate with 3–4 liters of water. Combine with a meal 60–90 mins before training."
  },

  // 🥇 1. Gayor Essentials 3.0
  {
    type: "custom_product_card",
    rank: 1,
    price: 2499,
    name: "Gayor Essentials 3.0",
    description:
      "Gayor Essentials 3.0 is a complete, well-rounded, and powerful pre-workout with large serving size and clinically dosed ingredients, delivering strong performance without harsh crashes.",
    images: [
      "/images/blog/preworkout/Gayor3.0.jpg",
      "/images/blog/preworkout/Gayor3.0_macros.jpg"
    ],
    link: "https://amzn.to/49mtukn",
    highlights: [
      "Patented ingredients like Nitrosigine®, HydroPrime®, TruBeet®",
      "Clean but powerful stimulation",
      "Supports hydration and endurance",
      "Very large serving size"
    ],
    bestFor:
      "Serious lifters and athletes who want strong performance without anxiety",
    extraInfo: {
      servingSize: "17.5–35 g",
      costPerServing: "₹70–₹140",
      stimLevel: "High but controlled"
    }
  },

  // 🥈 2. Gayor Essentials 2.0
  {
    type: "custom_product_card",
    rank: 2,
    price: 1899,
    name: "Gayor Essentials 2.0",
    description:
      "Gayor Essentials 2.0 focuses more on pumps and sustained workout performance, making it easier to tolerate while still delivering solid results.",
    images: [
      "/images/blog/preworkout/Gayor2.0.jpeg",
      "/images/blog/preworkout/Gayor2.0_macros.jpg"
    ],
    link: "https://amzn.to/49tULBE",
    highlights: [
      "High dose L-Citrulline Malate",
      "Strong muscle pumps",
      "Minimal crash"
    ],
    bestFor:
      "Pump chasers, volume trainers, and intermediate lifters",
    extraInfo: {
      servingSize: "13–26 g",
      costPerServing: "₹45–₹90",
      stimLevel: "Medium–High"
    }
  },

  // 🥉 3. GAT Nitraflex
  {
    type: "custom_product_card",
    rank: 3,
    price: 2300,
    name: "GAT Nitraflex",
    description:
      "GAT Nitraflex is a high-stimulant pre-workout built for aggression, intensity, and raw power, ideal for heavy training days.",
    images: [
      "/images/blog/preworkout/Nitraflex.jpg",
      "/images/blog/preworkout/Nitraflex_macros.jpg"
    ],
    link: "https://amzn.to/4qtRDfC",
    highlights: [
      "Very strong stimulant blend",
      "Fast energy surge",
      "Excellent for heavy compound lifts"
    ],
    bestFor:
      "Advanced lifters and PR days",
    extraInfo: {
      servingSize: "~10 g",
      costPerServing: "₹75",
      stimLevel: "Very High"
    }
  },

  // 4. Hyde Extreme
  {
    type: "custom_product_card",
    rank: 4,
    price: 1999,
    name: "Hyde Extreme",
    description:
      "Hyde Extreme is an ultra-high stimulant pre-workout delivering explosive energy and intense focus, strictly for stimulant-tolerant users.",
    images: [
      "/images/blog/preworkout/HydeXtreme.jpg",
      "/images/blog/preworkout/Hyde_macros.jpg"
    ],
    link: "https://amzn.to/3MZTWc9",
    highlights: [
      "Extreme stimulant impact",
      "Very fast acting",
      "High focus and alertness"
    ],
    bestFor:
      "Hardcore lifters only",
    extraInfo: {
      servingSize: "~6.5 g",
      costPerServing: "₹63",
      stimLevel: "Extreme"
    }
  },

  // 5. Blackbeast Big Daddy Inferno
  {
    type: "custom_product_card",
    rank: 5,
    price: 1499,
    name: "Blackbeast Big Daddy Inferno",
    description:
      "Blackbeast Big Daddy Inferno combines strong stimulants with added creatine, making it ideal for strength-focused athletes.",
    images: [
      "/images/blog/preworkout/Blackbeast.jpg",
      "/images/blog/preworkout/Blackbeast_macros.jpg"
    ],
    link: "https://amzn.to/49eYpQZ",
    highlights: [
      "Contains added creatine",
      "Thermogenic ingredients",
      "Supports strength and power"
    ],
    bestFor:
      "Strength athletes and powerlifters",
    extraInfo: {
      servingSize: "6–12 g",
      costPerServing: "₹26–₹50",
      stimLevel: "High"
    }
  }
];
