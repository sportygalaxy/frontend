"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponService = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const constants_1 = require("../constants");
const errorResponse_1 = require("../utils/errorResponse");
const coupon_dto_1 = require("../types/dto/coupon.dto");
const validation_1 = require("../helpers/validation");
const calculate_discount_1 = require("../helpers/calculate-discount");
class CouponService {
    /**
     *
     * @param payload
     * @param next
     * @returns
     */
    createCoupon(payload, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateCoupon = (coupon) => (0, validation_1.validateData)(coupon_dto_1.createCouponSchema, coupon);
            const param = Object.assign({}, payload);
            console.log(param);
            try {
                validateCoupon(param);
                const coupon = yield prisma_1.default.coupon.create({
                    data: Object.assign({}, payload),
                });
                if (!coupon) {
                    throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.COUPON_CREATE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
                }
                return coupon;
            }
            catch (err) {
                next(err);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.COUPON_CREATE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
            }
        });
    }
    /**
     *
     * @param query
     * @param next
     * @returns coupon details
     */
    getCoupons(query, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const coupons = yield prisma_1.default.coupon.findMany({
                    where: Object.assign({}, (query && query)),
                });
                if (!coupons) {
                    throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.COUPON_NOT_FOUND, constants_1.HTTP_STATUS_CODE[400].code);
                }
                return coupons;
            }
            catch (err) {
                next(err);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.COUPON_GETS_FOUND, constants_1.HTTP_STATUS_CODE[400].code);
            }
        });
    }
    /**
     *
     * @param couponId couponId
     * @param _next
     * @returns coupon details
     */
    getCoupon(couponId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const coupon = yield prisma_1.default.coupon.findUnique({
                    where: { id: couponId },
                });
                if (!coupon) {
                    throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.COUPON_NOT_FOUND, constants_1.HTTP_STATUS_CODE[400].code);
                }
                return coupon;
            }
            catch (err) {
                next(err);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.COUPON_GETS_FOUND, constants_1.HTTP_STATUS_CODE[400].code);
            }
        });
    }
    /**
     *
     * @param couponId couponId
     * @param data payload
     * @param _next
     * @returns coupon
     */
    updateCoupon(couponId, data, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getCoupon(couponId, next);
                const updatedCoupon = yield prisma_1.default.coupon.update({
                    where: { id: couponId },
                    data,
                });
                if (!updatedCoupon) {
                    throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.COUPON_UPDATE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
                }
                return updatedCoupon;
            }
            catch (err) {
                next(err);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.COUPON_UPDATE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
            }
        });
    }
    /**
     *
     * @param couponId couponId
     * @param userId userId
     * @param _next
     * NOTE: order amount is updated with discounted value on completed coupon application.
     * @returns coupon
     */
    validateCoupon(orderId, couponCode, userId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Retrieve the coupon
                const coupon = yield prisma_1.default.coupon.findUnique({
                    where: { code: couponCode },
                });
                if (!coupon)
                    throw new Error("Coupon not found");
                if (coupon.expiration && new Date() > coupon.expiration) {
                    throw new Error("Coupon expired");
                }
                // Check if coupon has a unit count and if it has been used up
                if (coupon.unitCount !== null && coupon.usedCount >= coupon.unitCount) {
                    throw new Error("Coupon usage limit reached");
                }
                // Check if coupon is assigned to a specific user
                const couponUser = yield prisma_1.default.couponUser.findUnique({
                    where: { userId_couponId: { userId, couponId: coupon.id } },
                });
                if (!coupon.global && !couponUser) {
                    throw new Error("This coupon is not available for you");
                }
                // Check if the user has already used this coupon
                if (couponUser === null || couponUser === void 0 ? void 0 : couponUser.used) {
                    throw new Error("Coupon already used by this user");
                }
                // Retrieve the order and calculate the discount
                const order = yield prisma_1.default.order.findUnique({
                    where: { id: orderId },
                    include: { items: { include: { product: true } } },
                });
                if (!order)
                    throw new Error("Order not found");
                const discount = yield (0, calculate_discount_1.calculateDiscount)(order, coupon);
                const totalAfterDiscount = order.total - discount;
                // Handle the coupon user record
                if (couponUser) {
                    if (couponUser.remainingCount !== null &&
                        couponUser.remainingCount <= 0) {
                        throw new Error("Coupon already used by this user or no remaining uses left");
                    }
                }
                return { orderId: order.id, total: totalAfterDiscount, discount, coupon };
            }
            catch (err) {
                next(err);
                throw new Error("Failed to apply coupon");
            }
        });
    }
    /**
     *
     * @param couponId couponId
     * @param userId userId
     * @param _next
     * NOTE: order amount is updated with discounted value on completed coupon application.
     * @returns coupon
     */
    applyCoupon(orderId, couponCode, userId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Retrieve the coupon
                const coupon = yield prisma_1.default.coupon.findUnique({
                    where: { code: couponCode },
                });
                if (!coupon)
                    throw new Error("Coupon not found");
                if (coupon.expiration && new Date() > coupon.expiration) {
                    throw new Error("Coupon expired");
                }
                // Check if coupon has a unit count and if it has been used up
                if (coupon.unitCount !== null && coupon.usedCount >= coupon.unitCount) {
                    throw new Error("Coupon usage limit reached");
                }
                // Check if coupon is assigned to a specific user
                const couponUser = yield prisma_1.default.couponUser.findUnique({
                    where: { userId_couponId: { userId, couponId: coupon.id } },
                });
                if (!coupon.global && !couponUser) {
                    throw new Error("This coupon is not available for you");
                }
                // Check if the user has already used this coupon
                if (couponUser === null || couponUser === void 0 ? void 0 : couponUser.used) {
                    throw new Error("Coupon already used by this user");
                }
                // Retrieve the order and calculate the discount
                const order = yield prisma_1.default.order.findUnique({
                    where: { id: orderId },
                    include: { items: { include: { product: true } } },
                });
                if (!order)
                    throw new Error("Order not found");
                const discount = yield (0, calculate_discount_1.calculateDiscount)(order, coupon);
                let totalAfterDiscount = order.total - discount;
                // Validate and adjust total if necessary
                if (totalAfterDiscount <= 0) {
                    totalAfterDiscount = 0;
                }
                // Update the order's total value in the database
                yield prisma_1.default.order.update({
                    where: { id: order.id },
                    data: { total: totalAfterDiscount, couponId: coupon.id },
                });
                // Update the coupon's used count
                yield prisma_1.default.coupon.update({
                    where: { id: coupon.id },
                    data: { usedCount: { increment: 1 } },
                });
                // Handle the coupon user record
                if (couponUser) {
                    if (couponUser.remainingCount !== null &&
                        couponUser.remainingCount <= 0) {
                        throw new Error("Coupon already used by this user or no remaining uses left");
                    }
                    if (couponUser.remainingCount !== null) {
                        yield prisma_1.default.couponUser.update({
                            where: { userId_couponId: { userId, couponId: coupon.id } },
                            data: { remainingCount: couponUser.remainingCount - 1 },
                        });
                    }
                    if (couponUser.remainingCount !== null &&
                        couponUser.remainingCount - 1 === 0) {
                        yield prisma_1.default.couponUser.update({
                            where: { userId_couponId: { userId, couponId: coupon.id } },
                            data: { used: true },
                        });
                    }
                }
                return { orderId: order.id, total: totalAfterDiscount, discount, coupon };
            }
            catch (err) {
                next(err);
                throw new Error("Failed to apply coupon");
            }
        });
    }
    /**
     *
     * @param couponId couponId
     * @param userId userId
     * @param unitCount unitCount
     * @param _next
     * NOTE: If global is true, you can't assign coupon to a user
     * @returns assign coupon to user
     */
    assignCoupon(userId, couponId, next, unitCount) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const coupon = yield prisma_1.default.coupon.findUnique({
                    where: { id: couponId },
                });
                if (!coupon) {
                    throw new Error("Coupon not found");
                }
                // Check if the coupon is not global and assignable
                if (coupon.global) {
                    throw new Error("Cannot assign a global coupon to a specific user");
                }
                // Check if the coupon has a specific unit count
                if (unitCount &&
                    (coupon.unitCount === null || coupon.unitCount < unitCount)) {
                    throw new Error("Invalid unit count for this coupon");
                }
                const assignCoupon = yield prisma_1.default.couponUser.create({
                    data: {
                        userId,
                        couponId,
                        remainingCount: unitCount,
                    },
                });
                if (!assignCoupon) {
                    throw new Error("Coupon already used by this user or no remaining uses left");
                }
                return assignCoupon;
            }
            catch (err) {
                next(err);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.COUPON_UPDATE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
            }
        });
    }
    /**
     *
     * @param _dto couponId
     * @param _next
     * @returns
     */
    deleteCoupon(_dto, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: _id } = _dto;
            try {
                yield prisma_1.default.coupon.delete({
                    where: { id: _id },
                });
                return null;
            }
            catch (err) {
                _next(err);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.COUPON_DELETE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
            }
        });
    }
}
exports.CouponService = CouponService;
