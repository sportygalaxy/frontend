"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type props = {
  href: string;
  text: string;
};

const isActive = (pathname: string, link: string) => pathname === link;

const HeaderActiveLink: React.FC<props> = ({ href: link = "/", text }) => {
  const pathname = usePathname();
  return (
    <Link href={link}>
      <p
        className={`${
          isActive(pathname, link)
            ? "text-primary font-bold"
            : "text-secondary font-normal"
        } text-mobile-xl md:text-xl`}
      >
        {text}
      </p>
    </Link>
  );
};

export default HeaderActiveLink;
