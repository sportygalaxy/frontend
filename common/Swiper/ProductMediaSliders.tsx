import { useRef } from "react";
import VerticalProductMediaSlider from "./VerticalProductMediaSlider";
import HorizontalProductMediaSlider from "./HorizontalProductMediaSlider";

const ProductMediaSliders = ({ medias }: { medias: any[] }) => {
  const horizontalSliderRef = useRef<any>(null);

  const handleMediaClick = (index: number) => {
    if (horizontalSliderRef.current) {
      horizontalSliderRef.current.goTo(index);
    }
  };

  return (
    <div className="flex flex-1 gap-8">
      <VerticalProductMediaSlider
        medias={medias}
        onMediaClick={handleMediaClick}
      />
      <HorizontalProductMediaSlider ref={horizontalSliderRef} medias={medias} />
    </div>
  );
};

export default ProductMediaSliders;
