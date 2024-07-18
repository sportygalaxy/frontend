"use client"
import CartIcon from "@/assets/icons/pack/Cart";
import HomeIcon from "@/assets/icons/pack/Home";
import NotificationIcon from "@/assets/icons/pack/Notification";
import ProfileIcon from "@/assets/icons/pack/Profile";
import HeaderBottomActiveLink from "./HeaderBottomActiveLink";
import { FC } from "react";
import { RoutesEnum } from "@/constants/routeEnums";

interface CtaLink {
  id: number;
  name: string;
  Icon: React.FC<{ color?: string }>;
  path: string;
}

const BottomNavbarMobile:FC = () => {
  const CtaLink: CtaLink[] = [
    {
      id: 1,
      name: "Home",
      Icon: (props) => <HomeIcon {...props} />,
      path: RoutesEnum.LANDING_PAGE,
    },
    {
      id: 2,
      name: "Cart",
      Icon: (props) => <CartIcon {...props} />,
      path: RoutesEnum.CART,
    },
    {
      id: 3,
      name: "Notification",
      Icon: (props) => <NotificationIcon {...props} />,
      path: RoutesEnum.NOTIFICATION,
    },
    {
      id: 4,
      name: "Profile",
      Icon: (props) => <ProfileIcon {...props} />,
      path: RoutesEnum.PROFILE,
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between w-full px-9 bg-primary-foreground">
        {CtaLink.map((cta) => (
          <div key={cta.id}>
            <HeaderBottomActiveLink
              href={cta.path}
              text={cta.name}
              Icon={cta.Icon}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default BottomNavbarMobile;
