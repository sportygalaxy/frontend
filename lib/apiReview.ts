import { GET } from "./apiFacade";

interface FetchReviewsParams {
  productId: string;
  page?: number;
  limit?: number;
}

// export const fetchReviewsData = async (params: any) => {
//   return await GET(`/reviews`, params);
// };

export const fetchReviewsData = async ({
  productId,
  page = 1,
  limit = 5,
}: FetchReviewsParams) => {
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
