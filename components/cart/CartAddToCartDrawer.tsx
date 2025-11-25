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
import { RoutesEnum } from "@/constants/routeEnums";
import { NotifySuccess } from "@/helpers/toasts";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import useCartStore from "@/store/cartStore";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Button } from "../ui/button";
import CartClearAll from "./CartClearAll";
import CartEmpty from "./CartEmpty";
import CartProductCard from "./CartProductCard";
import CartSummaryPrice from "./CartSummaryPrice";

import CartIcon from "@/assets/icons/pack/Cart";

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
    NotifySuccess("Proceeding to checkout");
    window.location.href = RoutesEnum.CHECKOUT;
  };

  return (
    <Drawer direction={isDesktop ? "right" : "bottom"}>
      <DrawerTrigger asChild>
        <button
          className={cn(
            // "relative flex items-center justify-center rounded-full border border-secondary p-2 transition-colors duration-200 hover:bg-background hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
            isDesktop && "md:p-4",
            className
          )}
        >
          <CartIcon color="#828282" />
          {/* {Component ? <Component {...data} className={cn(className)} /> : null} */}
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
              <CartSummaryPrice />

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
