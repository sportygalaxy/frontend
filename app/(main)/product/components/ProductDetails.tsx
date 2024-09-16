"use client";

import React, { FC, useState } from "react";
import MinusOutlinedIcon from "@/assets/icons/pack/MinusOutlined";
import { Button } from "@/components/ui/button";
import AddIcon from "@/assets/icons/pack/Add";

const STOCK_COUNT = 4;
const DEFAULT_QUANTITY = 1;
interface ProductDetailsProps {
  product: any;
}
const ProductDetails: FC<ProductDetailsProps> = ({ product }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [color, setColor] = useState<string>();
  const [size, setSize] = useState<string>();

  const incrementQty = () => {
    if (quantity >= STOCK_COUNT) return STOCK_COUNT;
    setQuantity((prev) => prev + 1);
  };
  const decrementQty = () => {
    if (quantity <= 1) return DEFAULT_QUANTITY;
    setQuantity((prev) => prev - 1);
  };

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
        <p className="font-jost text-black text-mobile-2xl md:text-2xl font-bold">
          Variations
        </p>
        <div className="mt-2 space-y-6">
          {product?.colors ? (
            <>
              <p className="font-jost text-black text-mobile-xl md:text-xl font-light leading-normal tracking-wide">
                Total options: {product?.colors.length} colour
                {product?.colors.length >= 2 ? "s" : null}
              </p>
              <div className="flex items-center flex-wrap gap-3">
                {product?.colors?.map((color: any, index: number) => (
                  <span
                    key={index}
                    className="h-fit w-fit rounded-full focus:border-[#eeeeee] focus:border-1 focus:ring-black focus:ring-opacity-100 active:bg-black-800"
                  >
                    <Button
                      variant="tertiary"
                      className={`w-10 h-10 rounded-full bg-[${color?.color?.name}]`}
                    />
                  </span>
                ))}
              </div>
            </>
          ) : null}

          {product?.sizes ? (
            <>
              <p className="font-jost text-black text-mobile-xl md:text-xl font-light leading-normal tracking-wide">
                Total options: {product?.sizes.length} size
                {product?.sizes.length >= 2 ? "s" : null}
              </p>
              <div className="flex items-center flex-wrap gap-3">
                {product?.sizes?.map((size: any, index: number) => (
                  <div key={index}>
                    <Button
                      variant="tertiary"
                      className={`rounded-none border-1`}
                    >
                      {size?.size?.name}
                    </Button>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>

      <div className="mt-8">
        <p className="font-medium text-mobile-5xl md:text-4xl">
          ${product?.price * quantity} <span className="text-destructive text-sm">*{STOCK_COUNT} unit left</span>
        </p>
      </div>

      <div className="mt-4">
        <div className="flex items-center gap-2">
          <span onClick={decrementQty} className="cursor-pointer">
            <MinusOutlinedIcon width={34} height={34} />
          </span>

          <p className="font-normal text-mobile-4xl md:text-4xl text-primary p-3">
            {quantity}
          </p>

          <span onClick={incrementQty} className="cursor-pointer">
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
