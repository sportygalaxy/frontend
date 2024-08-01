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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCoupon = exports.assignCoupon = exports.applyCoupon = exports.updateCoupon = exports.getCoupon = exports.getCoupons = exports.createCoupon = void 0;
const async_1 = require("../middleware/async");
const coupon_service_1 = require("../services/coupon.service");
const couponService = new coupon_service_1.CouponService();
exports.createCoupon = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const couponData = req.body;
    const coupon = yield couponService.createCoupon(couponData, next);
    if (!coupon)
        return;
    res.status(201).json({
        message: "Coupon created successfully",
        data: coupon,
        success: !!coupon,
    });
}));
exports.getCoupons = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const coupons = yield couponService.getCoupons(query, next);
    if (!coupons)
        return;
    res.status(200).json({
        message: "Fetch Coupons successfully",
        data: coupons,
        success: !!coupons,
    });
}));
exports.getCoupon = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { couponId } = req.params;
    const coupon = yield couponService.getCoupon(couponId, next);
    if (!coupon)
        return;
    res.status(200).json({
        message: "Fetch Coupon successfully",
        data: coupon,
        success: !!coupon,
    });
}));
exports.updateCoupon = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { couponId } = req.params;
    const data = req.body;
    const coupon = yield couponService.updateCoupon(couponId, data, next);
    if (!coupon)
        return;
    res.status(200).json({
        message: "Coupon updated successfully",
        data: coupon,
        success: !!coupon,
    });
}));
exports.applyCoupon = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const { couponCode, userId } = req.body; // Assuming userId is passed in the body for simplicity
    const coupon = yield couponService.applyCoupon(orderId, couponCode, userId, next);
    if (!coupon)
        return;
    res.status(200).json({
        message: "Coupon applied successfully",
        data: coupon,
        success: !!coupon,
    });
}));
exports.assignCoupon = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, couponId, unitCount } = req.body;
    const coupon = yield couponService.assignCoupon(userId, couponId, next, unitCount);
    if (!coupon)
        return;
    res.status(200).json({
        message: "Coupon assigned successfully",
        data: coupon,
        success: !!coupon,
    });
}));
exports.deleteCoupon = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { couponId } = req.params;
    yield couponService.deleteCoupon({ id: couponId }, next);
    res.status(200).json({
        message: "Coupon deleted successfully",
        data: null,
        success: true,
    });
}));
