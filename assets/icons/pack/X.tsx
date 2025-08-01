import SVGIcon, { SVGIconProps } from "@/common/Icons/SVGIcon";
import { FC } from "react";

type BriefCaseIconType = Partial<SVGIconProps>;

const XIcon: FC<BriefCaseIconType> = ({ color,...props }) => (
  <SVGIcon width="50" height="50" viewBox="0 0 250 250" fill="none" {...props}>
    <path
      stroke={color || "currentColor"}
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M218.12,209.56l-61-95.8,59.72-65.69a12,12,0,0,0-17.76-16.14L143.81,92.77,106.12,33.56A12,12,0,0,0,96,28H48A12,12,0,0,0,37.88,46.44l61,95.8L39.12,207.93a12,12,0,1,0,17.76,16.14l55.31-60.84,37.69,59.21A12,12,0,0,0,160,228h48a12,12,0,0,0,10.12-18.44ZM166.59,204,69.86,52H89.41l96.73,152Z"
    ></path>
  </SVGIcon>
);

export default XIcon;