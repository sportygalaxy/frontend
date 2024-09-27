"use client";

import { Button } from "@/components/ui/button";
import { RoutesEnum } from "@/constants/routeEnums";
import { useRouter } from "next/navigation";
import React from "react";

const Hero = () => {
  const router = useRouter();
  return (
    <>
      <div className="desktop-tablet-view relative mt-7 w-full h-full bg-dark-gradient bg-cover bg-no-repeat py-44">
        <div className="wrapper flex flex-col gap-10">
          <div className="flex flex-col gap-1">
            <p className="text-primary-foreground text-6xl font-bold max-w-[367px]">
              NEW SPORT COLLECTION
            </p>
            <p className="text-primary-foreground text-2xl font-medium text-left max-w-[254px]">
              OUR LATESTS FALL COLLECTION IS NOW IN STORE
            </p>
          </div>

          <Button
            variant="tertiary"
            size="lg"
            className="bg-primary-foreground w-fit text-mobile-xl md:text-xl"
            onClick={() => router.push(RoutesEnum.PRODUCTS, { scroll: false })}
          >
            Shop now
          </Button>
        </div>
      </div>
    </>
  );
};

export default Hero;
