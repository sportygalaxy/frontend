"use client";

import React, { useState, useEffect, useRef } from "react";
import Modal from "@/common/Modal";
import { Button } from "@/components/ui/button";
import { NotifyError, NotifySuccess } from "@/helpers/toasts";
import Image from "next/image";
import {
  DEFAULT_PRODUCT_IMAGE,
  DEFAULT_USER_IMAGE,
} from "@/constants/appConstants";
import { useMutation } from "@tanstack/react-query";
import { createOrUpdatePrizeGiftSpinner } from "@/lib/apiSpinner";
import useUserStore from "@/store/userStore";
import { CreateOrUpdatePrizeGiftSpinnerPayload } from "@/types/spinner";

// Sample free gift list with provided items
const freeGifts = [
  { id: 1, name: "Skipping Rope", image: "/images/gift/skipping-rope.jpeg" },
  { id: 2, name: "Ankle Support", image: "/images/gift/ankle-support.jpeg" },
  //
  {
    id: 3,
    name: "Resistance Band",
    image: "/images/gift/resistance-band.jpeg",
  },
  { id: 4, name: "Socks", image: "/images/gift/socks.jpeg" },
  { id: 5, name: "Ab Roller", image: "/images/gift/ab-roller.jpeg" },
  { id: 6, name: "Water Bottle", image: "/images/gift/water-bottle.jpeg" },
  { id: 7, name: "Hand Gloves", image: "/images/gift/hand-gloves.jpeg" },
  { id: 8, name: "Hand Grips", image: "/images/gift/hand-grips.jpeg" },
  { id: 9, name: "Push-up Bar", image: "/images/gift/push-up-bar.jpeg" },
  { id: 10, name: "Weight Scale", image: "/images/gift/weight-scale.jpeg" },
  { id: 11, name: "Tummy Wrap", image: "/images/gift/tummy-wrap.jpeg" },
  { id: 12, name: "Knee Support", image: "/images/gift/knee-support.jpeg" },
  { id: 13, name: "Stopwatch", image: "/images/gift/stopwatch.jpeg" },
];

const SpinnerFreeGiftModal: React.FC<{
  triggerButton?: React.ReactNode;
  userId?: string;
  onClose?: () => void;
}> = ({ triggerButton, onClose }) => {
  const { user } = useUserStore();
  const userId = user?.id as string;

  const [open, setOpen] = useState(true);
  const [selectedGift, setSelectedGift] = useState<any>(null);
  const [animating, setAnimating] = useState(false);
  const [giftList, setGiftList] = useState(freeGifts);

  const randomizeGift = () => {
    setAnimating(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * giftList.length);
      setSelectedGift(giftList[randomIndex]);
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

  const submitSaveGiftToUserAccount = async () => {
    if (!selectedGift) {
      NotifyError("No gift selected");
      return;
    }

    try {
      createOrUpdatePrizeGiftSpinnerMutate({
        userId: userId as string,
        giftName: selectedGift.name,
        giftValue: "",
        prizeType: "FREE_GIFT",
      });
    } catch (error) {
      console.error("Error submitting gift:", error);
      NotifyError("Failed to submit the gift. Please try again.");
      return;
    }
  };

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      triggerButton={triggerButton}
      title="Free Gift"
      description="You have won one of our exclusive free gifts! It will be added once you place an order."
    >
      <div className="grid grid-cols-3 gap-4 max-h-[500px] overflow-auto">
        {giftList.map((gift) => (
          <div
            key={gift.id}
            className={`relative p-2 bg-white rounded-lg transition-transform duration-300 ${
              selectedGift?.id === gift.id && !animating ? "scale-105" : ""
            }`}
          >
            <Image
              width={200}
              height={200}
              className="w-full h-40 object-cover rounded-lg"
              src={gift.image || DEFAULT_USER_IMAGE}
              alt={gift.name}
            />

            <div
              className={`absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-sm font-medium ${
                selectedGift?.id === gift.id && !animating
                  ? "bg-black bg-opacity-50 border-4 border-red-700"
                  : "bg-transparent"
              }`}
            >
              <p className="bg-black rounded-md p-1">{gift.name}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <Button
          onClick={submitSaveGiftToUserAccount}
          className="px-6 py-3 rounded-2xl shadow text-white bg-black disabled:opacity-50 cursor-pointer"
          disabled={animating || isPending}
        >
          {animating || isPending ? "Selecting..." : "Select Gift"}
        </Button>
      </div>

      {/* Display the selected gift after the animation */}
      {selectedGift && !animating && (
        <div className="mt-6 text-center">
          <h3 className="text-2xl font-semibold">🎉 Congratulations! 🎉</h3>
          <p className="text-lg">
            {selectedGift.name} has been selected for you!
          </p>
        </div>
      )}
    </Modal>
  );
};

export default SpinnerFreeGiftModal;
