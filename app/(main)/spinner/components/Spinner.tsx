"use client";
import { useRef, useState, FC } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { NotifyError, NotifySuccess } from "@/helpers/toasts";
import { createSpinner } from "@/lib/apiSpinner";
import { CreateSpinnerPayload } from "./SpinnerForm";

type PrizeType =
  | "TRY_AGAIN"
  | "FREE_GIFT"
  | "FREE_DELIVERY"
  | "CASH_GIFT"
  | "SPIN_AGAIN"
  | "DISCOUNT_10"
  | "DISCOUNT_20"
  | "DISCOUNT_50";

// Spinner degree outcome for corresponding prizes
export const SPINNER_DEGREE_OUTCOME = {
  TRY_AGAIN: { slice: 0, angleDeg: 22.5 },
  FREE_GIFT: { slice: 1, angleDeg: 67.5 },
  FREE_DELIVERY: { slice: 2, angleDeg: 112.5 },
  CASH_GIFT: { slice: 3, angleDeg: 157.5 },
  SPIN_AGAIN: { slice: 4, angleDeg: 202.5 },
  DISCOUNT_10: { slice: 5, angleDeg: 247.5 },
  DISCOUNT_20: { slice: 6, angleDeg: 292.5 },
  DISCOUNT_50: { slice: 7, angleDeg: 337.5 },
};

// Spinner component to show wheel animation
export function Spinner({ uiSlices }: { uiSlices: PrizeType[] }) {
  const wheelRef = useRef<HTMLDivElement>(null);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<{
    prize: PrizeType;
    msg: string;
    angleDeg: number;
  } | null>(null);

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
      NotifySuccess(data?.message as string);
    },
    onError: (error) => {
      console.error("Error - Spinner Mutation: ", error);
      NotifyError(error?.message || "An error occurred");
    },
  });

  // This function will be triggered when user clicks Spin Now
  async function spin() {
    if (spinning) return;

    wheelRef.current!.style.transition = "none"; // Reset transition
    wheelRef.current!.style.transform = "rotate(0deg)"; // Reset rotation
    setSpinning(true); // Set spinning state to true to disable the button during the spin
    setResult(null); // Reset previous result

    try {
      // Trigger the backend API to get the prize and angleDeg
      await createSpinnerMutate({}); // Wait for the mutation to complete

      // Proceed with the spinner wheel rotation once the mutation is complete
      const target = data?.data?.angleDeg; // Ensure data is available after mutation
      const extraTurns = 360 * 6; // 6 full rotations for drama
      const finalDeg = extraTurns + (360 - target); // pointer at top (0deg); invert if needed

      const wheel = wheelRef.current!;
      wheel.style.transition = "transform 4s cubic-bezier(.17,.67,.32,1.33)";
      requestAnimationFrame(() => {
        wheel.style.transform = `rotate(${finalDeg}deg)`;
      });

      setTimeout(() => {
        setSpinning(false);
        setResult({
          prize: data?.data?.prize,
          msg: data?.data?.message,
          angleDeg: data?.data?.angleDeg,
        });
      }, 4100); // Wait for animation to end
    } catch (err) {
      console.error("Spin failed:", err);
      setSpinning(false);
      NotifyError("An error occurred while spinning");
    }
  }

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

      <button
        onClick={spin}
        disabled={spinning || isPending} // disable button while spinning or pending
        className="px-6 py-3 rounded-2xl shadow text-white bg-black disabled:opacity-50"
      >
        {spinning || isPending ? "Spinning..." : "Spin Now"}
      </button>

      {result && (
        <div className="text-center">
          <div className="text-xl font-semibold">{pretty(result.prize)}</div>
          <div className="text-sm text-gray-600">{result.msg}</div>
        </div>
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