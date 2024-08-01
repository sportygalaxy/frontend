import { NextFunction } from "express";
import prisma from "../lib/prisma";
import { Bookmark } from "../models";
import { ERROR_MESSAGES, HTTP_STATUS_CODE } from "../constants";
import { ErrorResponse } from "../utils/errorResponse";
import { createBookmarkSchema } from "../types/dto/bookmark.dto";
import { validateData } from "../helpers/validation";

export class BookmarkService {
  /**
   *
   * @param userId
   * @param productId
   * @param next
   * @returns
   */
  async createBookmark(
    userId: string,
    productId: string,
    next: NextFunction
  ): Promise<Bookmark> {
    const validateBookmark = (bookmark: {
      userId: string;
      productId: string;
    }) => validateData(createBookmarkSchema, bookmark);

    const param = {
      userId,
      productId,
    };

    try {
      validateBookmark(param);

      const existingBookmark = await prisma.bookmark.findUnique({
        where: {
          userId_productId: {
            userId,
            productId,
          },
        },
      });

      if (existingBookmark) {
        throw new ErrorResponse(
          ERROR_MESSAGES.BOOKMARK_ALREADY_EXIST_FOUND,
          HTTP_STATUS_CODE[400].code
        );
      }

      const bookmark = await prisma.bookmark.create({
        data: {
          userId,
          productId,
        },
      });

      return bookmark;
    } catch (err) {
      next(err);
      throw new ErrorResponse(
        ERROR_MESSAGES.BOOKMARK_CREATE_FAILED,
        HTTP_STATUS_CODE[400].code
      );
    }
  }

  /**
   *
   * @param query
   * @param next
   * @returns bookmark details
   */
  async getBookmarks(
    query: any,
    next: NextFunction
  ): Promise<Bookmark[] | null> {
    try {
      const bookmarks = await prisma.bookmark.findMany({
        where: { ...(query && query) },
        include: { product: true },
      });

      if (!bookmarks) {
        throw new ErrorResponse(
          ERROR_MESSAGES.BOOKMARK_NOT_FOUND,
          HTTP_STATUS_CODE[400].code
        );
      }

      return bookmarks;
    } catch (err) {
      next(err);
      throw new ErrorResponse(
        ERROR_MESSAGES.BOOKMARK_GETS_FOUND,
        HTTP_STATUS_CODE[400].code
      );
    }
  }

  async deleteBookmark(
    _dto: { userId: string; productId: string },
    _next: NextFunction
  ): Promise<null | void> {
    const { userId, productId } = _dto;
    const validateBookmark = (bookmark: {
      userId: string;
      productId: string;
    }) => validateData(createBookmarkSchema, bookmark);

    const param = {
      userId,
      productId,
    };

    try {
      validateBookmark(param);

      const existingBookmark = await prisma.bookmark.findUnique({
        where: {
          userId_productId: {
            userId,
            productId,
          },
        },
      });

      if (!existingBookmark) {
        throw new ErrorResponse(
          ERROR_MESSAGES.BOOKMARK_NOT_FOUND,
          HTTP_STATUS_CODE[400].code
        );
      }

      await prisma.bookmark.delete({
        where: {
          userId_productId: {
            userId,
            productId,
          },
        },
      });

      return null;
    } catch (err) {
      _next(err);
      throw new ErrorResponse(
        ERROR_MESSAGES.BOOKMARK_DELETE_FAILED,
        HTTP_STATUS_CODE[400].code
      );
    }
  }
}
