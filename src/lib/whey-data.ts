export const WHEY_SHOP_LIST = [
  // 1. Nakpro Impact Whey
  {
    _id: "301",
    name: "Nakpro Impact Whey",
    slug: "nakpro-impact-whey",
    brand: "Nakpro",
    category: "whey",
    pricing: { current_price: 1199, mrp: 1699 },
    ratings: { overall: 8.5 },
    images: { thumbnail: "/images/blog/whey/Nakpro_impact.jpg" },
    specs: { activeIngredientAmount: 24, servingSize: 45, form: "Powder", totalServings: 22 }, // Protein: 24g
    extended_specs: {
      bcaa: "Check Label",
      sweetener: "Flavor dependent",
      filtration: "Isolate + Concentrate",
      certifications: ["Lab Tested"],
      carbs: "Higher than iso",
      sugar: "Check Label"
    },
    description: "Nakpro Impact Whey offers a whey isolate and concentrate blend with a strong amino acid profile, making it one of the best value-for-money protein supplements in India.",
    affiliates: [{ link: "https://www.amazon.in/NAKPRO-Protein-Digesting-Supplement-Chocolate/dp/B0CCXZ6DFN", vendor: "Amazon" }]
  },

  // 2. GNC Select Whey
  {
    _id: "302",
    name: "GNC Select Whey",
    slug: "gnc-select-whey",
    brand: "GNC",
    category: "whey",
    pricing: { current_price: 1399, mrp: 1999 },
    ratings: { overall: 9.0 },
    images: { thumbnail: "/images/blog/whey/GNCselect.jpg" },
    specs: { activeIngredientAmount: 24, servingSize: 40, form: "Powder", totalServings: 25 },
    extended_specs: {
       bcaa: "Check Label",
       sweetener: "Check Label",
       filtration: "Concentrate",
       certifications: ["Trusted Global Brand"],
       carbs: "Moderate",
       sugar: "Low"
    },
    description: "GNC Select Whey is a trusted global brand offering clean formulation, reliable testing, and consistent quality.",
    affiliates: [{ link: "https://www.amazon.in/GNC-Advanced-Concentrate-Supports-Recovery/dp/B0FXVXM16X", vendor: "Amazon" }]
  },

  // 3. Osaoo Impact Whey
  {
    _id: "303",
    name: "Osaoo Impact Whey",
    slug: "osaoo-impact-whey",
    brand: "Osaoo",
    category: "whey",
    pricing: { current_price: 1249, mrp: 1799 },
    ratings: { overall: 8.0 },
    images: { thumbnail: "/images/blog/whey/Osaoo.jpg" },
    specs: { activeIngredientAmount: 24, servingSize: 48, form: "Powder", totalServings: 21 },
    extended_specs: {
       bcaa: "Check Label",
       sweetener: "Check Label",
       filtration: "Concentrate Blend",
       certifications: ["Lab Tested"],
       carbs: "Higher",
       sugar: "Check Label"
    },
    description: "Osaoo Impact Whey provides a balanced protein blend suitable for beginners who want affordable daily protein without compromising digestion.",
    affiliates: [{ link: "https://www.amazon.in/Impact-Whey-Protein-Concentrate-Trustified/dp/B0DWMZ7NR9", vendor: "Amazon" }]
  },

  // 4. Fuel One Impact Whey
  {
    _id: "304",
    name: "Fuel One Impact Whey",
    slug: "fuel-one-impact-whey",
    brand: "Fuel One",
    category: "whey",
    pricing: { current_price: 1249, mrp: 1699 },
    ratings: { overall: 9.0 },
    images: { thumbnail: "/images/blog/whey/fueloneimpact.jpg" },
    specs: { activeIngredientAmount: 23, servingSize: 45, form: "Powder", totalServings: 22 },
    extended_specs: {
       bcaa: "Lower",
       sweetener: "Check Label",
       filtration: "Concentrate",
       certifications: ["Budget Friendly"],
       carbs: "Standard",
       sugar: "Check Label"
    },
    description: "Fuel One Impact Whey is a highly budget-friendly protein supplement designed for everyday use and meeting basic protein requirements.",
    affiliates: [{ link: "https://www.amazon.in/FUELONE-Impact-Protein-Powder-Coffee/dp/B0FFTCTTYJ", vendor: "Amazon" }]
  },

  // 5. XLR8 Classic Whey
  {
    _id: "305",
    name: "XLR8 Classic Whey",
    slug: "xlr8-classic-whey",
    brand: "XLR8",
    category: "whey",
    pricing: { current_price: 1099, mrp: 1599 },
    ratings: { overall: 9.0 },
    images: { thumbnail: "/images/blog/whey/xlr8classic.jpg" },
    specs: { activeIngredientAmount: 24, servingSize: 45, form: "Powder", totalServings: 20 }, // 2 lbs usu comes around 20-30 servings depends on scoop
    extended_specs: {
       bcaa: "Standard",
       sweetener: "Check Label",
       filtration: "Concentrate",
       certifications: ["Basic"],
       carbs: "Higher",
       sugar: "Contains Lactose"
    },
    description: "XLR8 Classic Whey is a basic whey concentrate available in large packs, making it suitable for users with very tight budgets.",
    affiliates: [{ link: "https://www.amazon.in/XLR8-Classic-Protein-Powder-Maltodextrin/dp/B0G1HL2MGY", vendor: "Amazon" }]
  }
];

export const WHEY_BLOG_CONTENT = [
  // Education Section
  {
    type: "heading",
    level: 1,
    content: "Top 5 Budget-Friendly Whey Proteins in India (Lab-Tested & Value for Money)"
  },
  {
    type: "text",
    content: "If you want to meet your daily protein requirements and build muscle on a tight budget, these lab-tested whey proteins offer the best protein per rupee in India."
  },
  {
    type: "heading",
    level: 2,
    content: "What is Whey Protein?"
  },
  {
    type: "text",
    content: "Whey protein is a high-quality protein derived from milk. When milk is turned into cheese, the liquid that separates out is called whey. That liquid protein is then processed, filtered, and dried into the powder you see on store shelves. Whey is popular because it is easy to digest, rich in essential amino acids, and supports muscle growth and recovery."
  },
  {
    type: "text",
    content: "Whey protein is made by collecting fresh milk, curdling it during cheese production to separate whey from curds, filtering the liquid whey to remove fat and lactose, drying it into a powder, and finally adding flavors or enzymes before packaging."
  },
  {
    type: "heading",
    level: 2,
    content: "Benefits of Whey Protein"
  },
  {
    type: "text",
    content: "Whey protein offers multiple benefits including fast absorption for post-workout recovery, a complete amino acid profile, support for muscle growth and strength, reduced muscle soreness, improved satiety for weight management, and immune system support."
  },
  {
    type: "heading",
    level: 2,
    content: "How Much Protein Do You Need?"
  },
  {
    type: "text",
    content: "Protein intake recommendations vary by activity level. Normal adult males generally require around 1.0 gram per kg of bodyweight, females about 0.8 grams per kg. Training males should aim for 1.6–1.8 grams per kg, while training females should target 1.4–1.5 grams per kg. For example, a 70 kg training male may require 110–125 grams of protein per day."
  },

  // 1. Nakpro Impact Whey
  {
    type: "custom_product_card",
    rank: 1,
    name: "Nakpro Impact Whey",
    brand: "Nakpro",
    ourRating: 8.5,
    price: 1199,
    description: "Nakpro Impact Whey offers a whey isolate and concentrate blend with a strong amino acid profile, making it one of the best value-for-money protein supplements in India.",
    images: [
      "/images/blog/whey/Nakpro_impact.jpg",
      "/images/blog/whey/Nakpro_impact_macros.jpg"
    ],
    link: "https://www.amazon.in/NAKPRO-Protein-Digesting-Supplement-Chocolate/dp/B0CCXZ6DFN",
    highlights: [
      "Good isolate + concentrate blend",
      "Strong amino acid profile",
      "Easy to digest",
      "Very affordable"
    ],
    pros: [
      "Solid muscle recovery",
      "Widely available",
      "Excellent protein per rupee"
    ],
    cons: [
      "Slightly higher carbs than pure isolates"
    ],
    extraInfo: {
      servingSize: "45 g",
      proteinPerScoop: "24 g",
      costPerScoop: "₹50–55"
    }
  },

  // 2. GNC Select Whey
  {
    type: "custom_product_card",
    rank: 2,
    name: "GNC Select Whey",
    brand: "GNC",
    ourRating: 9.0,
    price: 1399,
    description: "GNC Select Whey is a trusted global brand offering clean formulation, reliable testing, and consistent quality at a competitive price.",
    images: [
      "/images/blog/whey/GNCselect.jpg",
      "/images/blog/whey/GNCselect_macros.jpg"
    ],
    link: "https://www.amazon.in/GNC-Advanced-Concentrate-Supports-Recovery/dp/B0FXVXM16X",
    highlights: [
      "Trusted global brand",
      "Clean formulation",
      "Reliable quality control"
    ],
    pros: [
      "Good taste options",
      "Easy mixing",
      "Consistent quality"
    ],
    cons: [
      "Slightly expensive for budget category",
      "Lower protein percentage than isolate"
    ],
    extraInfo: {
      servingSize: "40 g",
      proteinPerScoop: "24 g",
      costPerScoop: "₹50–60"
    }
  },

  // 3. Osaoo Impact Whey
  {
    type: "custom_product_card",
    rank: 3,
    name: "Osaoo Impact Whey",
    brand: "Osaoo",
    ourRating: 8.0,
    price: 1249,
    description: "Osaoo Impact Whey provides a balanced protein blend suitable for beginners who want affordable daily protein without compromising digestion.",
    images: [
      "/images/blog/whey/Osaoo.jpg",
      "/images/blog/whey/Osaoo_macros.jpg"
    ],
    link: "https://www.amazon.in/Impact-Whey-Protein-Concentrate-Trustified/dp/B0DWMZ7NR9",
    highlights: [
      "Balanced protein blend",
      "Beginner friendly",
      "Easy on digestion"
    ],
    pros: [
      "Affordable",
      "Decent muscle support",
      "Gentle on the stomach"
    ],
    cons: [
      "Higher carbs and sugars",
      "Not ideal for strict calorie cuts"
    ],
    extraInfo: {
      servingSize: "48 g",
      proteinPerScoop: "24.24 g",
      costPerScoop: "₹50–60"
    }
  },

  // 4. Fuel One Impact Whey
  {
    type: "custom_product_card",
    rank: 4,
    name: "Fuel One Impact Whey Protein",
    brand: "Fuel One",
    ourRating: 9.0,
    price: 1249,
    description: "Fuel One Impact Whey is a highly budget-friendly protein supplement designed for everyday use and meeting basic protein requirements.",
    images: [
      "/images/blog/whey/fueloneimpact.jpg",
      "/images/blog/whey/fueloneimpact_macros.jpg"
    ],
    link: "https://www.amazon.in/FUELONE-Impact-Protein-Powder-Coffee/dp/B0FFTCTTYJ",
    highlights: [
      "Very budget friendly",
      "Simple formulation",
      "Good for daily use"
    ],
    pros: [
      "Easy mixability",
      "Great price",
      "Reliable daily protein"
    ],
    cons: [
      "Lower BCAA content",
      "Not designed for athletes"
    ],
    extraInfo: {
      servingSize: "45 g",
      proteinPerScoop: "23 g",
      costPerScoop: "₹55–60"
    }
  },

  // 5. XLR8 Classic Whey
  {
    type: "custom_product_card",
    rank: 5,
    name: "XLR8 Classic Whey Protein",
    brand: "XLR8",
    ourRating: 9.0,
    price: 1099,
    description: "XLR8 Classic Whey is a basic whey concentrate available in large packs, making it suitable for users with very tight budgets.",
    images: [
      "/images/blog/whey/xlr8classic.jpg",
      "/images/blog/whey/xlr8classic_macros.jpg"
    ],
    link: "https://www.amazon.in/XLR8-Classic-Protein-Powder-Maltodextrin/dp/B0G1HL2MGY",
    highlights: [
      "Large 2 lbs pack",
      "Low cost per scoop",
      "Basic whey concentrate"
    ],
    pros: [
      "Great for tight budgets",
      "Sufficient recovery support"
    ],
    cons: [
      "Higher carbs and lactose",
      "Not suitable for lactose-sensitive users"
    ],
    extraInfo: {
      servingSize: "45 g",
      proteinPerScoop: "24 g",
      costPerScoop: "₹55"
    }
  },

  {
    type: "text",
    content: "Final Tips for Buyers: If you are on a tight budget, focus on protein per rupee rather than brand hype. Bigger tubs usually offer a lower cost per scoop. Choose whey with at least 20 g of protein per serving. If your goal is fat loss, prefer lower-carb options. Always check for lab-tested or third-party verified products for safety and quality."
  }
];
