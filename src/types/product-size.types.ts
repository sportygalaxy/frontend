import { CreateProductSizeSchemaDTO, GetProductSizeSchemaDTO, GetProductSizesSchemaDTO, UpdateProductSizeSchemaDTO } from "./dto/product-size.dto";
import { ApiResponse } from "./global.types";

// export interface GetProductSizesDTO {}

export interface GetProductSizesResponse {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type GetProductSizesDTO = GetProductSizesSchemaDTO;
export type GetProductSizesApiResponse = ApiResponse<GetProductSizesResponse>;

// export interface GetProductSizesDTO {}

export interface GetProductSizeResponse {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type GetProductSizeDTO = GetProductSizeSchemaDTO;
export type GetProductSizeApiResponse = ApiResponse<GetProductSizeResponse>;

// export interface CreateProductSizeDTO {
//   name: string;
// }

export interface CreateProductSizeResponse {
  id: string;
  name: string;
}

export type CreateProductSizeDTO = CreateProductSizeSchemaDTO;
export type CreateProductSizeApiResponse = ApiResponse<CreateProductSizeResponse>;

// export interface UpdateProductSizeDTO {
//   name: string;
// }

export interface UpdateProductSizeResponse {
  id: string;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export type UpdateProductSizeDTO = UpdateProductSizeSchemaDTO;
export type UpdateProductSizeApiResponse = ApiResponse<UpdateProductSizeResponse>;

// export interface UpdateProductSizeDTO {
//   sizeIds: string[];
// }

export interface UpdateProductSizeResponse {
  productId: string;
  sizeId: string;
}
