"use client";
import { RoutesEnum } from "@/constants/routeEnums";
import { NotifySuccess } from "@/helpers/toasts";
import useCartStore from "@/store/cartStore";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
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

  useEffect(() => {
    const mobileNav = document.querySelector("[data-mobile-navbar]");
    if (mobileNav) {
      mobileNav.classList.add("cart-drawer-nav-open");
    }

    return () => {
      if (mobileNav) {
        mobileNav.classList.remove("cart-drawer-nav-open");
      }
    };
  }, []);

  const handleCheckout = async () => {
    NotifySuccess("Proceeding to checkout");
    window.location.href = RoutesEnum.CHECKOUT;
  };

  return (
    <div
      className="flex h-full max-h-[calc(100vh-64px)] sm:max-h-[calc(100vh-80px)] flex-col overflow-hidden rounded-t-2xl bg-background pt-[env(safe-area-inset-top,0px)]"
      // style={{ zIndex: 1000 }}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 flex flex-col items-center justify-between rounded-t-2xl border-b border-black/5 bg-background/95 px-4 pb-3 pt-4 backdrop-blur">
        <Separator
          className="mb-3 h-1 w-16 rounded-full bg-black/40"
          orientation="horizontal"
        />

        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-foreground">Cart</p>

          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="h-10 w-10"
          >
            <XIcon />
          </Button>
        </div>
      </div>

      {/* Details */}
      {cart.length >= 1 ? (
        <div className="flex h-full flex-col">
          <div className="flex-1 overflow-y-auto px-4 pb-20 pt-3 sm:pb-24">
            <CartProductCard item={cart} drawer />
          </div>

          <div className="sticky bottom-0 left-0 right-0 space-y-3 bg-background/95 px-6 pb-[calc(env(safe-area-inset-bottom,0px)+16px)] pt-4 text-[#222] shadow-[0_-10px_18px_-10px_rgba(0,0,0,0.25)] backdrop-blur">
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
