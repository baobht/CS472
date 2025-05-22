import { Document, Schema, model } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description?: string;
  category?: string;
  price: number;
  dateAdded: Date;
  averageRating: number;
  imageUrl?: string;
}

const ProductSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  imageUrl: {
    type: String,
  },
});

const Product = model<IProduct>("Product", ProductSchema);
export default Product;
