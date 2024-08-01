"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyCouponSchema = exports.updateCouponSchema = exports.createCouponSchema = exports.getCouponSchema = exports.getCouponsSchema = void 0;
const zod_1 = require("zod");
exports.getCouponsSchema = zod_1.z.object({});
exports.getCouponSchema = zod_1.z.object({});
const CouponTypeEnum = zod_1.z.enum(["PERCENTAGE", "PRODUCT_OFF", "PRICE_OFF"]);
exports.createCouponSchema = zod_1.z.object({
    code: zod_1.z.string(),
    type: CouponTypeEnum,
    value: zod_1.z.number(),
    unitCount: zod_1.z.number().optional(),
    global: zod_1.z.boolean().optional(),
    expiration: zod_1.z.date().optional(),
});
exports.updateCouponSchema = zod_1.z.object({
    code: zod_1.z.string(),
    type: CouponTypeEnum,
    value: zod_1.z.number(),
    unitCount: zod_1.z.number().optional(),
    global: zod_1.z.boolean().optional(),
    expiration: zod_1.z.date().optional(),
});
exports.applyCouponSchema = zod_1.z.object({
    userId: zod_1.z.string().uuid(),
    couponCode: CouponTypeEnum,
});
