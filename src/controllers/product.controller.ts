import { NextFunction, Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { asyncHandler } from "../middleware/async";
import {
  CreateProductApiResponse,
  CreateProductDTO,
  UpdateProductDTO,
  UpdateProductApiResponse,
  UpdateAllProductApiResponse,
  UpdateAllProductDTO,
} from "types/product.types";
import prisma from "../lib/prisma";

const productService = new ProductService();

export const getProducts = asyncHandler(async (req, res, next) => {
  const query = req.query;
  const products = await productService.getProducts(query, next);

  if (!products) return;

  res.status(200).json({
    message: "Fetch products successfully",
    data: products,
    success: !!products,
  });
});

export const getProduct = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const product = await productService.getProduct(id, next);

  if (!product) return;

  res.status(200).json({
    message: "Fetch product successfully",
    data: product,
    success: !!product,
  });
});

export const createProduct = asyncHandler(
  async (
    req: { body: CreateProductDTO },
    res: Response,
    next: NextFunction
  ): Promise<CreateProductApiResponse | void> => {
    const product = await productService.createProduct(
      {
        ...req.body,
      },
      next
    );

    if (!product) return;

    res.status(201).json({
      message: "Product created successfully",
      data: product,
      success: !!product,
    });
  }
);

export const updateProduct = asyncHandler(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<UpdateAllProductApiResponse | void> => {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      stock,
      categoryId,
      subcategoryId,
      sizeIds,
      colorIds,
      typeIds,
    }: UpdateAllProductDTO = req.body;

    const [details, attribute] = await Promise.all([
      productService.updateProduct(
        id,
        {
          name,
          description,
          price,
          stock,
          categoryId,
          subcategoryId,
        },
        next
      ),
      productService.updateProductAttributes(
        id,
        {
          sizeIds,
          colorIds,
          typeIds,
        },
        next
      ),
    ]);

    if (!details || !attribute) return;
    const result = { details, attribute };

    res.status(201).json({
      message: "Product updated successfully",
      data: result,
      success: !!result,
    });
  }
);

export const deleteProduct = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  await productService.deleteProduct({ id }, next);

  res.status(200).json({
    message: "Product deleted successfully",
    data: null,
    success: true,
  });
});
