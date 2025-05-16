import { Request, Response } from "express";
import logger from "../config/logger";
import reviewService from "../services/review.service";

const getAllReviewsByProductID = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.params;
    const reviews = await reviewService.getAllReviewsByProductID(productId);
    res.json({ data: reviews });
  } catch (error) {
    logger.error("Error fetching reviews by productId", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

const createReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const { author, rating, comment } = req.body;

    const review = await reviewService.addReview({
      productId,
      author,
      rating,
      comment,
    });

    logger.info("Review created for product %s by %s", productId, author);
    res.status(201).json({ data: review });
  } catch (error) {
    logger.error("Error creating review", error);
    res.status(500).json({ error: "Failed to create review" });
  }
};

const updateReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const review = await reviewService.updateReview({
      reviewId,
      rating,
      comment,
    });

    if (!review) {
      res.status(404).json({ error: "Review not found" });
      return;
    }

    logger.info("Review %s updated", reviewId);
    res.json({ data: review });
  } catch (error) {
    logger.error("Error updating review", error);
    res.status(500).json({ error: "Failed to update review" });
  }
};

const deleteReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { reviewId } = req.params;
    const success = await reviewService.deleteReview(reviewId);

    if (!success) {
      res.status(404).json({ error: "Review not found" });
      return;
    }

    logger.info("Review %s deleted", reviewId);
    res.json({ message: "Delete successful" });
  } catch (error) {
    logger.error("Error deleting review", error);
    res.status(500).json({ error: "Failed to delete review" });
  }
};

export default {
  getAllReviewsByProductID,
  createReview,
  updateReview,
  deleteReview,
};
