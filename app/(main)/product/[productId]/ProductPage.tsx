"use client";

import React, { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProductData } from "@/lib/apiProduct";
import Divider from "@/common/Divider";
import { keyattribute, products, specifications } from "./data";
import ProductMediaSliders from "@/app/(main)/product/components/ProductMediaSliders";
import ProductDetails from "../components/ProductDetails";
import Products from "@/components/product/Products";
import { DesktopTitle } from "@/common/Title";

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
            <Divider className="mt-8" />
          </section>

          <section className="desktop-tablet-view flex-col lg:mt-5">
            <DesktopTitle noLine title="Other recommended products" />
            <Products isMobile isHorizontalScroll />
          </section>

          <section className="space-y-4">
            <DesktopTitle noLine title="Key attributes" />
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse border border-gray-300">
                <tbody>
                  {keyattribute?.map((attribute, index) => (
                    <tr key={index}>
                      <td className="bg-[#F0F0F0] border border-dark p-5 font-normal text-mobile-2xl md:text-2xl font-jost min-w-[120px] lg:min-w-[230px]">
                        {attribute.key}
                      </td>
                      <td className="border border-dark p-5 font-normal text-mobile-xl md:text-lg font-jost">
                        {attribute.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-4">
            <DesktopTitle noLine title="Specifications" />
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse border border-gray-300">
                <tbody>
                  {specifications?.map((specification, index) => (
                    <tr key={index}>
                      <td className="bg-[#F0F0F0] border border-dark p-5 font-normal text-mobile-3xl md:text-2xl font-jost min-w-[140px] lg:min-w-[230px]">
                        {specification.key}
                      </td>
                      <td className="border border-dark p-5 font-normal text-mobile-xl md:text-lg font-jost">
                        {specification.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
      )}
    </div>
  );
};

export default ProductPage;
