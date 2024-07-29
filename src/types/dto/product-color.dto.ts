import { z } from "zod";

export const getProductColorsSchema = z.object({});

export type GetProductColorsSchemaDTO = z.infer<typeof getProductColorsSchema>;

export const getProductColorSchema = z.object({});

export type GetProductColorSchemaDTO = z.infer<typeof getProductColorSchema>;

export const createProductColorSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  createdAt: z
    .date()
    .optional()
    .default(() => new Date()),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
});

export type CreateProductColorSchemaDTO = z.infer<typeof createProductColorSchema>;

export const updateProductColorSchema = z.object({
  name: z.string().optional(),
});

export type UpdateProductColorSchemaDTO = z.infer<typeof updateProductColorSchema>;
