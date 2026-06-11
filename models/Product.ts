import { Schema, model, models } from "mongoose";

export interface IProduct {
  name: string;
  price: number;
  images: string[];
  createdAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price cannot be negative"],
  },
  images: {
    type: [String],
    validate: {
      validator: function(v: string[]) {
        return v.length <= 4;
      },
      message: "A product can have a maximum of 4 images",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = models.Product || model<IProduct>("Product", ProductSchema);

export default Product;
