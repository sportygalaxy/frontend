"use client";
import { RoutesEnum } from "@/constants/routeEnums";
import { NotifySuccess } from "@/helpers/toasts";
import useCartStore from "@/store/cartStore";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import CartClearAll from "./CartClearAll";
import CartEmpty from "./CartEmpty";
import CartProductCard from "./CartProductCard";
import CartSummaryPrice from "./CartSummaryPrice";

type CartAddToCartDrawerMobileProps<T> = {
  onClose: () => void;
};

// Get data from cart in global state
function CartAddToCartDrawerMobile<T>({
  onClose,
}: CartAddToCartDrawerMobileProps<T>) {
  const router = useRouter();
  const { cart } = useCartStore();

  const handleCheckout = async () => {
    NotifySuccess("Proceeding to checkout");
    window.location.href = RoutesEnum.CHECKOUT;
  };

  return (
    <div className="flex h-full flex-col bg-background overflow-hidden">
      {/* Header */}
      <div className="flex flex-col items-center justify-between p-4 bg-background rounded-tl-[12px] rounded-tr-[12px]">
        <div className="py-1">
          <Separator
            className="text-[#000] bg-black w-44 h-1 rounded-md"
            orientation="horizontal"
          />
        </div>

        <div className="flex items-center justify-between w-full">
          <p className="text-mobile-3xl md:text-3xl">Cart</p>

          <div>
            <Button onClick={onClose} variant={"ghost"} size={"icon"}>
              <XIcon />
            </Button>
          </div>
        </div>
      </div>

      {/* Details */}
      {cart.length >= 1 ? (
        <div className="flex h-full flex-col">
          <div className="flex-1 overflow-auto px-4 pb-4 pt-2">
            <CartProductCard item={cart} drawer />
          </div>

          <div className="sticky bottom-0 left-0 right-0 bg-background text-[#222] shadow-[0_-10px_10px_-10px_hsla(0,0%,69%,.5)] px-6 pb-[calc(env(safe-area-inset-bottom,0px)+16px)] pt-4 space-y-3">
            <CartClearAll />
            <CartSummaryPrice />

            {/* <Link
              className="flex flex-col items-center justify-between h-12"
              href={RoutesEnum.CHECKOUT}
            >
              Checkout
            </Link> */}

            <Button
              onClick={handleCheckout}
              size={"lg"}
              className="mt-1 w-full min-h-[48px] flex-1 rounded-full font-bold"
            >
              Checkout now
            </Button>
          </div>
        </div>
      ) : (
        <CartEmpty />
      )}
    </div>
  );
}

export default CartAddToCartDrawerMobile;
