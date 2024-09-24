"use client";
import CardGrid from "@/common/CardGrid";
import React, { FC } from "react";
import ProductCard from "./ProductCard";
import { TProduct } from "@/types/product";
import { PRODUCTS } from "@/data";
import { ScrollAreaHorizontal } from "../scroll";
import { useHydration } from "@/hooks/useHydration";
import SportygalaxyLoadingIndicator from "@/common/Loaders/SportygalaxyLoadingIndicator";
import AppLoader from "@/common/Loaders/AppLoader";
import { useCounterStore } from "@/providers/CounterStoreProvider";
import { useQuery } from "@tanstack/react-query";
import { fetchProductsData } from "@/lib/apiProduct";

interface Props {
  isMobile?: boolean;
  isHorizontalScroll?: boolean;
}

const Products: FC<Props> = ({
  isMobile = false,
  isHorizontalScroll = false,
}) => {
  const hydrated = useHydration();

  // const { count, incrementCount, decrementCount } = useCounterStore(
  //   (state) => state
  // );

  // if (!hydrated) {
  //   return <AppLoader />;
  // }

  const { data, error, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: () => fetchProductsData(),
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error)
    return <div>Error: {JSON.stringify(error, null, 2)}</div>;

  const products: TProduct[] = data?.data || PRODUCTS || [];

  const productList: TProduct[] = isMobile ? products?.slice(0, 4) : products;

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

export default Products;
