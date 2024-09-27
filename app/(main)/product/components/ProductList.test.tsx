"use client";
import CardGrid from "@/common/CardGrid";
import React, { FC, useState } from "react";

import { TProduct } from "@/types/product";
import { PRODUCTS } from "@/data";

import { useHydration } from "@/hooks/useHydration";
import AppLoader from "@/common/Loaders/AppLoader";
import { useCounterStore } from "@/providers/CounterStoreProvider";
import ProductCard from "@/components/product/ProductCard";
import { ScrollAreaHorizontal } from "@/components/scroll";
import { fetchProductsData } from "@/lib/apiProduct";
import { useQuery } from "@tanstack/react-query";
import { PAGINATION_DEFAULT } from "@/constants/appConstants";

interface Props {
  isMobile?: boolean;
  isHorizontalScroll?: boolean;
}

const ProductList: FC<Props> = ({
  isMobile = false,
  isHorizontalScroll = false,
}) => {
  const hydrated = useHydration();

  // Extract search parameters with default values
  const [extractedSearchParams, setExtractedSearchParams] = useState({
    q: "",
    ...PAGINATION_DEFAULT,
  });

  const { q, page, limit } = extractedSearchParams;

  const { data, error, isLoading } = useQuery({
    queryKey: ["products", {}],
    queryFn: () =>
      fetchProductsData({
        page: String(page),
        limit: String(limit),
        ...(q ? { q } : {}),
      }),
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Extract data and pagination info
  const currentPage = data?.data?.currentPage ?? 1;
  const pageCount = data?.data?.pageCount ?? 1;
  const count = data?.data?.count;

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error)
    return <div>Error: {JSON.stringify(error, null, 2)}</div>;

  const products: TProduct[] = data?.data?.results || PRODUCTS || [];

  const productList: TProduct[] = isMobile ? products?.slice(0, 4) : products;

  // const { count, incrementCount, decrementCount } = useCounterStore(
  //   (state) => state
  // );

  // if (!hydrated) {
  //   return <AppLoader />;
  // }

  return (
    <div className="w-full">
      {/* <div>
        Count: {count}
        <hr />
        <button type="button" onClick={() => void incrementCount()}>
          Increment Count
        </button>
        <button type="button" onClick={() => void decrementCount()}>
          Decrement Count
        </button>
      </div> */}

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
