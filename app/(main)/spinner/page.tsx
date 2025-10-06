"use client";

import { usePagination } from "@/hooks/usePagination";
import { fetchOrdersData } from "@/lib/apiOrder";
import useUserStore from "@/store/userStore";
import React, { FC } from "react";
import AppLoader from "@/common/Loaders/AppLoader";
import { Spinner } from "./components/Spinner";

interface OrderProps {}
const Spin: FC<OrderProps> = () => {
  const { user } = useUserStore();
  const userId = user?.id as string;

  return (
    <section className="wrapper mt-10 bg-white p-4">
      <h1 className="text-xl font-bold mb-6">Spinner List</h1>
      <Spinner
        uiSlices={[
          "TRY_AGAIN",
          "FREE_GIFT",
          "FREE_DELIVERY",
          "CASH_GIFT",
          "SPIN_AGAIN",
          "DISCOUNT_10",
          "DISCOUNT_20",
          "DISCOUNT_50",
        ]}
      />
    </section>
  );
};

export default Spin;
