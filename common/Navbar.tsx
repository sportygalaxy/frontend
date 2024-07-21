import TopNavbarMobile from "./TopNavbarMobile";
import TopNavbarDesktop from "./TopNavbarDesktop";
import { FC, PropsWithChildren, ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  return (
    <>
      <DesktopNavbar className="sticky top-0 z-10 bg-background">
        <section className="hidden sm:flex w-full items-center justify-center">
          <TopNavbarDesktop />
        </section>
      </DesktopNavbar>

      <MobileNavbar className="bg-background">
        <section className="flex sm:hidden w-full mt-14">
          <TopNavbarMobile />
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
