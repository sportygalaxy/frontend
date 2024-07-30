import { z } from "zod";

export const getProductCategoriesSchema = z.object({});

export type GetProductCategoriesSchemaDTO = z.infer<
  typeof getProductCategoriesSchema
>;

export const getProductCategorySchema = z.object({});

export type GetProductCategorySchemaDTO = z.infer<
  typeof getProductCategorySchema
>;

export const createProductCategorySchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z
    .date()
    .optional()
    .default(() => new Date()),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
});

export type CreateProductCategorySchemaDTO = z.infer<
  typeof createProductCategorySchema
>;

export const updateProductCategorySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional().nullable(),
});

export type UpdateProductCategorySchemaDTO = z.infer<
  typeof updateProductCategorySchema
>;
