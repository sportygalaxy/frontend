import SVGIcon, { SVGIconProps } from "@/common/Icons/SVGIcon";
import { FC } from "react";

type PlusIconType = Partial<SVGIconProps>;

const PlusIcon: FC<PlusIconType> = ({ ...props }) => (
  <SVGIcon
    width={props?.size}
    height={props?.size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </SVGIcon>
);

export default PlusIcon;
