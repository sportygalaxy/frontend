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

interface Props {
  isMobile?: boolean;
  isHorizontalScroll?: boolean;
}

const Products: FC<Props> = ({
  isMobile = false,
  isHorizontalScroll = false,
}) => {
  const hydrated = useHydration();
  const products: TProduct[] = PRODUCTS || [];

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

export default Products;
