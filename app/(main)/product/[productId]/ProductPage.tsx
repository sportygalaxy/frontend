"use client";

import React, { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProductData } from "@/lib/apiProduct";
import Image from "next/image";
import VideoPlayer from "@/common/VidepPlayer";
import LogoMobileIcon from "@/assets/icons/pack/LogoMobile";
import MinusOutlinedIcon from "@/assets/icons/pack/MinusOutlined";
import { Button } from "@/components/ui/button";
import AddIcon from "@/assets/icons/pack/Add";
import WatermarkedImage from "@/common/WatermarkedImage";
import ImageSlider from "@/common/Swiper/ImageSlider";
import { videoPath, WATERMARK, youTubeLink } from "@/constants/appConstants";
import Divider from "@/common/Divider";
import { medias, products } from "./data";

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

  const isVideoMode = true;
  return (
    <div className="wrapper my-12">
      Product {productId}
      {isLoading ? (
        <span>loading.......</span>
      ) : (
        <>
          <section className="flex gap-8">
            {/* left */}
            <div className="flex flex-1 gap-8">
              <ImageSlider medias={products[0]?.medias} />

              <div className="max-h-[700px] max-w-[500px] min-w-[400px] min-h-[450px]">
                {isVideoMode ? (
                  <div className="relative bg-[#E8EAEC]">
                    <VideoPlayer
                      pauseTime={10} // Pause after 10 seconds
                      src={videoPath}
                      poster="/images/product/prod-1.png"
                      watermark={<LogoMobileIcon />}
                      link={youTubeLink}
                      className=""
                    />
                  </div>
                ) : (
                  // <div className="relative bg-[#E8EAEC]">
                  //   <Image
                  //     src="/images/product/prod-1.png"
                  //     width={700}
                  //     height={700}
                  //     alt="prod-1"
                  //     className="bg-cover"
                  //   />
                  //   <div className="absolute top-4 left-4 bg-white bg-opacity-50 p-2 text-xs">
                  //     <LogoMobileIcon />
                  //   </div>
                  // </div>

                  <WatermarkedImage
                    src="/images/product/prod-1.png"
                    watermark={<LogoMobileIcon />}
                    watermarkImageSrc={WATERMARK}
                  />
                )}
              </div>
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

          {/* <ImageSlider /> */}

          {/* Extras */}
          <div className="flex items-center gap-2 mt-5">
            <video
              className="h-[200px] w-[200px]"
              src="/videos/prod-1.mp4"
              autoPlay
              muted
              loop
            />

            <div className="relative bg-red-500 w-[200px] h-[200px]">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/1FLYZdxsteo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube Video"
              ></iframe>
            </div>
          </div>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
      )}
    </div>
  );
};

export default ProductPage;
