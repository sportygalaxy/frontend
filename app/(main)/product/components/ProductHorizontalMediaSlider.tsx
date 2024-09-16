import React, { useMemo, useRef, forwardRef, useImperativeHandle } from "react";
import { Splide, SplideProps, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

import { flattenMediaStructure } from "@/helpers/product";
import { videoPath, WATERMARK, youTubeLink } from "@/constants/appConstants";
import LogoMobileIcon from "@/assets/icons/pack/LogoMobile";
import VideoPlayer from "../../../../common/VidepPlayer";
import WatermarkedImage from "../../../../common/WatermarkedImage";

interface ImageSliderProps {
  medias: any[];
}

const HorizontalProductMediaSlider = forwardRef(
  ({ medias }: ImageSliderProps, ref) => {
    const splideRef = useRef<SplideProps>(null); // Splide instance reference

    useImperativeHandle(ref, () => ({
      goTo(index: number) {
        if (splideRef.current) {
          splideRef.current.go(index); // Move to the selected slide
        }
      },
    }));

    const sortedMedias = useMemo(
      () =>
        flattenMediaStructure(
          medias?.sort((a, b) => (a.type === "video" ? 1 : -1))
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
      <div className="max-w-[400px] md:max-w-[500px]">
        <Splide
          ref={splideRef}
          options={{
            direction: "ltr",
            wheel: true,
            arrows: true,
            perPage: 1,
            perMove: 1,
            gap: "1rem",
            drag: true,
            rewind: true,
            autoplay: false,
            pagination: true,
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
                key={index}
                className="max-w-[400px] md:max-w-[500px] min-w-[400px] max-h-[500px] min-h-[450px]"
              >
                {isVideo ? (
                  videoCount ? (
                    <div className="relative bg-[#E8EAEC]">
                      <VideoPlayer
                        pauseTime={10}
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
                    <WatermarkedImage
                      src={media.images}
                      watermark={<LogoMobileIcon />}
                      watermarkImageSrc={WATERMARK}
                    />
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
  }
);

export default HorizontalProductMediaSlider;
