import { NextFunction } from "express";
import prisma from "../lib/prisma";
import { Order } from "../models";
import { ERROR_MESSAGES, HTTP_STATUS_CODE } from "../constants";
import { ErrorResponse } from "../utils/errorResponse";
import { createOrderSchema } from "../types/dto/order.dto";
import { OrderItem } from "../types/order.types";
import { validateData } from "../helpers/validation";

export class OrderService {
  /**
   *
   * @param userId
   * @param items Array of productId && quantity
   * @param next
   * @returns
   */
  async createOrder(
    userId: string,
    items: OrderItem[],
    next: NextFunction
  ): Promise<Order> {
    const validateOrder = (order: { userId: string; items: OrderItem[] }) =>
      validateData(createOrderSchema, order);

    // Validate and calculate total price
    let total = 0;
    const orderItems: { productId: string; quantity: number; price: number }[] =
      [];

    const param = {
      userId,
      items,
    };

    try {
      validateOrder(param);
      for (const { productId, quantity } of items) {
        const product = await prisma.product.findUnique({
          where: { id: productId },
        });

        if (!product) {
          throw new ErrorResponse(
            ERROR_MESSAGES.ORDER_CREATE_FAILED,
            HTTP_STATUS_CODE[400].code
          );
        }
        total += product.price * quantity;
        orderItems.push({
          productId,
          quantity,
          price: product.price,
        });
      }

      // Create order
      const order = await prisma.order.create({
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
    } catch (err) {
      next(err);
      throw new ErrorResponse(
        ERROR_MESSAGES.ORDER_CREATE_FAILED,
        HTTP_STATUS_CODE[400].code
      );
    }
  }

  /**
   *
   * @param query
   * @param next
   * @returns order details
   */
  async getOrders(query: any, next: NextFunction): Promise<Order[] | null> {
    try {
      const orders = await prisma.order.findMany({
        where: { ...(query && query) },
        include: { items: true },
      });

      if (!orders) {
        throw new ErrorResponse(
          ERROR_MESSAGES.ORDER_NOT_FOUND,
          HTTP_STATUS_CODE[400].code
        );
      }

      return orders;
    } catch (err) {
      next(err);
      throw new ErrorResponse(
        ERROR_MESSAGES.ORDER_GETS_FOUND,
        HTTP_STATUS_CODE[400].code
      );
    }
  }

  /**
   *
   * @param _id orderId
   * @param _next
   * @returns order details
   */
  async getOrder(orderId: string, next: NextFunction): Promise<Order | null> {
    try {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { items: true },
      });

      if (!order) {
        throw new ErrorResponse(
          ERROR_MESSAGES.ORDER_NOT_FOUND,
          HTTP_STATUS_CODE[400].code
        );
      }

      return order;
    } catch (err) {
      next(err);
      throw new ErrorResponse(
        ERROR_MESSAGES.ORDER_GETS_FOUND,
        HTTP_STATUS_CODE[400].code
      );
    }
  }

  /**
   *
   * @param _id orderId
   * @param _payload status
   * @param _next
   * @returns order
   */
  async updateOrderStatus(
    orderId: string,
    status: string,
    next: NextFunction
  ): Promise<Order> {
    try {
      await this.getOrder(orderId, next);

      const updatedOrder = await prisma.order.update({
        where: { id: orderId },
        data: { status },
        include: {
          items: true,
        },
      });

      if (!updatedOrder) {
        throw new ErrorResponse(
          ERROR_MESSAGES.ORDER_UPDATE_FAILED,
          HTTP_STATUS_CODE[400].code
        );
      }

      return updatedOrder;
    } catch (err) {
      next(err);
      throw new ErrorResponse(
        ERROR_MESSAGES.ORDER_UPDATE_FAILED,
        HTTP_STATUS_CODE[400].code
      );
    }
  }

  async deleteOrder(
    _dto: { id: string },
    _next: NextFunction
  ): Promise<null | void> {
    const { id: _id } = _dto;

    try {
      await prisma.order.delete({
        where: { id: _id },
      });

      return null;
    } catch (err) {
      _next(err);
      throw new ErrorResponse(
        ERROR_MESSAGES.ORDER_DELETE_FAILED,
        HTTP_STATUS_CODE[400].code
      );
    }
  }
}
