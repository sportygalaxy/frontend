"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const coupon_controller_js_1 = require("../controllers/coupon.controller.js");
const router = express_1.default.Router();
router.get("/:couponId", coupon_controller_js_1.getCoupon);
router.post("/", coupon_controller_js_1.createCoupon);
router.get("/", coupon_controller_js_1.getCoupons);
router.put("/:couponId", coupon_controller_js_1.updateCoupon);
router.put("/:orderId/apply", coupon_controller_js_1.applyCoupon);
router.put("/:orderId/assign", coupon_controller_js_1.assignCoupon);
router.delete("/:couponId", coupon_controller_js_1.deleteCoupon);
exports.default = router;
