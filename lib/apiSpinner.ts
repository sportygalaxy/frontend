import { GET, POST } from "./apiFacade";

export const fetchSpinnerData = async (userId: string) => {
  return await GET(`/spinners/${userId}`);
};

export const createSpinner = async (spinnerData: any): Promise<any> => {
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

export const createOrUpdatePrizeGiftSpinner = async (
  spinnerData: any,
  userId: string
): Promise<any> => {
  try {
    const response = await POST(`/spinners/${userId}/prize-gift`, spinnerData);

    if (response?.success) {
      return response;
    } else {
      throw new Error(response?.error);
    }
  } catch (error) {
    throw error;
  }
};
