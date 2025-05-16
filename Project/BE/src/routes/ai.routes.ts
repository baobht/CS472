import { Router } from "express";
import { generateCommentHandler } from "../controllers/ai.controller";

const aiRoutes = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     GenerateCommentRequest:
 *       type: object
 *       required:
 *         - productName
 *       properties:
 *         productName:
 *           type: string
 *           example: "Super Cool Gadget"
 *     GenerateCommentResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: string
 *           example: "This Super Cool Gadget is a game-changer for tech lovers!"
 */

/**
 * @swagger
 * /api/ai/generate-comment:
 *   post:
 *     summary: Generate a comment about a product
 *     tags:
 *       - AI
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GenerateCommentRequest'
 *     responses:
 *       200:
 *         description: Generated comment text
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenerateCommentResponse'
 *       400:
 *         description: Bad request, invalid input
 */
aiRoutes.post("/generate-comment", generateCommentHandler);

export default aiRoutes;
