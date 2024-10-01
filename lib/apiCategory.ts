import { GET } from "./apiFacade";

export const fetchCategoriesData = async (params: any) => {
  return await GET(`/products/category`, params);
};

export const fetchCategoryData = async (categoryId: string) => {
  return await GET(`/products/category/${categoryId}`);
};

