"use client";

import ComponentStateWrapper from "@/common/ComponentState/ComponentStateWrapper";
import OrderStatus from "@/common/OrderStatus";
import { fetchOrdersData } from "@/lib/apiOrder";
import useUserStore from "@/store/userStore";
import { OrderItem } from "@/types/order";
import { transformMatchDate } from "@/utils/dateUtils";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Order = () => {
  const { user } = useUserStore();
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: [
      "orders",
      {
        userId: user?.id as string,
      },
    ],
    queryFn: () =>
      fetchOrdersData({
        userId: user?.id as string,
      }),
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Extract all orders and items
  const orders = data?.data?.results || [];

  return (
    <section className="wrapper mt-10 bg-white p-4">
      <h1 className="text-xl font-bold mb-6">Order List</h1>
      <ComponentStateWrapper
        isLoading={isLoading}
        error={error}
        data={orders}
        refetch={refetch}
        emptyMessage="No orders found."
      >
        <div className="space-y-4">
          {orders?.map((orderResponse: any) =>
            orderResponse?.items?.map((order: OrderItem) => (
              <div
                key={order?.orderId}
                className="flex items-center justify-between p-4 border rounded-lg shadow-sm"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={order?.product?.displayImage || ""}
                    alt={order?.product?.name || ""}
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div>
                    <h2 className="font-medium text-lg">
                      {order?.product?.name || ""}
                    </h2>
                    <p className="text-sm text-gray-600">
                      Order {order?.orderId}
                    </p>
                    {order?.quantity && (
                      <p className="text-sm text-gray-500">
                        Quantity: {order?.quantity}
                      </p>
                    )}

                    <OrderStatus status={orderResponse?.status || "PENDING"} />

                    <p className="text-sm text-gray-400 mt-1">
                      On {transformMatchDate(orderResponse?.createdAt)}
                    </p>
                  </div>
                </div>
                <a
                  href={`/product/${order?.product?.name}/${order?.product?.id}`}
                  className="text-orange-500 font-semibold hover:underline"
                >
                  See product
                </a>
              </div>
            ))
          )}
        </div>
      </ComponentStateWrapper>
    </section>
  );
};

export default Order;
