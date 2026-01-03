import mongoose, { Schema, Model } from 'mongoose';

// 1. The Affiliate Sub-Schema (Clean & Flexible)
const AffiliateSchema = new Schema({
  vendor: { type: String, required: true }, // Amazon, iHerb
  link: { type: String, required: true },
  price: { type: Number, required: true },
  region: { type: String, default: 'IN' }
});

// 2. The Master Product Schema
const ProductSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // e.g., muscleblaze-omega-3-gold
  brand: { type: String, required: true },
  
  // Categorization
  category: { type: String, required: true, index: true }, // omega-3
  subCategory: { type: String }, // fish-oil (vs krill-oil)

  // Visuals (Your manual folder paths)
  images: {
    thumbnail: { type: String, required: true }, // /images/products/omega3/mb-gold.webp
    gallery: [String],
    nutritionLabel: String
  },

  // The "Hardcore" Analytics Data
  specs: {
    servingSize: Number, // e.g., 1 capsule
    totalServings: Number, // 60
    activeIngredientAmount: Number, // e.g., 1000mg Fish Oil
    keyComponentAmount: Number, // e.g., 180mg EPA
    form: { type: String, enum: ['Tablet', 'Capsule', 'Powder', 'Liquid'] },
    isVegetarian: Boolean
  },

  // Scoring (0-10)
  ratings: {
    overall: { type: Number, default: 0 },
    purity: { type: Number, default: 0 },
    value: { type: Number, default: 0 },
    effectiveness: { type: Number, default: 0 }
  },

  affiliates: [AffiliateSchema],
  
  published: { type: Boolean, default: false }
}, { timestamps: true });
// ... existing ProductSchema ...

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  
  // SECURITY: Store ONLY the hash, never the real password
  passwordHash: { type: String, required: true },
  
  role: { 
    type: String, 
    enum: ['user', 'admin', 'super_admin'], 
    default: 'user' 
  },
  
  // Security Logs
  lastLogin: Date,
  loginAttempts: { type: Number, default: 0 },
  isBanned: { type: Boolean, default: false }
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
// Prevent recompilation error in Next.js hot reload
export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

// ... existing User and Product schemas ...

const ReviewSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true }, // Cache name to avoid excessive lookups
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  isVerifiedPurchase: { type: Boolean, default: false },
  likes: { type: Number, default: 0 }
}, { timestamps: true });

// Prevent recompilation
export const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema);