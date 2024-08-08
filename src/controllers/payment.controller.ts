import { Request, Response, NextFunction } from "express";

import { asyncHandler } from "../middleware/async";
import { PaymentService } from "../services/payment.service";

const paymentService = new PaymentService();

export const processPayment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, amount, currency, gatewayName } = req.body;

    const payment = await paymentService.processPayment(
      userId,
      amount,
      currency,
      gatewayName,
      next
    );
    if (!payment) return;

    res.status(201).json({
      message: "Payment processed successfully",
      data: payment,
      success: !!payment,
    });
  }
);
