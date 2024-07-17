import CartIcon from "@/assets/icons/pack/Cart";
import HomeIcon from "@/assets/icons/pack/Home";
import NotificationIcon from "@/assets/icons/pack/Notification";
import ProfileIcon from "@/assets/icons/pack/Profile";

const BottomNavbarMobile = () => {
  const CtaLink = [
    {
      name: "Home",
      icon: <HomeIcon />,
      path: "home",
    },
    {
      name: "Cart",
      icon: <CartIcon />,
      path: "cart",
    },
    {
      name: "Notification",
      icon: <NotificationIcon />,
      path: "notification",
    },
    {
      name: "Profile",
      icon: <ProfileIcon />,
      path: "profile",
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between w-full px-9 bg-primary-foreground">
        {CtaLink.map((cta) => (
          <div className="flex flex-col items-center justify-between h-10">
            {cta.icon}

            <p className="text-primary text-xs">{cta.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default BottomNavbarMobile;
