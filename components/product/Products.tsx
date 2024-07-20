import CardGrid from "@/common/CardGrid";
import React, { FC } from "react";
import ProductCard from "./ProductCard";
import { TProduct } from "@/types/product";
import { PRODUCTS } from "@/data";

interface Props {
  isMobile?: boolean;
}

const Products: FC<Props> = ({ isMobile = false }) => {
  const products: TProduct[] = PRODUCTS || [];

  const productList = isMobile ? products?.slice(0, 2) : products;
  return (
    <div className="w-full">
      <CardGrid oneLineScroll>
        {productList.map((product: TProduct) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </CardGrid>
    </div>
  );
};

export default Products;
