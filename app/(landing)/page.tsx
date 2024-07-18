import Title from "@/common/Title";
import Hero from "./_components/Hero";
import Products from "./_components/Products";
import { Button } from "@/components/ui/button";
import DownSharpArrowIcon from "@/assets/icons/pack/DownSharpArrow";
import Divider from "@/common/Divider";

export default function LandingPage() {
  return (
    <>
      <div className="relative">
        <Hero />
      </div>

      <div className="wrapper mt-5 sm:mt-0">
        <Title />
      </div>

      <div className="wrapper mt-5 sm:mt-0">
        <Products />
      </div>

      <div className="tablet-view wrapper mt-20 flex items-center justify-center">
        <Button
          className="font-medium text-mobile-xl md:text-xl py-4 px-4 lg:px-14"
          variant="outline"
          size="lg"
        >
          Sell All <DownSharpArrowIcon className="ml-2" />
        </Button>
      </div>

      <div className="tablet-view wrapper mt-10">
        <Divider />
      </div>
    </>
  );
}
