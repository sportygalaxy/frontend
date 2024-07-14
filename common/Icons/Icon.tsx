import { FC } from "react";
import { SVGIconProps } from "./SVGIcon";
import { TIconPack, iconPack } from "@/assets/icons";

export interface IconProps {
  color?: SVGIconProps["color"];

  /**
   * The name of the icon from the icon pack.
   */
  name: TIconPack;

  /**
   * The size of the icon which will be used as the width and height
   */
  size?: number | string;
}

const IconComponent: FC<IconProps> = ({ name, size, ...props }) => {
  const IconFromPack = iconPack[name];

  return <IconFromPack height={size} width={size} {...props} />;
};

export default IconComponent;
