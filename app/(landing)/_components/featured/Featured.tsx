import { FC } from "react";
import FeaturedCard from "./FeaturedCard";
import { FEATURES } from "@/data";

interface Props {}

const Featured: FC<Props> = () => {
  const features = FEATURES || [];
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-8">
        {features?.map((feat) => (
          <FeaturedCard key={feat.id} feat={feat} />
        ))}
      </div>
    </div>
  );
};

export default Featured;
