import {
  CreateProductCategorySchemaDTO,
  GetProductCategorySchemaDTO,
  GetProductCategoriesSchemaDTO,
  UpdateProductCategorySchemaDTO,
} from "./dto/product-category.dto";
import { ApiResponse } from "./global.types";

// export interface GetProductCategoriesDTO {}

export interface GetProductCategoriesResponse {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type GetProductCategoriesDTO = GetProductCategoriesSchemaDTO;
export type GetProductCategoriesApiResponse =
  ApiResponse<GetProductCategoriesResponse>;

// export interface GetProductCategoriesDTO {}

export interface GetProductCategoryResponse {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type GetProductCategoryDTO = GetProductCategorySchemaDTO;
export type GetProductCategoryApiResponse =
  ApiResponse<GetProductCategoryResponse>;

// export interface CreateProductCategoryDTO {
//   name: string;
// }

export interface CreateProductCategoryResponse {
  id: string;
  name: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type CreateProductCategoryDTO = CreateProductCategorySchemaDTO;
export type CreateProductCategoryApiResponse =
  ApiResponse<CreateProductCategoryResponse>;

// export interface UpdateProductCategoryDTO {
//   name: string;
// }

export interface UpdateProductCategoryResponse {
  id: string;
  name: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type UpdateProductCategoryDTO = UpdateProductCategorySchemaDTO;
export type UpdateProductCategoryApiResponse =
  ApiResponse<UpdateProductCategoryResponse>;
