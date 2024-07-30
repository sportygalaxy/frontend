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
exports.OrderService = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const constants_1 = require("../constants");
const errorResponse_1 = require("../utils/errorResponse");
const order_dto_1 = require("../types/dto/order.dto");
const validation_1 = require("../helpers/validation");
class OrderService {
    /**
     *
     * @param userId
     * @param items Array of productId && quantity
     * @param next
     * @returns
     */
    createOrder(userId, items, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateOrder = (order) => (0, validation_1.validateData)(order_dto_1.createOrderSchema, order);
            // Validate and calculate total price
            let total = 0;
            const orderItems = [];
            const param = {
                userId,
                items,
            };
            try {
                validateOrder(param);
                for (const { productId, quantity } of items) {
                    const product = yield prisma_1.default.product.findUnique({
                        where: { id: productId },
                    });
                    if (!product) {
                        throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.ORDER_CREATE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
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
            }
            catch (err) {
                next(err);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.ORDER_CREATE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
            }
        });
    }
    /**
     *
     * @param query
     * @param next
     * @returns order details
     */
    getOrders(query, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield prisma_1.default.order.findMany({
                    where: Object.assign({}, (query && query)),
                    include: { items: true },
                });
                if (!orders) {
                    throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.ORDER_NOT_FOUND, constants_1.HTTP_STATUS_CODE[400].code);
                }
                return orders;
            }
            catch (err) {
                next(err);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.ORDER_GETS_FOUND, constants_1.HTTP_STATUS_CODE[400].code);
            }
        });
    }
    /**
     *
     * @param _id orderId
     * @param _next
     * @returns order details
     */
    getOrder(orderId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield prisma_1.default.order.findUnique({
                    where: { id: orderId },
                    include: { items: true },
                });
                if (!order) {
                    throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.ORDER_NOT_FOUND, constants_1.HTTP_STATUS_CODE[400].code);
                }
                return order;
            }
            catch (err) {
                next(err);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.ORDER_GETS_FOUND, constants_1.HTTP_STATUS_CODE[400].code);
            }
        });
    }
    /**
     *
     * @param _id orderId
     * @param _payload status
     * @param _next
     * @returns order
     */
    updateOrderStatus(orderId, status, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getOrder(orderId, next);
                const updatedOrder = yield prisma_1.default.order.update({
                    where: { id: orderId },
                    data: { status },
                    include: {
                        items: true,
                    },
                });
                if (!updatedOrder) {
                    throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.ORDER_UPDATE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
                }
                return updatedOrder;
            }
            catch (err) {
                next(err);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.ORDER_UPDATE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
            }
        });
    }
    deleteOrder(_dto, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: _id } = _dto;
            try {
                yield prisma_1.default.order.delete({
                    where: { id: _id },
                });
                return null;
            }
            catch (err) {
                _next(err);
                throw new errorResponse_1.ErrorResponse(constants_1.ERROR_MESSAGES.ORDER_DELETE_FAILED, constants_1.HTTP_STATUS_CODE[400].code);
            }
        });
    }
}
exports.OrderService = OrderService;
