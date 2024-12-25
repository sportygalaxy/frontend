import BinIcon from "@/assets/icons/pack/Bin";
import React, { FC } from "react";
import { Button } from "../ui/button";
import { RoutesEnum } from "@/constants/routeEnums";
import { useRouter } from "next/navigation";

type Props = {};
const CartEmpty: FC<Props> = () => {
  const router = useRouter();

  const handleGotoShop = () => {
    window.location.href = RoutesEnum.PRODUCTS;
  };
  return (
    <div className="flex flex-col bg-background items-center justify-center gap-6 h-full mb-20">
      <BinIcon />

      <div className="text-center">
        <p className="font-semibold text-2xl text-primary">
          Your Cart is empty
        </p>
        <p className="font-normal text-base text-secondary">Add new items</p>
      </div>

      <Button variant="default" size="lg" className="" onClick={handleGotoShop}>
        Shop now
      </Button>
    </div>
  );
};

export default CartEmpty;
