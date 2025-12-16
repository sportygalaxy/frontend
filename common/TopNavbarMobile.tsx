"use client";
import { Search } from "@/components/search";
import { FC, useEffect, useState } from "react";
import Upload from "./Upload";
import Logo from "./Logo";
import useToggle from "@/hooks/useToggle";
import useUserStore from "@/store/userStore";
import { getCookie } from "cookies-next";
import GlobalSearch from "./GlobalSearch";
import { usePathname } from "next/navigation";
import { RoutesEnum } from "@/constants/routeEnums";

interface TopNavbarMobileProps {
  isAuth: boolean;
}
const TopNavbarMobile: FC<TopNavbarMobileProps> = (props) => {
  const { isAuth } = props;
  const { user } = useUserStore();
  const [authenticated, setAuthenticated] = useState(false);
  const pathname = usePathname();
  const [isCondensed, setIsCondensed] = useState(false);

  const [openUploadModal, toggleUploadModal] = useToggle();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const AUTHENTIATED = getCookie("token");
    setAuthenticated(!!AUTHENTIATED);
  }, []);

  useEffect(() => {
    let ticking = false;
    const updateCondensed = () => {
      const shouldCondense = window.scrollY > 80;
      setIsCondensed((prev) =>
        prev === shouldCondense ? prev : shouldCondense
      );
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateCondensed);
        ticking = true;
      }
    };

    updateCondensed();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const shouldShowGlobalSearch =
    pathname === RoutesEnum.LANDING_PAGE ||
    pathname.startsWith(RoutesEnum.PRODUCTS) ||
    pathname.startsWith("/product/");

  return (
    <div
      className={`relative flex flex-col w-full gap-3 wrapper transition-all duration-300 ${
        isCondensed
          ? "bg-white/95 backdrop-blur-md shadow-sm supports-[backdrop-filter]:backdrop-blur py-3"
          : "py-5"
      }`}
      data-condensed={isCondensed ? "true" : "false"}
    >
      <div className="flex items-center justify-between">
        <Logo />
      </div>

      <div
        className={`flex flex-col gap-2 overflow-hidden transition-[max-height,opacity,margin] duration-300 ${
          isCondensed ? "max-h-0 opacity-0 -my-2" : "max-h-20 opacity-100"
        }`}
      >
        {!!user || authenticated ? (
          <p className="text-xl font-medium capitalize">
            Hello {user?.firstName},
          </p>
        ) : null}

        <p className="text-sm font-light opacity-50 text-primary">
          What are you buying today?
        </p>
      </div>

      {isAuth ? null : (
        <div
          className={`transition-[margin,opacity] duration-300 ${
            isCondensed ? "mt-0" : "mt-2"
          }`}
        >
          {/* <Search
            placeholder="Search.."
            onSearchClick={handleSearchClick}
            onClearClick={handleCameraClick}
            value={inputValue}
            onChange={handleChange}
            onClose={toggleUploadModal}
          /> */}
          {shouldShowGlobalSearch ? (
            <GlobalSearch onClearClick={handleCameraClick} />
          ) : null}
        </div>
      )}

      {isAuth ? null : (
        <Upload onClose={toggleUploadModal} open={openUploadModal} />
      )}
    </div>
  );
};

export default TopNavbarMobile;
