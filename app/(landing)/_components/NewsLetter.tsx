import { Button } from "@/components/ui/button";
import React from "react";

const NewsLetter = () => {
  return (
    <div className="tablet-view bg-[#292D32] py-20 flex items-start justify-center">
      <div className="bg-primary rounded-3xl max-w-4xl py-20 px-36 flex flex-col items-center justify-center gap-24">
        <div className="flex flex-col items-center justify-center">
          <p className="text-mobile-3xl md:text-3xl font-normal text-secondary">
            Our Newsletter
          </p>
          <p className="text-mobile-5xl md:text-5xl font-bold text-primary-foreground">
            Get the latest updates
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 w-full">
          <div className="border border-dark border-t-0 border-x-0 w-full">
            <input
              className="border-none bg-transparent text-primary-foreground focus:outline-none focus:ring-0 focus:border-none ml-8 placeholder:text-mobile-xl md:placeholder:text-xl placeholder:text-secondary text-mobile-xl md:text-xl py-2 w-full"
              type="text"
              placeholder="Your Email..."
            />
          </div>
          <Button variant="outline" size="lg" className="py-4 px-14">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
