import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(1, "Price is required"),
  description: z.string().optional(),
  category: z.string().optional(),
  imageUrl: z.string().url("Invalid image URL").optional(), // imageUrl is optional
});
