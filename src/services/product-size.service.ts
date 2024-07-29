import prisma from "../lib/prisma";
import { ERROR_MESSAGES, HTTP_STATUS_CODE } from "../constants";
import { ErrorResponse } from "../utils/errorResponse";
import { NextFunction } from "express";
import { validateData } from "../helpers/validation";
import {
  CreateProductSizeDTO,
  CreateProductSizeResponse,
  GetProductSizesDTO,
  UpdateProductSizeDTO,
} from "types/product-size.types";
import { createProductSizeSchema } from "../types/dto/product-size.dto";
import { UpdateProductResponse } from "../types/product.types";

export class ProductSizeService {
  /**
   *
   * @param _query
   * @param _next
   * @returns products size list
   */
  async getProductSizes(_query: GetProductSizesDTO, _next: NextFunction) {
    try {
      const productSizes = await prisma.size.findMany({
        where: {
          ...(_query && _query),
        },
      });

      if (!productSizes) {
        return _next(
          new ErrorResponse(
            ERROR_MESSAGES.PRODUCT_SIZE_NOT_FOUND,
            HTTP_STATUS_CODE[400].code
          )
        );
      }

      return productSizes;
    } catch (err) {
      _next(err);
      throw new ErrorResponse(
        ERROR_MESSAGES.PRODUCT_SIZE_GETS_FOUND,
        HTTP_STATUS_CODE[400].code
      );
    }
  }

  /**
   *
   * @param _id sizeId
   * @param _next
   * @returns product size details
   */
  async getProductSize(_id: string, _next: NextFunction) {
    try {
      const productSize = await prisma.size.findUnique({
        where: { id: _id },
        include: {},
      });

      if (!productSize) {
        return _next(
          new ErrorResponse(
            ERROR_MESSAGES.PRODUCT_SIZE_NOT_FOUND,
            HTTP_STATUS_CODE[400].code
          )
        );
      }

      return productSize;
    } catch (err) {
      _next(err);
      throw new ErrorResponse(
        ERROR_MESSAGES.PRODUCT_SIZE_GETS_FOUND,
        HTTP_STATUS_CODE[400].code
      );
    }
  }

  /**
   *
   * @param _payload name
   * @param _next
   * @returns product
   */
  async createProductSize(
    _payload: CreateProductSizeDTO,
    _next: NextFunction
  ): Promise<CreateProductSizeResponse> {
    const validateProductSize = (productSize: CreateProductSizeDTO) =>
      validateData(createProductSizeSchema, productSize);

    const { name } = _payload;

    try {
      validateProductSize(_payload);
      const productSize = await prisma.size.create({
        data: {
          name,
        },
        include: {},
      });

      if (!productSize) {
        throw new ErrorResponse(
          ERROR_MESSAGES.PRODUCT_SIZE_CREATE_FAILED,
          HTTP_STATUS_CODE[400].code
        );
      }

      return productSize;
    } catch (err: any) {
      _next(err);
      throw new ErrorResponse(
        ERROR_MESSAGES.PRODUCT_SIZE_CREATE_FAILED,
        HTTP_STATUS_CODE[400].code
      );
    }
  }

  /**
   *
   * @param _id productId
   * @param _payload  name
   * @param _next
   * @returns product
   */
  async updateProductSize(
    _id: string,
    _payload: UpdateProductSizeDTO,
    _next: NextFunction
  ): Promise<UpdateProductResponse> {
    const { name } = _payload;
    try {
      await this.getProductSize(_id, _next);
      const updatedProductSize = await prisma.size.update({
        where: { id: _id },
        data: {
          ...(name && { name }),
        },
      });

      if (!updatedProductSize) {
        throw new ErrorResponse(
          ERROR_MESSAGES.PRODUCT_SIZE_UPDATE_FAILED,
          HTTP_STATUS_CODE[400].code
        );
      }

      return updatedProductSize;
    } catch (err: any) {
      _next(err);
      throw new ErrorResponse(
        ERROR_MESSAGES.PRODUCT_SIZE_UPDATE_FAILED,
        HTTP_STATUS_CODE[400].code
      );
    }
  }

  async deleteProductSize(
    _dto: { id: string },
    _next: NextFunction
  ): Promise<null | void> {
    const { id: _id } = _dto;

    try {
      await prisma.size.delete({
        where: { id: _id },
      });

      return null;
    } catch (err) {
      _next(err);
      throw new ErrorResponse(
        ERROR_MESSAGES.PRODUCT_SIZE_DELETE_FAILED,
        HTTP_STATUS_CODE[400].code
      );
    }
  }
}
