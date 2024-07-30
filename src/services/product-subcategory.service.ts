import prisma from "../lib/prisma";
import { ERROR_MESSAGES, HTTP_STATUS_CODE } from "../constants";
import { ErrorResponse } from "../utils/errorResponse";
import { NextFunction } from "express";
import { validateData } from "../helpers/validation";
import {
  CreateProductSubcategoryDTO,
  CreateProductSubcategoryResponse,
  GetProductSubcategoriesDTO,
  UpdateProductSubcategoryDTO,
  UpdateProductSubcategoryResponse,
} from "types/product-subcategory.types";
import { createProductSubcategorySchema } from "../types/dto/product-subcategory.dto";

export class ProductSubcategoryService {
  /**
   *
   * @param _query
   * @param _next
   * @returns products subcategory list
   */
  async getProductSubcategories(
    _query: GetProductSubcategoriesDTO,
    _next: NextFunction
  ) {
    try {
      const productSubcategories = await prisma.subcategory.findMany({
        where: {
          ...(_query && _query),
        },
      });

      if (!productSubcategories) {
        return _next(
          new ErrorResponse(
            ERROR_MESSAGES.PRODUCT_SUB_CATEGORY_NOT_FOUND,
            HTTP_STATUS_CODE[400].code
          )
        );
      }

      return productSubcategories;
    } catch (err) {
      _next(err);
      throw new ErrorResponse(
        ERROR_MESSAGES.PRODUCT_SUB_CATEGORY_GETS_FOUND,
        HTTP_STATUS_CODE[400].code
      );
    }
  }

  /**
   *
   * @param _id subcategoryId
   * @param _next
   * @returns product subcategory details
   */
  async getProductSubcategory(_id: string, _next: NextFunction) {
    try {
      const productSubcategory = await prisma.subcategory.findUnique({
        where: { id: _id },
        include: {},
      });

      if (!productSubcategory) {
        return _next(
          new ErrorResponse(
            ERROR_MESSAGES.PRODUCT_SUB_CATEGORY_NOT_FOUND,
            HTTP_STATUS_CODE[400].code
          )
        );
      }

      return productSubcategory;
    } catch (err) {
      _next(err);
      throw new ErrorResponse(
        ERROR_MESSAGES.PRODUCT_SUB_CATEGORY_GETS_FOUND,
        HTTP_STATUS_CODE[400].code
      );
    }
  }

  /**
   *
   * @param _payload name
   * @param _next
   * @returns subcategory
   */
  async createProductSubcategory(
    _payload: CreateProductSubcategoryDTO,
    _next: NextFunction
  ): Promise<CreateProductSubcategoryResponse> {
    const validateProductSubcategory = (
      productSubcategory: CreateProductSubcategoryDTO
    ) => validateData(createProductSubcategorySchema, productSubcategory);

    const { name, description, categoryId } = _payload;

    try {
      validateProductSubcategory(_payload);
      const productSubcategory = await prisma.subcategory.create({
        data: {
          name,
          categoryId,
          ...(description && { description }),
        },
        include: {},
      });

      if (!productSubcategory) {
        throw new ErrorResponse(
          ERROR_MESSAGES.PRODUCT_SUB_CATEGORY_CREATE_FAILED,
          HTTP_STATUS_CODE[400].code
        );
      }

      return productSubcategory;
    } catch (err: any) {
      _next(err);
      throw new ErrorResponse(
        ERROR_MESSAGES.PRODUCT_SUB_CATEGORY_CREATE_FAILED,
        HTTP_STATUS_CODE[400].code
      );
    }
  }

  /**
   *
   * @param _id subcategoryId
   * @param _payload  name, description
   * @param _next
   * @returns product
   */
  async updateProductSubcategory(
    _id: string,
    _payload: UpdateProductSubcategoryDTO,
    _next: NextFunction
  ): Promise<UpdateProductSubcategoryResponse> {
    const { name, description, categoryId } = _payload;
    try {
      await this.getProductSubcategory(_id, _next);
      const updatedProductSubcategory = await prisma.subcategory.update({
        where: { id: _id },
        data: {
          ...(categoryId && { categoryId }),
          ...(name && { name }),
          ...(description && { description }),
        },
      });

      if (!updatedProductSubcategory) {
        throw new ErrorResponse(
          ERROR_MESSAGES.PRODUCT_SUB_CATEGORY_UPDATE_FAILED,
          HTTP_STATUS_CODE[400].code
        );
      }

      return updatedProductSubcategory;
    } catch (err: any) {
      _next(err);
      throw new ErrorResponse(
        ERROR_MESSAGES.PRODUCT_SUB_CATEGORY_UPDATE_FAILED,
        HTTP_STATUS_CODE[400].code
      );
    }
  }

  async deleteProductSubcategory(
    _dto: { id: string },
    _next: NextFunction
  ): Promise<null | void> {
    const { id: _id } = _dto;

    try {
      await prisma.subcategory.delete({
        where: { id: _id },
      });

      return null;
    } catch (err) {
      _next(err);
      throw new ErrorResponse(
        ERROR_MESSAGES.PRODUCT_SUB_CATEGORY_DELETE_FAILED,
        HTTP_STATUS_CODE[400].code
      );
    }
  }
}
