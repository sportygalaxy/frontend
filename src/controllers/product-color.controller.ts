import { NextFunction, Request, Response } from "express";
import { ProductColorService } from "../services/product-color.service";
import { asyncHandler } from "../middleware/async";
import { CreateProductColorApiResponse, UpdateProductColorApiResponse, UpdateProductColorDTO } from "../types/product-color.types";

const productColorService = new ProductColorService();

export const getProductColors = asyncHandler(async (req, res, next) => {
  const query = req.query;
  const productColors = await productColorService.getProductColors(query, next);

  if (!productColors) return;

  res.status(200).json({
    message: "Fetch product colors successfully",
    data: productColors,
    success: !!productColors,
  });
});

export const getProductColor = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const productColor = await productColorService.getProductColor(id, next);

  if (!productColor) return;

  res.status(200).json({
    message: "Fetch product color successfully",
    data: productColor,
    success: !!productColor,
  });
});

export const createProductColor = asyncHandler(
  async (
    req: { body: any },
    res: Response,
    next: NextFunction
  ): Promise<CreateProductColorApiResponse | void> => {
    const productColor = await productColorService.createProductColor(
      {
        ...req.body,
      },
      next
    );

    if (!productColor) return;

    res.status(201).json({
      message: "Product color created successfully",
      data: productColor,
      success: !!productColor,
    });
  }
);

export const updateProductColor = asyncHandler(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<UpdateProductColorApiResponse | void> => {
    const { id } = req.params;
    const { name }: UpdateProductColorDTO = req.body;

    const productColor = await productColorService.updateProductColor(
      id,
      {
        name,
      },
      next
    );

    if (!productColor) return;

    res.status(201).json({
      message: "Product color updated successfully",
      data: productColor,
      success: !!productColor,
    });
  }
);

export const deleteProductColor = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  await productColorService.deleteProductColor({ id }, next);

  res.status(200).json({
    message: "Product color deleted successfully",
    data: null,
    success: true,
  });
});