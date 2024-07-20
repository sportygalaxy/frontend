import { Button } from "@/components/ui/button";
import React, { FC } from "react";
import Divider from "./Divider";

interface Props {}

const Title: FC<Props> = (props) => {
  const { ...rest } = props;

  return (
    <>
      <div className="tablet-view mt-20 flex items-end gap-1 w-full">
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
}
export const DesktopTitle = ({ title }: DesktopTitleProps) => {
  return (
    <div className="tablet-view mt-20 flex items-end gap-1 w-full">
      <h1 className="min-w-[190px] text-3xl font-bold">{title}</h1>
      <Divider />
    </div>
  );
};

interface MobileTitleProps {
  title: string;
  path: string;
}
export const MobileTitle = ({ title, path }: MobileTitleProps) => {
  return (
    <div className="mobile-view sm:hidden flex items-center justify-between">
      <p className="text-primary font-medium text-base">{title}</p>

      <Button
        variant="link"
        className="text-secondary font-medium text-sm cursor-pointer"
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