"use client";

import React, { useState, useEffect } from "react";
import Modal from "@/common/Modal";
import { Button } from "@/components/ui/button";
import { NotifyError, NotifySuccess } from "@/helpers/toasts";
import { useMutation } from "@tanstack/react-query";
import { createOrUpdatePrizeGiftSpinner } from "@/lib/apiSpinner";
import useUserStore from "@/store/userStore";
import { CreateOrUpdatePrizeGiftSpinnerPayload } from "@/types/spinner";

// Cash Gift Options
const cashGifts = [
  { id: 1, value: 10000, label: "₦10k" },
  { id: 2, value: 20000, label: "₦20k" },
  { id: 3, value: 30000, label: "₦30k" },
  { id: 4, value: 50000, label: "₦50k" },
  { id: 5, value: 75000, label: "₦75k" },
  { id: 6, value: 100000, label: "₦100k" },
];

const SpinnerCashGiftModal: React.FC<{
  triggerButton?: React.ReactNode;
  userId?: string;
  onClose?: () => void;
}> = ({ triggerButton, onClose }) => {
  const { user } = useUserStore();
  const userId = user?.id as string;

  const [open, setOpen] = useState(true);
  const [selectedCashGift, setSelectedCashGift] = useState<any>(null);
  const [animating, setAnimating] = useState(false);

  // Randomize Cash Gift Selection
  const randomizeGift = () => {
    setAnimating(true);
    setTimeout(() => {
      // Exclude blacklisted 75k and 100k from random selection
      const availableGifts = cashGifts.filter(
        (gift) =>
          gift.value !== 75000 && gift.value !== 100000 && gift.value !== 50000
      );

      const randomIndex = Math.floor(Math.random() * availableGifts.length);
      setSelectedCashGift(availableGifts[randomIndex]);
      setAnimating(false);
    }, 2500); // Timeout to simulate the animation delay
  };

  useEffect(() => {
    if (open) {
      randomizeGift();
    }
  }, [open]);

  const {
    mutate: createOrUpdatePrizeGiftSpinnerMutate,
    isPending,
    isSuccess,
    error,
    data,
  } = useMutation<any, Error, CreateOrUpdatePrizeGiftSpinnerPayload>({
    mutationFn: async (spinnerData: CreateOrUpdatePrizeGiftSpinnerPayload) =>
      await createOrUpdatePrizeGiftSpinner(spinnerData, userId as string),
    onSuccess: (data) => {
      NotifySuccess(data?.message as string);
      onClose && onClose();
    },
    onError: (error) => {
      console.error("Error - Spinner Mutation: ", error);
      NotifyError(error?.message || "An error occurred");
    },
  });

  const submitSaveCashGiftToUserAccount = async () => {
    if (!selectedCashGift) {
      NotifyError("No cash gift selected");
      return;
    }

    try {
      createOrUpdatePrizeGiftSpinnerMutate({
        userId: userId as string,
        giftName: `Cash Back - ${selectedCashGift.label}`,
        giftValue: selectedCashGift.value.toString(),
        prizeType: "CASH_GIFT",
      });
    } catch (error) {
      console.error("Error submitting cash gift:", error);
      NotifyError("Failed to submit the cash gift. Please try again.");
      return;
    }
  };

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      triggerButton={triggerButton}
      title="Cash Gift 🎁"
      description="Congratulations! You have won a cash gift."
    >
      {/* Grid of Cash Gift Items */}
      <div className="grid grid-cols-3 gap-4 max-h-[500px] overflow-auto">
        {cashGifts.map((cashGift) => (
          <div
            key={cashGift.id}
            className={`relative p-2 bg-white rounded-lg transition-transform duration-300 ${
              selectedCashGift?.id === cashGift.id && !animating
                ? "scale-105"
                : ""
            }`}
          >
            <div className="w-full h-40 flex items-center justify-center">
              <span className="text-2xl font-semibold">{cashGift.label}</span>
            </div>

            <div
              className={`absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-sm font-medium ${
                selectedCashGift?.id === cashGift.id && !animating
                  ? "bg-black bg-opacity-50 border-4 border-red-700"
                  : "bg-transparent"
              }`}
            >
              <p className="bg-black rounded-md p-1">{cashGift.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <Button
          onClick={submitSaveCashGiftToUserAccount}
          className="px-6 py-3 rounded-2xl shadow text-white bg-black disabled:opacity-50 cursor-pointer"
          disabled={animating || isPending}
        >
          {animating || isPending ? "Selecting..." : "Select Cash Gift"}
        </Button>
      </div>

      {/* Display the selected gift after the animation */}
      {selectedCashGift && !animating && (
        <div className="mt-6 text-center">
          <h3 className="text-2xl font-semibold">🎉 Congratulations! 🎉</h3>
          <p className="text-lg">
            You have won {selectedCashGift.label} in cash!
          </p>
        </div>
      )}
    </Modal>
  );
};

export default SpinnerCashGiftModal;
