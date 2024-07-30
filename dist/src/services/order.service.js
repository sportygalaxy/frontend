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
const prisma_1 = __importDefault(require("../lib/prisma"));
class OrderService {
    createOrder(userId, items) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate and calculate total price
            let total = 0;
            const orderItems = [];
            for (const { productId, quantity } of items) {
                const product = yield prisma_1.default.product.findUnique({
                    where: { id: productId },
                });
                if (!product) {
                    throw new Error(`Product with ID ${productId} not found`);
                }
                total += product.price * quantity;
                orderItems.push({
                    productId,
                    quantity,
                    price: product.price,
                });
            }
            // Create order
            const order = yield prisma_1.default.order.create({
                data: {
                    userId,
                    total,
                    status: "PENDING",
                    items: {
                        create: orderItems,
                    },
                },
                include: {
                    items: true,
                },
            });
            return order;
        });
    }
    getOrderById(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.order.findUnique({
                where: { id: orderId },
                include: { items: true },
            });
        });
    }
    updateOrderStatus(orderId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.order.update({
                where: { id: orderId },
                data: { status },
                include: {
                    items: true,
                },
            });
        });
    }
}
exports.default = new OrderService();
