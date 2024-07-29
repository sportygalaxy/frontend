import { CreateProductColorSchemaDTO, GetProductColorSchemaDTO, GetProductColorsSchemaDTO, UpdateProductColorSchemaDTO } from "./dto/product-color.dto";
import { ApiResponse } from "./global.types";

// export interface GetProductColorsDTO {}

export interface GetProductColorsResponse {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type GetProductColorsDTO = GetProductColorsSchemaDTO;
export type GetProductColorsApiResponse = ApiResponse<GetProductColorsResponse>;

// export interface GetProductColorsDTO {}

export interface GetProductColorResponse {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type GetProductColorDTO = GetProductColorSchemaDTO;
export type GetProductColorApiResponse = ApiResponse<GetProductColorResponse>;

// export interface CreateProductColorDTO {
//   name: string;
// }

export interface CreateProductColorResponse {
  id: string;
  name: string;
}

export type CreateProductColorDTO = CreateProductColorSchemaDTO;
export type CreateProductColorApiResponse = ApiResponse<CreateProductColorResponse>;

// export interface UpdateProductColorDTO {
//   name: string;
// }

export interface UpdateProductColorResponse {
  id: string;
  name: string;
}

export type UpdateProductColorDTO = UpdateProductColorSchemaDTO;
export type UpdateProductColorApiResponse = ApiResponse<UpdateProductColorResponse>;