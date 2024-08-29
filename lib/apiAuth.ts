import {
  ICreateUserPayload,
  ICreateUserResponse,
  ILoginUserPayload,
  ILoginUserResponse,
} from "@/types/auth";
import { POST } from "./apiFacade";
import { deleteCookie, setCookie } from "cookies-next";

export const login = async (
  loginData: ILoginUserPayload
): Promise<ILoginUserResponse> => {
  try {
    const response = await POST("/auth/login", loginData);

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

export const logout = async (): Promise<ICreateUserResponse> => {
  try {
    const response = await POST("/auth/logout", {});

    if (response?.success) {
      deleteCookie("token");
      return response;
    } else {
      throw new Error(response?.error);
    }
  } catch (error) {
    throw error;
  }
};
