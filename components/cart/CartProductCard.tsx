"use client";
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

function CartProductCard({
  item,
  drawer,
}: {
  item: TCart[];
  drawer?: boolean;
}) {
  const { removeFromCart, incrementQty, decrementQty } = useCartStore();

  const isProductInCart = (cartQty: number) => {
    return cartQty > 1;
  };

  const handleIncrement = (event: React.MouseEvent, id: number) => {
    event.stopPropagation();
    incrementQty(id);
  };

  const handleDecrement = (event: React.MouseEvent, id: number) => {
    event.stopPropagation();
    decrementQty(id);
  };

  const handleRemove = (event: React.MouseEvent, id: number) => {
    event.stopPropagation();
    removeFromCart(id);
  };

  const handleSaveForLater = (event: React.MouseEvent) => {
    event.stopPropagation();
    // Implement save for later logic here
  };

  return (
    <div
      className={cn(
        "col-span-2 w-full flow-root h-fit p-6 divide-[#e6e7eb] overflow-auto",
        drawer
          ? "bg-transparent"
          : "bg-white shadow-[0_-4px_20px_0_rgba(0,0,0,.06)] divide-y"
      )}
    >
      {item?.map((cart: TCart) => (
        <div
          key={cart.id}
          className="flex flex-col gap-4 max-w-2xl mt-8 border-none"
        >
          <div className="flex gap-10 md:gap-16 h-[154px]">
            <div className="relative w-[40%] h-[100%] bg-[#E8EAEC] px-6 py-2">
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
                  {formatCurrency(cart?.price || 0)}
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
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="lg"
              className="border-light py-4"
              onClick={handleSaveForLater}
            >
              Save for later
            </Button>
            <span
              className="cursor-pointer hover:text-destructive"
              onClick={(event) => handleRemove(event, cart?.id)}
            >
              <DeleteIcon />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CartProductCard;
