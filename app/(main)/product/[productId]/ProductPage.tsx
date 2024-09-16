"use client";

import React, { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProductData } from "@/lib/apiProduct";
import MinusOutlinedIcon from "@/assets/icons/pack/MinusOutlined";
import { Button } from "@/components/ui/button";
import AddIcon from "@/assets/icons/pack/Add";
import Divider from "@/common/Divider";
import { products } from "./data";
import ProductMediaSliders from "@/app/(main)/product/components/ProductMediaSliders";
import ProductDetails from "../components/ProductDetails";

interface ProductProps {
  params: { productId: string };
  searchParams: {};
}

const ProductPage: FC<ProductProps> = (props) => {
  const { params, searchParams } = props;

  const productId = "15b2e08c-b395-4bff-bed9-bbcd68c7d6dd";
  // params?.productId ||

  const { data, error, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductData(productId),
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error)
    return <div>Error: {JSON.stringify(error, null, 2)}</div>;

  return (
    <div className="wrapper my-12">
      Product {productId}
      {isLoading ? (
        <span>loading.......</span>
      ) : (
        <>
          <section className="flex gap-8 flex-wrap">
            <ProductMediaSliders medias={products[0]?.medias} />

            <ProductDetails product={products[0]} />
          </section>

          <Divider className="my-8" />

          <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
      )}
    </div>
  );
};

export default ProductPage;
