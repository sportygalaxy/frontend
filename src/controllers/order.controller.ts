import { Request, Response, NextFunction } from "express";
import orderService from "../services/order.service";
import { asyncHandler } from "../middleware/async";

class OrderController {
  createOrder = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { userId, items } = req.body;
      const order = await orderService.createOrder(userId, items);
      res.status(201).json(order);
    }
  );

  getOrderById = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { orderId } = req.params;
      const order = await orderService.getOrderById(orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json(order);
    }
  );

  updateOrderStatus = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { orderId } = req.params;
      const { status } = req.body;
      const order = await orderService.updateOrderStatus(orderId, status);
      res.status(200).json(order);
    }
  );
}

export default new OrderController();
