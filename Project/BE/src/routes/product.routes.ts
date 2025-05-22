import { Router } from "express";
import productController from "../controllers/product.controller";
import reviewController from "../controllers/review.controller";
import validate from "../middlewares/validate.middleware";
import { createProductSchema } from "../validators/product.validator";
import { createReviewSchema } from "../validators/review.validator";

const productRoutes = Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
// productRoutes.get("/", productController.getAllProducts);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get products which name match with the query
 *     tags:
 *       - Products
 *     parameters:
 *       - name: query
 *         in: path
 *         required: true
 *         description: Name of the product
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of products match
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
productRoutes.get("/", productController.getAllProducts);

/**
 * @swagger
 * /api/products/{productId}:
 *   get:
 *     summary: Get product by ID
 *     tags:
 *       - Products
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of the product to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
productRoutes.get("/:productId", productController.getProductById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
productRoutes.post(
  "/",
  validate(createProductSchema),
  productController.createProduct
);

/**
 * @swagger
 * /api/products/{productId}:
 *   post:
 *     summary: Update a product
 *     tags:
 *       - Products
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
productRoutes.post("/:productId", productController.updateProduct);

/**
 * @swagger
 * /api/products/{productId}/reviews:
 *   get:
 *     summary: Get all reviews for a product
 *     tags:
 *       - Reviews
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: string
 *           example: 615c1f3b1c4a4c3a9c5e4f1b
 *     responses:
 *       200:
 *         description: List of reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 */
productRoutes.get(
  "/:productId/reviews",
  reviewController.getAllReviewsByProductID
);

/**
 * @swagger
 * /api/products/{productId}/reviews:
 *   post:
 *     summary: Add a review to a product
 *     tags:
 *       - Reviews
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: string
 *           example: "615c1b8f1c4a4c3a9c5e4f1a"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewInput'
 *     responses:
 *       201:
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 */
productRoutes.post(
  "/:productId/reviews",
  validate(createReviewSchema),
  reviewController.createReview
);

/**
 * @swagger
 * /api/products/{productId}/reviews/{reviewId}:
 *   put:
 *     summary: Update a review for a product
 *     tags:
 *       - Reviews
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *           example: "615c1b8f1c4a4c3a9c5e4f1a"
 *       - name: reviewId
 *         in: path
 *         required: true
 *         description: Review ID
 *         schema:
 *           type: string
 *           example: "615c1f3b1c4a4c3a9c5e4f1b"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewUpdateInput'
 *     responses:
 *       200:
 *         description: Review updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 */
productRoutes.put(
  "/:productId/reviews/:reviewId",
  reviewController.updateReview
);

/**
 * @swagger
 * /api/products/{productId}/reviews/{reviewId}:
 *   delete:
 *     summary: Delete a review from a product
 *     tags:
 *       - Reviews
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *           example: "615c1b8f1c4a4c3a9c5e4f1a"
 *       - name: reviewId
 *         in: path
 *         required: true
 *         description: Review ID
 *         schema:
 *           type: string
 *           example: "615c1f3b1c4a4c3a9c5e4f1b"
 *     responses:
 *       204:
 *         description: Review deleted successfully
 */
productRoutes.delete(
  "/:productId/reviews/:reviewId",
  reviewController.deleteReview
);

export default productRoutes;
