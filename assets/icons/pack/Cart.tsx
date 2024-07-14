import SVGIcon, { SVGIconProps } from "@/common/Icons/SVGIcon";
import { FC } from "react";

type CartIconType = Partial<SVGIconProps>;

const CartIcon: FC<CartIconType> = ({ ...props }) => (
  <SVGIcon width="26" height="27" viewBox="0 0 26 27" fill="none" {...props}>
    <path
      d="M2.58301 2.97168H4.39551C5.52051 2.97168 6.40593 3.94598 6.31218 5.06695L5.44759 15.5014C5.30176 17.209 6.6455 18.6757 8.35383 18.6757H19.4476C20.9476 18.6757 22.2601 17.4395 22.3747 15.9414L22.9372 8.08414C23.0622 6.34507 21.7497 4.93075 20.0101 4.93075H6.56218"
      stroke="#828282"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.4271 23.9243C18.1462 23.9243 18.7292 23.338 18.7292 22.6147C18.7292 21.8915 18.1462 21.3052 17.4271 21.3052C16.708 21.3052 16.125 21.8915 16.125 22.6147C16.125 23.338 16.708 23.9243 17.4271 23.9243Z"
      stroke="#828282"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.09408 23.9243C9.8132 23.9243 10.3962 23.338 10.3962 22.6147C10.3962 21.8915 9.8132 21.3052 9.09408 21.3052C8.37495 21.3052 7.79199 21.8915 7.79199 22.6147C7.79199 23.338 8.37495 23.9243 9.09408 23.9243Z"
      stroke="#828282"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.875 9.25745H22.375"
      stroke="#828282"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SVGIcon>
);

export default CartIcon;
