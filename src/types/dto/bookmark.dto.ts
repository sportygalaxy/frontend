import { z } from "zod";

export const getBookmarksSchema = z.object({});

export type GetBookmarksSchemaDTO = z.infer<typeof getBookmarksSchema>;

export const getBookmarkSchema = z.object({});

export type GetBookmarkSchemaDTO = z.infer<typeof getBookmarkSchema>;

export const createBookmarkSchema = z.object({
  userId: z.string().uuid(),
  productId: z.string().uuid(),
});

export type CreateBookmarkSchemaDTO = z.infer<typeof createBookmarkSchema>;

export const deleteBookmarkSchema = z.object({
  userId: z.string().uuid(),
  productId: z.string().uuid(),
});

export type DeleteBookmarkSchemaDTO = z.infer<typeof deleteBookmarkSchema>;


