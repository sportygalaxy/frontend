"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSubcategorySchema = exports.createProductSubcategorySchema = exports.getProductSubcategorySchema = exports.getProductSubcategoriesSchema = void 0;
const zod_1 = require("zod");
exports.getProductSubcategoriesSchema = zod_1.z.object({});
exports.getProductSubcategorySchema = zod_1.z.object({});
exports.createProductSubcategorySchema = zod_1.z.object({
    id: zod_1.z.string().uuid().optional(),
    categoryId: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    description: zod_1.z.string().optional().nullable(),
    createdAt: zod_1.z
        .date()
        .optional()
        .default(() => new Date()),
    updatedAt: zod_1.z.date().optional(),
    deletedAt: zod_1.z.date().optional().nullable(),
});
exports.updateProductSubcategorySchema = zod_1.z.object({
    categoryId: zod_1.z.string().uuid(),
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional().nullable(),
});
