import SVGIcon, { SVGIconProps } from "@/common/Icons/SVGIcon";
import { FC } from "react";

type DownArrowIconType = Partial<SVGIconProps>;

const DownArrowIcon: FC<DownArrowIconType> = ({ ...props }) => (
  <SVGIcon width="25" height="24" viewBox="0 0 25 24" fill="none" {...props}>
    <path
      d="M20.4201 8.94995L13.9001 15.47C13.1301 16.24 11.8701 16.24 11.1001 15.47L4.58008 8.94995"
      stroke="black"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SVGIcon>
);

export default DownArrowIcon;
