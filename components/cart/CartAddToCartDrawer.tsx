"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { FC } from "react";
import useCartStore from "@/store/cartStore";
import {
  SHIPPING_FEE,
  showTotalPrice,
  showTotalPriceInCart,
} from "@/helpers/cart";
import CartProductCard from "./CartProductCard";
import CartEmpty from "./CartEmpty";
import CartClearAll from "./CartClearAll";
import { useRouter } from "next/navigation";
import { NotifySuccess } from "@/helpers/toasts";
import { RoutesEnum } from "@/constants/routeEnums";

type CartAddToCartDrawerProps<T> = {
  data: { color?: string };
  component?: FC<{ item?: { color: string }; className?: string }>;
  className?: string;
};

// Get data from cart in global state
function CartAddToCartDrawer<T>({
  data,
  component: Component,
  className,
}: CartAddToCartDrawerProps<T>) {
  const router = useRouter();
  const { cart } = useCartStore();
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const handleCheckout = () => {
    NotifySuccess("Proceed to checkout");
    window.location.href = RoutesEnum.CHECKOUT;
  };

  return (
    <Drawer direction={isDesktop ? "right" : "bottom"}>
      <DrawerTrigger asChild>
        <button
          className={cn(
            isDesktop && "p-2 md:p-4 border border-secondary rounded-full"
          )}
        >
          {Component ? <Component {...data} className={cn(className)} /> : null}
        </button>
      </DrawerTrigger>

      <DrawerContent
        className={cn(
          "bg-background",
          isDesktop
            ? "top-0 right-0 left-auto w-[600px] h-full mt-0 rounded-none"
            : "max-h-[90%] mt-10 bg-background"
        )}
      >
        {/* Header */}
        <DrawerHeader className="flex items-center justify-between">
          <DrawerTitle className="text-mobile-3xl md:text-3xl">
            Cart
          </DrawerTitle>

          <DrawerClose asChild>
            <Button variant={"ghost"} size={"icon"}>
              <XIcon />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        {/* Details */}
        {cart.length >= 1 ? (
          <>
            <CartProductCard item={cart} drawer />
            <CartClearAll />

            <DrawerFooter className="text-[#222] bg-white shadow-[0_-10px_10px_-10px_hsla(0,0%,69%,.5)] pb-6">
              <div className="flex items-center justify-between">
                <p className="underline cursor-pointer">Item subtotal</p>
                <p>${showTotalPriceInCart(cart)}</p>
              </div>
              <div className="flex items-center justify-between">
                <p>Shipping total</p>
                <p>${SHIPPING_FEE}</p>
              </div>
              <div className="font-bold flex items-center justify-between">
                <p>Subtotal</p>
                <p>
                  ${showTotalPrice(showTotalPriceInCart(cart), SHIPPING_FEE)}
                </p>
              </div>

              <Button
                onClick={handleCheckout}
                size={"lg"}
                className="rounded-full font-bold min-h-[48px] flex-1 w-full mt-4"
              >
                Checkout now
              </Button>
            </DrawerFooter>
          </>
        ) : (
          <CartEmpty />
        )}
      </DrawerContent>
    </Drawer>
  );
}

export default CartAddToCartDrawer;
