import { ERROR_MESSAGES, HTTP_STATUS_CODE } from "../constants";
import { NextFunction } from "express";
import prisma from "../lib/prisma";
import { ProductAttributeUpdateResponse } from "../types/product.types";
import { capitalizeFirstLetter } from "../utils";
import { ErrorResponse } from "../utils/errorResponse";

/**
 *
 * @param _id productId
 * @param attribute size | color | type
 * @param ids sizeIds[] | colorIds[] | typeIds[]
 * @param _next
 * @returns A Facade to update size, color, type
 */
export async function updateProductAttribute(
  _id: string,
  attribute: string,
  ids: string[],
  _next: NextFunction
): Promise<ProductAttributeUpdateResponse> {
  const updatedProducts: ProductAttributeUpdateResponse = [];
  const modelName = `productOn${capitalizeFirstLetter(attribute)}`;
  const prismaModel = (prisma as any)[modelName];

  if (!prismaModel) {
    throw new Error(`Model ${modelName} not found in Prisma client.`);
  }

  try {
    for (const id of ids) {
      const whereClause: any = {
        [`productId_${attribute}Id`]: {
          productId: _id,
          [`${attribute}Id`]: id,
        },
      };

      const productOnAttribute = await prismaModel.findUnique({
        where: whereClause,
      });

      if (!productOnAttribute) {
        throw new ErrorResponse(
          ERROR_MESSAGES.PRODUCT_NOT_FOUND,
          HTTP_STATUS_CODE[400].code
        );
      }

      const updatedProductOnAttribute = await prismaModel.update({
        where: whereClause,
        data: {
          [`${attribute}Id`]: id,
        },
      });

      if (!updatedProductOnAttribute) {
        throw new ErrorResponse(
          ERROR_MESSAGES.PRODUCT_UPDATE_FAILED,
          HTTP_STATUS_CODE[400].code
        );
      }

      updatedProducts.push(updatedProductOnAttribute);
    }

    return updatedProducts;
  } catch (err: any) {
    _next(err);
    throw new ErrorResponse(
      ERROR_MESSAGES.PRODUCT_UPDATE_FAILED,
      HTTP_STATUS_CODE[400].code
    );
  }
}
