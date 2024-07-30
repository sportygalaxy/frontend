import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";

import { createOrder, getOrder, getOrders, updateOrderStatus } from "../controllers/order.controller.js";

const router = express.Router();

router.get("/:orderId", getOrder);
router.post("/", createOrder);
router.get("/", getOrders);
router.patch("/:orderId/status", updateOrderStatus);

export default router;
