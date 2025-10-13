"use client";
import { Button } from "@/components/ui/button";
import React, { FC } from "react";

interface ProductSizesProps {
  product: any;
  setFieldValue: any;
  values: any;
  touched: any;
  errors: any;
  variantSizes: any;
}

const ProductSizes: FC<ProductSizesProps> = ({
  product,
  setFieldValue,
  values,
  touched,
  errors,
  variantSizes,
}) => {
  const productSizes = product?.sizes;
  const isShowProductSizes = productSizes && productSizes.length > 0;
  const isShowVariantSizes = variantSizes && variantSizes.length > 0;
  const isBothEmpty = isShowProductSizes && isShowVariantSizes;

  return (
    <>
      {/* Product */}
      {(isShowProductSizes) && (
        <div className="space-y-3">
          <p className="font-jost text-black text-mobile-xl md:text-xl font-light leading-normal tracking-wide">
            Total options: {productSizes?.length} size
            {productSizes?.length >= 2 ? "s" : null}
          </p>
          <div className="flex items-center flex-wrap gap-3">
            {productSizes?.map((size: any, index: number) => (
              <Button
                key={index}
                type="button"
                variant="tertiary"
                className={`rounded-none ${
                  values?.size === size?.size?.name
                    ? "border-1 border-green-400"
                    : ""
                }`}
                onClick={() => setFieldValue("size", size?.size?.name)}
              >
                {size?.size?.name}
              </Button>
            ))}
          </div>
          {touched.size && errors.size ? (
            <div className="text-red-500">{errors.size as any}</div>
          ) : null}
        </div>
      )}

      {/* Variant Product */}
      {isShowVariantSizes && (
        <div className="space-y-3">
          <p className="font-jost text-black text-mobile-xl md:text-xl font-light leading-normal tracking-wide">
            Total options: {variantSizes?.length} size
            {variantSizes?.length >= 2 ? "s" : null}
          </p>
          <div className="flex items-center flex-wrap gap-3">
            {variantSizes?.map((size: any, index: number) => (
              <Button
                key={index}
                type="button"
                variant="tertiary"
                className={`rounded-none ${
                  values?.size === size?.size?.name
                    ? "border-1 border-green-400"
                    : ""
                }`}
                onClick={() => {
                  setFieldValue("size", size?.size?.name);
                  setFieldValue("sizePrice", size?.price);
                }}
              >
                {size?.size?.name}
              </Button>
            ))}
          </div>
          {touched.size && errors.size ? (
            <div className="text-red-500">{errors.size as any}</div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default ProductSizes;
