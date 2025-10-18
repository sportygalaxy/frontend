"use client";

import useUserStore from "@/store/userStore";
import React, { FC } from "react";
import { Spinner } from "./components/Spinner";
import { UI_SLICES } from "@/constants/appConstants";
import { PrizeType } from "@/types/spinner";

interface SpinnerProps {}
const Spin: FC<SpinnerProps> = () => {
  const { user } = useUserStore();
  const userId = user?.id as string;

  return (
    <section className="wrapper mt-10 bg-white p-4">
      <h1 className="text-xl font-bold mb-6">Spinner List</h1>
      <Spinner userId={userId} uiSlices={UI_SLICES as PrizeType[]} />
    </section>
  );
};

export default Spin;
