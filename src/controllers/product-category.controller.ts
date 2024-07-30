import { NextFunction, Request, Response } from "express";
import { ProductCategoryService } from "../services/product-category.service";
import { asyncHandler } from "../middleware/async";
import { CreateProductCategoryApiResponse, UpdateProductCategoryApiResponse, UpdateProductCategoryDTO } from "../types/product-category.types";

const productCategoryService = new ProductCategoryService();

export const getProductCategories = asyncHandler(async (req, res, next) => {
  const query = req.query;
  const productCategories = await productCategoryService.getProductCategories(query, next);

  if (!productCategories) return;

  res.status(200).json({
    message: "Fetch product categories successfully",
    data: productCategories,
    success: !!productCategories,
  });
});

export const getProductCategory = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const productCategory = await productCategoryService.getProductCategory(id, next);

  if (!productCategory) return;

  res.status(200).json({
    message: "Fetch product category successfully",
    data: productCategory,
    success: !!productCategory,
  });
});

export const createProductCategory = asyncHandler(
  async (
    req: { body: any },
    res: Response,
    next: NextFunction
  ): Promise<CreateProductCategoryApiResponse | void> => {
    const productCategory = await productCategoryService.createProductCategory(
      {
        ...req.body,
      },
      next
    );

    if (!productCategory) return;

    res.status(201).json({
      message: "Product category created successfully",
      data: productCategory,
      success: !!productCategory,
    });
  }
);

export const updateProductCategory = asyncHandler(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<UpdateProductCategoryApiResponse | void> => {
    const { id } = req.params;
    const { name, description }: UpdateProductCategoryDTO = req.body;

    const productCategory = await productCategoryService.updateProductCategory(
      id,
      {
        name,
        description
      },
      next
    );

    if (!productCategory) return;

    res.status(201).json({
      message: "Product category updated successfully",
      data: productCategory,
      success: !!productCategory,
    });
  }
);

export const deleteProductCategory = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  await productCategoryService.deleteProductCategory({ id }, next);

  res.status(200).json({
    message: "Product category deleted successfully",
    data: null,
    success: true,
  });
});