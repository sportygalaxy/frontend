"use client";
import { useRef, useState, FC } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { NotifyError, NotifySuccess } from "@/helpers/toasts";
import {
  createOrUpdatePrizeGiftSpinner,
  createSpinner,
} from "@/lib/apiSpinner";
import { CreateSpinnerPayload } from "./SpinnerForm";
import {
  CreateOrUpdatePrizeGiftSpinnerPayload,
  PrizeType,
} from "@/types/spinner";
import SpinnerFreeGiftModal from "./SpinnerFreeGiftModal";
import { validPrizes } from "@/constants/appConstants";
import useUserStore from "@/store/userStore";
import SpinnerCashGiftModal from "./SpinnerCashGiftModal";

interface SpinnerProps {
  uiSlices: PrizeType[]; // slices to show on the wheel
  userId?: string; // optional userId for tracking
  onClose?: () => void; // optional callback when spinner closes
  submitLabel?: string; // optional label for the spin button
  hasSpunToday?: boolean;
}

// Spinner component to show wheel animation
export function Spinner({ uiSlices, onClose, hasSpunToday }: SpinnerProps) {
  const { user } = useUserStore();
  const userId = user?.id as string;

  const [showGiftModal, setShowGiftModal] = useState(false);
  const [showCashModal, setShowCashModal] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<{
    prize: PrizeType;
    msg: string;
    angleDeg: number;
  } | null>(null);

  const {
    mutate: createOrUpdatePrizeGiftSpinnerMutate,
    isPending: isGiftPending,
    isSuccess: isGiftSuccess,
    error: isGiftError,
    data: giftData,
  } = useMutation<any, Error, CreateOrUpdatePrizeGiftSpinnerPayload>({
    mutationFn: async (gifPrizeData: CreateOrUpdatePrizeGiftSpinnerPayload) =>
      await createOrUpdatePrizeGiftSpinner(gifPrizeData, userId as string),
    onSuccess: (data) => {
      NotifySuccess(data?.message as string);

      // After spin is complete, show result
      setTimeout(() => {
        onClose && onClose();
      }, 15100); // Wait for animation to end
    },
    onError: (error) => {
      console.error("Error - Spinner Mutation: ", error);
      NotifyError(error?.message || "An error occurred");
    },
  });

  const {
    mutate: createSpinnerMutate,
    isPending,
    isSuccess,
    error,
    data,
  } = useMutation<any, Error, CreateSpinnerPayload>({
    mutationFn: async (spinnerData: CreateSpinnerPayload) =>
      await createSpinner(spinnerData),
    onSuccess: (data) => {
      if (!data?.data?.angleDeg) {
        NotifyError("No angleDeg in the response");
        return;
      }

      // Retrieve the prize and angle from the response data
      const target = data?.data?.angleDeg; // 0..359
      const extraTurns = 360 * 6; // 6 full rotations for drama
      const finalDeg = extraTurns + (360 - target); // pointer at top (0deg); invert if needed

      const wheel = wheelRef.current!;
      wheel.style.transition = "transform 4s cubic-bezier(.17,.67,.32,1.33)";
      requestAnimationFrame(() => {
        wheel.style.transform = `rotate(${finalDeg}deg)`;
      });

      // After spin is complete, show result
      setTimeout(() => {
        setSpinning(false);
        setResult({
          prize: data?.data?.prize,
          msg: data?.data?.message,
          angleDeg: data?.data?.angleDeg,
        });
      }, 4100); // Wait for animation to end

      // Check if the prize is "FREE_GIFT" and show the modal
      if (data?.data?.prize === "FREE_GIFT") {
        setShowGiftModal(true); // Trigger modal after animation
      }

      // Check if the prize is "CASH_GIFT" and show the modal
      if (data?.data?.prize === "CASH_GIFT") {
        setShowCashModal(true); // Trigger modal after animation
      }

      const isPrizeAutoSaveToUser =
        validPrizes.includes(data?.data?.prize) &&
        !["TRY_AGAIN", "SPIN_AGAIN", "FREE_GIFT", "CASH_GIFT"].includes(
          data?.data?.prize
        );

      if (isPrizeAutoSaveToUser) {
        submitSaveGiftToUserAccount(data?.data);
      }

      NotifySuccess(data?.message as string);
    },
    onError: (error) => {
      console.error("Error - Spinner Mutation: ", error);
      NotifyError(error?.message || "An error occurred");
    },
  });

  const isPrizeTryOrSpinAgain =
    validPrizes.includes(data?.data?.prize) &&
    !["TRY_AGAIN", "SPIN_AGAIN"].includes(data?.data?.prize);

  // This function will be triggered when user clicks Spin Now
  async function spin() {
    if (spinning) return;

    wheelRef.current!.style.transition = "none"; // Reset transition
    wheelRef.current!.style.transform = "rotate(0deg)"; // Reset rotation
    setSpinning(true); // Set spinning state to true to disable the button during the spin
    setResult(null); // Reset previous result

    try {
      // Trigger the backend API to get the prize and angleDeg
      createSpinnerMutate({}); // Wait for the mutation to complete
    } catch (err) {
      console.error("Spin failed:", err);
      setSpinning(false);
      NotifyError("An error occurred while spinning");
    }
  }

  const submitSaveGiftToUserAccount = async (arg: any) => {
    try {
      createOrUpdatePrizeGiftSpinnerMutate({
        userId: userId as string,
        giftName: arg?.prize,
        giftValue: arg?.prize,
        prizeType: arg?.prize,
      });
    } catch (error) {
      console.error("Error submitting gift:", error);
      NotifyError("Failed to submit the gift. Please try again.");
      return;
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        {/* pointer */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 rotate-180">
          <div className="w-0 h-0 border-l-8 border-r-8 border-b-[18px] border-transparent border-b-black" />
        </div>

        {/* wheel */}
        <div
          ref={wheelRef}
          className="rounded-full border w-[320px] h-[320px] relative"
          style={{ background: buildConicGradient(uiSlices) }}
        >
          {/* labels inside wheel */}
          {uiSlices.map((p, i) => (
            <SliceLabel
              key={i}
              index={i}
              total={uiSlices.length}
              text={pretty(p)}
              angleDeg={(360 / uiSlices.length) * i} // pass the angle for each slice
            />
          ))}
        </div>
      </div>

      {isPrizeTryOrSpinAgain ? (
        <></>
      ) : (
        <Button
          onClick={spin}
          disabled={spinning || isPending || hasSpunToday} // disable button while spinning or pending
          className="px-6 py-3 rounded-2xl shadow text-white bg-black disabled:opacity-50"
        >
          {spinning || isPending ? "Spinning..." : "Spin the wheel"}
        </Button>
      )}

      {result && (
        <div className="text-center">
          <div className="text-xl font-semibold">{pretty(result.prize)}</div>
          <div className="text-sm text-gray-600">{result.msg}</div>
        </div>
      )}

      {/* Conditionally render SpinnerFreeGiftModal after spin if prize is "FREE_GIFT" */}
      {showGiftModal && (
        <SpinnerFreeGiftModal
          // triggerButton={<Button>Show Free Gift</Button>}
          userId="user_id" // Pass the user ID if necessary
          onClose={onClose}
        />
      )}

      {/* Conditionally render SpinnerCashGiftModal after spin if prize is "CASH_GIFT" */}
      {showCashModal && (
        <SpinnerCashGiftModal
          // triggerButton={<Button>Show Cash Gift</Button>}
          userId="user_id" // Pass the user ID if necessary
          onClose={onClose}
        />
      )}
    </div>
  );
}

// Helper function to build conic gradient
function buildConicGradient(slices: PrizeType[]) {
  const colors = [
    "#FF5733", // Try Again
    "#d6e000", // Free Gift
    "#0c0c05", // Free Delivery
    "#FF33A8", // Cash Gift
    "#33A8FF", // Spin Again
    "#FF33F6", // 10% Off
    "#F6FF33", // 20% Off
    "#FF8533", // 50% Off
  ];
  const step = 100 / slices.length;
  const stops = slices.map((_, i) => {
    const c = colors[i % colors.length];
    return `${c} ${i * step}% ${(i + 1) * step}%`;
  });
  return `conic-gradient(${stops.join(",")})`;
}

// Helper function to format text for each slice
function SliceLabel({
  index,
  total,
  text,
  angleDeg,
}: {
  index: number;
  total: number;
  text: string;
  angleDeg: number;
}) {
  const angle = angleDeg + 360 / total / 2;
  return (
    <div
      className="absolute top-1/2 left-[40%] text-[10px] font-medium text-white"
      style={{
        transform: `rotate(${angle}deg) translate(0, -125px) rotate(${-angle}deg)`,
        textAlign: "center",
        width: "60px", // Limit text width to ensure it stays inside the slice
        whiteSpace: "nowrap", // Prevent text from breaking
      }}
    >
      {text}
    </div>
  );
}

// Helper function to pretty print prize type
function pretty(p: PrizeType) {
  switch (p) {
    case "TRY_AGAIN":
      return "Try Again";
    case "FREE_GIFT":
      return "Free Gift";
    case "FREE_DELIVERY":
      return "Free Delivery";
    case "CASH_GIFT":
      return "Cash Gift";
    case "SPIN_AGAIN":
      return "Spin Again";
    case "DISCOUNT_10":
      return "10% Off";
    case "DISCOUNT_20":
      return "20% Off";
    case "DISCOUNT_50":
      return "50% Off";
  }
}
