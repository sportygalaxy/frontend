"use client";
import { RoutesEnum } from "@/constants/routeEnums";
import Link from "next/link";
import LogoIcon from "@/assets/icons/pack/Logo";
import LogoMobileIcon from "@/assets/icons/pack/LogoMobile";
import { FC } from "react";
import { cn } from "@/lib/utils";

interface Props {
  color: string;
  isFooter: boolean;
}
const Logo: FC<Props> = (props) => {
  const { color = "black", isFooter = false, ...rest } = props;
  return (
    <Link className="flex items-center" href={RoutesEnum.LANDING_PAGE}>
      <div className={cn(isFooter ? "tablet-view" : "desktop-view")}>
        <LogoIcon color={color} />
      </div>
      <div className="mobile-view">
        <LogoMobileIcon />
      </div>
    </Link>
  );
};

export default Logo;
