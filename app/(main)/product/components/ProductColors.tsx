"use client";
import { Button } from "@/components/ui/button";
import React, { FC } from "react";

interface ProductColorsProps {
  product: any;
  setFieldValue: any;
  values: any;
  touched: any;
  errors: any;
  variantColors: any;
}

const ProductColors: FC<ProductColorsProps> = ({
  product,
  setFieldValue,
  values,
  touched,
  errors,
  variantColors,
}) => {
  const productColors = product?.colors;
  const isShowProductColors = productColors && productColors.length > 0;
  const isShowVariantColors = variantColors && variantColors.length > 0;
  return (
    <>
      {/* Product */}
      {isShowProductColors && (
        <div className="space-y-3">
          <p className="font-jost text-black text-mobile-xl md:text-xl font-light leading-normal tracking-wide">
            Total options: {productColors?.length} colour
            {productColors?.length >= 2 ? "s" : null}
          </p>
          <div className="flex items-center flex-wrap gap-3">
            {productColors?.map((color: any, index: number) => (
              <span key={index} className="h-fit w-fit rounded-full">
                <Button
                  type="button"
                  variant="tertiary"
                  style={{ backgroundColor: color?.color?.name }}
                  className={`w-10 h-10 rounded-full ${
                    values?.color === color?.color?.name
                      ? "border-1 border-green-400"
                      : ""
                  } bg-[${color?.color?.name}]`}
                  onClick={() => setFieldValue("color", color?.color?.name)}
                />
              </span>
            ))}
          </div>
          {touched.color && errors.color ? (
            <div className="text-red-500">{errors.color as any}</div>
          ) : null}
        </div>
      )}

      {/* Variant Product */}
      {isShowVariantColors && (
        <div className="space-y-3">
          <p className="font-jost text-black text-mobile-xl md:text-xl font-light leading-normal tracking-wide">
            Total options: {variantColors?.length} colour
            {variantColors?.length >= 2 ? "s" : null}
          </p>
          <div className="flex items-center flex-wrap gap-3">
            {variantColors?.map((color: any, index: number) => (
              <span key={index} className="h-fit w-fit rounded-full">
                <Button
                  type="button"
                  variant="tertiary"
                  style={{ backgroundColor: color?.color?.name }}
                  className={`w-10 h-10 rounded-full ${
                    values?.color === color?.color?.name
                      ? "border-1 border-green-400"
                      : ""
                  } bg-[${color?.color?.name}]`}
                  onClick={() => {
                    setFieldValue("color", color?.color?.name);
                    setFieldValue("colorPrice", color?.price);
                  }}
                />
              </span>
            ))}
          </div>
          {touched.color && errors.color ? (
            <div className="text-red-500">{errors.color as any}</div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default ProductColors;
