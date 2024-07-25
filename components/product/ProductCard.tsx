"use client";
import MinusIcon from "@/assets/icons/pack/Minus";
import Add from "@/common/Add";
import LucideIcon from "@/common/Icons/LucideIcon";
import LinkComponent from "@/common/Link";
import SportygalaxyLoadingIndicator from "@/common/Loaders/SportygalaxyLoadingIndicator";
import TooltipWrapper from "@/components/tooltip";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useHydration } from "@/hooks/useHydration";
import useToggle from "@/hooks/useToggle";
import { cn } from "@/lib/utils";
import useCartStore from "@/store/cartStore";
import { TProduct } from "@/types/product";
import Image from "next/image";
import React, { FC } from "react";

interface Props {
  product?: TProduct;
}

const ProductCard: FC<{ item: TProduct }> = (props) => {
  const hydrated = useHydration();

  const { addToCart, removeFromCart, cart } = useCartStore();
  const { item } = props;
  const [indicateAddToCart, toggleIndicateAddToCart] = useToggle();
  const cardTextTruncate =
    "overflow-hidden text-ellipsis whitespace-nowrap truncate max-w-44 sm:max-w-72";

  const contentProps = {
    href: `/product/${item.id}`,
    className: "w-full cursor-pointer",
  };

  if (!hydrated) {
    return <SportygalaxyLoadingIndicator />;
  }

  function isItemInCart(itemId: number): any {
    return cart.some((item) => item.id === itemId);
  }
  return (
    <Card
      key={item.id}
      className={`h-[360px] sm:h-[510px] w-full max-w-[244px] sm:max-w-[344px] bg-white px-2 sm:px-6 py-2 sm:py-12 border-none rounded-none shadow-none group`}
    >
      <LinkComponent {...contentProps}>
        <CardHeader className="relative w-full h-[65%] bg-[#f5f5f7] overflow-hidden">
          <Image
            fill
            sizes="100%"
            style={{
              objectFit: "cover",
              objectPosition: "50% 50%",
              display: "block",
              margin: "0 auto",
            }}
            src={item?.image || ""}
            alt={item?.title || ""}
            className="w-full transition-[transform] duration-1000 hover:scale-110"
            priority
            // blurDataURL="data:..."
            // placeholder="blur"
          />
        </CardHeader>
      </LinkComponent>

      <CardContent className="text-left mt-8 p-0">
        <LinkComponent {...contentProps}>
          <TooltipWrapper
            component={
              <p
                className={cn(
                  "font-medium group-hover:font-bold text-mobile-3xl sm:text-3xl duration-1000 hover:font-semibold",
                  cardTextTruncate
                )}
              >
                {item?.title || ""}
              </p>
            }
            title={item?.title || ""}
          />
        </LinkComponent>

        <div className="flex items-end justify-between mt-3">
          <LinkComponent {...contentProps}>
            <>
              <p
                className={cn(
                  "font-light text-mobile-2xl sm:text-2xl text-primary opacity-50",
                  cardTextTruncate
                )}
              >
                {item?.description || ""}
              </p>
              <p
                className={cn(
                  "mt-2 font-medium text-mobile-3xl sm:text-3xl",
                  cardTextTruncate
                )}
              >
                ${item?.price || ""}
              </p>
            </>
          </LinkComponent>

          <div
            className="mb-1 cursor-pointer"
            onClick={() => toggleIndicateAddToCart()}
          >
            {isItemInCart(item.id) ? (
              <div className="" onClick={() => removeFromCart(item.id)}>
                <MinusIcon
                  className="mobile-desktop-tablet-view"
                  size={25}
                  color="var(--success)"
                />
                <MinusIcon
                  className="desktop-tablet-view"
                  size={44}
                  color="var(--success)"
                />
              </div>
            ) : (
              <div onClick={() => addToCart(item)}>
                <Add />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
