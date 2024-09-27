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

const SORT_OPTIONS = [
  { name: "None", value: undefined },
  { name: "Price: Low to High", value: "asc" },
  { name: "Price: High to Low", value: "desc" },
] as const;

interface Props {
  isMobile?: boolean;
  isHorizontalScroll?: boolean;
  productData?: any;
}

const ProductList: FC<Props> = ({
  isMobile = false,
  isHorizontalScroll = false,
  productData,
}) => {
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
        // page: String(page),
        // limit: String(limit),
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

  const products: TProduct[] = productData || [];
  // || data?.data?.results || PRODUCTS || [];

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
