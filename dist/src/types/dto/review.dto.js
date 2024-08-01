"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReviewSchema = exports.createReviewSchema = exports.getReviewSchema = exports.getReviewsSchema = void 0;
const zod_1 = require("zod");
exports.getReviewsSchema = zod_1.z.object({});
exports.getReviewSchema = zod_1.z.object({});
exports.createReviewSchema = zod_1.z.object({
    id: zod_1.z.string().uuid().optional(),
    userId: zod_1.z.string().uuid(),
    productId: zod_1.z.string().uuid(),
    rating: zod_1.z.number().optional(),
    comment: zod_1.z.string(),
    createdAt: zod_1.z
        .date()
        .optional()
        .default(() => new Date()),
    updatedAt: zod_1.z.date().optional(),
    deletedAt: zod_1.z.date().optional().nullable(),
});
exports.updateReviewSchema = zod_1.z.object({
    rating: zod_1.z.number().optional(),
    comment: zod_1.z.string(),
});
