import { IUserPayload, IUserQueryParam, IUserResponse } from "@/types/user";
import { PUT } from "./apiFacade";

export const updateUser = async (payload: {
  userData: IUserPayload;
  params: IUserQueryParam;
}): Promise<IUserResponse> => {
  try {
    const response = await PUT(
      `/users/${payload.params?.id}`,
      payload.userData
    );

    if (response?.success) {
      if (!response?.data?.isVerified) {
        throw new Error(response?.error || "Verify your Account");
      }

      return response;
    } else {
      throw new Error(response?.error);
    }
  } catch (error) {
    throw error;
  }
};
