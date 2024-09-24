import { z } from "zod";

export const getProductsSchema = z.object({});

export type GetProductsSchemaDTO = z.infer<typeof getProductsSchema>;

export const getProductSchema = z.object({});

export type GetProductSchemaDTO = z.infer<typeof getProductSchema>;

const keyValuePairSchema = z
  .record(z.string().optional().nullable())
  .optional()
  .nullable();

export const MediasSchema = z.array(
  z.union([
    z.object({
      type: z.literal("image"),
      images: z.array(z.string().url()),
    }),
    z.object({
      type: z.literal("video"),
      displayImage: z.string().url(),
      links: z.object({
        introVideo: z.string().url(),
        completeVideo: z.string().url(),
      }),
    }),
  ])
);

export type Medias = z.infer<typeof MediasSchema>;

export const createProductSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  price: z.number(),
  stock: z.number().optional().nullable(),
  displayImage: z.string().optional().nullable(),
  medias: MediasSchema,
  specification: z.array(keyValuePairSchema).optional().nullable(),
  keyattribute: z.array(keyValuePairSchema).optional().nullable(),
  categoryId: z.string(),
  subcategoryId: z.string(),
  sizeIds: z.array(z.string()).nullable().optional(),
  colorIds: z.array(z.string()).nullable().optional(),
  typeIds: z.array(z.string()).nullable().optional(),
  createdAt: z
    .date()
    .optional()
    .default(() => new Date()),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
});

export type CreateProductSchemaDTO = z.infer<typeof createProductSchema>;

export const updateAllProductSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  stock: z.number().optional(),
  displayImage: z.string().optional(),
  medias: z.array(keyValuePairSchema).optional().nullable(),
  specification: z.array(keyValuePairSchema).optional().nullable(),
  keyattribute: z.array(keyValuePairSchema).optional().nullable(),
  categoryId: z.string().optional(),
  subcategoryId: z.string().optional(),
  sizeIds: z.array(z.string()).optional(),
  colorIds: z.array(z.string()).optional(),
  typeIds: z.array(z.string()).optional(),
});

export type UpdateAllProductSchemaDTO = z.infer<typeof updateAllProductSchema>;

export const updateProductSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  stock: z.number().optional(),
  displayImage: z.string().optional(),
  medias: z.array(keyValuePairSchema).optional().nullable(),
  specification: z.array(keyValuePairSchema).optional().nullable(),
  keyattribute: z.array(keyValuePairSchema).optional().nullable(),
  categoryId: z.string().optional(),
  subcategoryId: z.string().optional(),
});

export type UpdateProductSchemaDTO = z.infer<typeof updateProductSchema>;

export const updateProductSizeSchema = z.object({
  sizeIds: z.array(z.string()).optional(),
});

export type UpdateProductSizeSchemaDTO = z.infer<
  typeof updateProductSizeSchema
>;
