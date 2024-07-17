import { Button } from "@/components/ui/button";
import React, { FC } from "react";

interface Props {}
const Title: FC<Props> = (props) => {
  const { ...rest } = props;

  return (
    <>
      <div className="tablet-view mt-20 flex items-end gap-1 w-full">
        <h1 className="min-w-[190px] text-3xl font-bold">NEW ARRIVAL.</h1>
        <div className="border-[0.2px] border-dark mb-3 w-full min-w-[200px]"></div>
      </div>

      <div className="mobile-view flex items-center justify-between">
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
