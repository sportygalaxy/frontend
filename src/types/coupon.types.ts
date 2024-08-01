import { CouponType } from "models";
import {
  ApplyCouponSchemaDTO,
  CreateCouponSchemaDTO,
  GetCouponSchemaDTO,
  GetCouponsSchemaDTO,
  UpdateCouponSchemaDTO,
} from "./dto/coupon.dto";
import { ApiResponse } from "./global.types";

// export interface GetCouponsDTO {}

type CreateCouponItem = {
  id: string;
  code: string;
  type: CouponType;
  value: number;
  unitCount?: number;
  global?: boolean;
  expiration?: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export interface GetCouponsResponse {
  id: string;
  code: string;
  type: CouponType;
  value: number;
  unitCount?: number;
  global?: boolean;
  expiration?: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type GetCouponsDTO = GetCouponsSchemaDTO;
export type GetCouponsApiResponse = ApiResponse<GetCouponsResponse[]>;

// export interface GetCouponsDTO {}

export interface GetCouponResponse {
  id: string;
  code: string;
  type: CouponType;
  value: number;
  unitCount?: number;
  global?: boolean;
  expiration?: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type GetCouponDTO = GetCouponSchemaDTO;
export type GetCouponApiResponse = ApiResponse<GetCouponResponse>;

// export interface CreateCouponDTO {
//   code: string;
//   type: CouponType;
//   value: number;
//   unitCount?: number;
//   global?: boolean;
//   expiration?: Date;
// }


export interface CreateCouponResponse {
  id: string;
  code: string;
  type: CouponType;
  value: number;
  unitCount?: number;
  global?: boolean;
  expiration?: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type CreateCouponDTO = CreateCouponSchemaDTO;
export type CreateCouponApiResponse = ApiResponse<CreateCouponResponse>;

// export interface UpdateCouponDTO {
//   code: string;
//   type: CouponType;
//   value: number;
//   unitCount?: number;
//   global?: boolean;
//   expiration?: Date;
// }

export interface UpdateCouponResponse {
  id: string;
  code: string;
  type: CouponType;
  value: number;
  unitCount?: number;
  global?: boolean;
  expiration?: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type UpdateCouponDTO = UpdateCouponSchemaDTO;
export type UpdateCouponApiResponse = ApiResponse<UpdateCouponResponse>;


// export interface UpdateCouponDTO {
//   userId: string;
//   couponCode: string;
// }

export interface ApplyCouponResponse {
  id: string;
  code: string;
  type: CouponType;
  value: number;
  unitCount?: number;
  global?: boolean;
  expiration?: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type ApplyCouponDTO = ApplyCouponSchemaDTO;
export type ApplyCouponApiResponse = ApiResponse<ApplyCouponResponse>;