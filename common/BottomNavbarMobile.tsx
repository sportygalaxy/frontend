"use client";
import CartIcon from "@/assets/icons/pack/Cart";
import HomeIcon from "@/assets/icons/pack/Home";
import NotificationIcon from "@/assets/icons/pack/Notification";
import ProfileIcon from "@/assets/icons/pack/Profile";
import HeaderBottomActiveLink from "./HeaderBottomActiveLink";
import { FC } from "react";
import { RoutesEnum } from "@/constants/routeEnums";
import useCartStore from "@/store/cartStore";
import { showCartQtyValue } from "@/helpers/cart";
import CartAddToCartDrawer from "@/components/cart/CartAddToCartDrawer";

interface CtaLink {
  id: number;
  name: string;
  Icon: React.FC<{ color?: string }>;
  path: string;
  notification?: {
    status: boolean;
    value: number;
  };
  isNotLink?: boolean;
}

const BottomNavbarMobile: FC = () => {
  const { cart } = useCartStore();
  const iconSize = {
    color: "grey",
  };
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
      Icon: (props) => (
        <CartAddToCartDrawer data={iconSize} component={CartIcon} />
      ),
      path: RoutesEnum.CART,
      notification: showCartQtyValue(cart),
      isNotLink: true,
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
          <div key={cta.id} className="relative min-w-14">
            <HeaderBottomActiveLink
              href={cta.path}
              text={cta.name}
              isNotLink={cta.isNotLink}
              Icon={cta.Icon}
            />

            {cta?.notification?.status ? (
              <span className="absolute right-[-8px] top-[-8px] bg-primary rounded-full p-4 text-white h-3 w-3 flex items-center justify-center text-sm font-semibold">
                {cta?.notification?.value}
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </>
  );
};

export default BottomNavbarMobile;
