"use client";

import React, { useEffect, useState } from "react";
import Modal from "@/common/Modal";
import { Spinner } from "./Spinner";
import useUserStore from "@/store/userStore";
import { UI_SLICES, validPrizes } from "@/constants/appConstants";
import { PrizeType } from "@/types/spinner";
import { fetchSpinnerData } from "@/lib/apiSpinner";
import { useQuery } from "@tanstack/react-query";
import AppLoader from "@/common/Loaders/AppLoader";

interface SpinnerModalProps {
  triggerButton?: React.ReactNode;
  userId?: string;
}

const SpinnerModal: React.FC<SpinnerModalProps> = ({ triggerButton }) => {
  const { user } = useUserStore();
  const userId = user?.id as string;

  const [open, setOpen] = useState(false);

  const { data: spinnersSummary, isLoading: summaryLoading } = useQuery({
    queryKey: ["spinnersSummary", userId],
    queryFn: () => fetchSpinnerData(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const hasSpunToday = spinnersSummary?.data?.some((spinner: any) => {
    const spinnerDate = new Date(spinner.createdAt);
    const today = new Date();

    // Check if the spin happened today and prize is valid
    const isToday =
      spinnerDate.getDate() === today.getDate() &&
      spinnerDate.getMonth() === today.getMonth() &&
      spinnerDate.getFullYear() === today.getFullYear();

    const isValidPrize = validPrizes.includes(spinner.prize);

    return isToday && isValidPrize; // Only consider valid prize spins for "hasSpunToday"
  });

  useEffect(() => {
    setOpen(!hasSpunToday);
  }, [hasSpunToday]);

  if (!open || !user) return;

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      triggerButton={triggerButton}
      title="Spin and Win"
      description="Stand a chance to win various exciting prizes!"
    >
      {summaryLoading ? (
        <>
          <AppLoader />
        </>
      ) : (
        <Spinner
          userId={userId}
          uiSlices={UI_SLICES as PrizeType[]}
          onClose={() => setOpen(false)}
          submitLabel="Spin the wheel"
          hasSpunToday={hasSpunToday}
        />
      )}
    </Modal>
  );
};

export default SpinnerModal;
