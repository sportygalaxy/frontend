import { z } from "zod";

export const getReviewsSchema = z.object({});

export type GetReviewsSchemaDTO = z.infer<typeof getReviewsSchema>;

export const getReviewSchema = z.object({});

export type GetReviewSchemaDTO = z.infer<typeof getReviewSchema>;

export const createReviewSchema = z.object({
  id: z.string().uuid().optional(),
  userId: z.string().uuid(),
  productId: z.string().uuid(),
  rating: z.number().optional(),
  comment: z.string(),
  createdAt: z
    .date()
    .optional()
    .default(() => new Date()),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
});

export type CreateReviewSchemaDTO = z.infer<typeof createReviewSchema>;

export const updateReviewSchema = z.object({
  rating: z.number().optional(),
  comment: z.string(),
});

export type UpdateReviewSchemaDTO = z.infer<typeof updateReviewSchema>;
