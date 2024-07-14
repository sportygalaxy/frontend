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

const TopNavbarDesktop = () => {
  const { isMd } = useBreakpoint();

  const logoSize = {
    width: isMd ? "123" : "49",
    height: isMd ? "114" : "45",
  };

  const iconSize = {
    width: isMd ? "26" : "20",
    height: isMd ? "27" : "20",
  };

  const selectFontSize = "text-mobile-xl md:text-xl";

  const NavLink = [
    {
      name: "Contact us",
      path: "contact",
    },
    {
      name: "About us",
      path: "about",
    },
    {
      name: "FAQ",
      path: "faq",
    },
  ];

  const CtaLink = [
    {
      name: "Notification",
      icon: <NotificationIcon {...iconSize} />,
      path: "notification",
    },
    {
      name: "Profile",
      icon: <UserIcon {...iconSize} />,
      path: "profile",
    },
    {
      name: "Cart",
      icon: <CartIcon {...iconSize} />,
      path: "cart",
    },
  ];
  const [inputValue, setInputValue] = useState("");

  const handleSearchClick = () => {
    console.log("Search icon clicked");
  };

  const handleClearClick = () => {
    setInputValue("");
    console.log("Clear icon clicked");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="wrapper flex-col w-full">
      <section className="flex gap-4 py-4 items-center justify-between">
        <ol className="flex gap-6 md:gap-16">
          {NavLink.map((link) => (
            <li
              key={link.name}
              className={cn("text-primary font-normal", selectFontSize)}
            >
              {link.name}
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
        <LogoIcon {...logoSize} />

        <Search
          placeholder="Search.."
          onSearchClick={handleSearchClick}
          onClearClick={handleClearClick}
          value={inputValue}
          onChange={handleChange}
        />

        <div className="hidden sm:flex items-center justify-between gap-2 sm:gap-4 xl:gap-10">
          {CtaLink.map((cta) => (
            <span
              key={cta.name}
              className="p-2 md:p-4 border border-secondary rounded-full"
            >
              {cta.icon}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TopNavbarDesktop;
