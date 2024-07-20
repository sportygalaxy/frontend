import { TFeatured } from "@/types/featured";
import Image from "next/image";
import { FC } from "react";

interface Props {
  feat: TFeatured;
}
const FeaturedCard: FC<Props> = ({feat}) => {
  return (
    <div className="relative group h-[200px] md:h-[300px] lg:h-[450px] xl:h-[556px] max-h-[400px] flex items-center justify-center bg-grey-gradient border-light rounded-lg overflow-hidden cursor-pointer">
      <Image
        fill
        sizes="100%"
        style={{
          objectFit: "cover",
          display: "block",
          margin: "0 auto",
        }}
        src={feat.image}
        alt={feat.name}
        className="w-full transition-transform duration-700 group-hover:scale-110"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-70"></div>
      <span className="absolute bottom-8 left-8 text-primary-foreground transition-colors duration-300 group-hover:underline font-medium text-mobile-3xl md:text-3xl w-24">
        {feat.name}
      </span>
    </div>
  );
};

export default FeaturedCard;
