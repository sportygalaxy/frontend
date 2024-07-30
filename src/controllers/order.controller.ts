import { Request, Response, NextFunction } from "express";
import orderService from "../services/order.service";


class OrderController {
  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, items } = req.body;
      const order = await orderService.createOrder(userId, items);
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }

  async getOrderById(req: Request, res: Response, next: NextFunction) {
    try {
      const { orderId } = req.params;
      const order = await orderService.getOrderById(orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }

  async updateOrderStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const order = await orderService.updateOrderStatus(orderId, status);
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }
}

export default new OrderController();
