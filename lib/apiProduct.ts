import { TProductQuery } from "@/types/product";
import { GET, POST } from "./apiFacade";

export const fetchProductsData = async (params: TProductQuery) => {
  return await GET(`/products`, { isDeleted: false, ...params });
};

export const fetchProductData = async (productId: string) => {
  return await GET(`/products/${productId}`);
};

export const createProductData = async (productData: any) => {
  return await POST("/products", productData);
};
