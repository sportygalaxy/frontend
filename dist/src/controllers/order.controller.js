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
exports.deleteOrder = exports.updateOrderStatus = exports.getOrder = exports.getOrders = exports.createOrder = void 0;
const async_1 = require("../middleware/async");
const order_service_1 = require("../services/order.service");
const orderService = new order_service_1.OrderService();
exports.createOrder = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, items } = req.body;
    const order = yield orderService.createOrder(userId, items, next);
    if (!order)
        return;
    res.status(201).json({
        message: "Order created successfully",
        data: order,
        success: !!order,
    });
}));
exports.getOrders = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const orders = yield orderService.getOrders(query, next);
    if (!orders)
        return;
    res.status(200).json({
        message: "Fetch Orders successfully",
        data: orders,
        success: !!orders,
    });
}));
exports.getOrder = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const order = yield orderService.getOrder(orderId, next);
    if (!order)
        return;
    res.status(200).json({
        message: "Fetch Order successfully",
        data: order,
        success: !!order,
    });
}));
exports.updateOrderStatus = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = yield orderService.updateOrderStatus(orderId, status, next);
    if (!order)
        return;
    res.status(200).json({
        message: "Order updated successfully",
        data: order,
        success: !!order,
    });
}));
exports.deleteOrder = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield orderService.deleteOrder({ id }, next);
    res.status(200).json({
        message: "Order deleted successfully",
        data: null,
        success: true,
    });
}));
