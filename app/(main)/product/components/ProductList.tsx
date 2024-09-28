"use client";
import CardGrid from "@/common/CardGrid";
import React, { FC, useState } from "react";

import { TProduct } from "@/types/product";
import { PRODUCTS } from "@/data";

import ProductCard from "@/components/product/ProductCard";
import { ScrollAreaHorizontal } from "@/components/scroll";
import { fetchProductsData } from "@/lib/apiProduct";
import { useQuery } from "@tanstack/react-query";
import { PAGINATION_DEFAULT } from "@/constants/appConstants";

interface Props {
  isMobile?: boolean;
  isHorizontalScroll?: boolean;
  productData?: any;
  isolated: boolean;
}

const ProductList: FC<Props> = ({
  isMobile = false,
  isHorizontalScroll = false,
  productData,
  isolated = true,
}) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products", {}],
    queryFn: () => fetchProductsData({}),
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const products: TProduct[] = isolated
    ? data?.data?.results || []
    : productData || [];

  const productList: TProduct[] = isMobile ? products?.slice(0, 4) : products;

  return (
    <div className="w-full">
      {isHorizontalScroll ? (
        <ScrollAreaHorizontal data={productList} component={ProductCard} />
      ) : (
        <CardGrid oneLineScroll>
          {productList.map((product: TProduct) => (
            <ProductCard key={product.id} item={product} />
          ))}
        </CardGrid>
      )}
    </div>
  );
};

export default ProductList;
