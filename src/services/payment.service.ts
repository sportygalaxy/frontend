import { NextFunction } from "express";
import prisma from "../lib/prisma";
import { Payment } from "../models";
import { ERROR_MESSAGES, HTTP_STATUS_CODE } from "../constants";
import { ErrorResponse } from "../utils/errorResponse";
import { createPaymentSchema } from "../types/dto/payment.dto";
import { validateData } from "../helpers/validation";
import { PaymentGateway } from "@prisma/client";

export class PaymentService {
  async processPayment(
    userId: string,
    amount: number,
    currency: string,
    gatewayName: string,
    next: NextFunction
  ): Promise<Payment> {
    const gateway = await prisma.paymentGateway.findUnique({
      where: { name: gatewayName },
    });

    if (!gateway) {
      throw new Error("Payment gateway not found");
    }

    const conversionRate = await this.getConversionRate(currency, gateway);

    const payment = await prisma.payment.create({
      data: {
        userId: userId,
        amount: amount,
        currency: currency,
        conversionRate: conversionRate,
        status: "PENDING",
        gatewayId: gateway.id, // Directly assign gatewayId
      },
    });

    // Process payment with the gateway (mocked here)
    const paymentSuccess = await this.mockGatewayProcessing(payment);

    return prisma.payment.update({
      where: { id: payment.id },
      data: { status: paymentSuccess ? "SUCCESS" : "FAILED" },
    });
  }

  private async getConversionRate(
    currency: string,
    gateway: PaymentGateway
  ): Promise<number> {
    // Abstracted logic for currency conversion, this could be fetched from a service
    // or calculated based on some logic.
    return 1.0; // Simplified, assumes 1:1 conversion rate
  }

  private async mockGatewayProcessing(payment: Payment): Promise<boolean> {
    // Mocking payment processing
    return true; // Assume success for simplicity
  }
}
