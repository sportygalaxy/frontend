import { ERROR_MESSAGES, HTTP_STATUS_CODE } from "../constants";
import { NextFunction } from "express";
import prisma from "../lib/prisma";
import { ProductAttributeUpdateResponse } from "../types/product.types";
import { capitalizeFirstLetter } from "../utils";
import { ErrorResponse } from "../utils/errorResponse";

type BaseRelation = {
  productId: string;
};

type RelationT<T extends string> = BaseRelation & {
  [key in T]: string;
};

/**
 * Updates product attribute relationships for a given attribute type.
 *
 * @param _id - The product ID.
 * @param attribute - The attribute type (size, color, type).
 * @param ids - An array of IDs corresponding to the attribute type.
 * @param _next - The next function for error handling.
 * @returns A promise that resolves to an array of updated product attributes.
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
    // Find all existing relations for the product
    const existingRelations = await prismaModel.findMany({
      where: {
        productId: _id,
      },
    });

    const existingIds = new Set(
      existingRelations?.map(
        (relation: RelationT<string>) => relation[`${attribute}Id`]
      )
    );

    // Remove relations not in the new IDs
    const idsToRemove = [...existingIds].filter(
      (existingId) => !ids.includes(existingId as string)
    );

    await prismaModel.deleteMany({
      where: {
        productId: _id,
        [`${attribute}Id`]: { in: idsToRemove },
      },
    });

    // Create or update relations for IDs in the new array
    for (const id of ids) {
      if (!existingIds.has(id)) {
        const createdProductOnAttribute = await prismaModel.create({
          data: {
            productId: _id,
            [`${attribute}Id`]: id,
          },
        });
        updatedProducts.push(createdProductOnAttribute);
      } else {
        const updatedProductOnAttribute = await prismaModel.update({
          where: {
            [`productId_${attribute}Id`]: {
              productId: _id,
              [`${attribute}Id`]: id,
            },
          },
          data: {
            [`${attribute}Id`]: id,
          },
        });
        updatedProducts.push(updatedProductOnAttribute);
      }
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
