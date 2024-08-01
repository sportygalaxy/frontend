import { NextFunction } from "express";
import prisma from "../lib/prisma";
import { Coupon } from "../models";
import { ERROR_MESSAGES, HTTP_STATUS_CODE } from "../constants";
import { ErrorResponse } from "../utils/errorResponse";
import {
  createCouponSchema,
  UpdateCouponSchemaDTO,
} from "../types/dto/coupon.dto";
import { validateData } from "../helpers/validation";
import { CreateCouponDTO } from "../types/coupon.types";
import { calculateDiscount } from "../helpers/calculate-discount";

export class CouponService {
  /**
   *
   * @param payload
   * @param next
   * @returns
   */
  async createCoupon(
    payload: CreateCouponDTO,
    next: NextFunction
  ): Promise<Coupon> {
    const validateCoupon = (coupon: CreateCouponDTO) =>
      validateData(createCouponSchema, coupon);

    const param = {
      ...payload,
    };

    console.log(param);

    try {
      validateCoupon(param);

      const coupon = await prisma.coupon.create({
        data: {
          ...payload,
        },
      });

      if (!coupon) {
        throw new ErrorResponse(
          ERROR_MESSAGES.COUPON_CREATE_FAILED,
          HTTP_STATUS_CODE[400].code
        );
      }

      return coupon;
    } catch (err) {
      next(err);
      throw new ErrorResponse(
        ERROR_MESSAGES.COUPON_CREATE_FAILED,
        HTTP_STATUS_CODE[400].code
      );
    }
  }

  /**
   *
   * @param query
   * @param next
   * @returns coupon details
   */
  async getCoupons(query: any, next: NextFunction): Promise<Coupon[]> {
    try {
      const coupons = await prisma.coupon.findMany({
        where: { ...(query && query) },
      });

      if (!coupons) {
        throw new ErrorResponse(
          ERROR_MESSAGES.COUPON_NOT_FOUND,
          HTTP_STATUS_CODE[400].code
        );
      }

      return coupons;
    } catch (err) {
      next(err);
      throw new ErrorResponse(
        ERROR_MESSAGES.COUPON_GETS_FOUND,
        HTTP_STATUS_CODE[400].code
      );
    }
  }

  /**
   *
   * @param couponId couponId
   * @param _next
   * @returns coupon details
   */
  async getCoupon(
    couponId: string,
    next: NextFunction
  ): Promise<Coupon | null> {
    try {
      const coupon = await prisma.coupon.findUnique({
        where: { id: couponId },
      });

      if (!coupon) {
        throw new ErrorResponse(
          ERROR_MESSAGES.COUPON_NOT_FOUND,
          HTTP_STATUS_CODE[400].code
        );
      }

      return coupon;
    } catch (err) {
      next(err);
      throw new ErrorResponse(
        ERROR_MESSAGES.COUPON_GETS_FOUND,
        HTTP_STATUS_CODE[400].code
      );
    }
  }

  /**
   *
   * @param couponId couponId
   * @param data payload
   * @param _next
   * @returns coupon
   */
  async updateCoupon(
    couponId: string,
    data: Partial<UpdateCouponSchemaDTO>,
    next: NextFunction
  ): Promise<Coupon> {
    try {
      await this.getCoupon(couponId, next);

      const updatedCoupon = await prisma.coupon.update({
        where: { id: couponId },
        data,
      });

      if (!updatedCoupon) {
        throw new ErrorResponse(
          ERROR_MESSAGES.COUPON_UPDATE_FAILED,
          HTTP_STATUS_CODE[400].code
        );
      }

      return updatedCoupon;
    } catch (err) {
      next(err);
      throw new ErrorResponse(
        ERROR_MESSAGES.COUPON_UPDATE_FAILED,
        HTTP_STATUS_CODE[400].code
      );
    }
  }

  /**
   *
   * @param couponId couponId
   * @param userId userId
   * @param _next
   * NOTE: order amount is updated with discounted value on completed coupon application.
   * @returns coupon
   */

  async validateCoupon(
    orderId: string,
    couponCode: string,
    userId: string,
    next: NextFunction
  ): Promise<any> {
    try {
      // Retrieve the coupon
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode },
      });

      if (!coupon) throw new Error("Coupon not found");
      if (coupon.expiration && new Date() > coupon.expiration) {
        throw new Error("Coupon expired");
      }

      // Check if coupon has a unit count and if it has been used up
      if (coupon.unitCount !== null && coupon.usedCount >= coupon.unitCount) {
        throw new Error("Coupon usage limit reached");
      }

      // Check if coupon is assigned to a specific user
      const couponUser = await prisma.couponUser.findUnique({
        where: { userId_couponId: { userId, couponId: coupon.id } },
      });

      if (!coupon.global && !couponUser) {
        throw new Error("This coupon is not available for you");
      }

      // Check if the user has already used this coupon
      if (couponUser?.used) {
        throw new Error("Coupon already used by this user");
      }

      // Retrieve the order and calculate the discount
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { items: { include: { product: true } } },
      });
      if (!order) throw new Error("Order not found");

      const discount = await calculateDiscount(order, coupon);
      const totalAfterDiscount = order.total - discount;

      // Handle the coupon user record
      if (couponUser) {
        if (
          couponUser.remainingCount !== null &&
          couponUser.remainingCount <= 0
        ) {
          throw new Error(
            "Coupon already used by this user or no remaining uses left"
          );
        }
      }

      return { orderId: order.id, total: totalAfterDiscount, discount, coupon };
    } catch (err) {
      next(err);
      throw new Error("Failed to apply coupon");
    }
  }
  /**
   *
   * @param couponId couponId
   * @param userId userId
   * @param _next
   * NOTE: order amount is updated with discounted value on completed coupon application.
   * @returns coupon
   */
  async applyCoupon(
    orderId: string,
    couponCode: string,
    userId: string,
    next: NextFunction
  ): Promise<any> {
    try {
      // Retrieve the coupon
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode },
      });

      if (!coupon) throw new Error("Coupon not found");
      if (coupon.expiration && new Date() > coupon.expiration) {
        throw new Error("Coupon expired");
      }

      // Check if coupon has a unit count and if it has been used up
      if (coupon.unitCount !== null && coupon.usedCount >= coupon.unitCount) {
        throw new Error("Coupon usage limit reached");
      }

      // Check if coupon is assigned to a specific user
      const couponUser = await prisma.couponUser.findUnique({
        where: { userId_couponId: { userId, couponId: coupon.id } },
      });

      if (!coupon.global && !couponUser) {
        throw new Error("This coupon is not available for you");
      }

      // Check if the user has already used this coupon
      if (couponUser?.used) {
        throw new Error("Coupon already used by this user");
      }

      // Retrieve the order and calculate the discount
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { items: { include: { product: true } } },
      });
      if (!order) throw new Error("Order not found");

      const discount = await calculateDiscount(order, coupon);
      let totalAfterDiscount = order.total - discount;

      // Validate and adjust total if necessary
      if (totalAfterDiscount <= 0) {
        totalAfterDiscount = 0;
      }

      // Update the order's total value in the database
      await prisma.order.update({
        where: { id: order.id },
        data: { total: totalAfterDiscount, couponId: coupon.id },
      });

      // Update the coupon's used count
      await prisma.coupon.update({
        where: { id: coupon.id },
        data: { usedCount: { increment: 1 } },
      });

      // Handle the coupon user record
      if (couponUser) {
        if (
          couponUser.remainingCount !== null &&
          couponUser.remainingCount <= 0
        ) {
          throw new Error(
            "Coupon already used by this user or no remaining uses left"
          );
        }

        if (couponUser.remainingCount !== null) {
          await prisma.couponUser.update({
            where: { userId_couponId: { userId, couponId: coupon.id } },
            data: { remainingCount: couponUser.remainingCount - 1 },
          });
        }

        if (
          couponUser.remainingCount !== null &&
          couponUser.remainingCount - 1 === 0
        ) {
          await prisma.couponUser.update({
            where: { userId_couponId: { userId, couponId: coupon.id } },
            data: { used: true },
          });
        }
      }

      return { orderId: order.id, total: totalAfterDiscount, discount, coupon };
    } catch (err) {
      next(err);
      throw new Error("Failed to apply coupon");
    }
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
  async assignCoupon(
    userId: string,
    couponId: string,
    next: NextFunction,
    unitCount?: number
  ): Promise<any> {
    try {
      const coupon = await prisma.coupon.findUnique({
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
      if (
        unitCount &&
        (coupon.unitCount === null || coupon.unitCount < unitCount)
      ) {
        throw new Error("Invalid unit count for this coupon");
      }

      const assignCoupon = await prisma.couponUser.create({
        data: {
          userId,
          couponId,
          remainingCount: unitCount,
        },
      });

      if (!assignCoupon) {
        throw new Error(
          "Coupon already used by this user or no remaining uses left"
        );
      }

      return assignCoupon;
    } catch (err) {
      next(err);
      throw new ErrorResponse(
        ERROR_MESSAGES.COUPON_UPDATE_FAILED,
        HTTP_STATUS_CODE[400].code
      );
    }
  }

  /**
   *
   * @param _dto couponId
   * @param _next
   * @returns
   */
  async deleteCoupon(
    _dto: { id: string },
    _next: NextFunction
  ): Promise<null | void> {
    const { id: _id } = _dto;

    try {
      await prisma.coupon.delete({
        where: { id: _id },
      });

      return null;
    } catch (err) {
      _next(err);
      throw new ErrorResponse(
        ERROR_MESSAGES.COUPON_DELETE_FAILED,
        HTTP_STATUS_CODE[400].code
      );
    }
  }
}
