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
import { CircleCheckBigIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
// import { CartItem, useCartStore } from "@/store/cartStore";
import ProductSummaryCard from "./CartProductSummaryCard";

// Get data from cart in global state
function CartAddToCartDrawer({ item }: { item: any }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <Drawer direction={isDesktop ? "right" : "bottom"}>
      <DrawerTrigger asChild>
        <Button
          variant={"outline"}
          size={"lg"}
          className="rounded-full max-w-20 font-bold h-[48px] flex-1 w-full text-[#333] border-[#222]"
        >
          Add to cart
        </Button>
      </DrawerTrigger>
      <DrawerContent
        className={cn(
          "",
          isDesktop
            ? "top-0 right-0 left-auto w-[600px] h-full mt-0 rounded-none"
            : ""
        )}
      >
        <DrawerHeader className="flex items-center justify-between">
          <DrawerTitle>Select variations and quantity</DrawerTitle>
          <DrawerClose asChild>
            <Button variant={"ghost"} size={"icon"}>
              <XIcon />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        {/* <CartProductSummaryCard item={[]} drawer /> */}
        <DrawerFooter className="text-[#222] bg-white shadow-[0_-10px_10px_-10px_hsla(0,0%,69%,.5)] pb-6">
          <div className="flex items-center justify-between">
            <p className="underline cursor-pointer">Item subtotal</p>
            <p>$300</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Shipping total</p>
            <p>$10.24</p>
          </div>
          <div className="font-bold flex items-center justify-between">
            <p>Subtotal</p>
            <p>$500</p>
          </div>
          <Button
            // onClick={handleAddToCart}
            size={"lg"}
            className="rounded-full font-bold min-h-[48px] flex-1 w-full mt-4"
          >
            Add to cart
          </Button>
        </DrawerFooter>
        {isSuccess && <AddToCartSuccess />}
      </DrawerContent>
    </Drawer>
  );
}

export default CartAddToCartDrawer;

function AddToCartSuccess() {
  return (
    <div className="w-full absolute top-1/2">
      <div className="bg-[#ebf9eb] text-[#22891f] rounded-[8px] min-w-[100px] p-4 mx-auto w-fit flex items-center gap-x-2">
        <CircleCheckBigIcon size={18} /> Added to cart!
      </div>
    </div>
  );
}
