import {
  CreateProductSubcategorySchemaDTO,
  GetProductSubcategorySchemaDTO,
  GetProductSubcategoriesSchemaDTO,
  UpdateProductSubcategorySchemaDTO,
} from "./dto/product-subcategory.dto";
import { ApiResponse } from "./global.types";

// export interface GetProductSubcategoriesDTO {}

export interface GetProductSubcategoriesResponse {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type GetProductSubcategoriesDTO = GetProductSubcategoriesSchemaDTO;
export type GetProductSubcategoriesApiResponse =
  ApiResponse<GetProductSubcategoriesResponse>;

// export interface GetProductSubcategoriesDTO {}

export interface GetProductSubcategoryResponse {
  id: string;
  categoryId: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type GetProductSubcategoryDTO = GetProductSubcategorySchemaDTO;
export type GetProductSubcategoryApiResponse =
  ApiResponse<GetProductSubcategoryResponse>;

// export interface CreateProductSubcategoryDTO {
//   name: string;
//   categoryId: string;
//   description: string;
// }

export interface CreateProductSubcategoryResponse {
  id: string;
  categoryId: string;
  name: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type CreateProductSubcategoryDTO = CreateProductSubcategorySchemaDTO;
export type CreateProductSubcategoryApiResponse =
  ApiResponse<CreateProductSubcategoryResponse>;

// export interface UpdateProductSubcategoryDTO {
//   name: string;
//   categoryId: string;
//   description: string;
// }

export interface UpdateProductSubcategoryResponse {
  id: string;
  categoryId: string;
  name: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type UpdateProductSubcategoryDTO = UpdateProductSubcategorySchemaDTO;
export type UpdateProductSubcategoryApiResponse =
  ApiResponse<UpdateProductSubcategoryResponse>;
