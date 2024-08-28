import { ICreateUserPayload, ICreateUserResponse } from "@/types/auth";
import { POST } from "./apiFacade";
import { setCookie } from "cookies-next";

export const login = async (loginData: any) => {
  return await POST("/auth/login", loginData);
};

export const register = async (
  registerData: ICreateUserPayload
): Promise<ICreateUserResponse> => {
  try {
    const response = await POST("/auth/register", registerData);

    if (response?.success) {
       setCookie("token", response?.data?.token);
      return response;
    } else {
      throw new Error(response?.error);
    }
  } catch (error) {
    throw error;
  }
};
