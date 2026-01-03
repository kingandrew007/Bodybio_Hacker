"use server";

// import { connectDB } from "@/lib/db";
// import { Product } from "@/lib/models";
import { revalidatePath } from "next/cache";

// 1. Get Admin Products (List View)
export async function getAdminProducts() {
  /* DATABASE MODE 
  await connectDB();
  const products = await Product.find({}).select('name category brand pricing ratings _id').sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(products));
  */

  // STATIC MODE
  const { PRODUCTS } = await import("@/lib/static-data");
  return PRODUCTS;
}

// 2. Create Product (Injector)
export async function createProduct(formData: FormData) {
  /* DATABASE MODE
  await connectDB();
  const rawData = { ... }; 
  await Product.create({ ... });
  revalidatePath("/explore");
  return { success: true, message: "PRODUCT_DEPLOYED_TO_DB" };
  */

  // STATIC MODE (MOCK SUCCESS)
  console.log("Mock Upload:", formData.get("name"));
  return { success: true, message: "SIMULATION_MODE: DATA_LOGGED (NO DB)" };
}

// 3. Delete Product
export async function deleteProduct(id: string) {
  /* DATABASE MODE
  await connectDB();
  await Product.findByIdAndDelete(id);
  revalidatePath("/admin");
  return { success: true, message: "ASSET_TERMINATED" };
  */

  // STATIC MODE
  return { success: true, message: "SIMULATION_MODE: ASSET_REMOVED (NO DB)" };
}