"use client";
import { fetchMe } from "@/lib/apiUser";
import { PrizeType } from "@/types/spinner";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

interface FreeGiftBannerProps {}
const FreeGiftBanner: FC<FreeGiftBannerProps> = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchMe(),
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const gift = data?.data?.freeGift?.[0]?.giftName;
  const prizeType = data?.data?.freeGift?.[0]?.prizeType;
  const giftCount = data?.data?.freeGift?.length;

  // Define the prize types that should trigger the div to show
  const validPrizeTypes: PrizeType[] = [
    "FREE_GIFT",
    "FREE_DELIVERY",
    "CASH_GIFT",
    "DISCOUNT_10",
    "DISCOUNT_20",
    "DISCOUNT_50",
  ];

  // Check if the gift matches any of the valid prize types
  const isValidGift = validPrizeTypes.includes(prizeType as PrizeType);

  return (
    <>
      {(giftCount ?? 0) >= 1 && isValidGift ? (
        <div className="fixed flex w-full mx-auto text-center justify-center gap-0 py-2 z-10">
          <div className="bg-[#9c1c1c] rounded-full px-8 py-0 flex items-center justify-center">
            <p className="min-w-fit text-white capitalize">
              🎉 You won {gift} 🎉
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FreeGiftBanner;
