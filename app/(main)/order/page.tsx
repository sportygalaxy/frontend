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
import Image from "next/image";
import { DEFAULT_PRODUCT_IMAGE } from "@/constants/appConstants";

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
    <section className="wrapper space-y-6 mt-6 sm:mt-10 ">
      <h1 className="text-xl font-bold">Order List</h1>
      <ComponentStateWrapper
        isLoading={isLoading}
        error={error}
        data={orders}
        refetch={() => refetch()}
        emptyMessage="No orders found."
      >
        <div className="space-y-4 sm:space-y-5">
          {orders?.map((orderResponse: any) =>
            orderResponse?.items?.map((order: OrderItem) => {
              const imageSrc =
                order?.product?.displayImage || DEFAULT_PRODUCT_IMAGE;

              return (
                <div
                  key={`${order?.orderId}-${
                    order?.product?.id || order?.productId
                  }`}
                  className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex w-full min-w-0 gap-3 sm:gap-4 md:w-auto md:flex-1">
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-[#f5f5f7] sm:h-24 sm:w-24">
                        <Image
                          src={imageSrc}
                          alt={order?.product?.name || "Product image"}
                          fill
                          sizes="(min-width: 1024px) 96px, (min-width: 640px) 88px, 80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <h2 className="line-clamp-2 text-base font-semibold text-primary sm:text-lg">
                          {order?.product?.name || ""}
                        </h2>
                        <p className="text-xs text-gray-600 sm:text-sm">
                          Order {order?.orderId}
                        </p>
                        {order?.quantity && (
                          <p className="text-xs text-gray-500 sm:text-sm">
                            Quantity: {order?.quantity}
                          </p>
                        )}
                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          <OrderStatus
                            status={orderResponse?.status || "PENDING"}
                          />
                          <p className="text-xs text-gray-400 sm:text-sm">
                            On {transformMatchDate(orderResponse?.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center md:justify-end">
                      <OrderReviewComponent order={order} />

                      <a
                        href={`/product/${order?.product?.name}/${order?.product?.id}`}
                        className="inline-flex w-full items-center justify-center rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-600 transition hover:border-green-300 hover:bg-green-100 md:w-auto"
                      >
                        See product
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </ComponentStateWrapper>

      {totalPages > 1 && (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="flex w-10 items-center justify-center rounded-full border-none border-secondary p-2 md:w-11 md:p-3 disabled:opacity-50"
          >
            <RightArrowIcon className="rotate-180" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium cursor-pointer hover:bg-secondary hover:text-primary md:h-11 md:w-11",
                page === currentPage ? "border border-secondary" : "border-none"
              )}
            >
              {page}
            </button>
          ))}

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="flex w-10 items-center justify-center rounded-full border-none border-secondary p-2 md:w-11 md:p-3 disabled:opacity-50"
          >
            <RightArrowIcon />
          </button>
        </div>
      )}
    </section>
  );
};

const OrderReviewComponent = ({ order }: { order: OrderItem }) => {
  if (order?.productCompleted && !order?.reviewed) {
    return (
      <ReviewModal
        productId={order?.productId}
        triggerButton={
          <Button className="w-full md:w-auto" variant="default">
            Add a Review
          </Button>
        }
      />
    );
  }

  return (
    <>
      {order?.reviewed && (
        <span className="absolute right-4 top-4 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
          Reviewed
        </span>
      )}
    </>
  );
};

export default Order;
