import { Request, Response } from "express";
import logger from "../config/logger";
import productService from "../services/product.service";

const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const category = req.query.category as string | undefined;
    const q = req.query.q as string | undefined; // <-- get q param
    const { products, total } = await productService.getAllProducts(
      page,
      limit,
      category,
      q
    );
    res.json({
      data: products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    logger.error("Error getting all products", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await productService.getProductById(req.params.productId);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.json({ data: product });
  } catch (error) {
    logger.error("Error getting product by id", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, price, description, category, imageUrl } = req.body;
    const product = await productService.createProduct({
      name,
      price,
      description,
      category,
      imageUrl,
    });
    logger.info("Product created: %s", product.name);
    res.status(201).json({ data: product });
  } catch (error) {
    logger.error("Error creating product", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const { name, price, description, category, imageUrl, averageRating } =
      req.body;
    const updateProduct = {
      name,
      price,
      description,
      category,
      imageUrl,
      averageRating,
    };
    const product = await productService.updateProduct(
      productId,
      updateProduct
    );
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    logger.info("Product updated: %s", product.name);
    res.status(200).json({ message: "Update successful", data: product });
  } catch (error) {
    logger.error("Error updating product", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
};
