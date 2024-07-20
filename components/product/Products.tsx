import CardGrid from "@/common/CardGrid";
import React, { FC } from "react";
import ProductCard from "./ProductCard";
import { TProduct } from "@/types/product";
import { PRODUCTS } from "@/data";
import { ScrollAreaHorizontal } from "../scroll";

interface Props {
  isMobile?: boolean;
  isHorizontalScroll?: boolean;
}

const Products: FC<Props> = ({
  isMobile = false,
  isHorizontalScroll = false,
}) => {
  const products: TProduct[] = PRODUCTS || [];

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

export default Products;
