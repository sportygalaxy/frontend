"use client";

import DownSharpArrowIcon from "@/assets/icons/pack/DownSharpArrow";
import { Button } from "@/components/ui/button";
import { RoutesEnum } from "@/constants/routeEnums";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

type Props = {
  path: string;
  className?: string;
  text: string;
};
const SeeAll: FC<Props> = ({
  path = RoutesEnum.LANDING_PAGE,
  className = "",
  text = "See All",
}) => {
  const router = useRouter();

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Button
        className="font-medium text-mobile-xl md:text-xl py-4 px-14"
        variant="outline"
        size="lg"
        onClick={() => router.push(path, { scroll: false })}
      >
        {text} <DownSharpArrowIcon className="ml-2" />
      </Button>
    </div>
  );
};

export default SeeAll;
