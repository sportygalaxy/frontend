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
exports.PaymentService = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
class PaymentService {
    processPayment(userId, amount, currency, gatewayName, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const gateway = yield prisma_1.default.paymentGateway.findUnique({
                where: { name: gatewayName },
            });
            if (!gateway) {
                throw new Error("Payment gateway not found");
            }
            const conversionRate = yield this.getConversionRate(currency, gateway);
            const payment = yield prisma_1.default.payment.create({
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
            const paymentSuccess = yield this.mockGatewayProcessing(payment);
            return prisma_1.default.payment.update({
                where: { id: payment.id },
                data: { status: paymentSuccess ? "SUCCESS" : "FAILED" },
            });
        });
    }
    getConversionRate(currency, gateway) {
        return __awaiter(this, void 0, void 0, function* () {
            // Abstracted logic for currency conversion, this could be fetched from a service
            // or calculated based on some logic.
            return 1.0; // Simplified, assumes 1:1 conversion rate
        });
    }
    mockGatewayProcessing(payment) {
        return __awaiter(this, void 0, void 0, function* () {
            // Mocking payment processing
            return true; // Assume success for simplicity
        });
    }
}
exports.PaymentService = PaymentService;
