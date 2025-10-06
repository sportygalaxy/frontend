import { PAGINATION_DEFAULT } from "@/constants/appConstants";
import { GET, POST } from "./apiFacade";
import { TSpinnerQuery } from "@/types/spinner";

// export const fetchSpinnersData = async (params: any) => {
//   return await GET(`/spinners`, params);
// };

export const fetchSpinnersData = async ({
  productId,
  page = PAGINATION_DEFAULT.page,
  limit = PAGINATION_DEFAULT.limit,
}: TSpinnerQuery) => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    productId,
  });

  return await GET(`/spinners/me?${queryParams.toString()}`);
};

export const fetchSpinnersSummaryData = async (productId: string) => {
  return await GET(`/spinners/summary/${productId}`);
};

export const fetchSpinnerData = async (productId: string, userId: string) => {
  return await GET(`/spinners/me?productId=${productId}&userId=${userId}`);
};

export const createSpinner = async (
  spinnerData: any
): Promise<any> => {
  try {
    const response = await POST("/spinners", spinnerData);

    if (response?.success) {
      return response;
    } else {
      throw new Error(response?.error);
    }
  } catch (error) {
    throw error;
  }
};
