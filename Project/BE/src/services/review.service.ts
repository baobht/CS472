import mongoose from "mongoose";
import Review, { IReview } from "../models/review.model";

interface AddReviewInput {
  productId: string;
  author: string;
  rating: number;
  comment?: string;
}
interface UpdateReviewInput {
  reviewId: string;
  rating: number;
  comment: string;
}
const getAllReviewsByProductID = async (
  productId: string
): Promise<IReview[]> => {
  return await Review.find();
};

const addReview = async ({
  productId,
  author,
  rating,
  comment,
}: AddReviewInput): Promise<IReview> => {
  const newReview = new Review({
    productId: productId,
    author: author,
    rating: rating,
    comment: comment,
  });
  return await newReview.save();
};

const updateReview = async ({
  reviewId,
  rating,
  comment,
}: UpdateReviewInput): Promise<IReview | null> => {
  const updatedReview = await Review.findByIdAndUpdate(
    reviewId,
    {
      $set: {
        rating,
        comment,
      },
    },
    { new: true, runValidators: true }
  );
  return updatedReview;
};

const deleteReview = async (reviewId: string): Promise<number> => {
  const result = await Review.deleteOne({
    _id: new mongoose.Types.ObjectId(reviewId),
  });
  return result.deletedCount;
};

export default {
  getAllReviewsByProductID,
  addReview,
  updateReview,
  deleteReview,
};
