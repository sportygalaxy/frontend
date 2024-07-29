import prisma from "../lib/prisma";
import { ERROR_MESSAGES, HTTP_STATUS_CODE } from "../constants";
import { ErrorResponse } from "../utils/errorResponse";
import { NextFunction } from "express";
import { validateData } from "../helpers/validation";
import {
  CreateProductColorDTO,
  CreateProductColorResponse,
  GetProductColorsDTO,
  UpdateProductColorDTO,
  UpdateProductColorResponse,
} from "../types/product-color.types";
import { createProductColorSchema } from "../types/dto/product-color.dto";

export class ProductColorService {
  /**
   *
   * @param _query
   * @param _next
   * @returns products color list
   */
  async getProductColors(_query: GetProductColorsDTO, _next: NextFunction) {
    try {
      const productColors = await prisma.color.findMany({
        where: {
          ...(_query && _query),
        },
      });

      if (!productColors) {
        return _next(
          new ErrorResponse(
            ERROR_MESSAGES.PRODUCT_COLOR_NOT_FOUND,
            HTTP_STATUS_CODE[400].code
          )
        );
      }

      return productColors;
    } catch (err) {
      _next(err);
      throw new ErrorResponse(
        ERROR_MESSAGES.PRODUCT_COLOR_GETS_FOUND,
        HTTP_STATUS_CODE[400].code
      );
    }
  }

  /**
   *
   * @param _id colorId
   * @param _next
   * @returns product color details
   */
  async getProductColor(_id: string, _next: NextFunction) {
    try {
      const productColor = await prisma.color.findUnique({
        where: { id: _id },
        include: {},
      });

      if (!productColor) {
        return _next(
          new ErrorResponse(
            ERROR_MESSAGES.PRODUCT_COLOR_NOT_FOUND,
            HTTP_STATUS_CODE[400].code
          )
        );
      }

      return productColor;
    } catch (err) {
      _next(err);
      throw new ErrorResponse(
        ERROR_MESSAGES.PRODUCT_COLOR_GETS_FOUND,
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
  async createProductColor(
    _payload: CreateProductColorDTO,
    _next: NextFunction
  ): Promise<CreateProductColorResponse> {
    const validateProductColor = (productColor: CreateProductColorDTO) =>
      validateData(createProductColorSchema, productColor);

    const { name } = _payload;

    try {
      validateProductColor(_payload);
      const productColor = await prisma.color.create({
        data: {
          name,
        },
        include: {},
      });

      if (!productColor) {
        throw new ErrorResponse(
          ERROR_MESSAGES.PRODUCT_COLOR_CREATE_FAILED,
          HTTP_STATUS_CODE[400].code
        );
      }

      return productColor;
    } catch (err: any) {
      _next(err);
      throw new ErrorResponse(
        ERROR_MESSAGES.PRODUCT_COLOR_CREATE_FAILED,
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
  async updateProductColor(
    _id: string,
    _payload: UpdateProductColorDTO,
    _next: NextFunction
  ): Promise<UpdateProductColorResponse> {
    const { name } = _payload;
    try {
      await this.getProductColor(_id, _next);
      const updatedProductColor = await prisma.color.update({
        where: { id: _id },
        data: {
          ...(name && { name }),
        },
      });

      if (!updatedProductColor) {
        throw new ErrorResponse(
          ERROR_MESSAGES.PRODUCT_COLOR_UPDATE_FAILED,
          HTTP_STATUS_CODE[400].code
        );
      }

      return updatedProductColor;
    } catch (err: any) {
      _next(err);
      throw new ErrorResponse(
        ERROR_MESSAGES.PRODUCT_COLOR_UPDATE_FAILED,
        HTTP_STATUS_CODE[400].code
      );
    }
  }

  async deleteProductColor(
    _dto: { id: string },
    _next: NextFunction
  ): Promise<null | void> {
    const { id: _id } = _dto;

    try {
      await prisma.color.delete({
        where: { id: _id },
      });

      return null;
    } catch (err) {
      _next(err);
      throw new ErrorResponse(
        ERROR_MESSAGES.PRODUCT_COLOR_DELETE_FAILED,
        HTTP_STATUS_CODE[400].code
      );
    }
  }
}
