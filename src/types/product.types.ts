import { Prisma } from "@prisma/client";
import {
  CreateProductSchemaDTO,
  GetProductSchemaDTO,
  GetProductsSchemaDTO,
  UpdateAllProductSchemaDTO,
  UpdateProductSchemaDTO,
  UpdateProductSizeSchemaDTO,
} from "./dto/product.dto";
import { ApiResponse } from "./global.types";

// export interface GetProductsDTO {}

type KeyValuePair = {
  [key: string]: string;
};

// export type Specification = Prisma.JsonValue;
export type Specification = KeyValuePair[];
export type Keyattribute = KeyValuePair[];

export interface GetProductsResponse {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number | null;
  specification: Specification;
  keyattribute: Keyattribute;
  categoryId: string;
  subcategoryId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type GetProductsDTO = GetProductsSchemaDTO;
export type GetProductsApiResponse = ApiResponse<GetProductsResponse>;

// export interface GetProductsDTO {}

export interface GetProductResponse {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number | null;
  specification: Specification;
  keyattribute: Keyattribute;
  categoryId: string;
  subcategoryId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type GetProductDTO = GetProductSchemaDTO;
export type GetProductApiResponse = ApiResponse<GetProductResponse>;

// export interface CreateProductDTO {
//   name: string;
//   description: string;
//   price: number;
//   stock: number;
//   categoryId: string;
//   subcategoryId: string;
//   sizeIds: string[];
//   colorIds: string[];
//   typeIds: string[];
// }

export interface CreateProductResponse {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number | null;
  specification: Specification;
  keyattribute: Keyattribute;
  categoryId: string;
  subcategoryId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type CreateProductDTO = CreateProductSchemaDTO;
export type CreateProductApiResponse = ApiResponse<CreateProductResponse>;

// export interface UpdateAllProductDTO {
//   name: string;
//   description: string;
//   price: number;
//   stock: number;
//   categoryId: string;
//   subcategoryId: string;
//   sizeIds: string[];
//   colorIds: string[];
//   typeIds: string[];
// }

export interface UpdateAllProductResponse {
  id: string;
  name?: string;
  description?: string | null;
  price?: number;
  stock?: number | null;
  specification: Specification;
  keyattribute: Keyattribute;
  categoryId?: string;
  subcategoryId?: string;
  sizeIds?: string[];
  colorIds?: string[];
  typeIds?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export type UpdateAllProductDTO = UpdateAllProductSchemaDTO;
export type UpdateAllProductApiResponse = ApiResponse<UpdateAllProductResponse>;

// export interface UpdateProductDTO {
//   name: string;
//   description: string;
//   price: number;
//   stock: number;
//   specification: Specification;
//   keyattribute: Keyattribute;
//   categoryId: string;
//   subcategoryId: string;
//   sizeIds: string[];
//   colorIds: string[];
//   typeIds: string[];
// }

export interface UpdateProductResponse {
  id: string;
  name?: string;
  description?: string | null;
  price?: number;
  stock?: number | null;
  specification: Specification;
  keyattribute: Keyattribute;
  categoryId?: string;
  subcategoryId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export type UpdateProductDTO = UpdateProductSchemaDTO;
export type UpdateProductApiResponse = ApiResponse<UpdateProductResponse>;

// export interface UpdateProductSizeDTO {
//   sizeIds: string[];
//   // colorIds: string[];
//   // typeIds: string[];
// }

export interface UpdateProductSizeResponse {
  productId: string;
  sizeId: string;
}

export type UpdateProductSizeDTO = UpdateProductSizeSchemaDTO;
export type UpdateProductSizeApiResponse =
  ApiResponse<UpdateProductSizeResponse>;

export type AttributeId = "sizeId" | "colorId" | "typeId";
export interface ProductAttributeUpdate<T extends AttributeId> {
  productId: string;
  attributeId: T;
}
export type ProductAttributeUpdateResponse =
  ProductAttributeUpdate<AttributeId>[];
