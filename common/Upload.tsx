import GalleryIcon from "@/assets/icons/pack/Gallery";
import { Button } from "@/components/ui/button";
import { FC } from "react";

interface props {
  open: boolean;
  onClose: () => void;
  onChange?: (e: string) => void;
}
const Upload: FC<props> = (props) => {
  const { open, onClose, ...rest } = props;
  return (
    <div>
      {open ? (
        <section className="absolute flex flex-col items-center justify-center top-[124px] sm:top-[104px] md:top-[143px] w-full bg-secondary-foreground rounded-2xl px-3 md:px-24 max-w-[800px] h-[234px] sm:h-[352px] md:h-[452px] inset-0 mx-auto z-10">
          <p className="font-bold text-primary text-mobile-xl md:text-xl opacity-50">
            Find product inspiration with image search
          </p>

          <div className="w-full">
            <div className="mt-4 sm:mt-6 md:mt-12 flex gap-3 bg-white rounded-2xl items-center justify-center border-1 border-grey">
              <GalleryIcon width={24} height={24} />
              <p className="flex items-center justify-center gap-1 py-20 sm:py-32 md:py-40 font-bold text-primary text-mobile-xl md:text-xl">
                <span className="opacity-50">Drag and drop image here or</span>
                <span className="underline underline-offset-2">
                  upload a file
                </span>
              </p>
            </div>

            <div className="flex w-full items-center justify-between border-1 border-grey mt-4 md:mt-6 rounded-xl">
              <input
                type="text"
                className="w-full border-none bg-transparent focus:outline-none focus:ring-0 focus:border-none ml-8 placeholder:text-mobile-xl md:placeholder:text-xl placeholder:text-secondary text-mobile-xl md:text-xl"
                placeholder="Paste a link to an image"
              />
              <Button
                size="lg"
                variant="tertiary"
                className="font-normal border border-y-0 border-r-0 rounded-lg text-secondary text-mobile-xl md:text-xl border-grey px-4 sm:px-14"
                onClick={() => onClose()}
              >
                Search
              </Button>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default Upload;
