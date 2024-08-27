import { IRegistrationData } from "@/types/auth";
import { POST } from "./apiFacade";

export const login = async (loginData: any) => {
  return await POST("/auth/login", loginData);
};

export const register = async (registerData: IRegistrationData): Promise<any> => {
  console.log("API DATA:", registerData);
  return await POST("/auth/register", registerData);
};
