import { GET, POST } from "./apiFacade";

export const fetchProductData = async (productId: string) => {
  return await GET(`/products/${productId}`);
};

export const createProductData = async (productData: any) => {
  return await POST("/products", productData);
};
