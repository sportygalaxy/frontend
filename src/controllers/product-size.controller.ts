import { NextFunction, Request, Response } from "express";
import { ProductSizeService } from "../services/product-size.service";
import { asyncHandler } from "../middleware/async";
import { CreateProductSizeApiResponse, UpdateProductSizeApiResponse, UpdateProductSizeDTO } from "../types/product-size.types";

const productSizeService = new ProductSizeService();

export const getProductSizes = asyncHandler(async (req, res, next) => {
  const query = req.query;
  const productSizes = await productSizeService.getProductSizes(query, next);

  if (!productSizes) return;

  res.status(200).json({
    message: "Fetch product sizes successfully",
    data: productSizes,
    success: !!productSizes,
  });
});

export const getProductSize = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const productSize = await productSizeService.getProductSize(id, next);

  if (!productSize) return;

  res.status(200).json({
    message: "Fetch product size successfully",
    data: productSize,
    success: !!productSize,
  });
});

export const createProductSize = asyncHandler(
  async (
    req: { body: any },
    res: Response,
    next: NextFunction
  ): Promise<CreateProductSizeApiResponse | void> => {
    const productSize = await productSizeService.createProductSize(
      {
        ...req.body,
      },
      next
    );

    if (!productSize) return;

    res.status(201).json({
      message: "Product size created successfully",
      data: productSize,
      success: !!productSize,
    });
  }
);

export const updateProductSize = asyncHandler(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<UpdateProductSizeApiResponse | void> => {
    const { id } = req.params;
    const { name }: UpdateProductSizeDTO = req.body;

    const productSize = await productSizeService.updateProductSize(
      id,
      {
        name,
      },
      next
    );

    if (!productSize) return;

    res.status(201).json({
      message: "Product size updated successfully",
      data: productSize,
      success: !!productSize,
    });
  }
);

export const deleteProductSize = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  await productSizeService.deleteProductSize({ id }, next);

  res.status(200).json({
    message: "Product size deleted successfully",
    data: null,
    success: true,
  });
});