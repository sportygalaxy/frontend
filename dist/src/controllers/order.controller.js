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
const order_service_1 = __importDefault(require("../services/order.service"));
const async_1 = require("../middleware/async");
class OrderController {
    constructor() {
        this.createOrder = (0, async_1.asyncHandler)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { userId, items } = req.body;
            const order = yield order_service_1.default.createOrder(userId, items);
            res.status(201).json(order);
        }));
        this.getOrderById = (0, async_1.asyncHandler)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { orderId } = req.params;
            const order = yield order_service_1.default.getOrderById(orderId);
            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }
            res.status(200).json(order);
        }));
        this.updateOrderStatus = (0, async_1.asyncHandler)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { orderId } = req.params;
            const { status } = req.body;
            const order = yield order_service_1.default.updateOrderStatus(orderId, status);
            res.status(200).json(order);
        }));
    }
}
exports.default = new OrderController();
