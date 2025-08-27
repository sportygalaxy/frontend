type Review = []

export type TReviewQuery = {
  productId: string;
  page?: number;
  limit?: number;
};

export type ICreateReviewPayload = Review;
export type ICreateReviewResponse = ServerResponse<Review>;
