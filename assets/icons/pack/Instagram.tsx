import SVGIcon, { SVGIconProps } from "@/common/Icons/SVGIcon";
import { FC } from "react";

type BriefCaseIconType = Partial<SVGIconProps>;

const InstagramIcon: FC<BriefCaseIconType> = ({ color, ...props }) => (
  <SVGIcon width="50" height="50" viewBox="0 0 50 50" fill="none" {...props}>
    <path
      d="M18.7498 45.8332H31.2498C41.6665 45.8332 45.8332 41.6665 45.8332 31.2498V18.7498C45.8332 8.33317 41.6665 4.1665 31.2498 4.1665H18.7498C8.33317 4.1665 4.1665 8.33317 4.1665 18.7498V31.2498C4.1665 41.6665 8.33317 45.8332 18.7498 45.8332Z"
      stroke={color || "currentColor"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M25.0002 32.2918C29.0272 32.2918 32.2918 29.0272 32.2918 25.0002C32.2918 20.9731 29.0272 17.7085 25.0002 17.7085C20.9731 17.7085 17.7085 20.9731 17.7085 25.0002C17.7085 29.0272 20.9731 32.2918 25.0002 32.2918Z"
      stroke={color || "currentColor"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M36.7418 14.5832H36.7658"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SVGIcon>
);

export default InstagramIcon;
