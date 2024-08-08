import { z } from "zod";

export const getPaymentsSchema = z.object({});

export type GetPaymentsSchemaDTO = z.infer<typeof getPaymentsSchema>;

export const getPaymentSchema = z.object({});

export type GetPaymentSchemaDTO = z.infer<typeof getPaymentSchema>;

export const createPaymentSchema = z.object({
  id: z.string().uuid().optional(),
  userId: z.string().uuid(),
  amount: z.number(),
  gatewayName: z.string(),
  createdAt: z
    .date()
    .optional()
    .default(() => new Date()),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
});

export type CreatePaymentSchemaDTO = z.infer<typeof createPaymentSchema>;

export const updatePaymentSchema = z.object({});

export type UpdatePaymentSchemaDTO = z.infer<typeof updatePaymentSchema>;
