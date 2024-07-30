import { z } from "zod";

export const getProductSubcategoriesSchema = z.object({});

export type GetProductSubcategoriesSchemaDTO = z.infer<typeof getProductSubcategoriesSchema>;

export const getProductSubcategorySchema = z.object({});

export type GetProductSubcategorySchemaDTO = z.infer<typeof getProductSubcategorySchema>;

export const createProductSubcategorySchema = z.object({
  id: z.string().uuid().optional(),
  categoryId: z.string().uuid(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z
    .date()
    .optional()
    .default(() => new Date()),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
});

export type CreateProductSubcategorySchemaDTO = z.infer<typeof createProductSubcategorySchema>;

export const updateProductSubcategorySchema = z.object({
  categoryId: z.string().uuid(),
  name: z.string().optional(),
  description: z.string().optional().nullable(),
});

export type UpdateProductSubcategorySchemaDTO = z.infer<typeof updateProductSubcategorySchema>;
