import RightArrowIcon from "@/assets/icons/pack/RightArrow";
import UserIcon from "@/assets/icons/pack/User";
import StarRating from "@/common/StarRating";
import { DesktopTitle } from "@/common/Title";
import { FC } from "react";

interface ProductRatingsProps {}
const ProductRatings: FC<ProductRatingsProps> = () => {
  const iconSize = {
    color: "grey",
  };

  const handleRatingChange = (value: number) => {
    console.log("Rated:", value);
  };
  return (
    <section>
      <DesktopTitle general noLine title="Ratings & Reviews" />

      <div className="flex items-center space-x-2">
        <div className="flex items-baseline mt-3">
          <p className="font-jost text-mobile-3xl md:text-3xl font-bold text-primary">
            5.0
          </p>
          <p className="font-jost text-mobile-xl md:text-xl font-normal text-primary">
            /5
          </p>
        </div>
        <p className="font-jost text-mobile-xl md:text-xl font-normal text-primary">
          Very satisfied
        </p>
      </div>

      <div className="flex items-center gap-4 mt-8">
        <span className="flex w-fit p-2 md:p-4 border border-secondary rounded-full">
          <UserIcon {...iconSize} />
        </span>

        <div>
          <p className="font-jost text-mobile-xl md:text-xl font-semibold text-primary">
            C***
          </p>
          <p className="font-jost text-base font-normal text-primary">
            Oct 8, 2024
          </p>
        </div>
      </div>

      <div className="mt-7 space-y-4">
        <div>
          <StarRating
            totalStars={5}
            defaultValue={4}
            onChange={handleRatingChange}
            readonly={true}
          />
        </div>
        <p className="font-jost text-base font-normal text-primary">
          &quot; Excellent quality! This dumbbell is exactly what I needed for
          my home workouts. The grip is comfortable and secure.&quot;
        </p>
      </div>

      {/* PAGINATION */}
      <div className="mt-16 flex items-center space-x-4">
        <span className="flex items-center w-fit p-2 md:p-4 border border-secondary rounded-full">
          <p className="flex items-center justify-center font-jost text-base font-normal text-primary w-8 h-8">
            1
          </p>
        </span>
        <span className="flex items-center w-fit p-2 md:p-4 border-none border-secondary rounded-full">
          <p className="flex items-center justify-center font-jost text-base font-normal text-primary w-8 h-8">
            2
          </p>
        </span>
        <span className="flex items-center w-fit p-2 md:p-4 border-none border-secondary rounded-full">
          <RightArrowIcon />
        </span>
      </div>
    </section>
  );
};

export default ProductRatings;
