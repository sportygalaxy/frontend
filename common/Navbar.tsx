import TopNavbarMobile from "./TopNavbarMobile";
import TopNavbarDesktop from "./TopNavbarDesktop";
import { FC, PropsWithChildren, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  isAuth: boolean;
}
export default function Navbar(props: NavbarProps) {
  const { isAuth } = props;
  return (
    <>
      <DesktopNavbar className="sticky top-0 z-10 bg-white">
        <section className="items-center justify-center hidden w-full sm:flex">
          <TopNavbarDesktop isAuth={isAuth} />
        </section>
      </DesktopNavbar>

      <MobileNavbar className="bg-background">
        <section className="flex w-full sm:hidden mt-14">
          <TopNavbarMobile isAuth={isAuth} />
        </section>
      </MobileNavbar>
    </>
  );
}

type DesktopNavbarProps<T> = {
  children?: ReactNode;
  component?: FC<{}>;
  className?: string;
} & PropsWithChildren<{}>;
export const DesktopNavbar = <T,>({
  children,
  component: Component,
  className,
}: DesktopNavbarProps<T>) => {
  return (
    <header
      className={cn(
        "col-span-12 mx-auto w-full flex justify-center items-center",
        className
      )}
    >
      {Component ? <Component /> : children}
    </header>
  );
};

type MobileNavbarProps<T> = {
  children?: ReactNode;
  component?: FC<{}>;
  className?: string;
} & PropsWithChildren<{}>;

export const MobileNavbar = <T,>({
  children,
  component: Component,
  className,
}: MobileNavbarProps<T>) => {
  return (
    <header
      className={cn(
        "col-span-12 mx-auto w-full flex justify-center items-center",
        className
      )}
    >
      {Component ? <Component /> : children}
    </header>
  );
};
