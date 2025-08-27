"use client";

import RightArrowIcon from "@/assets/icons/pack/RightArrow";
import ComponentStateWrapper from "@/common/ComponentState/ComponentStateWrapper";
import OrderStatus from "@/common/OrderStatus";
import { Button } from "@/components/ui/button";
import { usePagination } from "@/hooks/usePagination";
import { fetchOrdersData } from "@/lib/apiOrder";
import { cn } from "@/lib/utils";
import useUserStore from "@/store/userStore";
import { OrderItem } from "@/types/order";
import { transformMatchDate } from "@/utils/dateUtils";
import React, { FC, memo } from "react";
import ReviewModal from "./components/ReviewModal";
import AppLoader from "@/common/Loaders/AppLoader";

interface OrderProps {}
const Order: FC<OrderProps> = () => {
  const { user } = useUserStore();
  const userId = user?.id as string;

  const {
    data,
    isLoading,
    error,
    refetch,
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
  } = usePagination({
    queryKey: [
      "orders",
      {
        userId,
      },
    ],
    queryFn: ({ page, limit }) => fetchOrdersData({ userId, page, limit }),
    pageSize: 2,
    enabled: !!userId,
  });

  // Extract all orders and items
  const orders = data?.data?.results || [];

  if (isLoading) {
    return <AppLoader />;
  }

  return (
    <section className="wrapper mt-10 bg-white p-4">
      <h1 className="text-xl font-bold mb-6">Order List</h1>
      <ComponentStateWrapper
        isLoading={isLoading}
        error={error}
        data={orders}
        refetch={() => refetch()}
        emptyMessage="No orders found."
      >
        <div className="space-y-4">
          {orders?.map((orderResponse: any) =>
            orderResponse?.items?.map((order: OrderItem) => (
              <div
                key={order?.orderId}
                className="relative flex items-center justify-between p-4 border rounded-lg shadow-sm"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={order?.product?.displayImage || ""}
                    alt={order?.product?.name || ""}
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div>
                    <h2 className="font-medium text-lg text-wrap max-w-[600px]">
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

                <div className="flex items-center gap-8">
                  <OrderReviewComponent order={order} />

                  <a
                    href={`/product/${order?.product?.name}/${order?.product?.id}`}
                    className="text-lg text-green-500 border border-green-100 py-2 px-4 font-semibold hover:underline min-w-[120px]"
                  >
                    See product
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </ComponentStateWrapper>

      {totalPages > 1 && (
        <div className="mt-16 flex items-center space-x-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="rotate-180 flex items-center w-fit p-2 md:p-4 border-none border-secondary rounded-full disabled:opacity-50"
          >
            <RightArrowIcon />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={cn(
                "flex items-center w-fit p-2 md:p-4 rounded-full cursor-pointer hover:bg-secondary hover:text-primary",
                page === currentPage ? "border border-secondary" : "border-none"
              )}
            >
              <p className="flex items-center justify-center font-jost text-base font-normal text-primary w-8 h-8">
                {page}
              </p>
            </button>
          ))}

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="flex items-center w-fit p-2 md:p-4 border-none border-secondary rounded-full disabled:opacity-50"
          >
            <RightArrowIcon />
          </button>
        </div>
      )}
    </section>
  );
};

const OrderReviewComponent = memo(({ order }: { order: any }) => {
  if (order?.productCompleted && !order?.reviewed) {
    return (
      <ReviewModal
        productId={order?.productId}
        triggerButton={<Button variant="default">Add a Review</Button>}
      />
    );
  }

  return (
    <>
      {order?.reviewed && (
        <span className="absolute top-0 right-0 bg-green-100 border border-green-300 px-4 py-2">
          Reviewed
        </span>
      )}
    </>
  );
});

export default Order;
