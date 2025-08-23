"use client";

import React, { FC } from "react";
import MinusOutlinedIcon from "@/assets/icons/pack/MinusOutlined";
import { Button } from "@/components/ui/button";
import AddIcon from "@/assets/icons/pack/Add";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import useCartStore from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { RoutesEnum } from "@/constants/routeEnums";
import { NotifySuccess } from "@/helpers/toasts";
import { formatCurrency } from "@/utils/currencyUtils";
import {
  calculatePercentageDecrease,
  getEffectivePrice,
} from "@/helpers/product-discount";
import clsx from "clsx";

const DEFAULT_QUANTITY = 1;

interface ProductDetailsProps {
  product: any;
}

const ProductSchema = Yup.object().shape({
  id: Yup.string().required("Product Id is required"),
  color: Yup.string().required("Color is required"),
  size: Yup.string().required("Size is required"),
  qty: Yup.number().required("Quantity is required"),
  price: Yup.number().required("Price is required"),
});

const ProductDetails: FC<ProductDetailsProps> = ({ product }) => {
  const router = useRouter();
  const { addToCart, removeFromCart, cart } = useCartStore();
  const STOCK_COUNT = product?.stock || 0;
  const modelNumber = product?.modelNumber || "";

  const initialValues = {
    id: product?.id || "",
    color: product?.colors?.[0]?.color?.name || "", // Default to the first color
    size: product?.sizes?.[0]?.size?.name || "", // Default to the first size
    qty: 1, // Default to 1
    price: product?.salesPrice ? product?.salesPrice : product?.price, // Default to product price
  };

  function isItemInCart(itemId: number): any {
    return cart.some((item) => item.id === itemId);
  }

  const discountCap = calculatePercentageDecrease({
    price: Number(product?.price),
    salesPrice: Number(product?.salesPrice),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ProductSchema}
      onSubmit={(values) => {
        const payload = {
          ...product,
          colors: values.color,
          sizes: values.size,
          qty: values.qty,
          price: getEffectivePrice(product?.price, product?.salesPrice),
        };

        // console.log("Form Submitted", values);

        addToCart(payload);
        NotifySuccess("Proceed to checkout");
        router.push(RoutesEnum.CHECKOUT);
      }}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Form className="flex flex-col flex-1">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <p className="capitalize font-jost text-black text-mobile-3xl md:text-3xl font-medium">
                {product?.name} -
              </p>
              <span className="font-jost text-secondary text-mobile-xl md:text-lg font-light leading-normal tracking-wide">
                ({modelNumber})
              </span>
            </div>
            <p className="font-jost text-secondary text-mobile-xl md:text-xl font-light leading-normal tracking-wide">
              {product?.description}
            </p>
          </div>

          <div className="mt-8">
            <p className="font-jost text-black text-mobile-2xl md:text-2xl font-bold">
              Variations
            </p>

            <div className="mt-2 space-y-6">
              {product?.colors && (
                <div className="space-y-3">
                  <p className="font-jost text-black text-mobile-xl md:text-xl font-light leading-normal tracking-wide">
                    Total options: {product?.colors?.length} colour
                    {product?.colors?.length >= 2 ? "s" : null}
                  </p>
                  <div className="flex items-center flex-wrap gap-3">
                    {product?.colors?.map((color: any, index: number) => (
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
                          onClick={() =>
                            setFieldValue("color", color?.color?.name)
                          }
                        />
                      </span>
                    ))}
                  </div>
                  {touched.color && errors.color ? (
                    <div className="text-red-500">{errors.color as any}</div>
                  ) : null}
                </div>
              )}

              {product?.sizes && (
                <div className="space-y-3">
                  <p className="font-jost text-black text-mobile-xl md:text-xl font-light leading-normal tracking-wide">
                    Total options: {product?.sizes?.length} size
                    {product?.sizes?.length >= 2 ? "s" : null}
                  </p>
                  <div className="flex items-center flex-wrap gap-3">
                    {product?.sizes?.map((size: any, index: number) => (
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
            </div>
          </div>

          {discountCap ? (
            <>
              <div className="mt-8">
                <div className="flex items-center gap-2">
                  <p className="!text-gray-500 font-light text-mobile-xl md:text-xl line-through">
                    {formatCurrency(product?.price * values.qty || 0)}
                  </p>
                  <p
                    className={clsx(
                      !discountCap && "hidden",
                      "bg-orange-400 rounded-md p-2 z-[2] text-sm"
                    )}
                  >
                    {discountCap}
                  </p>
                </div>
                <p className="font-medium text-mobile-5xl md:text-4xl">
                  {formatCurrency(product?.salesPrice * values.qty || 0)}
                  <span className="text-destructive text-sm">
                    *{STOCK_COUNT} unit left
                  </span>
                </p>
              </div>
            </>
          ) : (
            <div className="mt-8">
              <p className="font-medium text-mobile-5xl md:text-4xl">
                {formatCurrency(product?.price * values.qty || 0)}
                <span className="text-destructive text-sm">
                  *{STOCK_COUNT} unit left
                </span>
              </p>
            </div>
          )}

          <div className="mt-4">
            <div className="flex items-center gap-2">
              <span
                onClick={() => {
                  if (values?.qty <= 1) return DEFAULT_QUANTITY;
                  setFieldValue("qty", values?.qty - 1);
                }}
                className="cursor-pointer"
              >
                <MinusOutlinedIcon width={34} height={34} />
              </span>

              <p className="font-normal text-mobile-4xl md:text-4xl text-primary p-3">
                {values.qty}
              </p>

              <span
                onClick={() => {
                  if (values?.qty >= STOCK_COUNT) return STOCK_COUNT;
                  setFieldValue("qty", values?.qty + 1);
                }}
                className="cursor-pointer"
              >
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
                type="submit"
              >
                Start order
              </Button>
              <Button
                className="px-10 py-8 rounded-none"
                variant="outline"
                size="lg"
                type="button"
                onClick={() => {
                  const payload = {
                    ...product,
                    colors: values.color,
                    sizes: values.size,
                    qty: values.qty,
                    price: getEffectivePrice(
                      product?.price,
                      product?.salesPrice
                    ),
                  };
                  addToCart(payload);
                }}
              >
                {isItemInCart(product?.id) ? "Added to Cart!" : "Add to Cart"}
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProductDetails;
