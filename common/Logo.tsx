"use client";
import { RoutesEnum } from "@/constants/routeEnums";
import Link from "next/link";
import LogoIcon from "@/assets/icons/pack/Logo";
import LogoMobileIcon from "@/assets/icons/pack/LogoMobile";

const Logo = () => {
  return (
    <Link className="flex items-center" href={RoutesEnum.LANDING_PAGE}>
      <div className="desktop-view">
        <LogoIcon />
      </div>
      <div className="mobile-view">
        <LogoMobileIcon />
      </div>
    </Link>
  );
};

export default Logo;
