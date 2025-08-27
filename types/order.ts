import { ProductMedia, ProductSpecification } from "./product";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  subcategoryId: string;
  specification: ProductSpecification[];
  keyattribute: ProductSpecification[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  isDeleted: boolean;
  displayImage: string;
  medias: ProductMedia[];
}

export type OrderItem = {
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
  id: string;
  orderId: string;

  price: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  isDeleted: boolean;
  product: Product;

  productCompleted: boolean;
  reviewed: boolean;
};

export type Order = {
  userId: string;
  items: OrderItem[];
};

export type TOrderQuery = {
  userId: string;
  page?: number;
  limit?: number;
};

export type ICreateOrderPayload = Order;
export type ICreateOrderResponse = ServerResponse<Order>;
