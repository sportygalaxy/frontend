import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";

import {
  createCoupon,
  getCoupon,
  getCoupons,
  updateCoupon,
  applyCoupon,
  assignCoupon,
  deleteCoupon,
} from "../controllers/coupon.controller.js";

const router = express.Router();

router.get("/:couponId", getCoupon);
router.post("/", createCoupon);
router.get("/", getCoupons);
router.put("/:couponId", updateCoupon);
router.put("/:orderId/apply", applyCoupon);
router.put("/:orderId/assign", assignCoupon);
router.delete("/:couponId", deleteCoupon);

export default router;
