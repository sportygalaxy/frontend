import SVGIcon, { SVGIconProps } from "@/common/Icons/SVGIcon";
import { FC } from "react";

type RightArrowIconType = Partial<SVGIconProps>;

const RightArrowIcon: FC<RightArrowIconType> = ({ ...props }) => (
  <SVGIcon width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M8.91016 19.9201L15.4302 13.4001C16.2002 12.6301 16.2002 11.3701 15.4302 10.6001L8.91016 4.08008"
      stroke="#292D32"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SVGIcon>
);

export default RightArrowIcon;
