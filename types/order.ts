export type OrderItem = {
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
};

export type Order = {
  userId: string;
  items: OrderItem[];
};

export type ICreateOrderPayload = Order;
export type ICreateOrderResponse = ServerResponse<Order>;