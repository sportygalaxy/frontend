"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type props = {
  href: string;
  text: string;
  isNotLink?: boolean;
  Icon: React.FC<{ color?: string }>;
  action?: () => void;
};

const isActive = (pathname: string, link: string) => pathname === link;

const HeaderBottomActiveLink: React.FC<props> = ({
  href: link = "/",
  text,
  Icon,
  isNotLink,
  action,
}) => {
  const pathname = usePathname();
  return (
    <>
      {!isNotLink ? (
        <Link
          className="flex flex-col items-center justify-between h-12"
          href={link}
        >
          <Icon color={isActive(pathname, link) ? "black" : "#808080"} />
          <p
            className={`${
              isActive(pathname, link)
                ? "text-primary font-light"
                : "text-secondary font-light"
            } text-xs`}
          >
            {text}
          </p>
        </Link>
      ) : (
        <div
          onClick={action && action}
          className="flex flex-col items-center justify-between h-12 cursor-pointer"
        >
          <Icon color={isActive(pathname, link) ? "black" : "#808080"} />
          <p
            className={`${
              isActive(pathname, link)
                ? "text-primary font-light"
                : "text-secondary font-light"
            } text-xs`}
          >
            {text}
          </p>
        </div>
      )}
    </>
  );
};

export default HeaderBottomActiveLink;
