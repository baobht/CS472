import { z } from "zod";

export const createReviewSchema = z.object({
  author: z.string().nonempty(),
  rating: z.number().min(0).max(5),
});
