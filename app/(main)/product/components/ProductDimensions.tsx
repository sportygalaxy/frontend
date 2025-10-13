"use client";
import { Button } from "@/components/ui/button";
import React, { FC } from "react";

interface ProductDimensionsProps {
  product: any;
  setFieldValue: any;
  values: any;
  touched: any;
  errors: any;
  variantDimensions: any;
}

const ProductDimensions: FC<ProductDimensionsProps> = ({
  product,
  setFieldValue,
  values,
  touched,
  errors,
  variantDimensions,
}) => {
  const isShowVariantDimensions =
    variantDimensions && variantDimensions.length > 0;
  return (
    <>
      {/* Variant Product */}
      {isShowVariantDimensions && (
        <div className="space-y-3">
          <p className="font-jost text-black text-mobile-xl md:text-xl font-light leading-normal tracking-wide">
            Total options: {variantDimensions?.length} dimension
            {variantDimensions?.length >= 2 ? "s" : null}
          </p>
          <div className="flex items-center flex-wrap gap-3">
            {variantDimensions?.map((dimension: any, index: number) => (
              <Button
                key={index}
                type="button"
                variant="tertiary"
                className={`rounded-none ${
                  values?.dimension === dimension?.dimension
                    ? "border-1 border-green-400"
                    : ""
                }`}
                onClick={() => {
                  setFieldValue("dimension", dimension?.dimension);
                  setFieldValue("dimensionPrice", dimension?.price);
                }}
              >
                {dimension?.dimension}
              </Button>
            ))}
          </div>
          {touched.dimension && errors.dimension ? (
            <div className="text-red-500">{errors.dimension as any}</div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default ProductDimensions;
