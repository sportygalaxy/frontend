import prisma from "../lib/prisma";
import { Order, OrderItem } from "../models";

class OrderService {
  async createOrder(
    userId: string,
    items: Array<{ productId: string; quantity: number }>
  ): Promise<Order> {
    // Validate and calculate total price
    let total = 0;
    const orderItems: any[] = [];

    for (const { productId, quantity } of items) {
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });
      if (!product) {
        throw new Error(`Product with ID ${productId} not found`);
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
  }

  async getOrderById(orderId: string): Promise<Order | null> {
    return await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });
  }

  async updateOrderStatus(orderId: string, status: string): Promise<Order> {
    return await prisma.order.update({
      where: { id: orderId },
      data: { status },
      include: {
        items: true,
      },
    });
  }
}

export default new OrderService();
