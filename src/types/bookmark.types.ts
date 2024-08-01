import {
  CreateBookmarkSchemaDTO,
  DeleteBookmarkSchemaDTO,
  GetBookmarkSchemaDTO,
  GetBookmarksSchemaDTO,
} from "./dto/bookmark.dto";
import { ApiResponse } from "./global.types";

// export interface GetBookmarksDTO {}

type CreateBookmarkItem = {
  id: string;
  userId: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export interface GetBookmarksResponse {
  id: string;
  userId: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type GetBookmarksDTO = GetBookmarksSchemaDTO;
export type GetBookmarksApiResponse = ApiResponse<GetBookmarksResponse[]>;

// export interface GetBookmarksDTO {}

export interface GetBookmarkResponse {
  id: string;
  userId: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type GetBookmarkDTO = GetBookmarkSchemaDTO;
export type GetBookmarkApiResponse = ApiResponse<GetBookmarkResponse>;

// export interface CreateBookmarkDTO {
//   userId: string;
//   items: BookmarkItem[];
// }

export interface CreateBookmarkResponse {
  id: string;
  userId: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type CreateBookmarkDTO = CreateBookmarkSchemaDTO;
export type CreateBookmarkApiResponse = ApiResponse<CreateBookmarkResponse>;

export interface DeleteBookmarkResponse {
  id: string;
  userId: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type DeleteBookmarkDTO = DeleteBookmarkSchemaDTO;
export type DeleteBookmarkApiResponse = ApiResponse<DeleteBookmarkResponse>;

