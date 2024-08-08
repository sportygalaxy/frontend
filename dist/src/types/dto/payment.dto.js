"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePaymentSchema = exports.createPaymentSchema = exports.getPaymentSchema = exports.getPaymentsSchema = void 0;
const zod_1 = require("zod");
exports.getPaymentsSchema = zod_1.z.object({});
exports.getPaymentSchema = zod_1.z.object({});
exports.createPaymentSchema = zod_1.z.object({
    id: zod_1.z.string().uuid().optional(),
    userId: zod_1.z.string().uuid(),
    amount: zod_1.z.number(),
    gatewayName: zod_1.z.string(),
    createdAt: zod_1.z
        .date()
        .optional()
        .default(() => new Date()),
    updatedAt: zod_1.z.date().optional(),
    deletedAt: zod_1.z.date().optional().nullable(),
});
exports.updatePaymentSchema = zod_1.z.object({});
