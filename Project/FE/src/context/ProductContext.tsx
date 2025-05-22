/* eslint-disable react-refresh/only-export-components */
import { createContext, type ReactNode, useContext, useState } from "react";

export type Product = {
  _id: string;
  name: string;
  description?: string;
  category?: string;
  price: number;
  imageUrl?: string;
  dateAdded?: string;
  averageRating?: number;
};

export type Review = {
  _id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  date?: string;
};

type ProductContextType = {
  products: Product[];
  reviews: { [productId: string]: Review[] };
  fetchProducts: (
    page?: number,
    limit?: number,
    category?: string,
    query?: string
  ) => Promise<void>;
  fetchProduct: (id: string) => Promise<Product | undefined>;
  createProduct: (data: Partial<Product>) => Promise<Product | undefined>;
  updateProduct: (
    id: string,
    data: Partial<Product>
  ) => Promise<Product | undefined>;
  fetchReviews: (productId: string) => Promise<void>;
  addReview: (
    productId: string,
    data: Partial<Review>
  ) => Promise<Review | undefined>;
  updateReview: (
    productId: string,
    reviewId: string,
    data: Partial<Review>
  ) => Promise<Review | undefined>;
  deleteReview: (productId: string, reviewId: string) => Promise<void>;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  search: string;
  setSearch: (q: string) => void;
  generateComment: (productName: string) => Promise<string | undefined>;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);
export const API_URL = import.meta.env.VITE_API_URL;
export const useProductContext = () => {
  const ctx = useContext(ProductContext);
  if (!ctx)
    throw new Error("useProductContext must be used within ProductProvider");
  return ctx;
};

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<{ [productId: string]: Review[] }>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

  // Fetch all products with pagination and optional category filter and search
  const fetchProducts = async (
    page = 1,
    limit = 10,
    category?: string,
    query?: string
  ) => {
    let url = `${API_URL}/api/products?page=${page}&limit=${limit}`;
    if (category) url += `&category=${encodeURIComponent(category)}`;
    if (query) url += `&q=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const json = await res.json();
    setProducts(json.data || []);
  };

  // Fetch a single product
  const fetchProduct = async (id: string) => {
    const res = await fetch(`${API_URL}/api/products/${id}`);
    const json = await res.json();
    return json.data as Product;
  };

  // Create a product
  const createProduct = async (data: Partial<Product>) => {
    const res = await fetch(`${API_URL}/api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (json.data) setProducts((prev) => [...prev, json.data]);
    return json.data as Product;
  };

  // Update a product
  const updateProduct = async (id: string, data: Partial<Product>) => {
    const res = await fetch(`${API_URL}/api/products/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (json.data)
      setProducts((prev) => prev.map((p) => (p._id === id ? json.data : p)));
    return json.data as Product;
  };

  // Fetch reviews for a product
  const fetchReviews = async (productId: string) => {
    const res = await fetch(`${API_URL}/api/products/${productId}/reviews`);
    const json = await res.json();
    setReviews((prev) => ({ ...prev, [productId]: json.data || [] }));
  };

  // Add a review
  const addReview = async (productId: string, data: Partial<Review>) => {
    const res = await fetch(`${API_URL}/api/products/${productId}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (json.data) {
      setReviews((prev) => ({
        ...prev,
        [productId]: [...(prev[productId] || []), json.data],
      }));
    }
    return json.data as Review;
  };

  // Update a review
  const updateReview = async (
    productId: string,
    reviewId: string,
    data: Partial<Review>
  ) => {
    const res = await fetch(
      `${API_URL}/api/products/${productId}/reviews/${reviewId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    const json = await res.json();
    if (json.data) {
      setReviews((prev) => ({
        ...prev,
        [productId]: (prev[productId] || []).map((r) =>
          r._id === reviewId ? json.data : r
        ),
      }));
    }
    return json.data as Review;
  };

  // Delete a review
  const deleteReview = async (productId: string, reviewId: string) => {
    await fetch(`${API_URL}/api/products/${productId}/reviews/${reviewId}`, {
      method: "DELETE",
    });
    setReviews((prev) => ({
      ...prev,
      [productId]: (prev[productId] || []).filter((r) => r._id !== reviewId),
    }));
  };

  const generateComment = async (productName: string) => {
    try {
      const res = await fetch(`${API_URL}/api/ai/generate-comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName }),
      });
      const json = await res.json();
      return json.data as string | undefined;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        reviews,
        fetchProducts,
        fetchProduct,
        createProduct,
        updateProduct,
        fetchReviews,
        addReview,
        updateReview,
        deleteReview,
        selectedCategory,
        setSelectedCategory,
        search,
        setSearch,
        generateComment,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
