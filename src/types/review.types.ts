import {
  CreateReviewSchemaDTO,
  GetReviewSchemaDTO,
  GetReviewsSchemaDTO,
  UpdateReviewSchemaDTO,
} from "./dto/review.dto";
import { ApiResponse } from "./global.types";

// export interface GetReviewsDTO {}

export interface GetReviewsResponse {
  id: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type GetReviewsDTO = GetReviewsSchemaDTO;
export type GetReviewsApiResponse = ApiResponse<GetReviewsResponse>;

// export interface GetReviewsDTO {}

export interface GetReviewResponse {
  id: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type GetReviewDTO = GetReviewSchemaDTO;
export type GetReviewApiResponse = ApiResponse<GetReviewResponse>;

// export interface CreateReviewDTO {
//   rating: number;
//   comment: string;
// }

export interface CreateReviewResponse {
  rating: number;
  comment: string;
}

export type CreateReviewDTO = CreateReviewSchemaDTO;
export type CreateReviewApiResponse =
  ApiResponse<CreateReviewResponse>;

// export interface UpdateReviewDTO {
//   rating: number;
//   comment: string;
// }

export interface UpdateReviewResponse {
  id: string;
  rating: number;
  comment: string;
}

export type UpdateReviewDTO = UpdateReviewSchemaDTO;
export type UpdateReviewApiResponse =
  ApiResponse<UpdateReviewResponse>;
