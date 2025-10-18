type Spinner = []

export type PrizeType =
  | "TRY_AGAIN"
  | "FREE_GIFT"
  | "FREE_DELIVERY"
  | "CASH_GIFT"
  | "SPIN_AGAIN"
  | "DISCOUNT_10"
  | "DISCOUNT_20"
  | "DISCOUNT_50";

export type TSpinnerQuery = {
  productId: string;
  page?: number;
  limit?: number;
};

export type ICreateSpinnerPayload = Spinner;
export type ICreateSpinnerResponse = ServerResponse<Spinner>;

export type CreateOrUpdatePrizeGiftSpinnerPayload = {
  userId: string;
  giftName: string;
  giftValue: string | null;
  prizeType: string;
};