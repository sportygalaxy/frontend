"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSizeSchema = exports.createProductSizeSchema = exports.getProductSizeSchema = exports.getProductSizesSchema = void 0;
const zod_1 = require("zod");
exports.getProductSizesSchema = zod_1.z.object({});
exports.getProductSizeSchema = zod_1.z.object({});
exports.createProductSizeSchema = zod_1.z.object({
    id: zod_1.z.string().uuid().optional(),
    name: zod_1.z.string(),
    createdAt: zod_1.z
        .date()
        .optional()
        .default(() => new Date()),
    updatedAt: zod_1.z.date().optional(),
    deletedAt: zod_1.z.date().optional().nullable(),
});
exports.updateProductSizeSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
});
