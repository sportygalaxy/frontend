import SVGIcon, { SVGIconProps } from "@/common/Icons/SVGIcon";
import { FC } from "react";

type HamburgerMenuIconType = Partial<SVGIconProps>;

const HamburgerMenuIcon: FC<HamburgerMenuIconType> = ({ ...props }) => (
  <SVGIcon width="24" height="44" viewBox="0 0 24 44" fill="none" {...props}>
    <path
      d="M3 12.9968H21"
      stroke="#292D32"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M3 22.0183H21"
      stroke="#292D32"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M3 31.0396H21"
      stroke="#292D32"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </SVGIcon>
);

export default HamburgerMenuIcon;
