import { TProductQuery } from "@/types/product";
import { GET, POST } from "./apiFacade";
import { TOrderQuery } from "@/types/order";

export const fetchOrdersData = async (params: TOrderQuery) => {
  return await GET(`/orders`, params);
};

export const createOrderData = async (orderData: any) => {
  console.log("orderData ::", orderData);
  return await POST("/orders", orderData);
};
