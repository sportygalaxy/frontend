import { Request, Response, NextFunction } from "express";

import { asyncHandler } from "../middleware/async";
import { CouponService } from "../services/coupon.service";

const couponService = new CouponService();

export const createCoupon = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const couponData = req.body;

    const coupon = await couponService.createCoupon(couponData, next);

    if (!coupon) return;

    res.status(201).json({
      message: "Coupon created successfully",
      data: coupon,
      success: !!coupon,
    });
  }
);

export const getCoupons = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const coupons = await couponService.getCoupons(query, next);

    if (!coupons) return;

    res.status(200).json({
      message: "Fetch Coupons successfully",
      data: coupons,
      success: !!coupons,
    });
  }
);

export const getCoupon = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { couponId } = req.params;

    const coupon = await couponService.getCoupon(couponId, next);

    if (!coupon) return;

    res.status(200).json({
      message: "Fetch Coupon successfully",
      data: coupon,
      success: !!coupon,
    });
  }
);

export const updateCoupon = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { couponId } = req.params;
    const data = req.body;

    const coupon = await couponService.updateCoupon(couponId, data, next);

    if (!coupon) return;

    res.status(200).json({
      message: "Coupon updated successfully",
      data: coupon,
      success: !!coupon,
    });
  }
);

export const applyCoupon = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { orderId } = req.params;
    const { couponCode, userId } = req.body; // Assuming userId is passed in the body for simplicity

    const coupon = await couponService.applyCoupon(
      orderId,
      couponCode,
      userId,
      next
    );

    if (!coupon) return;

    res.status(200).json({
      message: "Coupon applied successfully",
      data: coupon,
      success: !!coupon,
    });
  }
);

export const validateCoupon = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { orderId } = req.params;
    const { couponCode, userId } = req.body; // Assuming userId is passed in the body for simplicity

    const coupon = await couponService.validateCoupon(
      orderId,
      couponCode,
      userId,
      next
    );

    if (!coupon) return;

    res.status(200).json({
      message: "Coupon valid",
      data: coupon,
      success: !!coupon,
    });
  }
);

export const assignCoupon = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, couponId, unitCount } = req.body;

    const coupon = await couponService.assignCoupon(
      userId,
      couponId,
      next,
      unitCount
    );

    if (!coupon) return;

    res.status(200).json({
      message: "Coupon assigned successfully",
      data: coupon,
      success: !!coupon,
    });
  }
);

export const deleteCoupon = asyncHandler(async (req, res, next) => {
  const { couponId } = req.params;

  await couponService.deleteCoupon({ id: couponId }, next);

  res.status(200).json({
    message: "Coupon deleted successfully",
    data: null,
    success: true,
  });
});
