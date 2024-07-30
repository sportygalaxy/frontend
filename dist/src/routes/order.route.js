"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_js_1 = __importDefault(require("../controllers/order.controller.js"));
const router = express_1.default.Router();
router.get("/:orderId", order_controller_js_1.default.getOrderById);
router.post("/", order_controller_js_1.default.createOrder);
router.patch("/:orderId/status", order_controller_js_1.default.updateOrderStatus);
exports.default = router;
