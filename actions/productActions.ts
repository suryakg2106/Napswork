"use server";

import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import cloudinary from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

const MAX_IMAGE_SIZE = 4 * 1024 * 1024; // 4MB

export async function createProduct(formData: FormData) {
  try {
    await dbConnect();

    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const images = formData.getAll("images") as File[];

    // Basic validation
    if (!name || isNaN(price)) {
      return { error: "Name and price are required" };
    }

    if (images.length === 0 || (images.length === 1 && images[0].size === 0)) {
       return { error: "At least one image is required" };
    }

    if (images.length > 4) {
      return { error: "Maximum 4 images allowed" };
    }

    // Validate image sizes
    for (const image of images) {
      if (image.size > MAX_IMAGE_SIZE) {
        return { error: `Image ${image.name} exceeds the 4MB limit` };
      }
    }

    // Upload images to Cloudinary
    const uploadPromises = images.map(async (image) => {
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      return new Promise<string>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "napworks_products" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result?.secure_url || "");
          }
        ).end(buffer);
      });
    });

    const imageUrls = await Promise.all(uploadPromises);

    // Save to MongoDB
    const newProduct = new Product({
      name,
      price,
      images: imageUrls.filter(url => url !== ""),
    });

    await newProduct.save();

    revalidatePath("/panel/product");
    return { success: true, message: "Product created successfully" };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to create product";
    console.error("Error creating product:", error);
    return { error: errorMessage };
  }
}

export async function deleteProduct(productId: string) {
  try {
    await dbConnect();

    const product = await Product.findById(productId);
    if (!product) {
      return { error: "Product not found" };
    }

    // Delete images from Cloudinary
    const deletePromises = product.images.map((url: string) => {
      // Extract public_id from URL: .../upload/v123/folder/id.jpg -> folder/id
      const parts = url.split("/");
      const fileName = parts[parts.length - 1].split(".")[0];
      const folder = parts[parts.length - 2];
      const publicId = `${folder}/${fileName}`;
      
      return new Promise((resolve) => {
        cloudinary.uploader.destroy(publicId, (error, result) => {
          resolve(result);
        });
      });
    });

    await Promise.all(deletePromises);

    // Delete from MongoDB
    await Product.findByIdAndDelete(productId);

    revalidatePath("/panel/product");
    return { success: true, message: "Product deleted successfully" };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to delete product";
    console.error("Error deleting product:", error);
    return { error: errorMessage };
  }
}
