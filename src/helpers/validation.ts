import { z, ZodSchema } from "zod";

export const validateData = <T>(schema: ZodSchema<T>, data: unknown): T => {
  const validation = schema.safeParse(data);
  if (!validation.success) {
    console.error(validation.error.format());
    throw new Error("Validation failed");
  }
  return validation.data;
};
