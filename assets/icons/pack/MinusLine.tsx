import SVGIcon, { SVGIconProps } from "@/common/Icons/SVGIcon";
import { FC } from "react";

type MinusLineIconType = Partial<SVGIconProps>;

const MinusLineIcon: FC<MinusLineIconType> = ({ ...props }) => (
  <SVGIcon
    width={props?.size}
    height={props?.size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={props?.color}
    strokeWidth="2"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M5 12h14" />
  </SVGIcon>
);

export default MinusLineIcon;
