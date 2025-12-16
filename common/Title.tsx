"use client";

import Ribbon from "@/assets/images/ribbon.png";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";
import Divider from "./Divider";

interface Props {}

const Title: FC<Props> = (props) => {
  const { ...rest } = props;

  return (
    <>
      <div className="desktop-tablet-view mt-20 flex items-end gap-1 w-full">
        <h1 className="min-w-[190px] text-3xl font-bold">NEW ARRIVAL.</h1>
        <Divider />
      </div>

      <div className="mobile-view sm:hidden flex items-center justify-between">
        <p className="text-primary font-medium text-base">Best selling</p>

        <Button
          variant="link"
          className="text-secondary font-medium text-sm cursor-pointer"
        >
          See all
        </Button>
      </div>
    </>
  );
};

export default Title;

interface DesktopTitleProps {
  title: string;
  noLine?: boolean;
  general?: boolean;
}
export const DesktopTitle = ({
  title,
  noLine = false,
  general = false,
}: DesktopTitleProps) => {
  return (
    <>
      <div
        className={cn(
          "sm:mt-20 flex w-full items-center gap-3",
          general ? "" : "desktop-tablet-view "
        )}
      >
        <h1 className="whitespace-nowrap text-xl md:text-3xl font-bold">
          {title}
        </h1>
        {noLine ? null : (
          <div className="relative flex w-full items-center gap-3">
            <Divider className="flex-1 bg-gray-200 border-[0.2px] border-[#e7e7e7]" />
            <Image
              src={Ribbon}
              alt="Festive ribbon"
              className="hidden flex-shrink-0 sm:block object-contain"
              sizes="(min-width: 1280px) 96px, (min-width: 768px) 72px, 56px"
              width={96}
              height={96}
            />
          </div>
        )}
      </div>
    </>
  );
};

interface MobileTitleProps {
  title: string;
  path: string;
}
export const MobileTitle = ({ title, path }: MobileTitleProps) => {
  const router = useRouter();
  return (
    <div className="mobile-view sm:hidden flex items-center justify-between">
      <p className="text-primary font-bold text-lg">{title}</p>

      <Button
        variant="link"
        className="text-secondary font-bold text-base cursor-pointer"
        onClick={() => router.push(path, { scroll: false })}
      >
        See all
      </Button>
    </div>
  );
};

interface DesktopSingleTitleProps {
  title: string;
}
export const DesktopSingleTitle = ({ title }: DesktopSingleTitleProps) => {
  return (
    <div className="flex items-end gap-1 w-full">
      <h1 className="min-w-[190px] text-mobile-3xl md:text-4xl font-bold tracking-widest">
        {title}
      </h1>
    </div>
  );
};
