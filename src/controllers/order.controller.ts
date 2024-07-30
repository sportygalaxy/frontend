import { Request, Response, NextFunction } from "express";

import { asyncHandler } from "../middleware/async";
import { OrderService } from "../services/order.service";

const orderService = new OrderService();

export const createOrder = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, items } = req.body;

    const order = await orderService.createOrder(userId, items, next);

    if (!order) return;

    res.status(201).json({
      message: "Order created successfully",
      data: order,
      success: !!order,
    });
  }
);

export const getOrders = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const orders = await orderService.getOrders(query, next);

    if (!orders) return;

    res.status(200).json({
      message: "Fetch Orders successfully",
      data: orders,
      success: !!orders,
    });
  }
);

export const getOrder = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { orderId } = req.params;

    const order = await orderService.getOrder(orderId, next);

    if (!order) return;

    res.status(200).json({
      message: "Fetch Order successfully",
      data: order,
      success: !!order,
    });
  }
);

export const updateOrderStatus = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await orderService.updateOrderStatus(orderId, status, next);

    if (!order) return;

    res.status(200).json({
      message: "Order updated successfully",
      data: order,
      success: !!order,
    });
  }
);

export const deleteOrder = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  await orderService.deleteOrder({ id }, next);

  res.status(200).json({
    message: "Order deleted successfully",
    data: null,
    success: true,
  });
});
