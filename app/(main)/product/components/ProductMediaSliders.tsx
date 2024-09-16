import { useRef } from "react";
import ProductVerticalMediaSlider from "./ProductVerticalMediaSlider";
import ProductHorizontalMediaSlider from "./ProductHorizontalMediaSlider";
import useBreakpoint from "@/hooks/useBreakpoint";
import { cn } from "@/lib/utils";

const ProductMediaSliders = ({ medias }: { medias: any[] }) => {
  const { isXl } = useBreakpoint();
  const horizontalSliderRef = useRef<any>(null);

  const handleMediaClick = (index: number) => {
    if (horizontalSliderRef.current) {
      horizontalSliderRef.current.goTo(index);
    }
  };

  return (
    <div className={cn("flex gap-8 flex-col-reverse", isXl ? "flex-row" : "")}>
      <ProductVerticalMediaSlider
        medias={medias}
        onMediaClick={handleMediaClick}
      />
      <ProductHorizontalMediaSlider ref={horizontalSliderRef} medias={medias} />
    </div>
  );
};

export default ProductMediaSliders;
