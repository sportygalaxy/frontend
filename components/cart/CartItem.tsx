import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import MinusLineIcon from "@/assets/icons/pack/MinusLine";
import { Separator } from "../ui/separator";
import PlusIcon from "@/assets/icons/pack/Plus";
import DeleteIcon from "@/assets/icons/pack/Delete";
import { TCart } from "@/types/cart";
import useCartStore from "@/store/cartStore";
import { DEFAULT_PRODUCT_IMAGE } from "@/constants/appConstants";
import { formatCurrency } from "@/utils/currencyUtils";
import { useRouter } from "next/navigation";
import { transformCartArray } from "@/utils/productUtils";
import useUserStore from "@/store/userStore";
import {
  showShippingFeePrice,
  showSinglePriceInCart,
  showTotalPrice,
  showTotalPriceInCart,
} from "@/helpers/cart";
import { SHIPPING_FEE } from "@/app/(main)/products/ProductConstant";

interface CartItemProps {
  cart:
    | {
        id: string;
        displayImage?: string;
        name: string;
        description: string;
        price: number;
        qty: number;
      }
    | any;
  isProductInCart: (qty: number) => boolean;
  handleDecrement: (event: React.MouseEvent, id: string) => void;
  handleIncrement: (event: React.MouseEvent, id: string) => void;
  className?: string;
}

const CartItem: React.FC<CartItemProps> = ({
  cart,
  isProductInCart,
  handleDecrement,
  handleIncrement,
  className,
}) => {
  const { user } = useUserStore();
  const shippingFee = showShippingFeePrice(
    showSinglePriceInCart(cart),
    SHIPPING_FEE
  );
  const amount =
    formatCurrency(showTotalPrice(showSinglePriceInCart(cart), 0)) ||
    0;
  return (
    <div className={cn("flex gap-10 md:gap-16 h-[154px]", className)}>
      <div className="relative w-[40%] h-[100%] px-6 py-2">
        <Image
          fill
          sizes="100%"
          style={{
            objectFit: "contain",
            display: "block",
            margin: "0 auto",
          }}
          src={cart?.displayImage || DEFAULT_PRODUCT_IMAGE}
          alt={cart?.name}
          className="w-full transition-transform duration-700 group-hover:scale-110"
          priority
        />
      </div>

      <div className="w-[60%] h-full flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          <p className="font-medium text-mobile-2xl md:text-2xl text-primary line-clamp-1">
            {cart?.name}
          </p>
          <p className="font-light text-mobile-2xl sm:text-xl text-primary opacity-50 line-clamp-2">
            {cart?.description}
          </p>
          <p className="mt-1 font-medium text-mobile-3xl sm:text-3xl">
            {/* {formatCurrency(cart?.price || 0)} */}
            {/* {formatCurrency(cart?.variant?.prices)} */}
            {amount}
          </p>
        </div>
        <div className="flex mt-2 h-10 items-center justify-center space-x-4 text-sm border w-fit rounded-lg border-[#DEE2E6] px-2">
          <span
            className={cn(
              isProductInCart(cart?.qty)
                ? "cursor-pointer"
                : "cursor-not-allowed"
            )}
            onClick={(event) => handleDecrement(event, cart?.id)}
          >
            <MinusLineIcon
              color={cn(isProductInCart(cart?.qty) ? "#000" : "#828282")}
            />
          </span>
          <Separator className="text-[#DEE2E6]" orientation="vertical" />
          <p className="font-semibold text-mobile-2xl md:text-2xl text-primary">
            {cart?.qty}
          </p>
          <Separator className="text-[#DEE2E6]" orientation="vertical" />
          <span
            className="cursor-pointer"
            onClick={(event) => handleIncrement(event, cart?.id)}
          >
            <PlusIcon color="#000" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
