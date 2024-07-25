"use client";
import CardGrid from "@/common/CardGrid";
import React, { FC } from "react";
import ProductCard from "./ProductCard";
import { TProduct } from "@/types/product";
import { PRODUCTS } from "@/data";
import { ScrollAreaHorizontal } from "../scroll";
import useCartStore from "@/store/cartStore";
import { Button } from "../ui/button";
import { useHydration } from "@/hooks/useHydration";
import SportygalaxyLoadingIndicator from "@/common/Loaders/SportygalaxyLoadingIndicator";
import AppLoader from "@/common/Loaders/AppLoader";

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

  const {
    cart,
    addToCart,
    removeFromCart,
    incrementQty,
    decrementQty,
    clearCart,
  } = useCartStore();

  const totalPrice = cart.reduce((accumulator: number, currentItem: any) => {
    return accumulator + currentItem.price * currentItem.qty;
  }, 0);

  if (!hydrated) {
    return <AppLoader />;
  }

  return (
    <div className="w-full">
      <div className="max-w-72">
        <p>All Cart Item Quantity == {cart.length}</p>
        <p>All Cart Item Cummulation Price == {totalPrice}</p>
        <div className="space-y-2">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className=""
              // onClick={() => incrementQty(item.id)}
            >
              +
            </Button>
            <Button
              variant="outline"
              className=""
              // onClick={() => decrementQty(item.id)}
            >
              -
            </Button>
          </div>
          <div>
            <Button variant="default" className="w-full" onClick={clearCart}>
              Clear
            </Button>
          </div>
          <div>
            <Button
              variant="link"
              className="w-full underline"
              // onClick={() => removeFromCart(item.id)}
            >
              Delete Item
            </Button>
          </div>
        </div>
      </div>
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
