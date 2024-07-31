import React, { FC } from "react";
import { Button } from "../ui/button";
import useCartStore from "@/store/cartStore";

type Props = {};
const CartClearAll: FC<Props> = () => {
  const { cart, clearCart } = useCartStore();
  return (
    <>
      {cart.length >= 1 && (
        <div className="inset-1 bg-gradient-to-b from-background to-transparent flex items-center justify-center my-4 px-11 bg-red-50">
          <Button
            onClick={() => clearCart()}
            variant="link"
            size="sm"
            className="font-semibold md:text-lg hover:underline cursor-pointer mt-auto"
          >
            Clear all
          </Button>
        </div>
      )}
    </>
  );
};

export default CartClearAll;
