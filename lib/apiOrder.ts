import { TProductQuery } from "@/types/product";
import {  POST } from "./apiFacade";

export const createOrderData = async (orderData: any) => {
  console.log("orderData ::", orderData);
  return await POST("/orders", orderData);
};
