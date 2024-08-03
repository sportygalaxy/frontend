"use client";
import MinusIcon from "@/assets/icons/pack/Minus";
import ProductAddedToCart from "@/components/product/ProductAddedToCart";

const Minus = () => {
  return (
    <>
      <MinusIcon
        className="mobile-desktop-tablet-view"
        size={25}
        color="var(--success)"
      />
      <span className="desktop-tablet-view">
        <ProductAddedToCart />
      </span>

      {/* <MinusIcon
        className="desktop-tablet-view"
        size={44}
        color="var(--success)"
      /> */}
    </>
  );
};

export default Minus;
