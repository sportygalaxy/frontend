"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductColorSchema = exports.createProductColorSchema = exports.getProductColorSchema = exports.getProductColorsSchema = void 0;
const zod_1 = require("zod");
exports.getProductColorsSchema = zod_1.z.object({});
exports.getProductColorSchema = zod_1.z.object({});
exports.createProductColorSchema = zod_1.z.object({
    id: zod_1.z.string().uuid().optional(),
    name: zod_1.z.string(),
    createdAt: zod_1.z
        .date()
        .optional()
        .default(() => new Date()),
    updatedAt: zod_1.z.date().optional(),
    deletedAt: zod_1.z.date().optional().nullable(),
});
exports.updateProductColorSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
});
