import { PAGINATION_DEFAULT } from "@/constants/appConstants";
import { GET, POST } from "./apiFacade";
import { TReviewQuery } from "@/types/review";
import { CreateReviewPayload } from "@/app/(main)/order/components/ReviewForm";

// export const fetchReviewsData = async (params: any) => {
//   return await GET(`/reviews`, params);
// };

export const fetchReviewsData = async ({
  productId,
  page = PAGINATION_DEFAULT.page,
  limit = PAGINATION_DEFAULT.limit,
}: TReviewQuery) => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    productId,
  });

  return await GET(`/reviews/me?${queryParams.toString()}`);
};

export const fetchReviewsSummaryData = async (productId: string) => {
  return await GET(`/reviews/summary/${productId}`);
};

export const fetchReviewData = async (productId: string, userId: string) => {
  return await GET(`/reviews/me?productId=${productId}&userId=${userId}`);
};

export const createReview = async (
  reviewData: CreateReviewPayload
): Promise<any> => {
  try {
    const response = await POST("/reviews", reviewData);

    if (response?.success) {
      return response;
    } else {
      throw new Error(response?.error);
    }
  } catch (error) {
    throw error;
  }
};
