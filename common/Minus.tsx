"use client";
import MinusIcon from "@/assets/icons/pack/Minus";

const Minus = () => {
  return (
    <>
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
    </>
  );
};

export default Minus;
