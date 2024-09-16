"use client";

import React, { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProductData } from "@/lib/apiProduct";
import MinusOutlinedIcon from "@/assets/icons/pack/MinusOutlined";
import { Button } from "@/components/ui/button";
import AddIcon from "@/assets/icons/pack/Add";
import Divider from "@/common/Divider";
import { products } from "./data";
import VerticalProductMediaSlider from "@/common/Swiper/VerticalProductMediaSlider";
import HorizontalProductMediaSlider from "@/common/Swiper/HorizontalProductMediaSlider";

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
            {/* left */}
            <div className="flex flex-1 gap-8">
              <VerticalProductMediaSlider medias={products[0]?.medias} />

              <HorizontalProductMediaSlider medias={products[0]?.medias} />
            </div>

            {/* right */}
            <div className="flex flex-col flex-1">
              <div className="space-y-2">
                <p className="font-jost text-black text-mobile-3xl md:text-3xl font-medium">
                  10kg Dumbbell | Enhance Your Strength Training
                </p>
                <p className="font-jost text-secondary text-mobile-xl md:text-xl font-light leading-normal tracking-wide">
                  Elevate your workout routine with our premium 10kg dumbbell,
                  designed to meet the needs of both beginners and seasoned
                  fitness enthusiasts. Whether you’re aiming to build muscle,
                  tone your body, or improve overall fitness, this versatile
                  dumbbell is the perfect addition to your home gym.
                </p>
              </div>

              <div className="mt-8">
                <div className="space-y-2">
                  <p className="font-jost text-black text-mobile-2xl md:text-2xl font-bold">
                    Variations
                  </p>
                  <p className="font-jost text-black text-mobile-xl md:text-xl font-light leading-normal tracking-wide">
                    Total options: 1 colour
                  </p>
                </div>

                <div className="mt-6 flex items-center flex-wrap gap-3">
                  <div className="w-10 h-10 rounded-full bg-black"></div>
                  <div className="w-10 h-10 rounded-full bg-blue-600"></div>
                </div>
              </div>

              <div className="mt-8">
                <p className="font-medium text-mobile-5xl md:text-4xl">$1200</p>
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <span className="cursor-pointer">
                    <MinusOutlinedIcon width={34} height={34} />
                  </span>

                  <p className="font-normal text-mobile-4xl md:text-4xl text-primary p-3">
                    1
                  </p>

                  <span className="cursor-pointer">
                    <AddIcon width={35} height={34} />
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-8">
                  <Button
                    className="px-10 py-8 rounded-none"
                    variant="default"
                    size="lg"
                  >
                    Start order
                  </Button>
                  <Button
                    className="px-10 py-8 rounded-none"
                    variant="outline"
                    size="lg"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </section>
          <Divider className="mt-8" />

          <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
      )}
    </div>
  );
};

export default ProductPage;
