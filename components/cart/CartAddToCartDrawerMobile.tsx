"use client";
import { XIcon } from "lucide-react";
import { Button } from "../ui/button";
import useCartStore from "@/store/cartStore";
import CartProductCard from "./CartProductCard";
import CartEmpty from "./CartEmpty";
import CartClearAll from "./CartClearAll";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import { NotifySuccess } from "@/helpers/toasts";
import { RoutesEnum } from "@/constants/routeEnums";
import Link from "next/link";
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
    NotifySuccess("Proceed to checkout");
    window.location.href = RoutesEnum.CHECKOUT;
  };

  return (
    <div className="flex flex-col justify-end h-full bg-background overflow-scroll">
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
        <div className="flex flex-col">
          <div className="max-h-[300px] h-fit overflow-auto">
            <CartProductCard item={cart} />
          </div>

          <div className="overflow-auto text-[#222] shadow-[0_-10px_10px_-10px_hsla(0,0%,69%,.5)] pb-6 px-6">
            <CartClearAll />
            <CartSummaryPrice />

            <Link
              className="flex flex-col items-center justify-between h-12"
              href={RoutesEnum.CHECKOUT}
            >
              Checkout
            </Link>

            <Button
              onClick={handleCheckout}
              size={"lg"}
              className="rounded-full font-bold min-h-[48px] flex-1 w-full mt-4"
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
