import { Document, model, Schema, Types } from "mongoose";

export interface IReview extends Document {
  productId: Types.ObjectId;
  author: string;
  rating: number;
  comment?: string;
  date: Date;
}

const ReviewSchema = new Schema<IReview>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Review = model<IReview>("Review", ReviewSchema);
export default Review;
