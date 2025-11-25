"use client";

import { cn } from "@/lib/utils";
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
  const active = isActive(pathname, link);

  const baseClasses =
    "inline-flex items-center rounded-full px-2 py-1 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

  return (
    <Link
      href={link}
      aria-current={active ? "page" : undefined}
      className={cn(
        baseClasses,
        "text-mobile-xl md:text-xl",
        active
          ? "bg-secondary/60 font-semibold text-primary"
          : "text-secondary hover:bg-secondary/50 hover:text-primary"
      )}
    >
      {text}
    </Link>
  );
};

export default HeaderActiveLink;
