"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "@/components/search";
import NotificationIcon from "@/assets/icons/pack/Notification";
import CartIcon from "@/assets/icons/pack/Cart";
import UserIcon from "@/assets/icons/pack/User";
import LogoIcon from "@/assets/icons/pack/Logo";
import useBreakpoint from "@/hooks/useBreakpoint";
import { cn } from "@/lib/utils";
import LogoMobileIcon from "@/assets/icons/pack/LogoMobile";
import GalleryIcon from "@/assets/icons/pack/Gallery";
import Upload from "./Upload";
import { Button } from "@/components/ui/button";
import { RoutesEnum } from "@/constants/routeEnums";
import HeaderActiveLink from "./HeaderActiveLink";
import Logo from "./Logo";
import useToggle from "@/hooks/useToggle";
import CartAddToCartDrawer from "@/components/cart/CartAddToCartDrawer";

const TopNavbarDesktop = () => {
  const [openUploadModal, toggleUploadModal] = useToggle();
  const { isMd } = useBreakpoint();

  const iconSize = {
    width: isMd ? "26" : "20",
    height: isMd ? "27" : "20",
    color: "grey",
  };

  const selectFontSize = "text-mobile-xl md:text-xl";

  const NavLink = [
    {
      id: 1,
      name: "Contact us",
      path: RoutesEnum.CONTACT,
    },
    {
      id: 2,
      name: "About us",
      path: RoutesEnum.ABOUT_US,
    },
    {
      id: 3,
      name: "FAQ",
      path: RoutesEnum.FAQ,
    },
  ];

  const CtaLink = [
    {
      id: 1,
      name: "Notification",
      icon: <NotificationIcon {...iconSize} />,
      path: "notification",
    },
    {
      id: 2,
      name: "Profile",
      icon: <UserIcon {...iconSize} />,
      path: "profile",
    },
    {
      id: 3,
      name: "Cart",
      icon: <CartIcon {...iconSize} />,
      path: "cart",
    },
  ];
  const [inputValue, setInputValue] = useState("");

  const handleSearchClick = () => {
    //
  };

  const handleCameraClick = () => {
    setInputValue("");
    toggleUploadModal();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="relative wrapper flex-col w-full">
      <section className="flex gap-4 py-4 items-center justify-between">
        <ol className="flex gap-6 md:gap-16">
          {NavLink.map((link) => (
            <li
              key={link.id}
              className={cn("text-primary font-normal", selectFontSize)}
            >
              <HeaderActiveLink href={link.path} text={link.name} />
            </li>
          ))}
        </ol>

        <div className="flex gap-2 md:gap-4">
          <Select>
            <SelectTrigger
              className={cn("text-primary font-normal", selectFontSize)}
            >
              <span>$</span>
              <SelectValue placeholder="USD" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-dark">
              <SelectItem value="light">USD</SelectItem>
              <SelectItem value="dark">EUR</SelectItem>
              <SelectItem value="system">NGN</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger
              className={cn("text-primary font-normal", selectFontSize)}
            >
              <SelectValue placeholder="ENG" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-dark">
              <SelectItem value="light">ENG</SelectItem>
              <SelectItem value="dark">UK</SelectItem>
              <SelectItem value="system">FRN</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      <section className="flex items-center justify-between gap-8">
        <Logo />

        {/* <CartAddToCartDrawer item={[]} /> */}
        <Search
          placeholder="Search.."
          onSearchClick={handleSearchClick}
          onClearClick={handleCameraClick}
          value={inputValue}
          onChange={handleChange}
        />

        {true ? (
          <div className="hidden sm:flex items-center justify-between gap-2 sm:gap-4 xl:gap-10">
            {CtaLink.map((cta) => (
              <span
                key={cta.id}
                className="p-2 md:p-4 border border-secondary rounded-full"
              >
                {cta.icon}
              </span>
            ))}
          </div>
        ) : (
          <div className="hidden sm:flex items-center justify-between gap-2 sm:gap-4 xl:gap-10">
            <Button
              className="text-mobile-xl md:text-xl px-4 lg:px-14"
              variant="tertiary"
              size="lg"
            >
              Sign in
            </Button>
            <Button
              className="text-mobile-xl md:text-xl text-white px-4 lg:px-14"
              variant="default"
              size="lg"
            >
              Sign up
            </Button>
          </div>
        )}
      </section>

      {/* Upload modal */}
      <Upload onClose={toggleUploadModal} open={openUploadModal} />
    </div>
  );
};

export default TopNavbarDesktop;
