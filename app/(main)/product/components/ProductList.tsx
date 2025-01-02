"use client";
import CardGrid from "@/common/CardGrid";
import React, { FC } from "react";

import { TProduct, TProductQuery } from "@/types/product";

import ProductCard from "@/components/product/ProductCard";
import { ScrollAreaHorizontal } from "@/components/scroll";
import { fetchProductsData } from "@/lib/apiProduct";
import { useQuery } from "@tanstack/react-query";
import { PAGINATION_DEFAULT } from "@/constants/appConstants";
import ComponentStateWrapper from "@/common/ComponentState/ComponentStateWrapper";

interface Props {
  isMobile?: boolean;
  isHorizontalScroll?: boolean;
  productData?: any;
  isolated: boolean;
  query?: TProductQuery;
}

const ProductList: FC<Props> = ({
  isMobile = false,
  isHorizontalScroll = false,
  productData,
  isolated = true,
  query,
}) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["products", query],
    queryFn: () => fetchProductsData(query ? query : { limit: 3 }),
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const products: TProduct[] = isolated
    ? data?.data?.results || []
    : productData || [];

  const productList: TProduct[] = isMobile ? products?.slice(0, 4) : products;

  return (
    <>
      <ComponentStateWrapper
        isLoading={isLoading}
        error={error}
        data={productList}
        refetch={refetch}
        emptyMessage="No products found."
      >
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
      </ComponentStateWrapper>
    </>
  );
};

export default ProductList;
