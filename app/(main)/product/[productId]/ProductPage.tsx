"use client";

import React, { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProductData } from "@/lib/apiProduct";
import Divider from "@/common/Divider";
import { products } from "./data";
import ProductMediaSliders from "@/app/(main)/product/components/ProductMediaSliders";
import ProductDetails from "../components/ProductDetails";
import Products from "@/components/product/Products";
import { DesktopTitle } from "@/common/Title";
import ProductSpecifications from "../components/ProductSpecifications";
import ProductKeyattributes from "../components/ProductKeyattributes";
import ProductRatings from "../components/ProductRatings";
import useBreakpoint from "@/hooks/useBreakpoint";
import { cn } from "@/lib/utils";
import { PRODUCT_ID } from "@/constants/appConstants";

interface ProductProps {
  params: { productId: string };
  searchParams: {};
}

const ProductPage: FC<ProductProps> = (props) => {
  const { isLg } = useBreakpoint();
  const { params, searchParams } = props;

  const productId = params?.productId || PRODUCT_ID;

  const { data, error, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductData(productId),
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error)
    return <div>Error: {JSON.stringify(error, null, 2)}</div>;

  const productData = data?.data || {};
  // products?.[0] || {};

  return (
    <div className="wrapper my-12">
      {/* Product {productId} */}
      {isLoading ? (
        <span>loading.......</span>
      ) : (
        <>
          <section
            className={cn("flex flex-col gap-8", isLg ? "flex-row" : "")}
          >
            <div className="flex-1">
              <ProductMediaSliders medias={productData?.medias} />
            </div>

            <div className="flex-1">
              <ProductDetails product={productData} />
            </div>
          </section>
          <Divider className="mt-8" />

          <section className="desktop-tablet-view flex-col lg:mt-5">
            <DesktopTitle noLine title="Other recommended products" />
            <Products isMobile isHorizontalScroll />
          </section>

          <ProductKeyattributes keyattributes={productData.keyattribute} />
          <ProductSpecifications specifications={productData.specification} />

          <ProductRatings />

          {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        </>
      )}
    </div>
  );
};

export default ProductPage;
