import { flattenMediaStructure } from "@/helpers/product";
import { cn } from "@/lib/utils";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import Image from "next/image";
import { useMemo } from "react";
import VideoPlayer from "../../../../common/VidepPlayer";
import { videoPath, youTubeLink } from "@/constants/appConstants";
import LogoMobileIcon from "@/assets/icons/pack/LogoMobile";

interface ImageSliderProps {
  medias: any[];
  onMediaClick: (index: number) => void; // Function to trigger the horizontal slider movement
}

const VerticalProductMediaSlider = ({
  medias,
  onMediaClick,
}: ImageSliderProps) => {
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
    <div className="w-full h-[500px] overflow-hidden">
      <Splide
        options={{
          direction: "ttb",
          height: "400px",
          wheel: true,
          arrows: true,
          perPage: 2,
          perMove: 1,
          gap: "1rem",
          drag: true,
          rewind: true,
          autoplay: true,
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
              className={cn(
                "bg-[#E8EAEC] relative w-[200px] group transition-transform duration-500 ease-in-out flex-shrink-0",
                isVideo ? "min-h-[200px]" : "h-[150px]"
              )}
              key={index}
              onClick={() => onMediaClick(index)} // Call the onMediaClick function with the index
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
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
};

export default VerticalProductMediaSlider;
