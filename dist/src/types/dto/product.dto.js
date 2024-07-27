"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSizeSchema = exports.updateProductSchema = exports.updateAllProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
exports.createProductSchema = zod_1.z.object({
    id: zod_1.z.string().uuid().optional(),
    name: zod_1.z.string(),
    description: zod_1.z.string().optional().nullable(),
    price: zod_1.z.number(),
    stock: zod_1.z.number().optional().nullable(),
    categoryId: zod_1.z.string(),
    subcategoryId: zod_1.z.string(),
    sizeIds: zod_1.z.array(zod_1.z.string()).nullable().optional(),
    colorIds: zod_1.z.array(zod_1.z.string()).nullable().optional(),
    typeIds: zod_1.z.array(zod_1.z.string()).nullable().optional(),
    createdAt: zod_1.z
        .date()
        .optional()
        .default(() => new Date()),
    updatedAt: zod_1.z.date().optional(),
    deletedAt: zod_1.z.date().optional().nullable(),
});
exports.updateAllProductSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    price: zod_1.z.number().optional(),
    stock: zod_1.z.number().optional(),
    categoryId: zod_1.z.string().optional(),
    subcategoryId: zod_1.z.string().optional(),
    sizeIds: zod_1.z.array(zod_1.z.string()).optional(),
    colorIds: zod_1.z.array(zod_1.z.string()).optional(),
    typeIds: zod_1.z.array(zod_1.z.string()).optional(),
});
exports.updateProductSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    price: zod_1.z.number().optional(),
    stock: zod_1.z.number().optional(),
    categoryId: zod_1.z.string().optional(),
    subcategoryId: zod_1.z.string().optional(),
});
exports.updateProductSizeSchema = zod_1.z.object({
    sizeIds: zod_1.z.array(zod_1.z.string()).optional(),
});
