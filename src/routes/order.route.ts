import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";

import orderController from "../controllers/order.controller.js";

const router = express.Router();

router.get("/:orderId", orderController.getOrderById);
router.post("/", orderController.createOrder);
router.patch("/:orderId/status", orderController.updateOrderStatus);

export default router;
