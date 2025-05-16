import { Request, Response } from "express";
import { generateComment } from "../services/ai.service";

export const generateCommentHandler = async (req: Request, res: Response) => {
  const { productName } = req.body;

  if (!productName || typeof productName !== "string") {
    res
      .status(400)
      .json({ error: "productName is required and must be a string" });
    return;
  }

  try {
    const comment = await generateComment(productName);
    res.json({ data: comment });
  } catch (error: unknown) {
    console.error("Failed to generate comment:", error);
    res.status(500).json({ error: "Failed to generate comment" });
  }
};
