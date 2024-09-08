import {
  ICreateUserPayload,
  ICreateUserResponse,
  ILoginUserPayload,
  ILoginUserResponse,
  IOtpUserPayload,
  IOtpUserResponse,
  IResetUserPayload,
  IResetUserResponse,
} from "@/types/auth";
import { POST } from "./apiFacade";
import { deleteCookie, setCookie } from "cookies-next";

export const login = async (
  loginData: ILoginUserPayload
): Promise<ILoginUserResponse> => {
  try {
    const response = await POST("/auth/login", loginData);

    if (response?.success) {
      if (!response?.data?.isVerified) {
        // throw new Error(response?.error || "Check email to verify your Account");
      }
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

export const activate = async (token: any): Promise<any> => {
  try {
    setCookie("token", token);
    const response = await POST("/auth/activate", { token: token });

    if (response?.success) {
      return response;
    } else {
      throw new Error(response?.error);
    }
  } catch (error) {
    throw error;
  }
};

export const reSendActivationLink = async (token: any): Promise<any> => {
  try {
    const response = await POST("/auth/send-verification", { token: token });

    if (response?.success) {
      return response;
    } else {
      throw new Error(response?.error);
    }
  } catch (error) {
    throw error;
  }
};

export const reset = async (
  resetData: IResetUserPayload
): Promise<IResetUserResponse> => {
  try {
    const response = await POST("/auth/send-reset-password-code", resetData);

    if (response?.success) {
      return response;
    } else {
      throw new Error(response?.error);
    }
  } catch (error) {
    throw error;
  }
};

export const otp = async (
  otpData: IOtpUserPayload
): Promise<IOtpUserResponse> => {
  try {
    const response = await POST(
      "/auth/validate-reset-password-code",
      otpData
    );

    if (response?.success) {
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
