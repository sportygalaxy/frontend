"use client";

import React, { FC } from "react";
import MinusOutlinedIcon from "@/assets/icons/pack/MinusOutlined";
import { Button } from "@/components/ui/button";
import AddIcon from "@/assets/icons/pack/Add";

interface ProductDetailsProps {
  product: any;
}
const ProductDetails: FC<ProductDetailsProps> = ({ product }) => {
  return (
    <div className="flex flex-col flex-1">
      <div className="space-y-2">
        <p className="font-jost text-black text-mobile-3xl md:text-3xl font-medium">
          {product?.name}
        </p>
        <p className="font-jost text-secondary text-mobile-xl md:text-xl font-light leading-normal tracking-wide">
          {product?.description}
        </p>
      </div>

      <div className="mt-8">
        <div className="space-y-2">
          <p className="font-jost text-black text-mobile-2xl md:text-2xl font-bold">
            Variations
          </p>
          <p className="font-jost text-black text-mobile-xl md:text-xl font-light leading-normal tracking-wide">
            Total options: {product?.colors.length} colour
            {product?.colors.length >= 2 ? "s" : null}
          </p>
        </div>

        {product?.colors ? (
          <div className="mt-6 flex items-center flex-wrap gap-3">
            {product?.colors?.map((color: any, index: number) => (
              <div key={index}>
                <div
                  className={`w-10 h-10 rounded-full bg-[${color?.color?.name}]`}
                ></div>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-8">
        <p className="font-medium text-mobile-5xl md:text-4xl">
          ${product?.price}
        </p>
      </div>

      <div className="mt-4">
        <div className="flex items-center gap-2">
          <span className="cursor-pointer">
            <MinusOutlinedIcon width={34} height={34} />
          </span>

          <p className="font-normal text-mobile-4xl md:text-4xl text-primary p-3">
            1
          </p>

          <span className="cursor-pointer">
            <AddIcon width={35} height={34} />
          </span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center gap-8">
          <Button
            className="px-10 py-8 rounded-none"
            variant="default"
            size="lg"
          >
            Start order
          </Button>
          <Button
            className="px-10 py-8 rounded-none"
            variant="outline"
            size="lg"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
