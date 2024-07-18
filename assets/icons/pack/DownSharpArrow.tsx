import SVGIcon, { SVGIconProps } from "@/common/Icons/SVGIcon";
import { FC } from "react";

type DownSharpArrowIconType = Partial<SVGIconProps>;

const DownSharpArrowIcon: FC<DownSharpArrowIconType> = ({ ...props }) => (
  <SVGIcon width="14" height="14" viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M18.0702 14.4301L12.0002 20.5001L5.93018 14.4301"
      stroke="black"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 3.5V20.33"
      stroke="black"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SVGIcon>
);

export default DownSharpArrowIcon;
