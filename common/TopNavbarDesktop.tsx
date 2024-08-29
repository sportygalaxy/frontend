"use client";
import { FC, useEffect, useState } from "react";
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
import useCartStore from "@/store/cartStore";
import { showCartQtyValue } from "@/helpers/cart";
import Link from "next/link";
import { getCookie } from "cookies-next";
import useUserStore from "@/store/userStore";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/lib/apiAuth";
import { NotifyError, NotifySuccess } from "@/helpers/toasts";
import { useRouter } from "next/navigation";
import SpinnerIcon from "@/assets/icons/pack/Spinner";

interface TopNavbarDesktopProps {
  isAuth: boolean;
}
const TopNavbarDesktop: FC<TopNavbarDesktopProps> = (props) => {
  const { isAuth } = props;
  const router = useRouter();

  const { cart } = useCartStore();

  const { user } = useUserStore();
  const [authenticated, setAuthenticated] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [openUploadModal, toggleUploadModal] = useToggle();
  const { clearUser } = useUserStore();

  const {
    mutate: logoutUser,
    isPending,
    error,
    data,
  } = useMutation<any, Error, void>({
    mutationFn: () => logout(),
    onMutate: async () => {},
    onSuccess: (data) => {
      clearUser();
      NotifySuccess((data?.message as string) || "logout successful");
      router.push(RoutesEnum.LOGIN);
    },
    onError: (error, variables, context) => {
      NotifyError(error?.message || "An error occured");
    },
  });

  useEffect(() => {
    const AUTHENTIATED = getCookie("token");
    setAuthenticated(!!AUTHENTIATED);
  }, []);

  const iconSize = {
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
      icon: (
        <>
          <NotificationIcon
            className="desktop-tablet-view"
            size={27}
            {...iconSize}
          />
          <NotificationIcon
            className="mobile-desktop-tablet-view"
            size={20}
            {...iconSize}
          />
        </>
      ),
      path: "notification",
      notification: { status: false, value: 0 },
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
      icon: <CartAddToCartDrawer data={iconSize} component={CartIcon} />,
      path: "cart",
      notification: showCartQtyValue(cart),
    },
  ];

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
    <div className="relative flex-col w-full wrapper">
      <section className="flex items-center justify-between gap-4 py-4">
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

        {isAuth ? null : (
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
        )}
      </section>

      <section
        className={cn(
          "flex items-center justify-between gap-8",
          isAuth && "w-fit"
        )}
      >
        <Logo />

        {isAuth ? (
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
        ) : (
          <>
            <Search
              placeholder="Search.."
              onSearchClick={handleSearchClick}
              onClearClick={handleCameraClick}
              value={inputValue}
              onChange={handleChange}
            />

            {!!user || authenticated ? (
              <div className="items-center justify-between hidden gap-2 sm:flex sm:gap-4 xl:gap-10">
                <button
                  onClick={() => logoutUser()}
                  className="p-2 md:p-4 border border-secondary rounded-full flex items-center justify-center"
                >
                  Logout
                  {isPending ? <SpinnerIcon width={15} height={15} /> : null}
                </button>
                {CtaLink.map((cta) => (
                  <span
                    key={cta.id}
                    className={cn(
                      cta.name !== "Cart" &&
                        "p-2 md:p-4 border border-secondary rounded-full"
                    )}
                  >
                    {cta.icon}

                    {cta?.notification?.status ? (
                      <span className="absolute right-0 bottom-[-10px] md:bottom-6 bg-destructive rounded-full p-4 text-white h-6 w-6 flex items-center justify-center text-base font-bold">
                        {cta?.notification?.value}
                      </span>
                    ) : null}
                  </span>
                ))}
              </div>
            ) : (
              <div className="items-center justify-between hidden gap-2 sm:flex sm:gap-4 xl:gap-10">
                <Link href={RoutesEnum.LOGIN}>
                  <Button
                    className="px-4 text-mobile-xl md:text-xl lg:px-14"
                    variant="tertiary"
                    size="lg"
                  >
                    Sign in
                  </Button>
                </Link>

                <Link href={RoutesEnum.REGISTER}>
                  <Button
                    className="px-4 !text-white text-mobile-xl md:text-xl lg:px-14"
                    variant="default"
                    size="lg"
                  >
                    Sign up
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}
      </section>

      {/* Upload modal */}
      <Upload onClose={toggleUploadModal} open={openUploadModal} />
    </div>
  );
};

export default TopNavbarDesktop;
