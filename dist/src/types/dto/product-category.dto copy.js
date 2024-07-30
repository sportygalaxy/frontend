"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductCategorySchema = exports.createProductCategorySchema = exports.getProductCategorySchema = exports.getProductCategoriesSchema = void 0;
const zod_1 = require("zod");
exports.getProductCategoriesSchema = zod_1.z.object({});
exports.getProductCategorySchema = zod_1.z.object({});
exports.createProductCategorySchema = zod_1.z.object({
    id: zod_1.z.string().uuid().optional(),
    name: zod_1.z.string(),
    description: zod_1.z.string().optional().nullable(),
    createdAt: zod_1.z
        .date()
        .optional()
        .default(() => new Date()),
    updatedAt: zod_1.z.date().optional(),
    deletedAt: zod_1.z.date().optional().nullable(),
});
exports.updateProductCategorySchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional().nullable(),
});
