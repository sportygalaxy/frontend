import { z } from "zod";

export const getProductSizesSchema = z.object({});

export type GetProductSizesSchemaDTO = z.infer<typeof getProductSizesSchema>;

export const getProductSizeSchema = z.object({});

export type GetProductSizeSchemaDTO = z.infer<typeof getProductSizeSchema>;

export const createProductSizeSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  createdAt: z
    .date()
    .optional()
    .default(() => new Date()),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
});

export type CreateProductSizeSchemaDTO = z.infer<typeof createProductSizeSchema>;

export const updateProductSizeSchema = z.object({
  name: z.string().optional(),
});

export type UpdateProductSizeSchemaDTO = z.infer<typeof updateProductSizeSchema>;
