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
import { useRouter } from "next/navigation";
import CartItem from "./CartItem";

function CartProductCard({
  item,
  drawer,
}: {
  item: TCart[];
  drawer?: boolean;
}) {
  const router = useRouter();
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

  const handleGotoProductDetailPage = (product: any) => {
    router.push(`/product/${product?.name}/${product?.id}`);
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
          onClick={() => handleGotoProductDetailPage(cart)}
          key={cart.id}
          className="flex flex-col gap-4 max-w-2xl mt-8 border-none"
        >
          <CartItem
            cart={{
              ...cart,
            }}
            isProductInCart={isProductInCart}
            handleDecrement={(event, id) => handleDecrement(event, cart?.id)}
            handleIncrement={(event, id) => handleIncrement(event, cart?.id)}
            className=""
          />

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
