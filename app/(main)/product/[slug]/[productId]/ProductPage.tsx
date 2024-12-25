"use client";

import React, { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProductData } from "@/lib/apiProduct";
import Divider from "@/common/Divider";
import ProductMediaSliders from "@/app/(main)/product/components/ProductMediaSliders";
import ProductDetails from "../../components/ProductDetails";

import { DesktopTitle } from "@/common/Title";
import ProductSpecifications from "../../components/ProductSpecifications";
import ProductKeyattributes from "../../components/ProductKeyattributes";
import ProductRatings from "../../components/ProductRatings";
import useBreakpoint from "@/hooks/useBreakpoint";
import { cn } from "@/lib/utils";
import { PRODUCT_ID } from "@/constants/appConstants";
import ProductList from "../../components/ProductList";
import ComponentStateWrapper from "@/common/ComponentState/ComponentStateWrapper";

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

  const productData = data?.data || {};

  return (
    <div className="wrapper my-12">
      <ComponentStateWrapper
        isLoading={isLoading}
        error={error}
        data={[productData]}
        emptyMessage="No product found."
      >
        <div>
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
            <ProductList isolated isMobile isHorizontalScroll />
          </section>

          <ProductKeyattributes keyattributes={productData?.keyattribute} />
          <ProductSpecifications specifications={productData?.specification} />

          <ProductRatings />
        </div>
      </ComponentStateWrapper>
    </div>
  );
};

export default ProductPage;
