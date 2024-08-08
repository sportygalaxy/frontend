import {
  CreatePaymentSchemaDTO,
  GetPaymentSchemaDTO,
  GetPaymentsSchemaDTO,
  UpdatePaymentSchemaDTO,
} from "./dto/payment.dto";
import { ApiResponse } from "./global.types";

// export interface GetPaymentsDTO {}

export interface GetPaymentsResponse {
  id: string;
  userId: string;
  amount: number;
  gatewayName: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type GetPaymentsDTO = GetPaymentsSchemaDTO;
export type GetPaymentsApiResponse = ApiResponse<GetPaymentsResponse>;

// export interface GetPaymentsDTO {}

export interface GetPaymentResponse {
  id: string;
  userId: string;
  amount: number;
  gatewayName: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type GetPaymentDTO = GetPaymentSchemaDTO;
export type GetPaymentApiResponse = ApiResponse<GetPaymentResponse>;

// export interface CreatePaymentDTO {
//   userId: string;
//   amount: number;
//   gatewayName: string;
// }

export interface CreatePaymentResponse {
  userId: string;
  amount: number;
  gatewayName: string;
}

export type CreatePaymentDTO = CreatePaymentSchemaDTO;
export type CreatePaymentApiResponse = ApiResponse<CreatePaymentResponse>;

// export interface UpdatePaymentDTO {
//   userId: string;
//   amount: number;
//   gatewayName: string;
// }

export interface UpdatePaymentResponse {
  id: string;
  userId: string;
  amount: number;
  gatewayName: string;
}

export type UpdatePaymentDTO = UpdatePaymentSchemaDTO;
export type UpdatePaymentApiResponse = ApiResponse<UpdatePaymentResponse>;
