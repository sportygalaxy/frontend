import { GET, POST } from "./apiFacade";

export const fetchProductsData = async () => {
  return await GET("/products");
};

export const fetchProductData = async (productId: string) => {
  return await GET(`/products/${productId}`);
};

export const createProductData = async (productData: any) => {
  return await POST("/products", productData);
};
