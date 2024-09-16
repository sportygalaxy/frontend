import React, { useMemo } from "react";
import WatermarkedImage from "../WatermarkedImage";
import VideoPlayer from "../VidepPlayer";
import LogoMobileIcon from "@/assets/icons/pack/LogoMobile";
import { videoPath, WATERMARK, youTubeLink } from "@/constants/appConstants";
import { flattenMediaStructure } from "@/helpers/product";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

interface ImageSliderProps {
  medias: any[];
}
const HorizontalProductMediaSlider = ({ medias }: ImageSliderProps) => {
  const sortedMedias = useMemo(
    () =>
      flattenMediaStructure(
        medias.sort((a, b) => (a.type === "video" ? 1 : -1))
      ),
    [medias]
  );

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
    <div className="max-w-[500px]">
      <Splide
        options={{
          width: "100%",
          direction: "ltr", // 'ttb' for top-to-bottom scrolling
          // height: "400px", // Set height for the visible area of the carousel
          wheel: true, // Enable mouse scroll
          //  pagination: false, // Disable pagination
          arrows: true, // Show arrows for navigation
          perPage: 1,
          perMove: 1, // Move one slide at a time
          gap: "1rem", // Add some gap between slides
          drag: true, // Enable dragging slides
          rewind: true, // Rewind to the first slide after the last
          autoplay: false, // Disable autoplay to avoid re-adding slides
        }}
        className="w-full"
      >
        {sortedMedias.map((media, index) => {
          const isVideo = media.type === "video";
          const isImage = media.type !== "video";
          const imageCount = (media?.images?.length || 0) >= 1;
          const videoCount = !!media?.links?.introVideo;

          return (
            <SplideSlide
              className="max-h-[500px] max-w-[500px] min-w-[400px] min-h-[450px]"
              key={index}
            >
              {isVideo ? (
                videoCount ? (
                  <div className="relative bg-[#E8EAEC]">
                    <VideoPlayer
                      pauseTime={10} // Pause after 10 seconds
                      src={media?.links?.introVideo || videoPath}
                      poster={media?.displayImage}
                      watermark={<LogoMobileIcon />}
                      link={media?.links?.completeVideo || youTubeLink}
                      className=""
                    />
                  </div>
                ) : (
                  <>{NoMediaContent({ text: "Video" })}</>
                )
              ) : isImage ? (
                imageCount ? (
                  <>
                    <WatermarkedImage
                      src={media.images}
                      watermark={<LogoMobileIcon />}
                      watermarkImageSrc={WATERMARK}
                    />
                  </>
                ) : (
                  <>{NoMediaContent({ text: "Image" })}</>
                )
              ) : null}
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
};

export default HorizontalProductMediaSlider;
