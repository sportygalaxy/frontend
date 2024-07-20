import { TCategory } from "@/types/category";
import Image from "next/image";
import React, { FC } from "react";

interface Props {
  cart: TCategory;
}
const CategoriesCard: FC<Props> = ({ cart }) => {
  return (
    <div className="h-[100px] xl:h-[150px] flex items-center border border-gray">
      <div className="relative w-[40%] h-[100%]">
        <Image
          fill
          sizes="100%"
          style={{
            objectFit: "cover",
            display: "block",
            margin: "0 auto",
          }}
          src={cart.image}
          alt=""
          className="w-full transition-transform duration-700 group-hover:scale-110"
          priority
        />
      </div>
      <div className="bg-secondary-foreground w-[60%] h-full">
        <div className="flex flex-col gap-2 w-full h-full items-start justify-center pl-4 xl:pl-8">
          <p className="text-mobile-2xl xl:text-xl 2xl:text-2xl font-medium tracking-wide xl:tracking-widest uppercase">
            {cart.name}
          </p>
          <p className="text-mobile-2xl 2xl:text-2xl font-medium text-secondary">
            {cart.date}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoriesCard;
