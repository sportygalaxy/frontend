import {
  CreateOrderSchemaDTO,
  GetOrderSchemaDTO,
  GetOrdersSchemaDTO,
  UpdateOrderSchemaDTO,
} from "./dto/order.dto";
import { ApiResponse } from "./global.types";

// export interface GetOrdersDTO {}

export type OrderItem = {
  productId: string;
  quantity: number;
};

type CreateOrderItem = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export interface GetOrdersResponse {
  id: string;
  userId: string;
  total: number;
  status: string;
  items: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type GetOrdersDTO = GetOrdersSchemaDTO;
export type GetOrdersApiResponse = ApiResponse<GetOrdersResponse[]>;

// export interface GetOrdersDTO {}

export interface GetOrderResponse {
  id: string;
  userId: string;
  total: number;
  status: string;
  items: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type GetOrderDTO = GetOrderSchemaDTO;
export type GetOrderApiResponse = ApiResponse<GetOrderResponse>;

// export interface CreateOrderDTO {
//   userId: string;
//   items: OrderItem[];
// }

export interface CreateOrderResponse {
  id: string;
  userId: string;
  total: number;
  status: string;
  items: CreateOrderItem[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type CreateOrderDTO = CreateOrderSchemaDTO;
export type CreateOrderApiResponse = ApiResponse<CreateOrderResponse>;

// export interface UpdateOrderDTO {
//   status: string;
// }

export interface UpdateOrderResponse {
  id: string;
  userId: string;
  total: number;
  status: string;
  items: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type UpdateOrderDTO = UpdateOrderSchemaDTO;
export type UpdateOrderApiResponse = ApiResponse<UpdateOrderResponse>;
