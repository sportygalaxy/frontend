import { GET, POST } from "./apiFacade";
import { TOrderQuery } from "@/types/order";
import { PAGINATION_DEFAULT } from "@/constants/appConstants";

export const fetchOrdersData = async ({
  userId,
  page = PAGINATION_DEFAULT.page,
  limit = PAGINATION_DEFAULT.limit,
}: TOrderQuery) => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    userId,
  });

  return await GET(`/orders?${queryParams.toString()}`);
};

export const createOrderData = async (orderData: any) => {
  console.log("orderData ::", orderData);
  return await POST("/orders", orderData);
};
