"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderSchema = exports.updateAllOrderSchema = exports.createOrderSchema = exports.getOrderSchema = exports.getOrdersSchema = void 0;
const zod_1 = require("zod");
exports.getOrdersSchema = zod_1.z.object({});
exports.getOrderSchema = zod_1.z.object({});
const OrderItemSchema = zod_1.z.object({
    productId: zod_1.z.string().uuid(),
    quantity: zod_1.z.number().int().min(1),
});
exports.createOrderSchema = zod_1.z.object({
    userId: zod_1.z.string().uuid(),
    items: zod_1.z.array(OrderItemSchema).nonempty(),
});
exports.updateAllOrderSchema = zod_1.z.object({
    status: zod_1.z.string().optional(),
});
exports.updateOrderSchema = zod_1.z.object({
    status: zod_1.z.string().optional(),
});
