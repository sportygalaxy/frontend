import { z } from "zod";

export const getCouponsSchema = z.object({});

export type GetCouponsSchemaDTO = z.infer<typeof getCouponsSchema>;

export const getCouponSchema = z.object({});

export type GetCouponSchemaDTO = z.infer<typeof getCouponSchema>;

const CouponTypeEnum = z.enum(["PERCENTAGE", "PRODUCT_OFF", "PRICE_OFF"]);

export const createCouponSchema = z.object({
  code: z.string(),
  type: CouponTypeEnum,
  value: z.number(),
  unitCount: z.number().optional(),
  global: z.boolean().optional(),
  expiration: z.date().optional(),
});

export type CreateCouponSchemaDTO = z.infer<typeof createCouponSchema>;

export const updateCouponSchema = z.object({
  code: z.string(),
  type: CouponTypeEnum,
  value: z.number(),
  unitCount: z.number().optional(),
  global: z.boolean().optional(),
  expiration: z.date().optional(),
});

export type UpdateCouponSchemaDTO = z.infer<typeof updateCouponSchema>;

export const applyCouponSchema = z.object({
  userId: z.string().uuid(),
  couponCode: CouponTypeEnum,
});

export type ApplyCouponSchemaDTO = z.infer<typeof applyCouponSchema>;
