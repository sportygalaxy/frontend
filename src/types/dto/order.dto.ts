import { z } from "zod";

export const getOrdersSchema = z.object({});

export type GetOrdersSchemaDTO = z.infer<typeof getOrdersSchema>;

export const getOrderSchema = z.object({});

export type GetOrderSchemaDTO = z.infer<typeof getOrderSchema>;

const OrderItemSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().min(1),
});

export const createOrderSchema = z.object({
  userId: z.string().uuid(),
  items: z.array(OrderItemSchema).nonempty(),
});

export type CreateOrderSchemaDTO = z.infer<typeof createOrderSchema>;

export const updateAllOrderSchema = z.object({
  status: z.string().optional(),
});

export type UpdateAllOrderSchemaDTO = z.infer<typeof updateAllOrderSchema>;

export const updateOrderSchema = z.object({
  status: z.string().optional(),
});

export type UpdateOrderSchemaDTO = z.infer<typeof updateOrderSchema>;

