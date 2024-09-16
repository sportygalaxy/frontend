"use client";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LogoMobileIcon from "@/assets/icons/pack/LogoMobile";
import { Button } from "@/components/ui/button";
import VideoPlayer from "../VidepPlayer";
import { videoPath, youTubeLink } from "@/constants/appConstants";
import { cn } from "@/lib/utils";
import { flattenMediaStructure } from "@/helpers/product";

interface ImageSliderProps {
  medias: any[];
}

export default function ImageSlider({ medias }: ImageSliderProps): JSX.Element {
  // Sort medias array to ensure videos are last
  const sortedMedias = useMemo(
    () =>
      flattenMediaStructure(
        medias?.sort((a, b) => (a.type === "video" ? 1 : -1))
      ),
    [medias]
  );

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const prevSlide = (): void => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + sortedMedias.length) % sortedMedias.length
    );
  };

  const nextSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sortedMedias.length);
  };

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => nextSlide(), 2000);
      return () => clearInterval(interval);
    }
  }, [isHovered, sortedMedias.length]);

  const NoMediaContent = ({ text }: { text: string }): JSX.Element => {
    return (
      <div className="bg-secondary h-full flex items-center justify-center cursor-not-allowed">
        <div className="absolute top-4 left-4">
          <LogoMobileIcon width={30} height={30} />
        </div>
        <p className="normal-case">No {text}</p>
      </div>
    );
  };

  return (
    <div className="relative w-full h-full md:flex md:flex-col md:items-center mx-auto  overflow-hidden">
      <div className="space-y-4 max-h-[500px] min-h-[450px]">
        {sortedMedias.map((media, index) => {
          const isVideo = media.type === "video";
          const isImage = media.type !== "video";
          const imageCount = (media?.images?.length || 0) >= 1;
          const videoCount = !!media?.links?.introVideo;

          return (
            <div
              key={index}
              className={cn(
                "bg-[#E8EAEC] relative w-[200px] group transition-transform duration-500 ease-in-out flex-shrink-0",
                isVideo ? "min-h-[150px]" : "h-[150px]"
              )}
              style={{ transform: `translateY(-${currentIndex * 100}%)` }}
              onMouseOver={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {isVideo ? (
                videoCount ? (
                  <VideoPlayer
                    pauseTime={10}
                    src={media?.links?.introVideo || videoPath}
                    poster={media?.displayImage}
                    watermark={<LogoMobileIcon width={30} height={30} />}
                    link={media?.links?.completeVideo || youTubeLink}
                  />
                ) : (
                  <>{NoMediaContent({ text: "Video" })}</>
                )
              ) : isImage ? (
                imageCount ? (
                  <>
                    <Image
                      fill
                      sizes="100%"
                      src={media.images}
                      alt={`Slider Image ${index + 1}`}
                      style={{ objectFit: "contain" }}
                      className="w-full transition-all duration-500 cursor-pointer"
                      priority
                    />
                    <div className="absolute top-4 left-4">
                      <LogoMobileIcon width={30} height={30} />
                    </div>
                  </>
                ) : (
                  <>{NoMediaContent({ text: "Image" })}</>
                )
              ) : null}
            </div>
          );
        })}
      </div>

      <Button
        variant="ghost"
        className="absolute left-1/2 transform -translate-x-1/2 top-0 rounded-xl bg-white hover:bg-[#1a222f] text-white p-2"
        onClick={prevSlide}
      >
        <ChevronLeft className="rotate-90 text-gray-400 hover:text-white" />
      </Button>
      <Button
        variant="ghost"
        className="absolute left-1/2 transform -translate-x-1/2 bottom-3 rounded-xl bg-white hover:bg-[#1a222f] text-white p-2"
        onClick={nextSlide}
      >
        <ChevronRight className="rotate-90 text-gray-400 hover:text-white" />
      </Button>
      <div className="absolute bottom-0 flex w-full justify-center">
        {sortedMedias.map((_, index) => (
          <div
            key={index}
            className={`h-1 w-10 mx-1 ${
              index === currentIndex
                ? "bg-black rounded-xl"
                : "bg-gray-300 rounded-xl"
            }`}
          ></div>
        ))}
      </div>

      {/* extras */}

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
    </div>
  );
}
