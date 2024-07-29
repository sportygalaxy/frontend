import { NextFunction, Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { ProductSizeService } from "../services/product-size.service";
import { asyncHandler } from "../middleware/async";
import {
  CreateProductApiResponse,
  CreateProductDTO,
  UpdateProductDTO,
  UpdateProductApiResponse,
  UpdateAllProductApiResponse,
  UpdateAllProductDTO,
} from "types/product.types";

const productService = new ProductService();
const productSizeService = new ProductSizeService();

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
  ): Promise<any | void> => {
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
  ): Promise<any | void> => {
    const { id } = req.params;
    const { name }: any = req.body;

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
    message: "Product deleted successfully",
    data: null,
    success: true,
  });
});