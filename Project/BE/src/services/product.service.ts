import Product, { IProduct } from "../models/product.model";

interface CreateProductInput {
  name: string;
  price: number;
  description?: string;
  category?: string;
}

interface UpdateProductInput {
  name?: string;
  description?: string;
  category?: string;
  price?: number;
}

const getAllProducts = async (): Promise<IProduct[]> => {
  return await Product.find();
};

const getProductById = async (id: string): Promise<IProduct | null> => {
  return await Product.findById(id);
};

const createProduct = async (data: CreateProductInput): Promise<IProduct> => {
  const product = new Product(data);
  return await product.save();
};

const updateProduct = async (
  id: string,
  data: UpdateProductInput
): Promise<IProduct | null> => {
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true }
  );
  return updatedProduct;
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
};
