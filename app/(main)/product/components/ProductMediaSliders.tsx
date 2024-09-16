import { useRef } from "react";
import ProductVerticalMediaSlider from "./ProductVerticalMediaSlider";
import ProductHorizontalMediaSlider from "./ProductHorizontalMediaSlider";

const ProductMediaSliders = ({ medias }: { medias: any[] }) => {
  const horizontalSliderRef = useRef<any>(null);

  const handleMediaClick = (index: number) => {
    if (horizontalSliderRef.current) {
      horizontalSliderRef.current.goTo(index);
    }
  };

  return (
    <div className="flex flex-1 gap-8">
      <ProductVerticalMediaSlider
        medias={medias}
        onMediaClick={handleMediaClick}
      />
      <ProductHorizontalMediaSlider ref={horizontalSliderRef} medias={medias} />
    </div>
  );
};

export default ProductMediaSliders;
