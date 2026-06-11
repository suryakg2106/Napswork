"use server";

import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

export async function getProductCount() {
  try {
    await dbConnect();
    const count = await Product.countDocuments();
    return count;
  } catch (error) {
    console.error("Error getting product count:", error);
    return 0;
  }
}
