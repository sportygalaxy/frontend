"use client";
import { Button } from "@/components/ui/button";
import React, { FC } from "react";

interface ProductWeightsProps {
  product: any;
  setFieldValue: any;
  values: any;
  touched: any;
  errors: any;
  variantWeights: any;
}

const ProductWeights: FC<ProductWeightsProps> = ({
  product,
  setFieldValue,
  values,
  touched,
  errors,
  variantWeights,
}) => {
  const isShowVariantWeight =
    variantWeights && variantWeights.length > 0;
  return (
    <>
      {/* Variant Product */}
      {isShowVariantWeight && (
        <div className="space-y-3">
          <p className="font-jost text-black text-mobile-xl md:text-xl font-light leading-normal tracking-wide">
            Total options: {variantWeights?.length} weight
            {variantWeights?.length >= 2 ? "s" : null}
          </p>
          <div className="flex items-center flex-wrap gap-3">
            {variantWeights?.map((weight: any, index: number) => (
              <Button
                key={index}
                type="button"
                variant="tertiary"
                className={`rounded-none ${
                  values?.weight === weight?.weight
                    ? "border-1 border-green-400"
                    : ""
                }`}
                onClick={() => {
                  setFieldValue("weight", weight?.weight);
                  setFieldValue("weightPrice", weight?.price);
                }}
              >
                {weight?.weight} KG
              </Button>
            ))}
          </div>
          {touched.weight && errors.weight ? (
            <div className="text-red-500">{errors.weight as any}</div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default ProductWeights;
