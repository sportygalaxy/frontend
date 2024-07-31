import { CircleCheckBigIcon } from "lucide-react";
import { FC } from "react";

type Props = {};
const ProductAddedToCart: FC<Props> = () => {
  return (
    <div className="bg-[#ebf9eb] text-[#22891f] rounded-[8px] min-w-[100px] py-2 px-4 text-center mx-auto w-fit flex items-center gap-x-2">
      <CircleCheckBigIcon size={18} /> Added to cart!
    </div>
  );
};

export default ProductAddedToCart;
