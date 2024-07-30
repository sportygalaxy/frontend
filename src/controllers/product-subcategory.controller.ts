import { NextFunction, Request, Response } from "express";
import { ProductSubcategoryService } from "../services/product-subcategory.service";
import { asyncHandler } from "../middleware/async";
import {
  CreateProductSubcategoryApiResponse,
  UpdateProductSubcategoryApiResponse,
  UpdateProductSubcategoryDTO,
} from "../types/product-subcategory.types";

const productSubcategoryService = new ProductSubcategoryService();

export const getProductSubcategories = asyncHandler(async (req, res, next) => {
  const query = req.query;
  const productSubcategories =
    await productSubcategoryService.getProductSubcategories(query, next);

  if (!productSubcategories) return;

  res.status(200).json({
    message: "Fetch product categories successfully",
    data: productSubcategories,
    success: !!productSubcategories,
  });
});

export const getProductSubcategory = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const productSubcategory =
    await productSubcategoryService.getProductSubcategory(id, next);

  if (!productSubcategory) return;

  res.status(200).json({
    message: "Fetch product subcategory successfully",
    data: productSubcategory,
    success: !!productSubcategory,
  });
});

export const createProductSubcategory = asyncHandler(
  async (
    req: { body: any },
    res: Response,
    next: NextFunction
  ): Promise<CreateProductSubcategoryApiResponse | void> => {
    const productSubcategory =
      await productSubcategoryService.createProductSubcategory(
        {
          ...req.body,
        },
        next
      );

    if (!productSubcategory) return;

    res.status(201).json({
      message: "Product subcategory created successfully",
      data: productSubcategory,
      success: !!productSubcategory,
    });
  }
);

export const updateProductSubcategory = asyncHandler(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<UpdateProductSubcategoryApiResponse | void> => {
    const { id } = req.params;
    const { name, description, categoryId }: UpdateProductSubcategoryDTO = req.body;

    const productSubcategory =
      await productSubcategoryService.updateProductSubcategory(
        id,
        {
          name,
          description,
          categoryId
        },
        next
      );

    if (!productSubcategory) return;

    res.status(201).json({
      message: "Product subcategory updated successfully",
      data: productSubcategory,
      success: !!productSubcategory,
    });
  }
);

export const deleteProductSubcategory = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  await productSubcategoryService.deleteProductSubcategory({ id }, next);

  res.status(200).json({
    message: "Product subcategory deleted successfully",
    data: null,
    success: true,
  });
});
