"use client";
import NextTopLoader from "nextjs-toploader";
import { FC } from "react";

const TopLoader: FC = () => {
  return (
    <NextTopLoader
      color="#18dd81"
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl={true}
      showSpinner={true}
      easing="ease"
      speed={200}
      shadow={`0 0 10px #18dd81,0 0 5px #18dd81`}
    />
  );
};

export default TopLoader;
