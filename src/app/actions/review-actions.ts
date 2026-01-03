"use server";

import { connectDB } from "@/lib/db";
import { Review, Product } from "@/lib/models";
import { revalidatePath } from "next/cache";

export async function submitReview(productId: string, formData: FormData) {
  // 1. In a real app, verify session via cookies here
  // const session = await getSession(); 
  // if (!session) throw new Error("UNAUTHORIZED");

  const rawData = {
    userId: "65a000000000000000000001", // MOCK ID (Replace with real session.user.id)
    userName: formData.get("userName"), // Hidden field
    rating: Number(formData.get("rating")),
    comment: formData.get("comment"),
  };

  if (!rawData.rating || rawData.rating < 1) {
    return { success: false, message: "RATING_REQUIRED" };
  }

  await connectDB();

  try {
    // 2. Create the Review
    await Review.create({
      productId,
      userId: rawData.userId,
      userName: rawData.userName,
      rating: rawData.rating,
      comment: rawData.comment,
      isVerifiedPurchase: true // Mocking this as true
    });

    // 3. OPTIONAL: Recalculate Product Average Score
    // (In a real app, you'd do this to keep the product score updated)
    
    // 4. Revalidate cache so the new review appears instantly
    revalidatePath(`/reviews`);
    
    return { success: true, message: "REVIEW_LOGGED_SUCCESSFULLY" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "DATABASE_WRITE_ERROR" };
  }
}