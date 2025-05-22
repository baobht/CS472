import Product, { IProduct } from "../models/product.model";

interface CreateProductInput {
  name: string;
  price: number;
  description?: string;
  category?: string;
  imageUrl?: string;
}

interface UpdateProductInput {
  name?: string;
  description?: string;
  category?: string;
  price?: number;
  imageUrl?: string;
}

const getAllProducts = async (
  page: number = 1,
  limit: number = 10,
  category?: string,
  q?: string
): Promise<{ products: IProduct[]; total: number }> => {
  const skip = (page - 1) * limit;
  const filter: any = {};
  if (category) filter.category = category;
  if (q) filter.name = { $regex: q, $options: "i" }; // <-- search by name, case-insensitive

  const [products, total] = await Promise.all([
    Product.find(filter).skip(skip).limit(limit),
    Product.countDocuments(filter),
  ]);
  return { products, total };
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
