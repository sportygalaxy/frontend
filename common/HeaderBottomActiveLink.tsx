"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type props = {
  href: string;
  text: string;
  Icon: React.FC<{ color?: string }>;
};

const isActive = (pathname: string, link: string) => pathname === link;

const HeaderBottomActiveLink: React.FC<props> = ({ href: link = "/", text, Icon }) => {
  const pathname = usePathname();
  return (
    <Link
      className="flex flex-col items-center justify-between h-12"
      href={link}
    >
      <Icon color={isActive(pathname, link) ? "black" : "#808080"} />
      <p
        className={`${
          isActive(pathname, link)
            ? "text-primary font-bold"
            : "text-secondary font-light"
        } text-xs`}
      >
        {text}
      </p>
    </Link>
  );
};

export default HeaderBottomActiveLink;
