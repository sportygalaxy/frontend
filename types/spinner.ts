type Spinner = []

export type TSpinnerQuery = {
  productId: string;
  page?: number;
  limit?: number;
};

export type ICreateSpinnerPayload = Spinner;
export type ICreateSpinnerResponse = ServerResponse<Spinner>;
