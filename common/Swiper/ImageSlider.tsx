"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import image1 from "@/public/images/product/prod-1.png";
import image2 from "@/public/images/product/prod-2.png";
import image3 from "@/public/images/product/prod-3.png";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LogoMobileIcon from "@/assets/icons/pack/LogoMobile";
import { Button } from "@/components/ui/button";
import VideoPlayer from "../VidepPlayer";
import { videoPath, youTubeLink } from "@/constants/appConstants";

// Interface for image data
interface ImageData {
  src: StaticImageData;
}

// Image data array
const images: ImageData[] = [
  {
    src: image1,
  },
  {
    src: image2,
  },
  {
    src: image3,
  },
];



export default function ImageSlider(): any {
  // State to keep track of the current image index
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // State to determine if the image is being hovered over
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Function to show the previous slide
  const prevSlide = (): void => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Function to show the next slide
  const nextSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // useEffect hook to handle automatic slide transition
  useEffect(() => {
    // Start interval for automatic slide change if not hovered
    if (!isHovered) {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000);

      // Cleanup the interval on component unmount
      return () => {
        clearInterval(interval);
      };
    }
  }, [isHovered]);

  // Handle mouse over event
  const handleMouseOver = (): void => {
    setIsHovered(true);
  };

  // Handle mouse leave event
  const handleMouseLeave = (): void => {
    setIsHovered(false);
  };

  return (
    <div className="relative w-full h-[450px] md:h-full mx-auto pb-1 space-y-3 overflow-hidden">
      {images.map((image, index) => (
        // <div
        //   key={index}
        //   className="bg-[#E8EAEC] relative h-[150px] w-[200px] md:w-full group transition-transform duration-500 ease-in-out flex-shrink-0"
        //   onMouseOver={handleMouseOver}
        //   onMouseLeave={handleMouseLeave}
        //   style={{
        //     transform: `translateY(-${currentIndex * 100}%)`,
        //   }}
        // >
        //   <Image
        //     fill
        //     sizes="100%"
        //     style={{
        //       objectFit: "contain",
        //       display: "block",
        //       margin: "0 auto",
        //     }}
        //     src={image.src}
        //     alt={`Slider Image ${index + 1}`}
        //     className="w-full transition-all duration-500 ease-in-out cursor-pointer"
        //     priority
        //   />
        //   <div className="absolute top-4 left-4 watermark">
        //     <LogoMobileIcon width={30} height={30} />
        //   </div>
        // </div>
        <div key={index} className="relative min-h-[150px] w-[200px]">
          <VideoPlayer
            pauseTime={10} // Pause after 10 seconds
            src={videoPath}
            poster="/images/product/prod-1.png"
            watermark={<LogoMobileIcon width={30} height={30} />}
            link={youTubeLink}
            className=""
          />
        </div>
      ))}

      <Button
        variant="ghost"
        className="absolute left-1/2 transform -translate-x-1/2 top-0 rounded-xl bg-white hover:bg-[#1a222f] text-white p-2 group"
        onClick={prevSlide}
      >
        <ChevronLeft className="rotate-90 text-gray-400 group-hover:text-white" />
      </Button>

      <Button
        className="absolute left-1/2 transform -translate-x-1/2 bottom-3 rounded-xl bg-white hover:bg-[#1a222f] text-white p-2 group"
        onClick={nextSlide}
      >
        <ChevronRight className="rotate-90 text-gray-400 group-hover:text-white" />
      </Button>

      <div className="absolute bottom-0 flex w-full justify-center">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-1 w-10 mx-1 ${
              index === currentIndex
                ? "bg-[#000] rounded-xl"
                : "bg-gray-300 rounded-xl"
            } transition-all duration-500 ease-in-out`}
          ></div>
        ))}
      </div>
    </div>
  );
}
